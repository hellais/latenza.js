//Wrapped in an outer function to preserve global this
(function (root) { var amdExports; define(['jquery'], function () { (function () {

!function ($) {

  "use strict"; // jshint ;_;


 /* Class Definition
  * ====================== */

  var Foobar = function (element, options) {
    this.options = options
    this.$element = $(element);
  }

  Foobar.prototype = {

      constructor: Foobar

    , publicMethod: function () {
        return null;
      }

    }

  /*
   * Private Methods
   * =============== */
  function privateMethod() {
      var that = this;
  }

}(window.jQuery)

}.call(root));
    return amdExports;
}); }(this));
