# 2.0.0

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
