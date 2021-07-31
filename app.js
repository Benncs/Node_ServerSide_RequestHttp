"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpRequest = __importStar(require("./Server/http-module"));
// const url = "https://webhook.site/55e57dbe-88b3-46e9-8eed-6a9e30868a82";
const urlpost = "http://localhost:3000/post";
const urlget = "http://localhost:3000/API";
// const Queries : HttpRequest.QueryArray = [{name:"get",value:"git"},{name:"name",value:"ben"}];
const Queries = [{ name: "get", value: "git" }];
const QueryString = HttpRequest.ParseQueryString(Queries);
const GetCallback = (data) => {
    const res = JSON.parse(data);
    console.log("Get  : ", res.git);
};
const PostCallback = (data) => {
    const res = JSON.parse(data);
    console.log("Post : ", res.hello);
};
HttpRequest.Send.Get(urlget, QueryString, GetCallback);
HttpRequest.Send.Post(urlpost, { Hello: "Bonjour" }, PostCallback);
//# sourceMappingURL=app.js.map