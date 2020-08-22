const voilk = require('../lib');

/* Generate private active WIF */
const username = process.env.VOILK_USERNAME;
const password = process.env.VOILK_PASSWORD;
const privActiveWif = voilk.auth.toWif(username, password, 'active');

/** Add posting key auth */
voilk.broadcast.addKeyAuth({
    signingKey: privActiveWif,
    username,
    authorizedKey: 'SHR88CPfhCmeEzCnvC1Cjc3DNd1DTjkMcmihih8SSxmm4LBqRq5Y9',
    role: 'posting',
  },
  (err, result) => {
    console.log(err, result);
  }
);
