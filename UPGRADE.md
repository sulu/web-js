# 2.0.0

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
