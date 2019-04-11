[![CircleCi](https://circleci.com/gh/sulu/web-js.png?style=shield)](https://circleci.com/gh/sulu/web-js)
[![npm](https://img.shields.io/npm/v/@sulu/web.svg)](https://www.npmjs.com/package/@sulu/web)
[![Size](https://img.shields.io/github/size/sulu/web-js/js/core.js.svg)](https://github.com/sulu/web-js/blob/master/js/core.js)
[![Install Size](https://packagephobia.now.sh/badge?p=@sulu/web)](https://packagephobia.now.sh/result?p=@sulu/web)

# Web JS

The web-js in connection with [web component twig extension](https://github.com/sulu/web-twig)
gives you simple and efficient way to handle your javascript components over twig.

## Installation

**NPM**

```bash
npm install @sulu/web
```

**Yarn**

```bash
yarn add @sulu/web
```

## Usage

### Create your first component

A component can be created using different js patterns:

 - [Revealing pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript)
 - [Prototype pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#prototypepatternjavascript)
 - [ECMAScript 2015 class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
 - and more which works with multiple instances you simple need to create a initialize method

**Using Revealing pattern**

```js
// js/components/test-revealing-pattern.js
var $ = require('jquery');

module.exports = (function() {
    var test = {};

    test.initialize = function(el, options) {
        test.text = options.text;
        $(el).click(test.say.bind(this));
    };

    test.say = function() {
        alert(test.text);
    }

    return {
        initialize: test.initialize,
        say: test.say
    };
});
```

**Using Prototype pattern**

```js
// js/components/test-prototype-pattern.js
var $ = require('jquery');

var test = function() {};

test.prototype.initialize = function(el, options) {
    this.text = options.text;
    $(el).click(this.say.bind(this));
};

test.prototype.say = function() {
    alert(this.test);
};

module.exports = test;
```

**Using ECMAScript 2015 class**

```js
// js/components/test-class.js
import $ from 'jquery';

export default class Test {
    initialize(el, options) {
        this.text = options.text;
        $(el).click(this.say);
    }

    say() {
        alert(this.text);
    }
}
```

### Create your first service

Sometimes you want just run js code which is not binded to a dom element for this services where created.
Typically usages are running tracking code functions.

```js
// js/services/log.js

module.exports = {
   log: function(text) {
       console.log(text);
   }    
};
```

### Initialize web.js and registering your components and services

```js
// js/main.js
var web = window.web = require('@sulu/web');

// services
web.registerService('logger', require('./services/log.js'));

// components
web.registerComponent('test', require('./components/test-revealing-pattern.js'));
web.registerComponent('other', require('./components/test-prototype-pattern.js'));
web.registerComponent('more', require('./components/test-class'), { defaultOption: 'defaultValue' });
```

When using ES6:

```
import web from '@sulu/web';
import Test from './components/test'
import Other from './components/more'
import Log from './services/log';


// services
web.registerService('logger', Log);

// components
web.registerComponent('test', Test);
web.registerComponent('more', Test, { defaultOption: 'defaultValue' });
```

### Embedding in template

For efficient handling its recommended to use it with a template engine like twig.

#### Twig

For twig embedding see the [web component twig extension](https://github.com/sulu/web-twig).

#### HTML

You can also use without a template engine and by calling the startComponents and callServices.

```html
<button id="test-1">
    Say Hello
</button>

<button id="test-2">
    Say Bye
</button>

<script src="js/main.js"></script>
<script>
    web.startComponents([
        {name: 'test', id: 'test-1', { text: 'Hello' }}, 
        {name: 'test', id: 'test-2', { text: 'Bye' }}
    ]);
    
    web.callServices([
        {name: 'logger', func: 'log', args: ['Hello']}
    ]);
</script>
```

## Version Update & Publish to NPM (docs for maintainers)

### 1. Create release on github

Update package.json version on master branch:

```bash
git checkout master
git pull origin master
npm version [ major | minor | patch ] --no-git-tag-version
# update version in changelog
git add .
git commit -m "Release <version>"
git push origin master
```

Generate changelog:

```bash
github_changelog_generator --future-release <version>
```

Copy the text of the last release into github release description and create new release.

### 2. Publish release

```
git fetch --tags
git checkout <version>
# Test which files get packed by npm
npm pack --dry-run
# Publish package
npm publish
```
