import React from 'react'
import Feed from './Feed';


function Home({logged_in, setLoggedIn}) {
    return (
            <Feed logged_in={logged_in} setLoggedIn={setLoggedIn} />
    )
}

export default Home
