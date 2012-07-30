(function (root) { var amdExports; define(['jquery', 'hogan', 'crossroads', 'latenza'], function () { (function () {

!function ($, hogan, crossroads, latenza) {

  "use strict";


 /* Class Definition
  * ====================== */

  var Page = {

    content:  function (element, options) {
        this.options = options
        this.$element = $(element);
        // this.data = "content";
        // console.log(this.data);
    },

    menu: function (element, options) {
        this.options = options
        this.$element = $(element);
        // this.data = "menu";
        // console.log(this.data);
    },

    site: function (options) {
        this.options = options;
    }

  };

  Page.site.prototype = {
      contructor: Page.site,

      parse: function (content) {
        var i;
        if (content.title)
            this.title =  content.title
      },

      render: function () {
        var i, data;
        if (this.title)
            document.title = this.title;
      },

  },

  Page.content.prototype = {

    constructor: Page.content,

    parse: function (content) {
        var i,
            data = [];

        for (i in content) {
            if (typeof(content[i]) == 'object') {
               data.append(this.readSpecialContent(content[i]));
            } else {
               data.append(marked(content[i]));
            }
        }
        this.data = data;
    },

    render: function () {
        var baseTemplate = '<div class="contentElement">{{element}}</div>',
            cTemplate = hogan.compile(baseTemplate),
            element,
            renderedElement,
            ouput = "";

        for (element in this.data) {
            output += cTemplate.render({element: this.data[element]});
        }
        this.$element.html(output);
        return output;
      }

    };

  Page.menu.prototype = {

    constructor: Page.menu,

    parse: function (content) {
        this.data = content;
    },

    render: function () {
        var baseTemplate = '<li><a href="{{link}}">{{text}}</a></li>\n',
            cTemplate = hogan.compile(baseTemplate),
            element,
            renderedElement,
            ouput = "";

        for (element in this.data) {
            output += cTemplate.render({link: this.data[element], text: element});
        }
        this.$element.html(output);
        return output;
      }

    }


  /*
   * Private Methods
   * =============== */
  function renderWithTemplate(data, template) {
        var baseTemplate = '<div class="contentElement">{{element}}</div>',
            cTemplate = hogan.compile(baseTemplate),
            element,
            renderedElement,
            ouput = "";

        for (element in this.data) {
            output += cTemplate.render({element: this.data[element]});
        }
        return output;
      }
  }

}(window.jQuery)

}.call(root));
    return amdExports;
}); }(this));
