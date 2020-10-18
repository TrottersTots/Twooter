import React, {useState} from 'react'
import "./TweetBox.css"
import { Avatar, Button } from "@material-ui/core";
//import ImageIcon from '@material-ui/icons/Image';

function TweetBox() {

    const [owner, setOwner] = useState(-1);
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('no-image-data');

    async function post_twoot()
    {
        const twoot = {owner, message, image}
        const response = await fetch('/api/post_twoot/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(twoot)
        });
        if(response.ok){
            console.log('Twoot sent to db!');
            setMessage('')
        }
    }

    async function get_most_recent()
    {
        await fetch('api/get_twoot/')
        .then(response => response.json())
        .then(data =>console.log(data['message']));
    }
    

    return (
        <div className="tweetBox">
            <form action="/api/postTweet">
                <div className="tweetBox__input">
                    <Avatar src="" />
                    <input 
                    placeholder="What's happening, User?" 
                    value = {message}
                    name="message" 
                    type="text"
                    onChange={e => setMessage(e.target.value)}>   
                    </input>

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
                onClick={post_twoot}
                >
                Twoot</Button>
                <Button 
                variant='contained'
                color='secondary'
                onClick={get_most_recent}
                >
                 (DEBUG) Get Most Recent Twoot</Button>
            </form>
        </div>
    );
}
export default TweetBox
