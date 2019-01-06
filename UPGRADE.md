# 2.0.0

## jQuery removed from web component

Web component initialize method will not longer get a jQuery Element
instead it will get a basic javascript HTMLElement. This allows
to use web-js without jQuery and detect which components really need
jQuery as there dependency.

**Before**

```js
initialize($el) {

}

// or

initialize($el, options) {

}
```

**After**

```js
initialize(el) {
    var $el = el;
}

// or

initialize($el, options) {
    var $el = el;
}
```

## Api service dataType changed

The api service will now use json dataType instead of html.
So if HTML should be returned, you should use `$.ajax` instead.

## Multiple call service arguments

Its now possible to provide multiple arguments to a service call for this 
exist service calls need to be changed.

**Before**

```js
 web.callServices([{name: 'service', func: 'method', args: 'argument'}])
```

or when using web component twig extension:

```twig
{{ call_service('service', 'method', 'argument') }}
```

**After**

```js
 web.callServices([{name: 'service', func: 'method', args: ['argument']}])
```

or when using twig:

```twig
{{ call_service('service', 'method', ['argument']) }}
```

## Folder renamed

The `src` folder has been renamed to `js` so you need to ugprade your imports.

**Before**

```js
var Expand = require('massive-web/src/components/expand');
import ContainerLink from  'massive-web/src/components/expand';
```

**After**

```js
var Expand = require('massive-web/js/components/expand');
import ContainerLink from  'massive-web/js/components/expand';
```
