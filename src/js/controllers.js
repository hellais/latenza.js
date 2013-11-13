'use strict';

/* Controllers */

angular.module('latenza.controllers', []).
  controller('MainCtrl', ['$scope', '$rootScope', 'Root', 'Page',
  function($scope, $rootScope, Root, Page) {
    Root.get(function(root){
      $scope.root = root; 
    });

    $scope.fetchPage = function(page_id) {
      Page(page_id, function(page){
        $scope.openPage = page;
      });
    };

  }])
  .controller('PageCtrl', [function() {

  }]);
