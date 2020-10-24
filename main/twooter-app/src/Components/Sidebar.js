import React, {useState} from "react";
import '../styles/Sidebar.css'
import SidebarOption from './SidebarOption';
import TwootModal from './TwootModal';
import UserProfile from "./UserProfile";
import { Button } from "@material-ui/core";
import {Route} from "react-router-dom";
// Icons
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// - - -


function Sidebar({logged_in}) {

    const [show_makeTwoot, setMakeTwoot] = useState(false);

    return (
      <div className="sidebar">
            <TwitterIcon className="sidebar__twitterIcon" />

            <SidebarOption active Icon={HomeIcon} text="Home" />
            <SidebarOption Icon={SearchIcon} text="Explore" />
            {logged_in ? (
                <>
                <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
                <SidebarOption Icon={MailOutlineIcon} text="Messages" />
                <SidebarOption Icon={MoreHorizIcon} text="More" />

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
                
                <UserProfile 
                  displayName='Justin Stitt'
                  userName='Justin_Stitt'
                  verified={true}/>

              </>)
            :('')}
      </div>
    );
}
Sidebar.defaultProps = {
  logged_in : false
}
export default Sidebar;
