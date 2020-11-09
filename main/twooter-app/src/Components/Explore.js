import React, {useState, useEffect} from 'react'
import { Button } from '@material-ui/core';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SearchIcon from '@material-ui/icons/Search';
import '../styles/Explore.css';
import Post from './Post';
import ProfilePreview from './ProfilePreview';

function ExploreNavBar(){
    const [key, setKey] = useState('connect');//foryou

    const [trendingTwoots, setTrendingTwoots] = useState({});
    const [curatedTwoots, setCuratedTwoots] = useState({});
    

    useEffect(() => {  
        get_trending();
        get_curated();
    }, []);//on mount / on change


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
                {Object.keys(trendingTwoots).sort().reverse().map(postID => 
                        
                        <Post
                            displayName={trendingTwoots[postID].displayname}
                            username={trendingTwoots[postID].username}
                            verified={trendingTwoots[postID].verified}
                            text={trendingTwoots[postID].message}
                            image={trendingTwoots[postID].image}
                            avatar={trendingTwoots[postID].avatar}
                            likes={trendingTwoots[postID].likes}
                            comments={trendingTwoots[postID].comments}
                            retwoots={trendingTwoots[postID].retwoots}
                            likedbyself={trendingTwoots[postID].likedbyself}
                            retwootedbyself={trendingTwoots[postID].retwootedbyself}
                            commentedbyself={trendingTwoots[postID].commentedbyself}
                            post_id ={postID}
                        />
                           
                )}
                
            </Tab>
            <Tab class="show active" eventKey="connect" title="Connect">
                {/* displays mutual friends and other fun algorithms we think of :) */}
                {/* MAPPED LIST OF USER COMPONENTS (DOESNT EXIST YET)*/}
                <ProfilePreview />
                <ProfilePreview />
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
