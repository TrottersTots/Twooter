import React, {useState} from 'react'
import '../styles/Post.css';
import {Avatar, Button} from '@material-ui/core';
//icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PublishIcon from '@material-ui/icons/Publish';
//

function Post({displayName, username, verified, timestamp, text, image, avatar, likes, comments, retweets, post_id}) {
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
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentMessage, setCommentMessage] = useState('');

    async function like_twoot()
    {
        const id = {post_id}
        const response = await fetch('/api/like_twoot/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        });
        if(response.ok){
            console.log('twoot-liked-successfully');
        }
    }
    async function retwoot_post()
    {
        const id = {post_id}
        const response = await fetch('/api/retwoot/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        });
        if(response.ok){
            console.log('retwoot-successful');
        }
    }
    async function comment_post()
    {
        const comment = {post_id, 'message': commentMessage}
        const response = await fetch('/api/comment_twoot/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });
        if(response.ok){
            console.log('comment-successful');
            setCommentMessage('');
        }
    }

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
                    {/* Comment button */}
                    <Button onClick={() => setShowCommentBox(!showCommentBox)}>
                    <ChatBubbleOutlineIcon id="chatIcon" fontSize="small" /></Button>

                    {/* Retwoot button */}
                    <Button onClick={retwoot_post}>
                    <RepeatIcon id="repeatIcon" fontSize="small" /></Button>
                    {/* Like Button */}
                    <Button onClick={like_twoot}>
                    <FavoriteBorderIcon id="favoriteIcon" fontSize="small" /></Button>

                    <PublishIcon id="publishIcon" fontSize="small" />

                    


                </div>
                {showCommentBox ? (
                    <div className='comment_box'>
                        <div className="tweetBox__input">
                    <Avatar src="" />
                    <input 
                        placeholder="What's on your mind? Be kind!" 
                        value = {commentMessage}
                        name="comment_message" 
                        type="text"
                        onChange={e => setCommentMessage(e.target.value)}>   
                    </input>
                    <Button 
                    className="tweetBox__tweetButton" 
                    onClick={comment_post}
                    >Reply</Button>

                        </div>
                    </div>
                    ): ('')}
            </div>
        </div>
    );
}

export default Post
