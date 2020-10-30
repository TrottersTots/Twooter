import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap';
import {Avatar, Button, } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import '../styles/UserProfile.css'

const ProfileInfo = ({userData, inPopover, loggedIn, setLoggedIn}) => {

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
        <div>
            <div className={"profile__text " + (inPopover ? 'profile__text__popOver' : '')}>
                <h3>{userData.displayname} {Boolean(userData.verified) && <CheckCircleIcon className="profile__badge"/>} </h3>
                <p>@{userData.username}</p>
            </div>
            {inPopover ? (<>
                <div className="profile__popOver__buttonContainer">
                    <Button className="profile__popOver__button">Add account</Button>
                </div>
                <div className="profile__popOver__buttonContainer">
                    <Button 
                        className="profile__popOver__button"
                        onClick={() => logOut()}
                        >Log Out</Button>
                </div>
            </>):('')}
        </div>
    )
    ProfileInfo.defaultProps = {
        inPopover : false,
        verified : false
    }
}

function UserProfile({userData, loggedIn, setLoggedIn}) {

    return (
        <div className="profile__container">
            <OverlayTrigger 
                trigger="click"
                placement="top"
                rootClose
                overlay={
                    <Popover className="profile__popover">
                        <Popover.Content>
                            <div>
                                <ProfileInfo 
                                    inPopover={true}
                                    loggedIn={loggedIn}
                                    setLoggedIn={setLoggedIn}
                                    />
                            </div>
                        </Popover.Content>
                    </Popover>
                }
            >
                <Button>
                    <Avatar src="" className="profile__avatar"/>
                    <ProfileInfo 
                        inPopover={false}
                        loggedIn={loggedIn}
                        setLoggedIn={setLoggedIn}
                        userData={userData}
                    />
                </Button>
            </OverlayTrigger>
        </div>
    )
}

export default UserProfile
