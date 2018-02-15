'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1518665327046_8686';

  // add your config here
  config.middleware = [];

  // database
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '12345665',
      database: 'lottery',
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  }

  return config;
};