import React from 'react'
import './Widgets.css';
import SearchIcon from "@material-ui/icons/Search"
import Widget from './Widget';

function Widgets() {
    return (
        <div className="widgets">
            <div className="widgets__input">
                <SearchIcon pclassName="widgets__searchIcon" />
                <input placeholder="Search Twooter" type="text" />
            </div>

            <div className="widgets__widgetContainer w1">
                <h2>What's Happening</h2>
                <Widget 
                    widgetType="whatsHappening"
                    topic="Politics"
                    sub_topic="Trending"
                    text="Pistol Shrimp 9000 decimates entire Highschool"
                    thumbnail="https://qph.fs.quoracdn.net/main-qimg-5d695f84719ea6f50f542426a5765cb5.webp"
                    flavor_data="69,420 Twoots"
                />
            </div>

            <div className="widgets__widgetContainer w2">
                <h2>Who to Follow</h2>
                <Widget 
                    widgetType="whoToFollow"
                    displayName="Justin Stitt"
                    userName="Justin_Stitt"
                    verified={true}
                    avatar="https://avatars3.githubusercontent.com/u/24460581?s=460&u=5beb1c69055ba1e6977ac011cb8110f28e5a5f2c&v=4"
                />
            </div>

        </div>
    );
}

export default Widgets