import $ from 'jquery';

export default class BaseComponent {
    /**
     * @param {String} name
     * @param {String} instanceId
     * @param {Object} options
     */
    constructor(name, instanceId, options) {
        /**
         * @type {Object}
         */
        this._options = options;

        /**
         * @type {String}
         */
        this._instanceId = instanceId;

        /**
         * @type {jQuery.Element}
         */
        this.$el = $('#' + instanceId);
    }

    /**
     * Dummy destroy method.
     */
    destroy() {}

    /**
     * Dummy postPlaceAt method.
     * This method will be called after on dom-ready.
     */
    postPlaceAt() {}

    /**
     * @return {Object}
     */
    get options() {
        return this._options;
    }
    /**
     * @return {String}
     */
    get instanceId() {
        return this._instanceId;
    }
}