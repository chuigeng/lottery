'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/lottery/keno/search', controller.keno.search);
  router.get('/lottery/keno/:kenoId', controller.keno.get);
  router.get('/lottery/keno/country/:country/drawNo/:drawNo', controller.keno.getByCountryDrawNo);
  router.post('/lottery/keno', controller.keno.create);
  router.put('/lottery/keno/:kenoId', controller.keno.update);
};
