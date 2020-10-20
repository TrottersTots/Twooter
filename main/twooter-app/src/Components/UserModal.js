import React, {useState} from 'react'
import { Modal } from 'react-bootstrap';
import { Button } from "@material-ui/core";
import '../styles/UserModal.css';

function UserModal({show_condition, setShow, modalTitle, registering}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirm, setPasswordConfirm] = useState('')
    const [email, setEmail] = useState('')

    return (
        <>
  
        <Modal 
            show={show_condition} 
            onHide={() => setShow(false)}
            aria-labelledby="modal__title"
            backdrop='static'
            keyboard={false}            
        >

          <Modal.Header closeButton className="modal__header">
            <Modal.Title id="modal__title">{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form className="modal__form">
                  <input
                    placeholder={"Username" + (registering ? ('') : (' / Email') )}
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
                  {registering ? (
                    <><input
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
                    /></>
                  ) : ('')}

                <div className="modal__buttons">
                    <Button onClick={() => setShow(false)}>Cancel</Button>
                    <Button>{registering ? ("Register") : ("Login")}</Button>
                </div>

              </form>
          </Modal.Body>
        </Modal>
        
      </>
    )
}

UserModal.defaultProps = {
  modalTitle : "Welcome to Twooter",
  registering : false
 }

export default UserModal
