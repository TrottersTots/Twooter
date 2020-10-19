import React, {useState} from "react";
import '../styles/Sidebar.css'
import {Modal} from 'react-bootstrap'

import { Button } from "@material-ui/core";


function UserModals({show_login, show_signup, setLogin, setSignup}){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submitSignup() {
      const user_info = {username, password, email};
      const response = await fetch('/api/create_user/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user_info)
      });
      if(response.ok){
        console.log('user-created-successfuly');
        setSignup(false);
        setUsername('');
        setPassword('');
        setEmail('');
      }
    }

    async function submitLogin() {
      console.log('submitting login request')
    }

      return (
        <>
        <Modal show={show_signup} onHide={() => setSignup(false)} backdrop='static' keyboard={false} >
          <Modal.Header closeButton> 
            <h3>Sign Up</h3>
          </Modal.Header>
          <Modal.Body>
            <div className="tweetBox__input">
              <input
              placeholder="username"
              name="message"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}>
              </input>
            </div>
            <div className="tweetBox__input">
                <input
                placeholder="password"
                name="message"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}>
                </input>
            </div>
            <div className="tweetBox__input">
                  <input
                  placeholder="email"
                  name="message"
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}>
                  </input>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* Button -> submit Sign Up */}
            <Button
              className="tweetBox__tweetButton"
              onClick={submitSignup}>
              Sign Up
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={show_login} onHide={() => setLogin(false)} backdrop='static' keyboard={false} >
          <Modal.Header closeButton> 
            <h3>Login</h3>
          </Modal.Header>
        <Modal.Body>
          <div className="tweetBox__input">
            <input
            placeholder="username"
            name="message"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}>
            </input>
          </div>
          <div className="tweetBox__input">
            <input
            placeholder="password"
            name="message"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}>
            </input>
          </div>
          </Modal.Body>
          <Modal.Footer>
            {/* Button -> submit Sign Up */}
            <Button
              className="tweetBox__tweetButton"
              onClick={submitLogin}>
              Login
              </Button>
          </Modal.Footer>
        </Modal>
      </>
      );
}
export default UserModals;
