import React from 'react';
import './Feed.css';
import TweetBox from './TweetBox';
import Post from './Post';

function Feed() {

    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>

            <TweetBox />

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
            {/* le empty posts, for now */}
            <Post 
                displayName="ChadTrotter"
                username="cdTrots"
                verified={true}
                text="Fucking camper window dood. #ow #holyfuck #badday 🤔😑😟😢🥵🥴🥺🤥☠💀"
                image="https://media.giphy.com/media/60352fWaV5s8Ti8ZnZ/source.gif"
                avatar="https://avatars2.githubusercontent.com/u/24463357?s=60&v=4"
            />
            <Post />
            <Post />
            <Post />
            <Post />

        </div>
    )
}

export default Feed
