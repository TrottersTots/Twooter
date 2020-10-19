import React, {useState, Component} from "react";
import '../styles/Sidebar.css'
import SidebarOption from './SidebarOption';
import {Modal} from 'react-bootstrap'

// Icons
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// - - -
import { Button } from "@material-ui/core";


function Sidebar(){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show_login, setLogin] = useState(false);
    const [show_signup, setSignup] = useState(false);


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
        
        <div className="sidebar">
              <TwitterIcon className="sidebar__twitterIcon" />
              <div>
              {/* Button -> Sign Up */}
              <Button
                  className="tweetBox__tweetButton"
                  onClick={() => setSignup(true)}  >
                  Sign Up</Button>
              {/* Button -> Login */}
              <a className='modal-buttons'></a>
              
              <Button
                  className="tweetBox__tweetButton"
                  onClick={() => setLogin(true)}>
                  Login</Button>
              </div>
              <br></br>
              <SidebarOption active Icon={HomeIcon} text="Home" />
              <SidebarOption Icon={SearchIcon} text="Explore" />
              <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
              <SidebarOption Icon={MailOutlineIcon} text="Messages" />
              <SidebarOption Icon={MoreHorizIcon} text="More" />
        </div>
        
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
                      onChange={e => setUsername(e.target.value)}
                      >
                      </input>
          </div>
          <div className="tweetBox__input">
                      <input
                      placeholder="password"
                      name="message"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      >
                      </input>
          </div>
          <div className="tweetBox__input">
                      <input
                      placeholder="email"
                      name="message"
                      type="text"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      >
                      </input>
          </div>
          </Modal.Body>
          <Modal.Footer>
            {/* Button -> submit Sign Up */}
            <Button
                  className="tweetBox__tweetButton"
                  onClick={submitSignup}>
                  Sign Up</Button>
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
                      onChange={e => setUsername(e.target.value)}
                      >
                      </input>
          </div>
          <div className="tweetBox__input">
                      <input
                      placeholder="password"
                      name="message"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      >
                      </input>
          </div>
          </Modal.Body>
          <Modal.Footer>
            {/* Button -> submit Sign Up */}
            <Button
                  className="tweetBox__tweetButton"
                  onClick={submitLogin}>
                  Login</Button>
          </Modal.Footer>
        </Modal>
        </>
  
      );

    

    
}
//<Button variant="outlined" className="sidebar__tweet" fullWidth>Twoot</Button>
export default Sidebar;
