import React, {useEffect, useState} from 'react'
import { Modal } from 'react-bootstrap';
import { Avatar, Button } from "@material-ui/core";
import '../styles/EditProfileModal.css';

function EditProfileModal ({show_editProfile, set_editProfile, userData}) {
    //for whatever reason setting these here doesnt work, so i am setting them onLoad of the Modal too
    const[name_input, setName] = useState(userData.displayname);
    const[email_input, setEmail] = useState(userData.email);
    const[dob_input, setDob] = useState(userData.dob);
    const[bio_input, setBio] = useState(userData.bio);
    const[avatar_input, setAvatar] = useState('');

    function setDefaultInputs() {
        setName(userData.displayname)
        setEmail(userData.email)
        setDob(userData.dob)
        setBio(userData.bio)
    }

    async function submit_userData()
    {

        const ud = {name_input, email_input, dob_input, bio_input, avatar_input}

        const response = await fetch('/api/submit_userData/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ud)
        });
        switch(response.status){
            case 200:
                console.log('userData updated');
                set_editProfile(false);
                window.location.reload();
            break;
            case 500:
                console.log('userData update failed');
            break;
            default:
                return;
        }
    }

    useEffect(() => {  
        console.log('Avatar Changed!!')
        //console.log(avatar_input)
    }, [avatar_input]);

    function setAvatarAsBinaryString(file){

        //console.log('FILE:',file);
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        
        reader.onload = function() {
            //console.log('HELLO???');
            //console.log(btoa(reader.result));
            setAvatar(btoa(reader.result));
        };

        reader.onerror = function() {
            console.log('error occured...');
        };

    }

    return (
        <>
            <Modal 
                onLoad={() => setDefaultInputs()}
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
                                > 
                                    <Avatar className="edit__avatarButton__avatar" src={process.env.PUBLIC_URL+"/avatars/"+ userData.avatar +".jpg"}/>
                                </Button>
                                <input type="file"
                                 id="image"
                                 onChange={e => setAvatarAsBinaryString(e.target.files[0])}/>
                                <div className="edit__container__inputContainer">

                                    <p>Name</p>
                                    <div>        
                                        <input 
                                        value={name_input}
                                        type="text"
                                        onChange={e => setName(e.target.value)}
                                        maxLength="12"
                                        ></input>
                                    </div>

                                    <p>Email</p>
                                    <div>
                                        <input 
                                        value={email_input}
                                        type="text"
                                        onChange={e => setEmail(e.target.value)}
                                        maxLength="25"
                                        ></input>
                                    </div>

                                    <p>Birthday</p>
                                    <div>
                                        <input 
                                        value={dob_input}
                                        type="date"
                                        onChange={e => setDob(e.target.value)}
                                        ></input>
                                    </div>

                                    <p>Bio</p>
                                    <div>
                                        <textarea
                                        className="input__bio"
                                        value={bio_input}
                                        type="text"
                                        onChange={e => setBio(e.target.value)}
                                        maxLength='52'
                                        ></textarea>
                                    </div>

                                    <Button className="edit__save" onClick={submit_userData}>Save</Button>
                                </div>

                            </div>
                        </Modal.Body>
            </Modal>            
        </>
    )
}

export default EditProfileModal