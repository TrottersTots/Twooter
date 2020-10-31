import React, {useState} from 'react'
import { Modal } from 'react-bootstrap';
import { Avatar,Button } from "@material-ui/core";
import '../styles/EditProfileModal.css';

function EditProfileModal ({show_editProfile, set_editProfile, userData}) {
    return (
        <>
            <Modal 
                show={show_editProfile}
                dialogClassName="main-modal"
                onHide={() => set_editProfile(false)}
                aria-labelledby="modal__title"             
            >
                <Modal.Header closeButton>
                </Modal.Header>
                        <Modal.Body>
                            <div className="edit__container">
                                <Button
                                className="edit__avatarButton"
                                onClick={console.log('Clicked!')}> 
                                    <Avatar className="edit__avatarButton__avatar" src={userData.avatar}/>
                                </Button>
                                <div className="edit__container__inputContainer">
                                    <input 
                                    value={userData.displayname}
                                    type="text"
                                    ></input>

                                    <input 
                                    value={userData.email}
                                    type="text"
                                    ></input>

                                    <input 
                                    value={userData.bio}
                                    type="text"
                                    ></input>

                                    <input 
                                    value={userData.dob}
                                    type="date"
                                    ></input>       
                                </div>

                            </div>
                        </Modal.Body>
            </Modal>            
        </>
    )
}

export default EditProfileModal