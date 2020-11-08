import React from 'react'
import {Avatar} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import '../styles/ProfilePreview.css';

function ProfilePreview({}) {
    return (
        <div className="profilePreview">
            <div className="profilePreview__header">
                <span><PersonIcon/></span>
                <p>Ajit Pai follows</p>
            </div>
            <div className="profilePreview__content">
                <div className="profilePreview__avatar">
                    <Avatar src={process.env.PUBLIC_URL+"/avatars/"+ "REPLACE WiTH AVATAR #" +".jpg"} />
                </div> 
                <div className="profilePreview__names">
                    <div className="profilePreview__names__content">
                        <h3>Justin Stitt</h3> {/* replace with displayName */}
                        <p>@Justin_Stitt</p> {/* replace with username */}
                    </div>
                        
                </div>
                <div className="profilePreview__bio">
                    <p>The mitochondria is the powerhouse of the cell lol</p> {/* replace with bio */}
                </div>
            </div>
        </div>
    )
}

export default ProfilePreview
