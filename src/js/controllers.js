'use strict';

/* Controllers */

angular.module('latenza.controllers', []).
  controller('MainCtrl', ['$scope', '$rootScope', 'Root', 'Page',
  function($scope, $rootScope, Root, Page) {
    Root.get(function(root){
      $scope.root = root; 
    });

    $scope.fetchPage = function(page) {
      Page(page, function(page_content){
        $scope.openPage = page_content;
      });
    };

  }])
  .controller('PageCtrl', [function() {

  }]);
