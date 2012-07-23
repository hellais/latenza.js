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

        xhr: function() {
            return null;
        },

        isAnonymous: function() {
            return false;
        },

    };
    return latenza;

});
