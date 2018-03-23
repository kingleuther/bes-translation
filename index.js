/*
*translator service
*Please take note of the following 
*file structure to be able to use correctly
*/

var env = require('node-env-file');
var root = require('path');
var appPath = root.dirname(require.main.filename);
env(appPath + '/.env');

function translator(obj, key) {
    var locale = process.env.APP_LANGUAGE || 'en';
    //convert obj to array 
    var args = obj.split('.');
    //get the set of objects based on the passed obj
    var object = require(appPath + '/storage/lang/' + locale + '/' + args[0]);
    //get the actual path of the requested translation
    var path = args.slice(1);

    for (var i = 0; i < path.length; i++) {
        if (object[path[i]] === undefined) return 'No available Translation';
        object = object[path[i]];
    }
    //check if key/there is a value to be replaced exist
    if (key) {
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

module.exports = translator;
