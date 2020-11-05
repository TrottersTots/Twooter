import React from 'react'
import Feed from './Feed';


function Home({userData, logged_in, setLoggedIn, setTwoots, twoots, show_makeTwoot, setMakeTwoot}) {
    return (
            <Feed logged_in={logged_in} setLoggedIn={setLoggedIn} 
            userData= {userData} setTwoots={setTwoots} twoots={twoots}
            setMakeTwoot={setMakeTwoot} show_makeTwoot={show_makeTwoot}/>
    )
}

export default Home
