[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/voilknetwork/voilk-js/blob/master/LICENSE)
[![Voilk.js channel on voilknetwork.chat](https://img.shields.io/badge/chat-voilknetwork.chat-1c56a4.svg)](https://voilknetwork.chat/channel/voilkjs)

# Voilk.js
Voilk.js the JavaScript API for Voilk blockchain

# Documentation

- [Install](https://github.com/voilknetwork/voilk-js/tree/master/doc#install)
- [Browser](https://github.com/voilknetwork/voilk-js/tree/master/doc#browser)
- [Config](https://github.com/voilknetwork/voilk-js/tree/master/doc#config)
- [Database API](https://github.com/voilknetwork/voilk-js/tree/master/doc#api)
    - [Subscriptions](https://github.com/voilknetwork/voilk-js/tree/master/doc#subscriptions)
    - [Tags](https://github.com/voilknetwork/voilk-js/tree/master/doc#tags)
    - [Blocks and transactions](https://github.com/voilknetwork/voilk-js/tree/master/doc#blocks-and-transactions)
    - [Globals](https://github.com/voilknetwork/voilk-js/tree/master/doc#globals)
    - [Keys](https://github.com/voilknetwork/voilk-js/tree/master/doc#keys)
    - [Accounts](https://github.com/voilknetwork/voilk-js/tree/master/doc#accounts)
    - [Market](https://github.com/voilknetwork/voilk-js/tree/master/doc#market)
    - [Authority / validation](https://github.com/voilknetwork/voilk-js/tree/master/doc#authority--validation)
    - [Votes](https://github.com/voilknetwork/voilk-js/tree/master/doc#votes)
    - [Content](https://github.com/voilknetwork/voilk-js/tree/master/doc#content)
    - [Witnesses](https://github.com/voilknetwork/voilk-js/tree/master/doc#witnesses)
- [Login API](https://github.com/voilknetwork/voilk-js/tree/master/doc#login)
- [Follow API](https://github.com/voilknetwork/voilk-js/tree/master/doc#follow-api)
- [Broadcast API](https://github.com/voilknetwork/voilk-js/tree/master/doc#broadcast-api)
- [Broadcast](https://github.com/voilknetwork/voilk-js/tree/master/doc#broadcast)
- [Auth](https://github.com/voilknetwork/voilk-js/tree/master/doc#auth)


Here is full documentation:
https://github.com/voilknetwork/voilk-js/tree/master/doc

## Browser
```html
<script src="./voilk.min.js"></script>
<script>
voilk.api.getAccounts(['bilal', 'voilk'], function(err, response){
    console.log(err, response);
});
</script>
```

## CDN
https://cdn.jsdelivr.net/npm/voilk/dist/voilk.min.js<br/>
```html
<script src="https://cdn.jsdelivr.net/npm/voilk/dist/voilk.min.js"></script>
```

## Webpack
[Please have a look at the webpack usage example.](https://github.com/voilknetwork/voilk-js/blob/master/examples/webpack-example)

## Server
## Install
```
$ npm install voilk --save
```

## RPC Servers
https://api.voilknetwork.com By Default<br/>
https://node.voilk.ws<br/>
https://this.piston.rocks<br/>

## Examples
### Broadcast Vote
```js
var voilk = require('voilk');

var wif = voilk.auth.toWif(username, password, 'posting');
voilk.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
	console.log(err, result);
});
```

### Get Accounts
```js
voilk.api.getAccounts(['bilal', 'voilk'], function(err, result) {
	console.log(err, result);
});
```

### Get State
```js
voilk.api.getState('/trends/funny', function(err, result) {
	console.log(err, result);
});
```

### Reputation Formatter
```js
var reputation = voilk.formatter.reputation(user.reputation);
console.log(reputation);
```

### Voilk Testnet
Voilk-js requires some configuration to work on the public Voilk testnet.

You need to set two Voilk API options, `address_prefix` and `chain_id`.
```js
voilk.api.setOptions({
  address_prefix: 'TST',
  chain_id: '46d82ab7d8db682eb1959aed0ada039a6d49afa1602491f93dde9cac3e8e6c32',
  useTestNet: true,
});
```

The Chain ID could change. If it does, it may not be reflected here, but will be documented on any testnet launch announcements.

## Contributions
Patches are welcome! Contributors are listed in the package.json file. Please run the tests before opening a pull request and make sure that you are passing all of them. If you would like to contribute, but don't know what to work on, check the issues list or on Voilknetwork Chat channel #voilkjs https://voilknetwork.chat/channel/voilkjs.

## Issues
When you find issues, please report them!

## License
MIT
