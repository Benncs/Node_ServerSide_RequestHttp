"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Send = void 0;
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const http_core_1 = require("./http-core");
class Send {
    /** Only support Post and Get requests **/
    static CheckQuery(query, callback) {
        if (!Send.isUrl(query.url)) {
            throw "Invalid URL";
        }
        const QueryUrl = new URL(query.url); //Parse url
        const Protocole = (QueryUrl.protocol == 'http:') ? http_1.default : https_1.default; //Choose the rigth protocol
        if (query.method == "POST" || query.method == "GET") {
            //Network option taken from url
            let option = {
                host: QueryUrl.host,
                hostname: QueryUrl.hostname,
                port: QueryUrl.port,
                path: QueryUrl.pathname,
                method: query.method,
            };
            //Choose the right function according to the method choosen
            (query.method == "POST") ? this.SendPost(Protocole, option, query.data, callback) : this.SendGet(Protocole, option, query.data, callback);
        }
        else {
            throw "Invalid method";
        }
    }
    /** Return true if the url gave as a string is valid**/
    static isUrl(string) {
        try {
            return Boolean(new URL(string));
        }
        catch (e) {
            return false;
        }
    }
    /** Generic function to send requests to server **/
    static MakeRequest(Protocol, Options, callback, DataTosend = "") {
        const req = Protocol.request(Options, (res) => {
            let data = ''; //Data which will be received by the server
            try {
                res.on('data', (chunk) => {
                    data += chunk; //Get data from server
                });
            }
            catch (error) {
                throw "Cannot get data";
            }
            try {
                res.on('end', () => {
                    callback(data); //Do something with the data received
                });
            }
            catch (error) {
                throw "Cannot end response";
            }
        });
        req.on("error", (err) => {
            console.log("Error: ", err.message);
        });
        //If data to send is not "" means that it's a post request indeed with a get request there is no datatosend
        if (DataTosend != "") {
            try {
                req.write(DataTosend); //Send data to server
            }
            catch (error) {
                throw error + "Cannot send Data";
            }
        }
        req.end();
    }
    /** Send a post request **/
    static SendPost(Protocol, Option, Query, callback) {
        try {
            const DataToSend = JSON.stringify(Query.PostData); //only string can my sent
            //Header options have to be added to network options
            Option["header"] = {
                'Content-Type': Query.headertype,
                'Content-Length': DataToSend.length
            };
            //Send request
            Send.MakeRequest(Protocol, Option, callback, DataToSend);
        }
        catch (error) {
            throw "Data cannot be interpreted as json" + error;
        }
    }
    /** Send a get request **/
    static SendGet(Protocol, Option, Query, callback) {
        /*An Url looks like /host/path/query, host is already in network option, to make it easier we merge
        Path string and query string into an unique string*/
        Option.path += Query.Query;
        Send.MakeRequest(Protocol, Option, callback);
    }
    static Get(url, Querystring, callback = http_core_1.GenericCallback) {
        const ToSend = { Query: Querystring }; //The only thing necessary in get reques is a query string
        const Option = { url: url, method: "GET", data: ToSend }; //Prepare query
        Send.CheckQuery(Option, callback); //Send specify request to a generic request function
    }
    static Post(url, Data, callback = http_core_1.GenericCallback) {
        //Data to send with post, Data has to be compatible with JSON
        const ToSend = {
            headertype: "applcation/json",
            PostData: Data,
        };
        const Option = { url: url, method: "POST", data: ToSend }; //Prepare query
        Send.CheckQuery(Option, callback); //Send specify request to a generic request function
    }
}
exports.Send = Send;
//# sourceMappingURL=http-Send.js.map