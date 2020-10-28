import { Avatar } from '@material-ui/core';
import React, {useState} from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Post from './Post';
import '../styles/Profile.css';


function ProfileNavBar() {
    const [key, setKey] = useState('twoots');
  
    return (
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        transition={false}
      >
        <Tab class="show active" eventKey="twoots" title="Twoots">
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
                displayName="JustinStitt"
                username="Justin_Stitt"
                verified={true}
                text="imma be what i set out to be without a doubt, undoubtedly #widepeepohappy #poggerschampion"
                image=""
                avatar="https://avatars3.githubusercontent.com/u/24460581?s=460&u=5beb1c69055ba1e6977ac011cb8110f28e5a5f2c&v=4"
            />
        </Tab>
        <Tab eventKey="media" title="Media">
        <Post 
            displayName="JustinStitt"
            username="Justin_Stitt"
            verified={true}
            text="Always gonna be another mountain. Always gonna wanna make it move.
                    Feeling #blessed #thankful 🙏🙏😇😇⭐"
            image="https://media.giphy.com/media/5sYj38hS0GE2dCzJsN/giphy.gif"
            avatar="https://avatars3.githubusercontent.com/u/24460581?s=460&u=5beb1c69055ba1e6977ac011cb8110f28e5a5f2c&v=4"
            />            
        </Tab>
        <Tab eventKey="likes" title="Likes">
            <Post 
                displayName="NathanInbar"
                username="Nathan_Inbar42069"
                verified={true}
                text="Worlds best catapult maker. 🍤🦐🍤🦐 #pistolShrimp3k 🎇🧨🔨💵"
                image="https://media.giphy.com/media/5hTNG4XpBRDBC/source.gif"
                avatar="https://avatars1.githubusercontent.com/u/23346068?s=460&u=56b1fa5b8a548010185263e2a12ec3e3b77018f7&v=4"
            />
        </Tab>
      </Tabs>
    );
  }


function Profile() {
    return (
        <div className='profile'>
            <div className="profile__header">
                <h2>Profile</h2>
            </div>

            <div className="profile__body">
                <div className="profile__info">
                    <Avatar src="" className="profile__info__avatar"/>
                    <div className="profile__info__details">
                        <h2>Justin Stitt</h2>
                        <p className="profile__info__details__handle">@Justin_Stitt</p>
                        <div className="profile__info__details__follow">
                            <p><span>69</span> Following</p>
                            <p><span>420</span> Followers</p>
                        </div>
                    </div>
                </div>
                <div className="profile__content">
                    <ProfileNavBar />
                </div>
            </div>


        </div>
    )
}

export default Profile
