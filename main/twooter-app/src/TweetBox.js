import React from 'react'
import "./TweetBox.css"
import { Avatar, Button } from "@material-ui/core";

function TweetBox() {
    return (
        <div className="tweetBox">
            <form action="/api/postTweet">
                <div className="tweetBox__input">
                    <Avatar src="https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg" />
                    <input placeholder="What's Happening" name="message" type="text"></input>

                </div>
                <input 
                    className= "tweetBox__imageInput"
                    placeholder="[temp] Enter Img URL" 
                    type="text"
                    name="imgURL">
                </input>

                <Button className="tweetBox__tweetButton" type="submit">Tweet</Button>
            </form>
        </div>
    );
}

export default TweetBox
