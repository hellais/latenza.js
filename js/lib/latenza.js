define(function() {
    'use strict';

    var latenza;

    latenza = {

        latency: 'inf',

        registerEvents: function() {
            var evt = document.createEvent('Event');
            evt.initEvent('latency', true, true);
        },

        on: function(state, func) {
            return window.addEventListener(state, func, false);
        },

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
                        return function(e) {
                            measurements[idx].rtt = (+new Date - measurements[idx].startTime);
                            measure(ltz);
                        };
                    };
                    img.onload = imageLoaded(idx);

                    /*
                    img.onload = function(e) {
                            console.log("foobar");
                            console.log(e);
                            console.log("Doing idx: "+idx);
                            measurements[idx].rtt = (+new Date - measurements[idx].startTime);
                            console.log("completed measurement!");
                            console.log(measurements);
                            measure();
                    }
                    */

                    var testImg = testUrl + '?' + Math.random();
                    measurements[idx] = {};
                    measurements[idx].startTime = +new Date;
                    measurements[idx].url = testImg;
                    img.src = testImg;
                }
            };
            measure(this);
        },

        xhr: function() {
            return null;
        },

        isAnonymous: function() {
            return false;
        },

    };
    return latenza;

});
