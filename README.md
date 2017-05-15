# Web JS

The web-js in connection with [web component twig extension](https://github.com/massiveart/web-twig)
gives you simple and efficient way to handle your javascript components over twig.

## Installation

**Yarn**

```bash
yarn add massive-web
```

**NPM**

```bash
npm install massive-web
```

## Create your first component

Create a component and export it as a module:

```js
// src/components/test.js

module.exports = {
    /**
     * @method initialize
     */
    initialize: function () {
        this.text = this.options.text;
        this.$el.click(this.sayHello.bind(this));
    },

    /**
     * @method sayHello
     */
    sayHello: function () {
        alert(this.text);
    }
};
```

## Create your first service

Sometimes you want just run js code which is not binded to a dom element for this services where created.
Typically usages are running tracking code functions.

```js
// src/services/log.js

module.exports = {
   log: function(text) {
       console.log(text);
   }    
};
```

## Initialize web.js and registering your components and services

```js
// src/main.js
var web = window.web = require('massive.web');

// services
web.registerService('logger', require('./services/log.js'));

// components
web.registerComponent('test', require('./component/test.js'));
```

## Embedding in template

For efficient handling its recommended to use it with a template engine like twig.

### Twig

For twig embedding see the [web component twig extension](https://github.com/massiveart/web-twig).

### HTML

You can also use without a template engine and by calling the startComponents and callServices.

```html
<button id="test-1">
    Say Hello
</button>

<button id="test-2">
    Say Bye
</button>

<script src="src/main.js"></script>
<script>
    web.startComponents([
        {name: 'test', id: 'test-1', { text: 'Hello' }}, 
        {name: 'test', id: 'test-2', { text: 'Bye' }}
    ]);
    
    web.callService([{name: 'logger', func: 'log', args: ['Hello']}])
</script>
```
