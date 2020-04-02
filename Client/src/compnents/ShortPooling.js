import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShortPooling () {
    
    const [messages, setMessages] = useState([]);
    const [usernames, setUsername] = useState([]);
  
    const [input, setInput] = useState('');
    const [inputname, setInputname] = useState('');
   
    useEffect(() => {
        setInterval(
            () => axios.get('http://localhost:5005/messages').then((res) => {
                setMessages(oldmessages => oldmessages.concat(messages))
                setMessages(oldMessages => oldMessages.concat(res.data))
                setUsername(oldUser => oldUser.concat(usernames));
                setUsername(oldUser => oldUser.concat(res.data));
            
            })
            ,10*1000);
    }, []);
    const myChangeHandler = (e) => {
        const { target: { value } } = e;
        setInput(value);
    
      }
      const nameChangeHandler = (e) => {
        const { target: { value } } = e;
        setInputname(value);
    
      }
    
      const handleSubmit = (e) => {
        e.preventDefault(); //prevent refresh
    
        axios.post('http://localhost:5005/messages',{content:input,username:inputname})//in your body post the content from value
    
        // axios.post('http://localhost:5005/messageSubscribers', { content: input, username: inputname })//in your body post the content from value
    
      }


    return (
        <div>
          {
            messages.map(message => <h1 key={message.content}> msg : {message.content}</h1>)
          }
          {usernames.map((username) => <h1 key={username.username}> user : {username.username} </h1>)
          }
          {
            <form id="form" onSubmit={handleSubmit}>
              <h1>our chat</h1>
              {/* <p>Enter your name:{usernames.content} </p> */}
              <input
                type='text'
                name="content"
                id="content"
                placeholder="message"
                onChange={myChangeHandler}
                value={input}
              />
              <input
                type='text'
                name="contentname"
                id="content"
                placeholder="username"
                onChange={nameChangeHandler}
                value={inputname}
              />
              <button type="submit" >send</button>
            </form>
    
          }
    
        </div>
    
    
      )
}

export default ShortPooling;