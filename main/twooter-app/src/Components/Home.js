import React from 'react'
import Feed from './Feed';


function Home({logged_in, setLoggedIn}) {
    return (
        <div className='app'>
            <Feed logged_in={logged_in} setLoggedIn={setLoggedIn} />
        </div>
    )
}

export default Home
