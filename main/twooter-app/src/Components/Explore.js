import React, {useState, useEffect} from 'react'
import { Button } from '@material-ui/core';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SearchIcon from '@material-ui/icons/Search';
import '../styles/Explore.css';
import Post from './Post';
import ProfilePreview from './ProfilePreview';

function ExploreNavBar(){
    const [key, setKey] = useState('foryou');//foryou

    const [trendingTwoots, setTrendingTwoots] = useState({});
    const [curatedTwoots, setCuratedTwoots] = useState({});
    const [connections, setConnections] = useState({});

    useEffect(() => {  
        get_trending();
        get_curated();
        get_connnections();
    }, []);//on mount / on change

     useEffect(() => {
        //console.log(Object.values(trendingTwoots).sort((a,b) => (a.likes < b.likes) ? 1 : -1));
        //console.log(Object.keys(trendingTwoots).sort().reverse());
        console.log("conns: ",connections)
     }, [connections])

    async function get_trending()
    {
        await fetch('api/get_trending/')
        .then(response => response.json())
        .then(data => setTrendingTwoots(data));
    }

    async function get_curated()
    {
        await fetch('api/get_curated/')
        .then(response => response.json())
        .then(data => setCuratedTwoots(data));
    }

    async function get_connnections()
    {
        await fetch('api/get_connections/')
        .then(response => response.json())
        .then(data => setConnections(data));
    }

    return (
        <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        transition={false}
        >
            <Tab class="show active" eventKey="foryou" title="For You">
                {/* MAPPED LIST OF POST COMPONENTS (SEE FEED.JS) */}
                
                {Object.keys(curatedTwoots).sort().reverse().map(postID => 
                        
                        <Post
                            displayName={curatedTwoots[postID].displayname}
                            username={curatedTwoots[postID].username}
                            verified={curatedTwoots[postID].verified}
                            text={curatedTwoots[postID].message}
                            image={curatedTwoots[postID].image}
                            avatar={curatedTwoots[postID].avatar}
                            likes={curatedTwoots[postID].likes}
                            comments={curatedTwoots[postID].comments}
                            retwoots={curatedTwoots[postID].retwoots}
                            likedbyself={curatedTwoots[postID].likedbyself}
                            retwootedbyself={curatedTwoots[postID].retwootedbyself}
                            commentedbyself={curatedTwoots[postID].commentedbyself}
                            post_id ={postID}
                        />
                           
                )}

            </Tab>
            <Tab class="show active" eventKey="trending" title="Trending">
                {/* MAPPED LIST OF POST COMPONENTS (SEE FEED.JS) */}
                {/* Sorts the trending twoots value array by likes and then maps each element (post) to a post component */}
                {Object.values(trendingTwoots).sort((a,b) => (a.likes < b.likes) ? 1 : -1).map(post => 
                        
                        <Post
                            displayName={post.displayname}
                            username={post.username}
                            verified={post.verified}
                            text={post.message}
                            image={post.image}
                            avatar={post.avatar}
                            likes={post.likes}
                            comments={post.comments}
                            retwoots={post.retwoots}
                            likedbyself={post.likedbyself}
                            retwootedbyself={post.retwootedbyself}
                            commentedbyself={post.commentedbyself}
                            post_id ={post.postID}
                        />
                           
                )}
                
            </Tab>
            <Tab class="show active" eventKey="connect" title="Connect">
                {/* displays mutual friends and other fun algorithms we think of :) */}
                {/* MAPPED LIST OF USER COMPONENTS */}
                
                {Object.values(connections).map(user =>
                
                    <ProfilePreview 
                        displayName={user.displayname}
                        username={user.username}
                        verified={user.verified}
                        bio={user.bio}
                        avatar={user.avatar}
                    />
                
                )}
                
            </Tab>

      </Tabs>
    )
}


function Explore() {
    return (
        <div className='explore'>
            <div className="explore__header">
                <h2>Explore</h2>
            </div>
            <div className="explore__body">
                <div className="explore__body__searchContainer">
                    <div className="searchContainer__inputContainer">
                        <SearchIcon />
                        <input type="text" placeholder="Search Twooter"/> 
                    </div>
                    <Button>Search</Button>
                </div>
            </div>
            
            <div className="explore__content">
                    <ExploreNavBar />
                </div>
        </div>
            
    )
}

export default Explore
