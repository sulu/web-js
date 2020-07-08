// Api service to communicate with an API.

'use strict';

var $ = require('jquery');

var Api = (function() {
    var api = {};

    /**
     * @method ajax
     * @param {String} method
     * @param {String} uri
     * @param {Object} data
     * @private
     * @returns {promise}
     */
    var ajax = function(method, uri, data) {
        return $.ajax({
            dataType: 'json',
            url: uri,
            method: method,
            data: data,
        });
    };

    // -------- HTTP VERBS ----------
    api.get = function(uri, data) {
        return ajax('get', uri, data);
    };

    api.post = function(uri, data) {
        return ajax('post', uri, data);
    };

    api.put = function(uri, data) {
        return ajax('put', uri, data);
    };

    api.delete = function(uri, data) {
        return ajax('delete', uri, data);
    };

    return api;
})();

module.exports = Api;
