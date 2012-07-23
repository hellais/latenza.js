var latenza = {};

define('latenza', ['jquery', 'hogan'], function($, hogan) {
    'use strict';

    latenza = {

        test: function(idx) {
              if (idx == 1) {
                  this.ajax('http://google.com/');
              }
              else if (idx == 2) {
                  for (var x = 0;x<100;x++) {
                      this.ajax('http://enable-cors.org/');
                  }
              } else if (idx == 3) {
                  for (var x = 0;x<50;x++) {
                      this.ajax('http://google.com/');
                      this.ajax('http://enable-cors.org/');
                  }
              }
        },
        latency: 'inf',

        registerEvents: function() {
            var evt = document.createEvent('Event');
            evt.initEvent('latency', true, true);
        },

        on: function(state, func) {
            return window.addEventListener(state, func, false);
        },

        //
        // This function returns the latency of the network connection by
        // loading small images from remote hosts.
        //
        // `callback` a function to be called once the measurement has
        //            concluded
        // `measurement_count` int, how many measurements should be done for
        //                     every host.
        // `testUrls` Array(), contains the addresses of the images to be used
        //                     for testing latency.
        getLatency: function(callback, measurements_count, testUrls) {
            console.log("foobar");
            if(typeof(measurements_count) == 'undefined') measurements_count = 2;
            if(typeof(testUrls) == 'undefined') testUrls = ['https://www.google.it/favicon.ico',
                                                            'http://twitter.com/favicon.ico',
                                                            'http://facebook.com/favicon.ico'];
            if(typeof(callback) == 'undefined') callback = function(){};
            var toBeTestedUrls = [].concat(testUrls);

            var measurements = [];
            var measurements_total = measurements_count * testUrls.length;

            var measure = function(ltz) {
                var testUrl = toBeTestedUrls.pop();
                if (measurements.length > measurements_total) {
                    /* We are done compute latency. */
                    var averageLatency = 0;
                    for (var i in measurements) {
                        averageLatency += measurements[i].rtt;
                    }
                    averageLatency = Math.round(averageLatency/i);
                    ltz.latency = averageLatency;
                    callback();
                    return averageLatency;
                } else if (typeof(testUrl) == 'undefined') {
                    console.log("refreshing!");
                    toBeTestedUrls = [].concat(testUrls);
                    measure(ltz);
                } else {
                    var idx = measurements.length;
                    var ts, rtt, img = new Image;
                    var imageLoaded = function(idx) {
                        // Closures rock! Don't they? :)
                        return function(e) {
                            measurements[idx].rtt = (+new Date - measurements[idx].startTime);
                            measure(ltz);
                        };
                    };
                    img.onload = imageLoaded(idx);

                    // Add a random nonce to bypass browser caching.
                    var testImg = testUrl + '?' + Math.random();
                    measurements[idx] = {};
                    measurements[idx].startTime = +new Date;
                    measurements[idx].url = testImg;
                    img.src = testImg;
                }
            };
            measure(this);
        },

        generateRandomId: function(length, charset) {
            if (typeof(charset) == 'undefined') charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

            var randomArray = new Uint32Array(Math.ceil(length/4)),
                i;
            if (window.crypto && window.crypto.getRandomValues) {
                window.crypto.getRandomValues(randomArray);
            } else {
                for (i in randomArray) {
                    randomArray[i] = Math.random() * Math.pow(2, 32);
                }
            }
            var randomId = "";
            for (i=0;i < randomArray.length;i++) {
                for (var j = 0;j<4;j++) {
                   if (randomId.length == length)
                       return randomId;
                   var randomByte = (randomArray[i] >> 8*j) & 0xFF;
                   randomId += charset[randomByte % charset.length];
                }
            }
            return randomId;
        },

        _addRequestToBox: function(url, id) {
            var template = '<dt class="{{id}}">{{url}}</dt>';
                template += '<dd class="{{id}}">';
                template += '<div class="progress progress-striped"><div class="bar" style="width: 0%"></div></div>';
                template += '</dd>';

            var requestTemplate = hogan.compile(template);

            var latenzaBox = $('.latenzaStatusBox');
            var currentRequests = latenzaBox.find('.currentRequests');

            var request = requestTemplate.render({url: url, id: id});
            currentRequests.append(request);

            $('#'+id).find('.bar').animate({'width': '100%'}, this.latency);

            if (typeof(window.currentRequests) == 'undefined') {
                window.currentRequests = {};
            }

            window.currentRequests[id] = {};
            window.currentRequests[id].startTime = +new Date();
            window.currentRequests[id].url = url;
        },


        _updateRequestBox: function() {
            console.log('updating box..');
            var bars = $('.currentRequests').find('.bar');
            bars.each(function(i, bar) {
                var id = bar.parentElement.parentElement.classList[0];
                if (!window.currentRequests[id]) {
                    latenza._requestCompleted(id);
                }
            });
        },

        _requestCompleted: function(id, state) {
            console.log("completed this shit " + state);
            var items = $("."+id);
            var bar = items.find('.bar').animate({'width': '100%'}, 500, function() {
                bar.parent().removeClass('progress-striped');
                if (state == 'fail') {
                    bar.parent().addClass('progress-danger');
                } else {
                    bar.parent().addClass('progress-success');
                }
                items.fadeOut('slow', function() {
                    items.remove();
                });
            });
        },

        ajax: function(url, options) {
            // Hey, jQuery has defereds too! <3
            var defer = $.Deferred();

            // Bits of code taken from jQuery.
            if ( typeof url === "object" ) {
                options = url;
                url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );;
            }
            options = options || {};
            var id = this.generateRandomId(20);
            this._addRequestToBox(url, id);
            defer.progress(this._updateRequestBox);
            defer.done(this._requestCompleted);
            defer.fail(this._requestCompleted);

            var request = $.ajax(url, options);
            request.done(function() {
                            console.log("success");
                            defer.resolve(id, 'success');
                        });
            request.fail(function() {
                            console.log("failure");
                            defer.reject(id, 'fail');
                        });
            return request;
        },

        isAnonymous: function() {
            return false;
        },

    };
    return latenza;

});
