import React, {useState} from 'react'
import { Modal } from 'react-bootstrap';
import { Avatar,Button } from "@material-ui/core";
import TweetBox from './TweetBox';
import '../styles/TwootModal.css';

function TwootModal ({show_makeTwoot, setMakeTwoot, userData}) {

    const [message, setMessage] = useState('');
    const [imgURL, setImgURL] = useState('');

    return (
        <>
            <Modal 
                show={show_makeTwoot} 
                onHide={() => setMakeTwoot(false)}
                aria-labelledby="modal__title"             
            >

            <Modal.Header closeButton>
            </Modal.Header>
                    <Modal.Body>
                        <TweetBox inModal={true} userData={userData}/>
                    </Modal.Body>
            </Modal>            
        </>
    )
}

export default TwootModal