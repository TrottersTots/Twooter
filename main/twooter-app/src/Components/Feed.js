import React, {useState} from 'react';
import '../styles/Feed.css';
import TweetBox from './TweetBox';
import Post from './Post';
import { Button } from "@material-ui/core";
import UserModal from './UserModal';

function Feed({userData, logged_in, setLoggedIn, setTwoots, twoots, setMakeTwoot}) {

    const [show_signup, setSignup] = useState(false);
    const [show_login, setLogin] = useState(false);


    return (
        <div className="feed">
            
            <div className="feed__header">
                <h2>Home</h2>
            </div>

            { !logged_in ? (
                <><div className="feed__signIn">
                    <Button 
                        variant="outlined" 
                        className="feed__signIn__button" 
                        onClick={() => setSignup(true)}>
                            Sign Up
                    </Button>

                    <Button 
                        variant="outlined" 
                        className="feed__signIn__button" 
                        onClick={() => setLogin(true)}>
                            Log In
                    </Button>

                </div>

                <UserModal 
                    show_condition = {show_signup}
                    setShow = {setSignup}
                    registering = {true}
                    logged_in = {logged_in}
                    setLoggedIn = {setLoggedIn}
                />
                <UserModal 
                    show_condition = {show_login}
                    setShow = {setLogin}
                    modalTitle="Log in to Twooter"
                    logged_in = {logged_in}
                    setLoggedIn = {setLoggedIn}
                />

                <div className="feed__signInPrompt">
                    <span>
                        <h4><strong>Don’t miss what’s happening</strong></h4>
                        <h4>People on Twooter are the first to know.</h4>
                    </span>
                </div>

                </>):
                (<>

                    
                    <TweetBox twoots={twoots} setTwoots={setTwoots} userData={userData} 
                    setMakeTwoot={setMakeTwoot}/>
                    {/* feed content if logged in: */}
                    
                    {Object.keys(twoots).sort().reverse().map(postID => 
                        
                            <Post
                                displayName={twoots[postID].displayname}
                                username={twoots[postID].username}
                                verified={twoots[postID].verified}
                                text={twoots[postID].message}
                                image={twoots[postID].image}
                                avatar={twoots[postID].avatar}
                                likes={twoots[postID].likes}
                                comments={twoots[postID].comments}
                                retwoots={twoots[postID].retwoots}
                                likedbyself={twoots[postID].likedbyself}
                                retwootedbyself={twoots[postID].retwootedbyself}
                                commentedbyself={twoots[postID].commentedbyself}
                                post_id ={postID}
                            />
                               
                    )}
                    

                    {/* SAMPLE POSTS 
                    <Post 
                        displayName="JustinStitt"
                        username="Justin_Stitt"
                        verified={true}
                        text="Always gonna be another mountain. Always gonna wanna make it move.
                                Feeling #blessed #thankful 🙏🙏😇😇⭐"
                        image="https://media.giphy.com/media/5sYj38hS0GE2dCzJsN/giphy.gif"
                        avatar="https://avatars3.githubusercontent.com/u/24460581?s=460&u=5beb1c69055ba1e6977ac011cb8110f28e5a5f2c&v=4"
                    />
                    <Post 
                        displayName="NathanInbar"
                        username="Nathan_Inbar42069"
                        verified={true}
                        text="Worlds best catapult maker. 🍤🦐🍤🦐 #pistolShrimp3k 🎇🧨🔨💵"
                        image="https://media.giphy.com/media/5hTNG4XpBRDBC/source.gif"
                        avatar="https://avatars1.githubusercontent.com/u/23346068?s=460&u=56b1fa5b8a548010185263e2a12ec3e3b77018f7&v=4"
                    />
                    <Post 
                        displayName="ChadTrotter"
                        username="cdTrots"
                        verified={true}
                        text="Fucking camper window dood. #ow #holyfuck #badday 🤔😑😟😢🥵🥴🥺🤥☠💀"
                        image="https://media.giphy.com/media/60352fWaV5s8Ti8ZnZ/source.gif"
                        avatar="https://avatars2.githubusercontent.com/u/24463357?s=60&v=4"
                    />
                    <Post 
                        displayName="OverflowOverflowOverflowOverflowOverflowOverflowOverflowOverflow"
                        username="OverflowOverflowOverflowOverflowOverflowOverflowOverflowOverflow"
                        verified={true}
                        text="Overflow Overflow Overflow Overflow Overflow Overflow Overflow Overflow Overflow Overflow Overflow Overflow Overflow Overflow Overflow Overflow Overflow -- OverflowOverflowOverflowOverflowOverflowOverflowOverflowOverflowOverflowOverflowOverflow"
                        image="https://media.giphy.com/media/OGzFu4KQuZ2/giphy.gif"
                        avatar=""
                    />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    */}
                </>)
            }


        </div>
    )
}

Feed.defaultProps = {
    logged_in : false
}

export default Feed
