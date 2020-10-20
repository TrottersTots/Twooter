import React from 'react'
import '../styles/Post.css';
import {Avatar} from '@material-ui/core';
//icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PublishIcon from '@material-ui/icons/Publish';
//

function Post({displayName, username, verified, timestamp, text, image, avatar, likes, comments, retweets}) {
    /*
    displayName,
    username,
    verified,
    timestamp, -- use moment.js ?
    text,
    image,
    avatar,

    likes,
    comments,
    retweets
    */
    return (
        <div className="post">
            <div className="post__avatar">
                <Avatar src={avatar} />
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__headerText">
                        <h3>
                            <span>{displayName}</span>
                            <span className="post__headerSpecial">
                                {verified && <CheckCircleIcon className="post__badge" />}
                            </span>
                            <span>@{username}</span>
                        </h3>
                    </div>
                    <div className="post__headerDescription">
                        <p>{text}</p>
                    </div>
                </div>
                <img src={image} alt=""/>
                
                <div className="post__footer">
                    <ChatBubbleOutlineIcon id="chatIcon" fontSize="small" />
                    <RepeatIcon id="repeatIcon" fontSize="small" />
                    <FavoriteBorderIcon id="favoriteIcon" fontSize="small" />
                    <PublishIcon id="publishIcon" fontSize="small" />
                </div>
            </div>
        </div>
    );
}

export default Post
