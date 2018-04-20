/**
* Translator Service
* Please take note of the following
* File structure to be able to use correctly
*/

var fs = require('fs');
var rootPath = require('path');
var nodeEnv = require('node-env-file');
var appPath = rootPath.dirname(require.main.filename);

// Load .env in the root directory of this project
global.env = nodeEnv(appPath + '/.env');

// Get config from your locale or default config in bes-translation
var locale = fs.existsSync(appPath + '/config/locale.js') ? require(appPath + '/config/locale').default : {};
var opts = require('./config/locale');

if (locale.default) opts.default = locale.default;
if (locale.path) opts.path = locale.path;

function Translator() {
    if (!(this instanceof Translator)) return new Translator();
}

Translator.prototype = {
    get,
    trans
}

// TODO: To be deleted in the future
function get(translation, key) {
    return path(translation, key);
}

function trans(translation, key) {
    return path(translation, key);
}

function path(translation, key) {
    if (typeof translation !=  'string') {
        return 'First parameter should be string';
    }

    // BEFORE: var locale = process.env.APP_LANGUAGE || 'en';
    // AFTER:
    var defaultLocale = opts.default;

    // convert obj to array
    var args = translation.split('.');

    // get the set of objects based on the passed obj
    var object = require(appPath + opts.path + '/' + defaultLocale + '/' + args[0]);

    // get the actual path of the requested translation
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

module.exports = Translator();
