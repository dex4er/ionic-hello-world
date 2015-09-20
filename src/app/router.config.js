'use strict';

angular.module('app').config(function($urlRouterProvider, defaultState) {
  var defaultUrl = '/' + defaultState.replace(/\./g, '/');
  // if none of the defined states are matched, use this as the fallback
  $urlRouterProvider.otherwise(defaultUrl);
});
