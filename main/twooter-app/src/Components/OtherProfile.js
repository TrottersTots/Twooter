import React, {useState, useEffect} from 'react'
import { Avatar } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CakeIcon from '@material-ui/icons/Cake';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Post from './Post';
import '../styles/Profile.css';

function ProfileNavBar({selfTwoots, selfMediaTwoots, likedTwoots, displayName}) {
    const [key, setKey] = useState('twoots');
    
    return (
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        transition={false}
      >
        <Tab class="show active" eventKey="twoots" title="Twoots">
            {Object.keys(selfTwoots).length === 0 ? 
                (
                    <h4 className="profile__emptyFeed">{displayName} hasn't twooted anything yet</h4>
                ) : 
                (

                    Object.keys(selfTwoots).sort().reverse().map(postID => 
                        
                        <Post
                            displayName={selfTwoots[postID].displayname}
                            username={selfTwoots[postID].username}
                            verified={selfTwoots[postID].verified}
                            text={selfTwoots[postID].message}
                            image={selfTwoots[postID].image}
                            avatar={selfTwoots[postID].avatar}
                            likes={selfTwoots[postID].likes}
                            comments={selfTwoots[postID].comments}
                            retwoots={selfTwoots[postID].retwoots}
                            likedbyself = {selfTwoots[postID].likedbyself}
                            retwootedbyself = {selfTwoots[postID].retwootedbyself}
                            post_id ={postID}
                        />)                    
                )
            
            }

        </Tab>
        <Tab eventKey="media" title="Media">
            {Object.keys(selfMediaTwoots).length === 0 ? 
                (
                    <h4 className="profile__emptyFeed">{displayName} hasn't twooted any photos or videos yet</h4>  
                ) : 
                (
                    Object.keys(selfMediaTwoots).sort().reverse().map(postID => 
                        
                        <Post
                            displayName={selfMediaTwoots[postID].displayname}
                            username={selfMediaTwoots[postID].username}
                            verified={selfMediaTwoots[postID].verified}
                            text={selfMediaTwoots[postID].message}
                            image={selfMediaTwoots[postID].image}
                            likes={selfMediaTwoots[postID].likes}
                            comments={selfMediaTwoots[postID].comments}
                            retwoots={selfMediaTwoots[postID].retwoots}
                            likedbyself = {selfMediaTwoots[postID].likedbyself}
                            retwootedbyself = {selfMediaTwoots[postID].retwootedbyself}
                            avatar={selfMediaTwoots[postID].avatar}
                            post_id ={postID}
                        />     
            )                    
                )
            }          
        </Tab>
        <Tab eventKey="likes" title="Likes">

            {Object.keys(likedTwoots).length === 0 ? 
                (
                    <h4 className="profile__emptyFeed">{displayName} hasn't liked any twoots yet</h4>
                ) : 
                (
                    Object.keys(likedTwoots).sort().reverse().map(postID => 
                        
                        <Post
                            displayName={likedTwoots[postID].displayname}
                            username={likedTwoots[postID].username}
                            verified={likedTwoots[postID].verified}
                            text={likedTwoots[postID].message}
                            image={likedTwoots[postID].image}
                            avatar={likedTwoots[postID].avatar}
                            likes={likedTwoots[postID].likes}
                            comments={likedTwoots[postID].comments}
                            retwoots={likedTwoots[postID].retwoots}
                            likedbyself={likedTwoots[postID].likedbyself}
                            retwootedbyself = {likedTwoots[postID].retwootedbyself}
                            post_id ={postID}
                        />
                           
                    )
                )
            }

        </Tab>
      </Tabs>
    );
  }


function OtherProfile({}) {

    const [userData, setUserData] = useState({});
    const [selfTwoots, setSelfTwoots] = useState({});
    const [selfMediaTwoots, setSelfMediaTwoots] = useState({});
    const [likedTwoots, setLikedTwoots] = useState({});
    const [toFollow, setToFollow] = useState();
    let q = '';

    async function get_data()
    {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        q = (urlParams.get('user'));
        const requestView = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(q)
        };
        await fetch('/api/get_userdata/', requestView)
            .then(response => response.json())
            .then(data => setUserData(data))
            .then(setToFollow(Boolean(userData.self_following)));
    }

    async function get_twoot(route, setFunc) //self, self-media, liked
    {
        if (route == null) {return;}

        const requestTwoots = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(q)
        };
        fetch(route, requestTwoots)
            .then(response => response.json())
            .then(data => setFunc(data));
    }

    async function follow_user()
    {
        const username = {'username': userData.username}
        const response = await fetch('/api/follow_user/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(username)
        });
        switch(response.status)
        {
            case 200://follow success
                setToFollow(true);
                break;
            case 201: //unfollow success
                setToFollow(false);
                break;
            default:
                break;
        }
        console.log('follow status: ', toFollow);
    }

    function get_twoots(){
        get_twoot('/api/get_selftwoot/', setSelfTwoots);
        get_twoot('/api/get_selftwoot_media/', setSelfMediaTwoots);
        get_twoot('/api/get_likedtwoot/', setLikedTwoots);
    }

    useEffect(() => {
        get_data();
        get_twoots();
    }, []);

    useEffect(() => {  //does this do anything lol
    }, [userData, toFollow]);

    return (
        <div className='profile' onLoad={() => get_data()}>
            <div className="profile__header">
                <h2>Profile</h2>
            </div>

            <div className="profile__body">
                <div className="profile__info">

                <Avatar src={process.env.PUBLIC_URL+"/avatars/"+ userData.avatar +".jpg"} className="profile__info__avatar"/>
                    <div className="profile__info__details">

                        <h2>{userData.displayname}<span>{Boolean(userData.verified) && <CheckCircleIcon className="profile__info__badge"/>}</span></h2>
                        <p className="profile__info__details__handle">@{userData.username}</p>

                        <p>{userData.bio}</p>
                        <div className="profile__info__details__follow">
                            <p><span>{userData.following}</span> Following</p>
                            <p><span>{userData.followers}</span> Followers</p>
                        </div>
                        
                        <span className="profile__edit">
                                <span hidden={(userData.dob==null) ? true: false }><CakeIcon/>Born {userData.dob}</span>
                                <button 
                                    className= {toFollow ? "btn_following" : "btn_follow"} // to follow, or not to follow.
                                    onClick= {() => follow_user()}>
                                    {toFollow ? "Following" : "Follow"}
                                </button>

                        </span>
                    </div>
                </div>
                <div className="profile__content">
                    <ProfileNavBar selfTwoots={selfTwoots} selfMediaTwoots={selfMediaTwoots} likedTwoots={likedTwoots} displayName={userData.displayname}/>
                </div>
            </div>


        </div>
    )
}

export default OtherProfile
