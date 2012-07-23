# Latenz.js

Latenz.js is a boilerplate for building web applications that
use a high latency network and are driven by a RESTful backend.

For the benefits of writing web applications these ways see my
article on how to improve javascript cryptography
(http://hellais.wordpress.com/2011/12/27/how-to-improve-javascript-cryptography/).

Modern browsers are used to dealing with a fast web and implement very tight
timeouts to improve performance.

This work is mainly based off of
https://github.com/volojs/create-responsive-template.

## Libraries

* Require.js: http://requirejs.org/
* JQuery: http://code.jquery.com/
* Bootstrap: http://twitter.github.com/bootstrap/
* Backbone: http://backbonejs.org/
* Underscore: http://underscorejs.org/
* Almond.js: https://github.com/jrburke/almond

## What it provides

It allows the developer of a web application to compact the source code of
it to one single file and provides utility functions for implementing retry
mechanisms on XHR requests.

It also provides scaffolding for transforming the web application into a
browser plugin that works on Google Chrome and Firefox.

## How to build

To build this application into a single .js, .css and .html all you need to do
is:

    volo build

## Example use cases

### GLClient

GLClient is the client side component of globaleaks. The backend component is
exposed as a Tor Hidden Service. This means that there could be a high latency
in the communication between the client and the backend.

In this case the client application can be shipped from a fast source and it
will have all the logic to deal with a high latency network.

Since all the web app is compressed into one request there is no need to enable
HTTP Pipelining to improve latency.



### Resources


http://requirejs.org/docs/jquery.html

https://github.com/twitter/bootstrap/issues/2579

https://github.com/twitter/bootstrap/pull/534

http://stackoverflow.com/questions/9916073/how-to-load-bootstrapped-models-in-backbone-js-while-using-amd-require-js

http://backbonetutorials.com/organizing-backbone-using-modules/

https://github.com/jcreamer898/RequireJS-Backbone-Starter

https://github.com/volojs/volo/wiki/Design-Goals



