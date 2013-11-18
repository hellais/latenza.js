'use strict';

/* Controllers */

angular.module('latenza.controllers', []).
  controller('MainCtrl', ['$scope', '$rootScope', 'Root', 'Page',
  function($scope, $rootScope, Root, Page) {
    $scope.openPage = function(page) {
      Page(page, function(page_content){
        $scope.currentPageContent = page_content;
        $rootScope.currentPage = page;
      });
    };

    Root.get(function(root){
      $scope.root = root; 
      $scope.openPage(root.md[0]);
    });

  }])
  .controller('PageCtrl', [function() {

  }]);
