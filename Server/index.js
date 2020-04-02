const express = require('express');
const app = express();
const port = 5005;
app.use(express.json());
const cors = require('cors');
//any request Access control Allowed origin *('domain')
app.use(cors())
const messages=[];
// const user=[];
app.post('/messages',(req,res)=>{
    const{body}=req;//is an object
    const message={body};
    console.log(message);
    
    messages.push(message);
    // messages.push(username);
    // user.push(username);
    res.status(204).end();//request success no value in response 
console.log(body,'newmessage');
// console.log(username);


})
app.get('/messages', (req, res) => 
{    
    //get all json  messages
res.json(messages);

}


);
const subscribers={};
app.post('/subscribe',(req,res)=>{

    //id of the user 
    const {id}=req.body; 
    //hang the response thier
    console.log('new subscriber id ',id);
    
    subscribers[id]=res;






})

app.post('/messageSubscribers',(req,res)=>{
    const {body}=req;
//return all content id's of the users //id of subscriber
//publish messages to all users 
console.log(subscribers);
    Object.keys(subscribers).forEach((subId)=>
    {
        subscribers[subId].json(body);
     delete subscribers[subId];

    //  console.log("subid: ", subId);
    //  console.log("subscribers [sub id ] : ", subscribers[subId]);
    //  console.log("subscribers [sub id ].json : ", subscribers[subId].json(body));
    //  Cannot set headers after they are sent to the client
    // you can't send twice to the same subscriber so we will delete response after sent it to the client id ;

    
        
    } );
    //id of the user 
res.status(204).end();//close response
   




    

});

app.listen(port, () => console.info(
    ` app listening at http://localhost:${port}`));
