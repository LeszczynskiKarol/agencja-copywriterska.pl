function handler(event) {
    var req = event.request;
    var map = {
        '/pisanie-artykulow':  '/uslugi/pisanie-artykulow/',
        '/pisanie-artykulow/': '/uslugi/pisanie-artykulow/',
        '/copywriting':        '/uslugi/copywriting/',
        '/copywriting/':       '/uslugi/copywriting/',
        '/opisy-produktow':    '/uslugi/opisy-produktow/',
        '/opisy-produktow/':   '/uslugi/opisy-produktow/',
        '/cennik':             '/kontakt/',
        '/cennik/':            '/kontakt/',
        '/o-nas':              '/',
        '/o-nas/':             '/',
        '/artykuly-i-tresci-blogowe-prowadzenie-blogow-firmowych':  '/uslugi/pisanie-artykulow/',
        '/artykuly-i-tresci-blogowe-prowadzenie-blogow-firmowych/': '/uslugi/pisanie-artykulow/'
    };
    if (map[req.uri]) {
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: { 'location': { value: map[req.uri] } }
        };
    }
    return req;
}
