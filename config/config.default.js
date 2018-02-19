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
      host: process.evn.MYSQL_HOST || 'localhost',
      port: process.evn.MYSQL_PORT || '3306',
      user: process.evn.MYSQL_USER || 'root',
      password: process.evn.MYSQL_PASSWORD || '12345665',
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