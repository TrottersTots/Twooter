import React, {useState} from 'react'
import "./TweetBox.css"
import { Avatar, Button } from "@material-ui/core";
//import ImageIcon from '@material-ui/icons/Image';

function TweetBox() {

    function test_request() {
        fetch("/api/hello").then(response =>
          response.json().then(data => {
            console.log(data['test']);
          })
        );
      }
    

    return (
        <div className="tweetBox">
            <form action="/api/postTweet">
                <div className="tweetBox__input">
                    <Avatar src="" />
                    <input placeholder="What's happening, User?" name="message" type="text"></input>

                </div>
                <div className="tweetBox__imageDiv">
                    <input 
                        className= "tweetBox__imageInput"
                        placeholder="Image URL" 
                        type="text"
                        name="imgURL">
                    </input>
                </div>

                <Button 
                className="tweetBox__tweetButton" 
                onClick={test_request}
                >
                
                Twoot</Button>
            </form>
        </div>
    );
}
export default TweetBox
