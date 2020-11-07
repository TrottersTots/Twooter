import React, {useState} from 'react'
import '../styles/Post.css';
import {Avatar} from '@material-ui/core';
//icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PublishIcon from '@material-ui/icons/Publish';
//

function Post({displayName, username, verified, timestamp, text, image, 
    avatar, likes, comments, retwoots, likedbyself, retwootedbyself, post_id, commentedbyself}) {
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
    likedbyself = !!likedbyself //'not not' here converts a 0 to false and a 1 to true
    retwootedbyself = !!retwootedbyself
    //uh oh spaghettios!
    if(likes == 0){likes=null}
    if(comments == 0){comments=null}
    if(retwoots == 0){retwoots=null}

    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentMessage, setCommentMessage] = useState('');

    //front-end display only, not to be used in REST workflow 
    const [displayLikes, setDisplayLikes] = useState(likes);
    const [displayRetwoots, setDisplayRetwoots] = useState(retwoots);
    const [likedStyle, setLikedStyle] = useState(likedbyself);
    const [retwootStyle, setRetwootStyle] = useState(retwootedbyself);
    const [displayCommentCount, setDisplayCommentCount] = useState(comments);
    const [commentIconStyle, setCommentIconStyle] = useState(commentedbyself);
    //end non-REST states

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
            //update display
            if(likedStyle)//if we do like already then we want to unlike
            {
                if(likedbyself)
                    setDisplayLikes(likes - 1);//remove our like
                else
                    setDisplayLikes(likes);
                setLikedStyle(false);//toggle
            }  
            else//we are liking it for the first time
            {
                if(likedbyself)
                    setDisplayLikes(likes);
                else
                    setDisplayLikes(likes + 1);//add our like
                setLikedStyle(true);//toggle
            }
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
            //update display
            //update display
            if(retwootStyle)//if we do like already then we want to unlike
            {
                if(retwootedbyself)
                    setDisplayRetwoots(retwoots - 1);//remove our like
                else
                setDisplayRetwoots(retwoots);
                setRetwootStyle(false);//toggle
            }  
            else//we are liking it for the first time
            {
                if(retwootedbyself)
                setDisplayRetwoots(retwoots);
                else
                setDisplayRetwoots(retwoots + 1);//add our like
                setRetwootStyle(true);//toggle
            }

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
            setDisplayCommentCount(comments + 1);
            setCommentIconStyle(true);
        }
    }

    return (
        <div className="post">
            <div className="post__avatar">
                <Avatar src={process.env.PUBLIC_URL+"/avatars/"+ avatar +".jpg"} />
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__headerText">
                        <h3>
                            <span className="post__headerText__displayName">{displayName}</span>
                            <span className="post__headerSpecial">
                                {Boolean(verified) && <CheckCircleIcon className="post__badge" />}
                            </span>
                            <span className="post__headerText__username">@{username}</span>
                        </h3>
                    </div>
                    <div className="post__headerDescription">
                        <p>{text}</p>
                    </div>
                </div>
                <img src={image} alt=""/>
                
                <div className="post__footer">
                    {/* Comment button */}
                    <div className="post__footer__iconDiv">
                        <button onClick={() => setShowCommentBox(!showCommentBox)}>
                        <ChatBubbleOutlineIcon id="chatIcon" fontSize="small"
                        style={{color: commentIconStyle ? 'var(--blue)' : 'grey'}}/></button>
                        <span>{displayCommentCount}</span>
                    </div>
                    
                    {/* Retwoot button */}
                    <div className="post__footer_iconDiv">
                        <button onClick={retwoot_post}>
                        <RepeatIcon id="repeatIcon" fontSize="small" 
                        style={{color: retwootStyle ? 'var(--green)' : 'grey'}}/></button>
                        <span>{displayRetwoots}</span>
                    </div>
                    {/* Like Button */}
                    <div className="post__footer_iconDiv">
                        <button onClick={like_twoot}>
                        <FavoriteBorderIcon id="favoriteIcon" fontSize="small" 
                        style={{color: likedStyle ? 'var(--red)' : 'grey'}} /></button>
                        <span>
                            {displayLikes}
                        </span>
                        
                    </div>
                    {/* Share Button */}
                    <div className="post__footer_iconDiv">
                        <button>
                        <PublishIcon id="publishIcon" fontSize="small" /></button>
                    </div>

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
                    <button 
                    className="tweetBox__tweetButton" 
                    onClick={comment_post}
                    >Reply</button>

                        </div>
                    </div>
                    ): ('')}
            </div>
        </div>
    );
}

export default Post
