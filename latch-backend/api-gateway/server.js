const gateway = require('express-gateway');

gateway()
  .loadConfig('./config/gateway')
  .run();