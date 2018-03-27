To Use
{translationfolder} may be equal to 
jp for japanese
en for english 
and others

Create a folder 
Storage -> lang -> jp/en/{translationfolder} -> translation js file

example:
Storage/lang/jp/content.js

content.js

module.exports = {
    welcome:{
        text: Hello! :name
    }
};

var trans = require('bes-translation');
trans().get(string, optional-object)s;
trans().get('filename.property',{key:'whatever you want to enter'});

example:
trans().get('content.welcome.text',{name: 'Leuther King Mojica'});

---------------
you also have to use .env file
place the APP_LANGUAGE={translationfolder}

voila!