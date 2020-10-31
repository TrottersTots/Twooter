import React from 'react'
import Feed from './Feed';


function Home({userData, logged_in, setLoggedIn, setTwoots, twoots}) {
    return (
            <Feed logged_in={logged_in} setLoggedIn={setLoggedIn} userData= {userData} setTwoots={setTwoots} twoots={twoots}/>
    )
}

export default Home
