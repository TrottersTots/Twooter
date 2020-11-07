import React, {useState, useEffect} from 'react'
import "../styles/TweetBox.css"
import { Avatar, Button } from "@material-ui/core";
//import ImageIcon from '@material-ui/icons/Image';

function TweetBox({userData, inModal, twoots, setTwoots, setMakeTwoot}) {

    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {  
        get_twoot();
    }, []);

    async function post_twoot()
    {
        const twoot = {message, image}
        const response = await fetch('/api/post_twoot/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(twoot)
        });
        if(response.ok){
            console.log('twoot-sent-successfully');
            setMessage('')
            setImage('')
            setMakeTwoot(false);
        }
    }

    async function get_twoot()
    {
        await fetch('api/get_twoot/')
        .then(response => response.json())
        .then(data => setTwoots(data));
    }

    return (
        <div className={"tweetBox " + (inModal ? '' : 'notInModal')}>
            <form action="/api/postTweet">
                <div className="tweetBox__input">
                    <Avatar src={process.env.PUBLIC_URL+"/avatars/"+ userData.avatar +".jpg"} />
                    <input 
                        placeholder={"What's happening, " + userData.displayname + "?"}
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
                        name="image"
                        value={image}
                        onChange={e => setImage(e.target.value)}>
                    </input>
                </div>
                
                
                <Button 
                className="tweetBox__tweetButton" 
                onClick={post_twoot}>
                Twoot
                </Button>
                {/*
                <Button 
                className="tweetBox__tweetButton__debug" 
                onClick={get_twoot}
                >
                (DEBUG) Get Twoots
                </Button>
                <Button 
                variant='contained'
                color='secondary'
                onClick={get_most_recent}>
                 (DEBUG) Get Most Recent Twoot
                </Button>*/}
                
            </form>
        </div>
    );
}

TweetBox.defaultProps = {
     inModal: false 
}

export default TweetBox
