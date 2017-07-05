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

A component can be created using different js patterns:

 - [Revealing pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript)
 - [Prototype pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#prototypepatternjavascript)
 - [ECMAScript 2015 class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

**Using Revealing pattern**

```js
// src/components/test-revealing-pattern.js

module.exports = (function() {
    var test = {};

    test.initialize = function($el, options) {
        test.text = options.text;
        $el.click(test.say.bind(this));
    };

    test.say = function() {
        alert(test.text);
    }

    return {
        initialize: test.initialize,
        initialize: test.say
    };
});
```

**Using Prototype pattern**

```js
// src/components/test-prototype-pattern.js

var test = function() {};

test.prototype.initialize = function($el, options) {
    this.text = options.text;
    $el.click(this.say.bind(this));
};

test.prototype.say = function() {
    alert(this.test);
};

module.exports = test;
```

**Using ECMAScript 2015 class**

```js
// src/components/test-class.js

class Test {
    constructor() {
        this.text = '';
    }

    initialize($el, options) {
        this.text = options.text;
        $el.click(this.say);
    }

    say() {
        alert(this.text);
    }
}

module.exports Test;
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
web.registerComponent('test', require('./component/test-revealing-pattern.js'));
web.registerComponent('test', require('./component/test-revealing-pattern.js'));
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
