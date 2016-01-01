'use strict';

angular.module('app').controller('DashController', function(
    DEBUG,
    VERSION,
    $scope
) {
  $scope.debugState = DEBUG ? 'enabled' : 'disabled';
  $scope.version = VERSION;
});
