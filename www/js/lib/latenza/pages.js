define(['jquery', 'hogan', 'crossroads', 'latenza', 'marked'], function ($, hogan, crossroads, latenza, marked) {

 'use strict';
 var pages;
 function readSpecialContent() {
      return "<b>THIS WILL BE SPECIAL CONTENT</b>"
 };


 /* Class Definition
  * ====================== */
 pages = {
    data: {},
    content: function (content, element, options) {
        var i,
            parsed_content = [],
            element,
            renderedElement,
            output = "";

        this.options = options;
        this.$element = $(element);

        this.data['content'] = content;
        if (Object.prototype.toString.call(content) == '[object Array]') {
            // Consider this freeform array style web site
        }
        else if (Object.prototype.toString.call(content) == '[object Object]') {
            // Consider this more advanced website
        }
        for (i in content) {
            if (typeof(content[i]) == 'object') {
               parsed_content.push(readSpecialContent(content[i]));
            } else {
               parsed_content.push(marked(content[i]));
            }
        }

        for (element in parsed_content) {
            output += '<div class="element">'+parsed_content[element]+'</div>';
            //output += cTemplate.render({element: parsed_content[element]});
        }
        console.log(output);
        this.$element.html(output);
        return output;

    },

    menu: function (content, element, options) {
        this.options = options;
        this.$element = $(element);
        this.data['menu'] = content;

        var baseTemplate = '<li><a href="{{link}}">{{text}}</a></li>',
            cTemplate = hogan.compile(baseTemplate),
            element,
            renderedElement,
            output = "";

        for (element in this.data['menu']) {
            output += cTemplate.render({link: this.data['menu'][element], text: element});
        }
        this.$element.html(output);
        return output;

    },

    site: function (content) {
        var i, data;
        if (content.title)
            this.title =  content.title

        if (this.title)
            document.title = this.title;
    }

  };
    return pages;
});

