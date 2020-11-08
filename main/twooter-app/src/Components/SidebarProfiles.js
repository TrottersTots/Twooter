import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap';
import {Avatar, Button, } from '@material-ui/core'
import {BrowserRouter as Router, Link} from "react-router-dom";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import '../styles/SidebarProfiles.css'

const SidebarProfiles = ({userData, loggedIn, setLoggedIn, history}) => {
    //console.log('PI:',userData)

    async function logOut() {
        const response = await fetch('/api/', {
            method : 'POST'
        });
        switch (response.status)
        {
            case 200:
                setLoggedIn(false);
                break;
            case 500:
                console.log('logout-failed')
                break;
            default:
                return;
        }
    }

    return(
        <OverlayTrigger 
        trigger="click"
        placement="top"
        rootClose
        overlay={
            <Popover className="profile__popover">
                <Popover.Content>
                    <div>
                        <div className="profile__text profile__text__popOver">
                            <h3>{userData.displayname} {Boolean(userData.verified) && <CheckCircleIcon className="profile__badge"/>} </h3>
                            <p>@{userData.username}</p>
                        </div>
                            <div className="profile__popOver__buttonContainer">
                                <Button className="profile__popOver__button">Add account</Button>
                            </div>
                            <div className="profile__popOver__buttonContainer">
                                <Router>
                                    <Link to='/' onClick={() => {history.push('/');}}>
                                        <Button 
                                            className="profile__popOver__button"
                                            onClick={() => logOut()}
                                            >Log Out
                                        </Button>
                                    </Link>
                                </Router>
                            </div>
                    </div>
                </Popover.Content>
            </Popover>
        }
    >
            <div className="profile__buttonContainer">
                <Button>
                    <Avatar src={process.env.PUBLIC_URL+"/avatars/"+ userData.avatar +".jpg"} className="profile__avatar"/>
                    <div>
                        <div className="profile__text profile__text__popOver">
                            <h3>{userData.displayname} {Boolean(userData.verified) && <CheckCircleIcon className="profile__badge"/>} </h3>
                            <p>@{userData.username}</p>
                        </div>
                    </div>
                </Button>
            </div>
        </OverlayTrigger>
    )
}

export default SidebarProfiles
