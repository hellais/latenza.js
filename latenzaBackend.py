import cyclone.web
import sys
import json
from twisted.internet import reactor
from twisted.python import log

f = open('markdown1.md')
markdown1 = ''.join(f.readlines())
f.close()
f = open('markdown2.md')
markdown2 = ''.join(f.readlines())
f.close()


class LatenzaHandler(cyclone.web.RequestHandler):
    def get(self):
        homeDict = {'title': 'Lorem ipsum',
                    'menu': {'foobar': '/latenza/foobar',
                              'barfoo': '/latenza/barfoo'},
                    'submenu': {'foo': '/latenza/foo'},
                    'home': [markdown1, {'type': 'fileupload',
                    'value': 'foobar'},
                             markdown2]
                   }
        print "FOOBAR!"
        self.write(json.dumps(homeDict))

def main():
    log.startLogging(sys.stdout)
    application = cyclone.web.Application([
        (r"/latenza/", LatenzaHandler),
        (r"/static/(.*)", cyclone.web.StaticFileHandler, {'path': 'www/'}),
    ])

    reactor.listenTCP(8888, application, interface="127.0.0.1")
    reactor.run()


if __name__ == "__main__":
    main()

