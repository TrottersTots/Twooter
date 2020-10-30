import React, {useState} from "react";
import '../styles/Sidebar.css'
import SidebarOption from './SidebarOption';
import TwootModal from './TwootModal';
import UserProfile from "./UserProfile";
import { Button } from "@material-ui/core";
import {BrowserRouter as Router, Link} from "react-router-dom";
// Icons
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

// - - -


function Sidebar({userData, logged_in, setLoggedIn, history}) {

    console.log('SB:',userData)
    const [show_makeTwoot, setMakeTwoot] = useState(false);

    const [toFollow, setToFollow] = useState('');

    //DEBUG 
    async function follow_user()
    {
        const username = {'username': toFollow}
        const response = await fetch('/api/follow_user/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(username)
        });
        if(response.ok){
            console.log('user-followed-successfully');
            setToFollow('');
        }
    }
    // - - - -
    return (
      <div className="sidebar">
            <TwitterIcon className="sidebar__twitterIcon" />
            <Router>
              <Link to='/' onClick={() => {
                  history.push('/');
              }}>
                <SidebarOption active Icon={HomeIcon} text="Home" />
              </Link>
              <Link to='/explore' onClick={() => {
                  history.push('/explore');
              }}>
                <SidebarOption Icon={SearchIcon} text="Explore" />
              </Link>

              {logged_in ? (
                  <>
                  
                  <Link to='/messages'onClick={() => {
                  history.push('/messages');
              }}>
                    <SidebarOption Icon={MailOutlineIcon} text="Messages" />
                  </Link>
                  <Link to='/more'onClick={() => {
                  history.push('/more');
              }}>
                    <SidebarOption Icon={MoreHorizIcon} text="More" />
                  </Link>
                  <Link to='/profile' onClick={() => {
                  history.push('/profile');
              }}>
                <SidebarOption Icon={SearchIcon} text="Profile" />
              </Link>

                  <Button 
                    variant="outlined" 
                    className="sidebar__tweet" 
                    fullWidth
                    onClick= {() => setMakeTwoot(true)}>
                      Twoot
                  </Button>
                  <TwootModal 
                    show_makeTwoot={show_makeTwoot}
                    setMakeTwoot={setMakeTwoot}
                  />
                  <div className="tweetBox__imageDiv" style={{padding: 50}}>
                    <input 
                        className= "tweetBox__imageInput"
                        placeholder="Follow: " 
                        type="text"
                        name="follow"
                        value={toFollow}
                        onChange={e => setToFollow(e.target.value)}>
                    </input>
                    <Button 
                    variant="outlined" 
                    className="tweetBox__tweetButton__debug"  
                    fullWidth
                    onClick= {follow_user}>
                      (Debug) Follow User
                  </Button>
                </div>
                  <UserProfile 
                    userData={userData}
                    logged_in={logged_in}
                    setLoggedIn={setLoggedIn}
                    />

                </>)
              :('')}
            </Router>
            
      </div>
    );
}
Sidebar.defaultProps = {
  logged_in : false
}
export default Sidebar;
