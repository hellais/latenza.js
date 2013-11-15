'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('latenza.services', []).
  value('version', '2.0.0').
  factory('Page', ['$http', function($http) {
    return function(page, cb) {
      $http.get(page.href).
        success(function(data, status, headers, config) {
          var page = marked(data);
          cb(page);
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    };
  }]).
  factory('Root', ['$resource', function($resource) {
    return $resource('/root.json');
  }]).
  factory('latenzaInterceptor', ['$q', '$rootScope', '$location',
  function($q, $rootScope, $location) {
    var pushRequest = function(request) {
      if (!$rootScope.pendingRequests)
        $rootScope.pendingRequests = [];
      request.start = new Date();
      $rootScope.pendingRequests.push(request);
      if (!$rootScope.network) {
         $rootScope.network = {
           latency: 0,
           successfulRequests: 0,
           failedRequests: 0
        }
      }
    },
      popRequest = function(request_url, success) {
        $rootScope.pendingRequests.forEach(function(request) {
          if ( request.url == request_url ) {
            if (success) {
              var latency = new Date() - request.start;
              
              $rootScope.network.latency = Math.round(($rootScope.network.latency + latency) / 2);
              $rootScope.network.successfulRequests += 1;

            } else {

              $rootScope.network.failedRequests += 1;

            }

            $rootScope.pendingRequests.pop(request);
          }
        });
    };

    return {
      // optional method
      'request': function(config) {
        pushRequest(config);
        // do something on success
        return config || $q.when(config);
      },
   
      // optional method
     'requestError': function(rejection) {
        // do something on error
        if (canRecover(rejection)) {
          return responseOrNewPromise
        }
        return $q.reject(rejection);
      },
   
      // optional method
      'response': function(response) {
        popRequest(response.config.url, true);
        return response || $q.when(response);
      },
   
      // optional method
     'responseError': function(rejection) {
       window.antani = rejection;
       console.log(rejection);
        popRequest(rejection.config.url, false);
        return $q.reject(rejection);
      }
    }
}]). 
  config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('latenzaInterceptor');
}]);
