
# Why?
Latenza.js based websites are basically a series of JSON objects that contain
markdown.
This is because HTML has outgrown its original goals and has become to contain
much more than merely markup. For this reason with Latenza.js we plan to bring
back this separation between the content served by the server and the code
being executed on the machine.

### On web app to rule them all
For every latenza based website there is only one web application, this means
that the web app served from www.example.com (or statically loaded in the
users browser) can be used to access the content stored on foobar.com.

# Previous work
For some more reasons on why this is a good idea: http://hellais.wordpress.com/2011/12/27/how-to-improve-javascript-cryptography/.

This work is mainly based off of
https://github.com/volojs/create-responsive-template.

## Libraries

* Require.js: http://requirejs.org/
* JQuery: http://code.jquery.com/
* Bootstrap: http://twitter.github.com/bootstrap/
* Hogan: https://github.com/twitter/hogan.js
* Signals: https://github.com/millermedeiros/js-signals
* Crossroads: https://github.com/millermedeiros/crossroads.js
* Marked: https://github.com/chjj/marked

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



