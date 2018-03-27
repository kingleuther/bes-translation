/*
*translator service
*Please take note of the following 
*file structure to be able to use correctly
*/

var env = require('node-env-file');
var root = require('path');
var appPath = root.dirname(require.main.filename);
env(appPath + '/.env');

function Translator() {
    if (!(this instanceof Translator)) return new Translator();
}

Translator.prototype = {
    get,
}

function get(translation, key) {
    return path(translation, key);
}

function path(translation, key) {
    if (typeof translation !=  'string') {
        return 'First parameter should be string';
    }
    var locale = process.env.APP_LANGUAGE || 'en';
    //convert obj to array 
    var args = translation.split('.');
    //get the set of objects based on the passed obj
    var object = require(appPath + '/storage/lang/' + locale + '/' + args[0]);
    //get the actual path of the requested translation
    var paths = args.slice(1);

    for (var i = 0; i < paths.length; i++) {
        if (object[paths[i]] === undefined) return 'No available Translation';
        object = object[paths[i]];
    }

    return conversion(object, key);
}

function conversion(object, key) {
    if (key) {
        if (typeof key != 'object') {
            return 'Your search param should be an object';
        }
        var numberOfKeys = Object.keys(key).length;
        for (var ctr = 0; ctr < numberOfKeys; ctr++) {
            var searchKey = Object.keys(key)[ctr].toString()
            if (ctr == 0) {
                var newcurr = object.replace(':' + searchKey, key[searchKey]);
            }
            newcurr = newcurr.replace(':' + searchKey, key[searchKey]);
        }
        return newcurr;
    }
    return object  
}

module.exports = Translator;
