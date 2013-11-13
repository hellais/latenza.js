'use strict';


// Declare app level module which depends on filters, and services
angular.module('latenza', ['ngResource', 'ngRoute', 'latenza.filters',
                           'latenza.services', 'latenza.directives',
                           'latenza.controllers']).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'templates/main.html',
      controller: 'MainCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/'});
  }
]);
