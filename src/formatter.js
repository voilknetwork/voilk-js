import get from "lodash/get";
import { key_utils } from "./auth/ecc";

module.exports = voilkAPI => {
  function numberWithCommas(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function coiningVoilk(account, gprops) {
    const coins = parseFloat(account.coining_shares.split(" ")[0]);
    const total_coins = parseFloat(gprops.total_coining_shares.split(" ")[0]);
    const total_coin_voilk = parseFloat(
      gprops.total_coining_fund_voilk.split(" ")[0]
    );
    const coining_voilkf = total_coin_voilk * (coins / total_coins);
    return coining_voilkf;
  }

  function processOrders(open_orders, assetPrecision) {
    const vsdOrders = !open_orders
      ? 0
      : open_orders.reduce((o, order) => {
          if (order.sell_price.base.indexOf("VSD") !== -1) {
            o += order.for_sale;
          }
          return o;
        }, 0) / assetPrecision;

    const voilkOrders = !open_orders
      ? 0
      : open_orders.reduce((o, order) => {
          if (order.sell_price.base.indexOf("VOILK") !== -1) {
            o += order.for_sale;
          }
          return o;
        }, 0) / assetPrecision;

    return { voilkOrders, vsdOrders };
  }

  function calculateSaving(savings_withdraws) {
    let savings_pending = 0;
    let savings_vsd_pending = 0;
    savings_withdraws.forEach(withdraw => {
      const [amount, asset] = withdraw.amount.split(" ");
      if (asset === "VOILK") savings_pending += parseFloat(amount);
      else {
        if (asset === "VSD") savings_vsd_pending += parseFloat(amount);
      }
    });
    return { savings_pending, savings_vsd_pending };
  }

  function pricePerVoilk(feed_price) {
    let price_per_voilk = undefined;
    const { base, quote } = feed_price;
    if (/ VSD$/.test(base) && / VOILK$/.test(quote)) {
      price_per_voilk = parseFloat(base.split(" ")[0]) / parseFloat(quote.split(" ")[0]);
    }
    return price_per_voilk;
  }

  function estimateAccountValue(
    account,
    { gprops, feed_price, open_orders, savings_withdraws, coining_voilk } = {}
  ) {
    const promises = [];
    const username = account.name;
    const assetPrecision = 1000;
    let orders, savings;

    if (!coining_voilk || !feed_price) {
      if (!gprops || !feed_price) {
        promises.push(
          voilkAPI.getStateAsync(`/@${username}`).then(data => {
            gprops = data.props;
            feed_price = data.feed_price;
            coining_voilk = coiningVoilk(account, gprops);
          })
        );
      } else {
        coining_voilk = coiningVoilk(account, gprops);
      }
    }

    if (!open_orders) {
      promises.push(
        voilkAPI.getOpenOrdersAsync(username).then(open_orders => {
          orders = processOrders(open_orders, assetPrecision);
        })
      );
    } else {
      orders = processOrders(open_orders, assetPrecision);
    }

    if (!savings_withdraws) {
      promises.push(
        voilkAPI
          .getSavingsWithdrawFromAsync(username)
          .then(savings_withdraws => {
            savings = calculateSaving(savings_withdraws);
          })
      );
    } else {
      savings = calculateSaving(savings_withdraws);
    }

    return Promise.all(promises).then(() => {
      let price_per_voilk = pricePerVoilk(feed_price);

      const savings_balance = account.savings_balance;
      const savings_vsd_balance = account.savings_vsd_balance;
      const balance_voilk = parseFloat(account.balance.split(" ")[0]);
      const saving_balance_voilk = parseFloat(savings_balance.split(" ")[0]);
      const vsd_balance = parseFloat(account.vsd_balance);
      const vsd_balance_savings = parseFloat(savings_vsd_balance.split(" ")[0]);

      let conversionValue = 0;
      const currentTime = new Date().getTime();
      (account.other_history || []).reduce((out, item) => {
        if (get(item, [1, "op", 0], "") !== "convert") return out;

        const timestamp = new Date(get(item, [1, "timestamp"])).getTime();
        const finishTime = timestamp + 86400000 * 3.5; // add 3.5day conversion delay
        if (finishTime < currentTime) return out;

        const amount = parseFloat(
          get(item, [1, "op", 1, "amount"]).replace(" VSD", "")
        );
        conversionValue += amount;
      }, []);

      const total_vsd =
        vsd_balance +
        vsd_balance_savings +
        savings.savings_vsd_pending +
        orders.vsdOrders +
        conversionValue;

      const total_voilk =
        coining_voilk +
        balance_voilk +
        saving_balance_voilk +
        savings.savings_pending +
        orders.voilkOrders;

      return (total_voilk * price_per_voilk + total_vsd).toFixed(2);
    });
  }

  function createSuggestedPassword() {
    const PASSWORD_LENGTH = 32;
    const privateKey = key_utils.get_random_key();
    return privateKey.toWif().substring(3, 3 + PASSWORD_LENGTH);
  }

  return {
    reputation: function(reputation) {
      if (reputation == 0) return 25;
      if (!reputation) return reputation;      
      let neg = reputation < 0;
      let rep = String(reputation);
      rep = neg ? rep.substring(1) : rep;
      let v = (Math.log10((rep > 0 ? rep : -rep) - 10) - 9);
      v =  neg ? -v : v;
      return parseInt(v * 9 + 25);
    },

    coinToVoilk: function(
      coiningShares,
      totalCoiningShares,
      totalCoiningFundVoilk
    ) {
      return (
        parseFloat(totalCoiningFundVoilk) *
        (parseFloat(coiningShares) / parseFloat(totalCoiningShares))
      );
    },

    commentPermlink: function(parentAuthor, parentPermlink) {
      const timeStr = new Date()
        .toISOString()
        .replace(/[^a-zA-Z0-9]+/g, "")
        .toLowerCase();
      parentPermlink = parentPermlink.replace(/(-\d{8}t\d{9}z)/g, "");
      return "re-" + parentAuthor + "-" + parentPermlink + "-" + timeStr;
    },

    amount: function(amount, asset) {
      return amount.toFixed(3) + " " + asset;
    },
    numberWithCommas,
    coiningVoilk,
    estimateAccountValue,
    createSuggestedPassword,
    pricePerVoilk
  };
};
