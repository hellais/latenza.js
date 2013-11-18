'use strict';

/* Directives */


angular.module('latenza.directives', []).
  directive('markdown', [function() {
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        var setContent = function(content) {
           if (content) {
            var html = marked(content);
            element.html(html);
          }
        }
        if (attrs.markdown) {
          scope.$watch(attrs.markdown, function (newVal) {
            setContent(newVal);
          });
        } else {
          setContent(newVal);
        }
      }
    };
}]).
  directive('latencyBar', [function() {
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        if (attrs.latencyBar) {
          $(element).animate(
            {"width": "100%"},
            attrs.latencyBar.latency/1000
          );
        }
      }
    };
}]);
