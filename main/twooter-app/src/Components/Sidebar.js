import React, {Component} from "react";
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


class Sidebar extends Component{

    constructor(props){
      super(props)
      this.state = {
        show_signup: false,
        show_login: false,
        username: '',
        password: '',
        email: '',
      }
    }

    onOpenSignup = () => {
      console.log('opened signup')
      this.setState({show_signup: true});
    }
    onOpenLogin = () => {
      this.setState({show_login: true});
    }
    onCloseSignup = () => {
      console.log('closed signup')
      this.setState({show_signup: false});
    }
    onCloseLogin = () => {
      this.setState({show_login: false});
    }

    submitSignup = async () =>{
      //const user_info = {username, password, email};
      const {username, password, email} = this.state;
      const response = await fetch('/api/create_user/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username,password,email})
      });
      if(response.ok){
        console.log('user-created-successfuly');
        this.setState({show_signup: false})
        this.setState({username: ''});
        this.setState({password: ''});
        this.setState({email: ''});
      }
    }

    submitLogin = async () =>{
      console.log('submitting login request')
    }

    render()
    {
      const {show_login, show_signup, username, password, email} = this.state;
      return (
        <>
        
        <div className="sidebar">
              <TwitterIcon className="sidebar__twitterIcon" />
              {/* Button -> Sign Up */}
              <Button
                  className="tweetBox__tweetButton"
                  onClick={this.onOpenSignup}  >
                  Sign Up</Button>
              {/* Button -> Login */}
              <Button
                  className="tweetBox__tweetButton"
                  onClick={this.onOpenLogin}>
                  Login</Button>
  
              <SidebarOption active Icon={HomeIcon} text="Home" />
              <SidebarOption Icon={SearchIcon} text="Explore" />
              <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
              <SidebarOption Icon={MailOutlineIcon} text="Messages" />
              <SidebarOption Icon={MoreHorizIcon} text="More" />
        </div>
        
        <Modal show={show_signup} onHide={this.onCloseSignup} backdrop='static' keyboard={false} >
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
                      onChange={e => this.setState({username: e.target.value})}
                      >
                      </input>
          </div>
          <div className="tweetBox__input">
                      <input
                      placeholder="password"
                      name="message"
                      type="password"
                      value={password}
                      onChange={e => this.setState({password: e.target.value})}
                      >
                      </input>
          </div>
          <div className="tweetBox__input">
                      <input
                      placeholder="email"
                      name="message"
                      type="text"
                      value={email}
                      onChange={e => this.setState({email: e.target.value})}
                      >
                      </input>
          </div>
          </Modal.Body>
          <Modal.Footer>
            {/* Button -> submit Sign Up */}
            <Button
                  className="tweetBox__tweetButton"
                  onClick={this.submitSignup}>
                  Sign Up</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={show_login} onHide={this.onCloseLogin} backdrop='static' keyboard={false} >
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
                      onChange={e => this.setState({username: e.target.value})}
                      >
                      </input>
          </div>
          <div className="tweetBox__input">
                      <input
                      placeholder="password"
                      name="message"
                      type="password"
                      value={password}
                      onChange={e => this.setState({password: e.target.value})}
                      >
                      </input>
          </div>
          </Modal.Body>
          <Modal.Footer>
            {/* Button -> submit Sign Up */}
            <Button
                  className="tweetBox__tweetButton"
                  onClick={this.submitLogin}>
                  Login</Button>
          </Modal.Footer>
        </Modal>
        </>
  
      );

    }

    
}
//<Button variant="outlined" className="sidebar__tweet" fullWidth>Twoot</Button>
export default Sidebar;
