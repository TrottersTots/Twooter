import React, {useState, Component} from "react";
import '../styles/Sidebar.css'
import SidebarOption from './SidebarOption';
import UserModals from './UserModals';

// Icons
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// - - -
import { Button } from "@material-ui/core";

function Sidebar()
{
    const [show_login, setLogin] = useState(false);
    const [show_signup, setSignup] = useState(false);
    return (
      <>
        <div className="sidebar">
          <TwitterIcon className="sidebar__twitterIcon" />
            <div className='modal-buttons'>
            {/* Button -> Sign Up */}
            <Button
              className="tweetBox__tweetButton"
              style={{outline: 0}}
              onClick={() => setSignup(true)}>
              Sign Up</Button>
              {/* Button -> Login */} 
              <Button
                className="tweetBox__tweetButton"
                style={{outline: 0}}
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
        <UserModals 
          show_login={show_login}
          setLogin={setLogin}
          show_signup={show_signup}
          setSignup={setSignup}/>
        </>
      );
}
//<Button variant="outlined" className="sidebar__tweet" fullWidth>Twoot</Button>
export default Sidebar;
