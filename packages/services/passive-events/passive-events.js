// Detect if the current browser does support passive event listeners
// Inspired by: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
var supportsPassive = false;

try {
    // eslint-disable-next-line vars-on-top
    var opts = Object.defineProperty({}, 'passive', {
        get: function() {
            supportsPassive = true;
        },
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
} catch (e) {
    // Catch all errors in the code above
}

module.exports = supportsPassive;
