import React, {useState} from 'react'
import { Modal } from 'react-bootstrap';
import ProfilePreview from './ProfilePreview';
import '../styles/CommentModal.css';

function CommentModal({post_id, show_comment, set_showComment}) {
    const [message, setMessage] = useState('');
    const [comments, setComments] = useState({});

    async function get_comments()
    {
        const requestComments = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post_id)
        };
        fetch('/api/get_comments/', requestComments)
            .then(response => response.json())
            .then(data => setComments(data));
    }

    async function submit_comment()
    {
        const comment = {post_id, 'message': message}
        const response = await fetch('/api/comment_twoot/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });
        if(response.ok){
            console.log('comment-successful');
            setMessage('');
            get_comments();
        }
    }

    useState(() => {
        get_comments();
    }, [comments]);

    return (
        <>
            <Modal 
                size="lg"
                show={show_comment} 
                onHide={() => set_showComment(false)}
                aria-labelledby="modal__title"             
            >
    
            <Modal.Header closeButton className="modal__header">
                <div className="comment_inputContainer">
                    <h4>Twoot your reply</h4>
                    
                    <input 
                        name="message" 
                        id="message" 
                        className="comment__input" 
                        type="text" value={message} 
                        onChange={e => setMessage(e.target.value)}/>

                    <button onClick={submit_comment} className="comment__button">Comment</button>
                
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="comments_container">
                    {Object.keys(comments).sort().reverse().map(postID =>
                        //displayName, username, bio, verified, avatar, header 
                        <ProfilePreview
                            displayName={comments[postID].displayname}
                            username={comments[postID].username}
                            verified={comments[postID].verified}
                            bio={comments[postID].message}
                            avatar={comments[postID].avatar}
                            header={false}

                        />
                    
                    )}
                </div>
            </Modal.Body>
            </Modal>            
        </>
        )
}
export default CommentModal
