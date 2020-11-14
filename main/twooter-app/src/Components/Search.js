import React, {useState} from 'react'
import Post from './Post';

function Search() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const q = urlParams.get('q');
    //
    const [searchContent, setSearchContent] = useState('');

    async function get_search()
    {
        const requestSearch = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(q)
        };
        fetch('/api/search_query', requestSearch)
            .then(response => response.json())
            .then(data => setSearchContent(data));
    }

    return (
        <div onLoad={() => get_search()}>
            <button onClick = {() => get_search()}>CLick me</button>
           {Object.keys(searchContent).length === 0 ? 
                (
                    <h4 className="search__emptyFeed">No results</h4>
                ): 
                (<>
                    {Object.keys(searchContent).sort().reverse().map(postID => 
                        
                            <Post
                                displayName={searchContent[postID].displayname}
                                username={searchContent[postID].username}
                                verified={searchContent[postID].verified}
                                text={searchContent[postID].message}
                                image={searchContent[postID].image}
                                avatar={searchContent[postID].avatar}
                                likes={searchContent[postID].likes}
                                comments={searchContent[postID].comments}
                                retwoots={searchContent[postID].retwoots}
                                likedbyself={searchContent[postID].likedbyself}
                                retwootedbyself={searchContent[postID].retwootedbyself}
                                commentedbyself={searchContent[postID].commentedbyself}
                                post_id ={postID}
                            />
                    )}
                    
                </>)
            }
        </div>
    )
}

export default Search
