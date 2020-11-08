import React, {useState} from 'react'
import { Button } from '@material-ui/core';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SearchIcon from '@material-ui/icons/Search';
import '../styles/Explore.css';
import Post from './Post';

function ExploreNavBar(){
    const [key, setKey] = useState('foryou');

    return (
        <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        transition={false}
        >
            <Tab class="show active" eventKey="foryou" title="For You">
                {/* MAPPED LIST OF POST COMPONENTS (SEE FEED.JS) */}
                
                {/* temp */}
                <Post />
                <Post />
                <Post />

            </Tab>
            <Tab class="show active" eventKey="trending" title="Trending">
                {/* MAPPED LIST OF POST COMPONENTS (SEE FEED.JS) */}

                {/* temp */}
                <Post />
                <Post />
                <Post />
                
            </Tab>
            <Tab class="show active" eventKey="mutualFriends" title="Mutual Friends">
                {/* MAPPED LIST OF USER COMPONENTS (DOESNT EXIST YET)*/}
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
