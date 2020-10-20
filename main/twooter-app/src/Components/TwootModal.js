import { Modal } from 'react-bootstrap';
import React, {useState} from 'react'
import { Button } from "@material-ui/core";
import '../styles/TwootModal.css';

function TwootModal ({show_makeTwoot, setMakeTwoot}) {
    return (
        <>
            <Modal 
                show={show_signup} 
                onHide={() => setMakeTwoot(false)}
                aria-labelledby="modal__title"            
            >

            <Modal.Header closeButton>
                        <Modal.Title id="modal__title">Welcome to Twooter</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="modal__form">
                            <input
                                placeholder="Username"
                                name="message"
                                type="text"
                                value={username}
                            />
                            <input
                                placeholder="Password"
                                name="message"
                                type="password"
                                value={username}
                            />
                            <input
                                placeholder="Confirm Password"
                                name="message"
                                type="password"
                                value={username}
                            />                  
                            <input
                            placeholder="Email"
                            name="message"
                            type="text"
                            value={username}
                            />

                            <div className="modal__buttons">
                                <Button onClick={() => setSignup(false)}>Cancel</Button>
                                <Button>Register</Button>
                            </div>

                        </form>
                    </Modal.Body>
            </Modal>            
        </>
    )
}

export default TwootModal