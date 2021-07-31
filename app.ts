import * as HttpRequest from './Server/http-module'

// const url = "https://webhook.site/55e57dbe-88b3-46e9-8eed-6a9e30868a82";

const urlpost = "http://localhost:3000/post";
const urlget = "http://localhost:3000/API";


// const Queries : HttpRequest.QueryArray = [{name:"get",value:"git"},{name:"name",value:"ben"}];
const Queries : HttpRequest.QueryArray = [{name:"get",value:"git"}];

const QueryString = HttpRequest.ParseQueryString(Queries);

const GetCallback = (data:string) =>{
    const res = JSON.parse(data);
    console.log("Get  : ",res.git);
}

const PostCallback = (data:string)=>{
    const res = JSON.parse(data);
    console.log("Post : ",res.hello);
}


HttpRequest.Send.Get(urlget,QueryString,GetCallback);

HttpRequest.Send.Post(urlpost,{Hello:"Bonjour"},PostCallback)