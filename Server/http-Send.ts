import https from "https";
import http from "http";

import {Options, protocol, Data, requestoption, GenericCallback} from "./http-core";

    export class Send {

        /** Only support Post and Get requests **/
        private static CheckQuery(query: Options, callback: (results: string) => void) {
            if (!Send.isUrl(query.url)) {
                throw "Invalid URL";
            }

            const QueryUrl = new URL(query.url); //Parse url
            const Protocole: typeof http | typeof https = (QueryUrl.protocol == 'http:') ? http : https; //Choose the rigth protocol


            if (query.method == "POST" || query.method == "GET") {
                //Network option taken from url
                let option : requestoption= {
                    host: QueryUrl.host,
                    hostname: QueryUrl.hostname,
                    port: QueryUrl.port,
                    path: QueryUrl.pathname,
                    method: query.method,
                };
                //Choose the right function according to the method choosen
                (query.method == "POST") ? this.SendPost(Protocole, option, query.data, callback) : this.SendGet(Protocole, option, query.data, callback);
            } else {
                throw "Invalid method";
            }

        }
        /** Return true if the url gave as a string is valid**/
        private static isUrl(string): boolean {
            try {
                return Boolean(new URL(string));
            } catch (e) {
                return false;
            }
        }


        /** Generic function to send requests to server **/
        private static MakeRequest(Protocol: protocol, Options:requestoption, callback: (results: string) => void, DataTosend: string = "") {
            const req = Protocol.request(Options, (res) => {

                let data:string = ''; //Data which will be received by the server
                try {
                    res.on('data', (chunk) => {
                        data += chunk; //Get data from server
                    });
                } catch (error) {
                    throw "Cannot get data";
                }

                try {
                    res.on('end', () => {
                        callback(data) //Do something with the data received
                    })
                } catch (error) {
                    throw "Cannot end response"
                }


            });

            req.on("error", (err) => {
                console.log("Error: ", err.message);
            });

            //If data to send is not "" means that it's a post request indeed with a get request there is no datatosend

            if (DataTosend != "") {
                try {
                    req.write(DataTosend); //Send data to server
                } catch (error) {
                    throw error + "Cannot send Data";
                }
            }

            req.end()
        }

        /** Send a post request **/
        private static SendPost(Protocol: protocol, Option:requestoption, Query: Data, callback: (results: string) => void) {
            try {
                const DataToSend: string = JSON.stringify(Query.PostData); //only string can my sent
                //Header options have to be added to network options
                Option["header"] = {
                    'Content-Type': Query.headertype,
                    'Content-Length': DataToSend.length
                }
                //Send request
                Send.MakeRequest(Protocol, Option, callback, DataToSend);

            } catch (error) {
                throw "Data cannot be interpreted as json" + error;
            }

        }

        /** Send a get request **/

        private static SendGet(Protocol: protocol, Option:requestoption, Query: Data, callback: (results: string) => void) {
            /*An Url looks like /host/path/query, host is already in network option, to make it easier we merge
            Path string and query string into an unique string*/
            Option.path += Query.Query;
            Send.MakeRequest(Protocol, Option, callback);
        }

        public static Get(url: string, Querystring: string, callback = GenericCallback) {
            const ToSend: Data = {Query: Querystring}; //The only thing necessary in get reques is a query string
            const Option = {url: url, method: "GET", data: ToSend}; //Prepare query
            Send.CheckQuery(Option, callback);//Send specify request to a generic request function
        }

        public static Post(url: string, Data: {}, callback = GenericCallback) {

            //Data to send with post, Data has to be compatible with JSON
            const ToSend: Data = {
                headertype: "applcation/json",
                PostData: Data,
            }
            const Option = {url: url, method: "POST", data: ToSend}; //Prepare query
            Send.CheckQuery(Option, callback); //Send specify request to a generic request function
        }


    }

