import React, {useState} from 'react'
import "../styles/TweetBox.css"
import { Avatar, Button } from "@material-ui/core";
//import ImageIcon from '@material-ui/icons/Image';

function TweetBox({inModal, twoots, setTwoots}) {

    const [owner, setOwner] = useState(-1);
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');

    

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
        }
    }

    async function get_twoot()
    {

        //const response = await fetch('api/get_twoot/')
        
        //setTwoots(response['twoots']);

        //console.log(twoots);
        //console.log('THIS IS THE TWOOTS',twoots)
        //const response = await fetch('api/get_twoot/');
        //const json = await response.json();
        await fetch('api/get_twoot/')
        .then(response => response.json())
        .then(data => setTwoots({'twoots': data['twoots']}));
  
        console.log(twoots);
        
        //setTwoots(JSON.stringify(json));
        //console.log('twoots: ');
        //console.log(twoots);

    }
    

    return (
        <div className={"tweetBox " + (inModal ? '' : 'notInModal')}>
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
                        name="image"
                        value={image}
                        onChange={e => setImage(e.target.value)}>
                    </input>
                </div>

                <Button 
                className="tweetBox__tweetButton" 
                onClick={get_twoot}>
                Twoot
                </Button>

                {/*<Button 
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
