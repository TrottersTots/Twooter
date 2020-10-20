import React, {useState} from 'react'
import { Modal } from 'react-bootstrap';
import { Button } from "@material-ui/core";
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
                backdrop='static'
                keyboard={false}               
            >

            <Modal.Header closeButton>
            </Modal.Header>
                    <Modal.Body>
                        <form className="modal__form">
                            <input
                                placeholder="What's Happening?"
                                name="message"
                                type="text"
                                value={message}
                            />
                            <input
                                className="imgInput"
                                placeholder="[Optional] Image URL"
                                name="message"
                                type="text"
                                value={imgURL}
                            />

                            <div className="modal__buttons">
                                <Button onClick={() => setMakeTwoot(false)}>Cancel</Button>
                                <Button>Twoot</Button>
                            </div>

                        </form>
                    </Modal.Body>
            </Modal>            
        </>
    )
}

export default TwootModal