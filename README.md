To Use
Create a folder 
Storage -> lang -> jp/en -> translation js file

example:
Storage/lang/jp/content.js

content.js

module.exports = {
    welcome:{
        text: Hello! :name
    }
};

var trans = require('bes-translation');
trans(string, optional-object)s;
trans('filename.property',{key:'whatever you want to enter'});

example:
trans('content.welcome.text',{name: 'Leuther King Mojica'});

voila!