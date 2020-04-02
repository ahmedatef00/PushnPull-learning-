import React, { useState, useEffect } from 'react';

import axios from 'axios';
const id = Math.ceil(Math.random() * 100000);
function LongPooling(props) {
  const [messages, setMessages] = useState([]);
  const [usernames, setUsername] = useState([]);

  const [input, setInput] = useState('');
  const [inputname, setInputname] = useState('');

  const subscribe = () => axios.post('http://localhost:5005/subscribe',
    { id }).then(res => {


      // setMessages(oldMessages => oldMessages.concat(newMessages))


      // setMessages(oldMessages => oldMessages.concat(res.data))

      setMessages(oldmessages => oldmessages.concat(messages))
      setMessages(oldMessages => oldMessages.concat(res.data))
      setUsername(oldUser => oldUser.concat(usernames));
      setUsername(oldUser => oldUser.concat(res.data));

      //subscripe again
      subscribe();
    });

  useEffect(() => {

    subscribe();

    //Short pooling 
    // setInterval(

    // () => 
    // axios.get('http://localhost:5005/messages').then(res => {
    //   //data is the body of the response 
    //   setMessages(res.data);
    //   setUsername(res.data);

    // })
    //only one when the component is opend   //end of effect   // , 100 * 1000)
  }, []) //only one when the component is opend   //end of effect 

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

    // axios.post('http://localhost:5005/messages',{content:input,username:inputname})//in your body post the content from value

    axios.post('http://localhost:5005/messageSubscribers', { content: input, username: inputname })//in your body post the content from value

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

export default LongPooling;