import React from 'react'
import Feed from './Feed';


function Home({userData, logged_in, setLoggedIn}) {
    return (
            <Feed logged_in={logged_in} setLoggedIn={setLoggedIn} userData= {userData}/>
    )
}

export default Home
