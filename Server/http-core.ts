/** Module that contains types, interface and useful functions to properly use the module**/

import https from "https";
import http from "http";


export type GetQuery = { name: string, value: string }; //Query used in get request as : /?name=value
export type QueryArray = Array<GetQuery>; //Array of get queries

export type protocol = typeof https | typeof http //Protocol used in requests


/** Interface to pass data to function in order to send it                       *
 *  @param headerype : type of the sent data                                     *
 *  @param Query : Query used for a Get request as a string : /?name=value       *
 *  @param PostData : Data used in post request as to be JSON compatible         *
 *                                                                               **/
export interface Data {
    headertype?: "text/html" | "applcation/json",
    Query?: string,
    PostData?: {},
}

export type Options = { url: string, method: string, data: Data }; //Generical type to make request

export type requestoption = { host: string, hostname: string, port: string, path: string, method: string } //Option for http/https module

/** Function that returns a string, parses queryarray to querystring for get request**/
export const ParseQueryString = (Queries: QueryArray): string => {
    let QueryString: string = "/";
    let Search: string = "?"; //Get begins with ?
    for (let query of Queries) {
        Search += query.name + "=" + query.value;
        QueryString += Search
        Search = "&"; //Between each query & is neeed
    }
    return QueryString

}

export const GenericCallback = (data:string)=>{
    console.log(JSON.parse(data));
}


