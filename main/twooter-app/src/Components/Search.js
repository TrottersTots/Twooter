import React, {useState, useEffect} from 'react'
import Post from './Post';
import ProfilePreview from './ProfilePreview';
import '../styles/Search.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


function SearchNavBar({q}) {
    const [key, setKey] = useState('twoots');

    const [searchContent, setSearchContent] = useState('');
    const [searchUsers, setSearchUsers] = useState('');

    async function search_twoots()
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
    async function search_users()
    {
        const requestSearch = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(q)
        };
        fetch('/api/search_users/', requestSearch)
            .then(response => response.json())
            .then(data => setSearchUsers(data));
    }
    useState(() => {
            search_twoots()
        }, [searchContent]);
        
    useState(() => {
            search_users();
        }, [searchUsers]);

    return (
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          transition={false}
        >
          <Tab class="show active" eventKey="twoots" title="Twoots">
              {Object.keys(searchContent).length === 0 ? 
                  (
                  <h4 className="profile__emptyFeed">No Results for {"\""+q+"\""}</h4>
                  ) : 
                  (
  
                      Object.keys(searchContent).sort().reverse().map(postID => 
                          
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
                              likedbyself = {searchContent[postID].likedbyself}
                              retwootedbyself = {searchContent[postID].retwootedbyself}
                              post_id ={postID}
                          />)                    
                  )
              
              }
  
          </Tab>
          <Tab eventKey="users" title="Users">
              {Object.keys(searchUsers).length === 0 ? 
                  (
                      <h4 className="profile__emptyFeed">No Results for {"\""+q+"\""}</h4>  
                  ) : 
                  (
                      Object.keys(searchUsers).sort().reverse().map(profile => 
                        
                        <ProfilePreview 
                            displayName={searchUsers[profile].displayname}
                            username={searchUsers[profile].username}
                            bio={searchUsers[profile].bio}
                            verified={searchUsers[profile].verified}
                            avatar={searchUsers[profile].avatar}
                            header={false}
                        />
                      )                    
                  )
              }          
          </Tab>
        </Tabs>
    )
}

function Search() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const q = urlParams.get('q');
    //
    return (
        <div className="search">
            <div className="search__header">
                <h2>Search</h2>
            </div>
            <div>
                <SearchNavBar q={q}/>
            </div>
        </div>
    )
}

export default Search
