import React, {useState, useEffect} from "react";
import '../styles/Sidebar.css'
import {Modal} from 'react-bootstrap'

import { Button } from "@material-ui/core";


function UserModals({show_login, show_signup, setLogin, setSignup}){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat_password, setRepeatPassword] = useState('');
    const [password_match, setPasswordMatch] = useState(true);
    const [err_message, setErrMessage] = useState('');
    const [form_err, setFormErr] = useState(false);

    async function checkUsername(){
      const username_to_check = {username};
      const response = await fetch('/api/check_username/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(username_to_check)
      });
      if(response.ok ){
        return true;
      }else{
        return false;
      }

    }

    async function submitSignup() {
      //validate front-end input
      if(password_match == false || password.length < 1 || repeat_password.length < 1){//passwords do not match
        setErrMessage('password is empty or does not match!');
        setFormErr(true);
        return;
      }else if(email.length < 4 || !email.includes('@') || !email.includes('.') ){
        setFormErr(true);
        setErrMessage('invalid email address!');
        return;
      }
      if(await checkUsername() == false){
        setFormErr(true);
        setErrMessage('username taken!');
        return;
      }
      await create_user()
    }
    async function create_user(){
      setFormErr(false);//succesful form entry
      const user_info = {username, password, email};
      const response = await fetch('/api/create_user/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user_info)
      });
      if(response.ok){
        setSignup(false);
        setUsername('');
        setPassword('');
        setRepeatPassword('');
        setEmail('');
      }
    }

    

    async function submitLogin() {
      console.log('submitting login request')
    }

    useEffect( () =>{
      setErrMessage('');
      setFormErr(false);
    }, [password, repeat_password, email, username])

    function updatePassword(e, field){
      let p1 = password, p2 = repeat_password;
      if(field == 0){
        p1 = e.target.value;
        setPassword(p1);
      }else{
        p2 = e.target.value;
        setRepeatPassword(p2);
      }
      validatePasswordMatch(e, p1, p2);
    }

    function validatePasswordMatch(e, p1, p2){
      if(p1 === p2){
        setPasswordMatch(true);
      }else{
        setPasswordMatch(false);
      }
    }

      return (
        <>
        {/*Modal -> SIGN UP*/}
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
                onChange={e => updatePassword(e,0)}>
                </input>
            </div>
            <div className="tweetBox__input">
                <input
                placeholder="confirm password"
                name="message"
                type="password"
                value={repeat_password}
                onChange={e => updatePassword(e,1)}>
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
            <h1 className='pass-error'
            style={{display: (password_match && !form_err) ? 'none' : 'block'}}>
              {err_message}</h1>
            {/* Button -> submit Sign Up */}
            <Button
              className="tweetBox__tweetButton"
              style={{outline: 0}}
              onClick={submitSignup}>
              Sign Up
            </Button>
          </Modal.Footer>
        </Modal>
        {/*Modal -> LOGIN*/}
        <Modal show={show_login} onHide={() => setLogin(false)} backdrop='static' keyboard={false} >
          <Modal.Header closeButton > 
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
              style={{outline: 0}}
              onClick={submitLogin}>
              Login
              </Button>
          </Modal.Footer>
        </Modal>
      </>
      );
}
export default UserModals;
