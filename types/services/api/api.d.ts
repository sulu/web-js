/**
 * @param {String} uri
 * @param {Object} data
 *
 * @returns {promise}
 */
export declare function get(uri: string, data: any): Promise<any>;
/**
 * @param {String} uri
 * @param {Object} data
 *
 * @returns {promise}
 */
export declare function post(uri: string, data: any): Promise<any>;
/**
 * @param {String} uri
 * @param {Object} data
 *
 * @returns {promise}
 */
export declare function put(uri: string, data: any): Promise<any>;
declare function _delete(uri: any, data: any): Promise<any>;
export { _delete as delete };
//# sourceMappingURL=api.d.ts.map