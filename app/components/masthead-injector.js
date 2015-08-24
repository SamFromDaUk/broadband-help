import request from 'request-promise';
import Promise from 'promise';

require('dotenv').load();

const assets = [{
    section: 'head',
    path: '/resources/mobile-ready/12/css'
}, {
    section: 'body',
    path: '/masthead/my-sky'
}, {
    section: 'footer',
    path: '/footer'
}, {
    section: 'footer',
    path: '/resources/mobile-ready/12/js'
}];

var response = new Promise(function (resolve, reject) {
    assets.forEach(function(item, i) {
        var options = {
            uri : process.env.MASTHEAD + item.path,
            method : 'GET'
        };

        assets[i] = request(options)
            .then(function(data) {
                assets[i] = item;
                assets[i].data = data;
            })
            .catch(function() {
                console.log(arguments);
            });
    });

    Promise.all(assets)
        .then(function() {
            var helper = function(section) {
                return assets.filter(function(item) {
                    return item.section === section ? item : false;
                }).map(function(item) {
                    return item.data
                }).join('')
            };

            resolve({
                head: helper('head'),
                body: helper('body'),
                footer: helper('footer')
            })
        });
});

export default response;
