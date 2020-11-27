import React from 'react'
import { Modal } from 'react-bootstrap';
import '../styles/CommentModal.css';

function ShareModal({username, show_share, set_showShare}) {

    return (
        <>
            <Modal
                show={show_share} 
                onHide={() => set_showShare(false)}
                aria-labelledby="modal__title"             
            >
    
            <Modal.Header closeButton className="modal__header">
                <div className="comment_inputContainer">
                    <h4>Share This Profile</h4>
                </div>
            </Modal.Header>
            <Modal.Body>
                <h5 className="shareText">http://localhost:3000/explore/view?user={username}</h5>
            </Modal.Body>
            </Modal>            
        </>
        )
}
export default ShareModal
