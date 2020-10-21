import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap';
import {Avatar, Button, } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import '../styles/UserProfile.css'

const ProfileInfo = ({inPopover, displayName, userName, verified}) => {
    return(
        <div>
            <div className={"profile__text " + (inPopover ? 'profile__text__popOver' : '')}>
                <h3>{displayName} {verified && <CheckCircleIcon className="profile__badge"/>} </h3>
                <p>@{userName}</p>
            </div>
            {inPopover ? (<>
                <div className="profile__popOver__buttonContainer">
                    <Button className="profile__popOver__button">Add account</Button>
                </div>
                <div className="profile__popOver__buttonContainer">
                    <Button className="profile__popOver__button">Log Out</Button>
                </div>
            </>):('')}
        </div>
    )
    ProfileInfo.defaultProps = {
        inPopover : false,
        verified : false
    }
}

function UserProfile({displayName, userName, verified}) {
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
                                    displayName={displayName}
                                    userName={userName}
                                    verified={true}
                                    />
                            </div>
                        </Popover.Content>
                    </Popover>
                }
            >
                <Button>
                    <Avatar src="" className="profile__avatar"/>
                    <ProfileInfo 
                        displayName={displayName}
                        userName={userName}
                        verified={true}
                    />
                </Button>
            </OverlayTrigger>
        </div>
    )
}

export default UserProfile
