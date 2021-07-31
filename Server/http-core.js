"use strict";
/** Module that contains types, interface and useful functions to properly use the module**/
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericCallback = exports.ParseQueryString = void 0;
/** Function that returns a string, parses queryarray to querystring for get request**/
const ParseQueryString = (Queries) => {
    let QueryString = "/";
    let Search = "?"; //Get begins with ?
    for (let query of Queries) {
        Search += query.name + "=" + query.value;
        QueryString += Search;
        Search = "&"; //Between each query & is neeed
    }
    return QueryString;
};
exports.ParseQueryString = ParseQueryString;
const GenericCallback = (data) => {
    console.log(JSON.parse(data));
};
exports.GenericCallback = GenericCallback;
//# sourceMappingURL=http-core.js.map