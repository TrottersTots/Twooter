import React, {useState} from 'react'
import { Modal } from 'react-bootstrap';
import { Avatar,Button } from "@material-ui/core";
import '../styles/TwootModal.css';

function TwootModal ({show_makeTwoot, setMakeTwoot}) {

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
                        <div className="modal__content">
                            <div className="modal__content__userContainer">
                                <Avatar src="" />
                            </div>
                            <div className="modal__content__formContainer">
                                <form className="modal__form">
                                    <input
                                        className="modal__twootMsg"
                                        placeholder="What's Happening?"
                                        name="message"
                                        type="text"
                                        value={message}
                                    />
                                    <input
                                        className="modal__imgInput"
                                        placeholder="Image URL"
                                        name="message"
                                        type="text"
                                        value={imgURL}
                                    />

                                    <div className="modal__buttons">
                                        <Button onClick={() => setMakeTwoot(false)}>Cancel</Button>
                                        <Button>Twoot</Button>
                                    </div>
                            
                                </form>
                            </div>
                        </div>
                    </Modal.Body>
            </Modal>            
        </>
    )
}

export default TwootModal