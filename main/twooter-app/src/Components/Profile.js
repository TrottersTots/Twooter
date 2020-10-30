import { Avatar } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Post from './Post';
import '../styles/Profile.css';

function ProfileNavBar({selfTwoots, selfMediaTwoots, likedTwoots}) {
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
                    <h4 className="profile__emptyFeed">You haven't twooted anything yet</h4>
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
                            post_id ={postID}
                        />)                    
                )
            
            }

        </Tab>
        <Tab eventKey="media" title="Media">
            {Object.keys(selfMediaTwoots).length === 0 ? 
                (
                    <h4 className="profile__emptyFeed">You haven't twooted any photos or videos yet</h4>  
                ) : 
                (
                    Object.keys(selfMediaTwoots).sort().reverse().map(postID => 
                        
                        <Post
                            displayName={selfMediaTwoots[postID].displayname}
                            username={selfMediaTwoots[postID].username}
                            verified={selfMediaTwoots[postID].verified}
                            text={selfMediaTwoots[postID].message}
                            image={selfMediaTwoots[postID].image}
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
                    <h4 className="profile__emptyFeed">You haven't liked any twoots yet</h4>
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
                            post_id ={postID}
                        />
                           
                    )
                )
            }

        </Tab>
      </Tabs>
    );
  }


function Profile({userData, logged_in}) {

    const [selfTwoots, setSelfTwoots] = useState({});
    const [selfMediaTwoots, setSelfMediaTwoots] = useState({});
    const [likedTwoots, setLikedTwoots] = useState({});

    async function get_twoot(route, setFunc) //self, self-media, liked
    {
        if (route == null) {return;}

        await fetch(route)
        .then(response => response.json())
        .then(data => setFunc(data));
    }

    function get_twoots(){
        get_twoot('/api/get_selftwoot/', setSelfTwoots);
        get_twoot('/api/get_selftwoot_media/', setSelfMediaTwoots);
        get_twoot('/api/get_likedtwoot/', setLikedTwoots);
    }

    useEffect(() => {  
        get_twoots();
    }, []);

    useEffect(() => {  //does this do anything lol
    }, [logged_in]);

    return (
        <div className='profile'>
            <div className="profile__header">
                <h2>Profile</h2>
            </div>

            <div className="profile__body">
                <div className="profile__info">
                <Avatar src={userData.avatar} className="profile__info__avatar"/>
                    <div className="profile__info__details">
    <h2>{userData.displayname}<span>{Boolean(userData.verified) && <CheckCircleIcon className="profile__info__badge"/>}</span></h2>
                        <p className="profile__info__details__handle">@{userData.username}</p>
                        <p>{userData.bio}</p>
                        <div className="profile__info__details__follow">
                            <p><span>69</span> Following</p>
                            <p><span>420</span> Followers</p>
                        </div>
                    </div>
                </div>
                <div className="profile__content">
                    <ProfileNavBar selfTwoots={selfTwoots} selfMediaTwoots={selfMediaTwoots} likedTwoots={likedTwoots}/>
                </div>
            </div>


        </div>
    )
}

export default Profile
