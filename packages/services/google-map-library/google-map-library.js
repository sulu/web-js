// Google Map Library service to load google map script.

'use strict';

var $ = require('jquery');

var GoogleMapLibrary = (function() {
    var googleMapLibrary = {
        key: '',
        promise: null,
    };

    /**
     * @method createPromise
     * @private
     * @returns {promise}
     */
    var createPromise = function() {
        googleMapLibrary.promise = $.Deferred();
    };

    /**
     * @method createInitFunction
     * @private
     */
    var createInitFunction = function() {
        window.initGoogleMaps = function() {
            googleMapLibrary.promise.resolve();
        };
    };

    /**
     * @method getGoogleMapsScriptUrl
     * @private
     * @returns {String}
     */
    var getGoogleMapsScriptUrl = function() {
        return 'https://maps.googleapis.com/maps/api/js?key=' + googleMapLibrary.getKey() + '&callback=initGoogleMaps';
    };

    /**
     * @method addScript
     * @private
     */
    var addScript = function() {
        $('body').append('<script src="' + getGoogleMapsScriptUrl() + '" async defer></script>');
    };

    /**
     * @method setKey
     * @param {String} key
     */
    googleMapLibrary.setKey = function(key) {
        googleMapLibrary.key = key;
    };

    /**
     * @method getKey
     * @returns {String}
     */
    googleMapLibrary.getKey = function() {
        return googleMapLibrary.key;
    };

    /**
     * @method load
     * @returns {promise}
     */
    googleMapLibrary.load = function() {
        if (!googleMapLibrary.promise) {
            createPromise();
            createInitFunction();
            addScript();
        }

        return googleMapLibrary.promise;
    };

    return googleMapLibrary;
})();

module.exports = GoogleMapLibrary;
