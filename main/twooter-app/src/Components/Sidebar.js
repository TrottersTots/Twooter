import React, {useState} from "react";
import '../styles/Sidebar.css'
import SidebarOption from './SidebarOption';
import TwootModal from './TwootModal';

// Icons
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// - - -
import { Button } from "@material-ui/core";


const Sidebar = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail]       = useState('');

    const [show_makeTwoot, setMakeTwoot] = useState(false);

    async function submit_signup()//POST
    {
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
          setUsername('');
          setPassword('');
          setEmail('');
        }
    }


    return (
      <div className="sidebar">
            <TwitterIcon className="sidebar__twitterIcon" />

            <SidebarOption active Icon={HomeIcon} text="Home" />
            <SidebarOption Icon={SearchIcon} text="Explore" />
            <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
            <SidebarOption Icon={MailOutlineIcon} text="Messages" />
            <SidebarOption Icon={MoreHorizIcon} text="More" />

          {/* Button -> Tweet */}
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
      </div>
    );
}

export default Sidebar;
