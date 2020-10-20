import { Modal } from 'react-bootstrap';
import React, {useState} from 'react'
import { Button } from "@material-ui/core";
import '../styles/UserModal.css';

function UserModal({show_signup, setSignup}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirm, setPasswordConfirm] = useState('')
    const [email, setEmail] = useState('')

    return (
        <>
  
        <Modal 
            show={show_signup} 
            onHide={() => setSignup(false)}
            aria-labelledby="modal__title"
            backdrop='static'
            keyboard={false}            
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

export default UserModal
