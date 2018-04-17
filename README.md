## Bes translation

*Translation helper for bes*

___

### Getting Started

To use this package, run the command:

```
npm install bes-translation --save
```

### Usage

```js
trans(string, optional-object);
```

To use:

Copy the example in `.env.example` then create a `.env` file and update your configuration for translation.

Example:

`resources/lang/en/content.js`

The `LOCALE_PATH` is **resources/lang**<br />
The `LOCALE` is **en**

In your **content.js**

```js
module.exports = {
    welcome: {
        text: Hello! :name
    }
};
```

Using `trans`

**ES5**

```js
var trans = require('bes-translation').trans;

trans('filename.property', { key: 'value' });
```

**ES6**

```js
import { trans } from 'bes-translation'

trans('filename.property', { key: 'value' })
```

Example:

```js
trans('content.welcome.text', { name: 'Leuther King Mojica' });
```

___

### Voila!
