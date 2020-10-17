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
                text="Always gonna be another mountain. Always gonna wanna make it move"
                image="https://media.giphy.com/media/5sYj38hS0GE2dCzJsN/giphy.gif"
                avatar="https://avatars3.githubusercontent.com/u/24460581?s=460&u=5beb1c69055ba1e6977ac011cb8110f28e5a5f2c&v=4"
            />
            <Post 
                displayName="JustinStitt"
                username="Justin_Stitt"
                verified={true}
                text="Always gonna be another mountain. Always gonna wanna make it move"
                image="https://media.giphy.com/media/5sYj38hS0GE2dCzJsN/giphy.gif"
                avatar="https://avatars3.githubusercontent.com/u/24460581?s=460&u=5beb1c69055ba1e6977ac011cb8110f28e5a5f2c&v=4"
            />
            {/* le empty posts, for now */}
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />

        </div>
    )
}

export default Feed
