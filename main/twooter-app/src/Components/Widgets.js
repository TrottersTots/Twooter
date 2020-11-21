import React, {useState, useEffect} from 'react'
import '../styles/Widgets.css';
import SearchIcon from "@material-ui/icons/Search"
import Widget from './Widget';

function Widgets({logged_in}) {  
    const [connections, setConnections] = useState({});
    const [randMutualUser, setRandMutualUser] = useState({});
    async function get_connnections()
    {
        await fetch('api/get_connections/')
        .then(response => response.json())
        .then(data => setConnections(data));
    }
    useEffect(() => {  
        get_connnections();
    }, []);//on mount/change
    useEffect(() =>{
        getRandom();
    }, [connections])

    async function getRandom(){
        let random_index = Math.floor(Math.random() * connections.length);
        setRandMutualUser(connections[random_index]);
    }
    return (
        <div className="widgets">

            <div className="widgets__input">
                <SearchIcon pclassName="widgets__searchIcon" />
                <form action="/search">
                    <input name="q" id="q" placeholder="Search Twooter" type="text" />
                </form>
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
            {logged_in ? (
                <div className="widgets__widgetContainer w2">
                    <h2>Who to Follow</h2>
                    {(!randMutualUser) ? (
                        <div>You're all followed-out! Check back later!😋</div>
                    ) : <Widget 
                    widgetType="whoToFollow"
                    displayName={randMutualUser.displayname}
                    userName={randMutualUser.username}
                    verified={randMutualUser.verified}
                    avatar={randMutualUser.avatar}
                    get_connnections={get_connnections}
                />}
                    
                    
                </div>
                )
            : ('')}
        </div>
    );
}

Widgets.defaultProps = {
     logged_in : false 
    }

export default Widgets


/*
<Widget 
                        widgetType="whoToFollow"
                        displayName="Justin Stitt"
                        userName="Justin_Stitt"
                        verified={true}
                        avatar="https://avatars3.githubusercontent.com/u/24460581?s=460&u=5beb1c69055ba1e6977ac011cb8110f28e5a5f2c&v=4"
                    />
*/