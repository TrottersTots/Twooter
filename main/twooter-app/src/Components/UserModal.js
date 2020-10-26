import React, {useState} from 'react'
import { Alert, Modal } from 'react-bootstrap';
import { Button } from "@material-ui/core";
import ErrorAlert from './ErrorAlert';
import '../styles/UserModal.css';

function UserModal({show_condition, setShow, modalTitle, registering, logged_in, setLoggedIn}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [email, setEmail] = useState('')
    const [errMsg, setErr] = useState('')

    async function submit_signup()//POST
    {
        const user_info = {username, password, passwordConfirm, email};
        const response = await fetch('/api/create_user/',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user_info)
        });
        if(response.ok){
          console.log('user-created-successfuly');
          setUsername('');
          setPassword('');
          setPasswordConfirm('');
          setEmail('');
        }else {
            console.log('signup-failed, '+ response.status)
            {/* re-toggle alert after dismissing it  */}

            switch (response.status){
              case (200):
                break;
              case (459):
                setErr('form incomplete');
                break;
              case (460):
                setErr('invalid email');
                break;
              case (461):
                setErr('passwords must match');
                break;
              case (462):
                setErr('username is taken');
                break;
              default:
                return;
            }
          }
    }
    
    
    async function submit_login()
    {
      const user_info = {username, password, email};
      const response = await fetch('api/login_user/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user_info)
      });
      if(response.ok){
        console.log('user-logged-in-successfully');
        setUsername('');
        setPassword('');
        
        setLoggedIn(true);
      }
      else {
            console.log('login-failed, '+ response.status)

            {/* re-toggle alert after dismissing it  */}

            switch (response.status){
              case (200):
                break;
              case (459):
                setErr('form incomplete');
                break;
              case (403):
                setErr('incorrect password');
                break;
              case (404):
                setErr('user not found');
                break;
              default:
                return;
            }
        }
    }

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
                    onChange={e => setUsername(e.target.value)}
                  />
                  <input
                    placeholder="Password"
                    name="message"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  {registering ? (
                    <><input
                      placeholder="Confirm Password"
                      name="message"
                      type="password"
                      value={passwordConfirm}
                      onChange={e => setPasswordConfirm(e.target.value)}
                    />                  
                    <input
                      placeholder="Email"
                      name="message"
                      type="text"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    /></>
                  ) : ('')}

                <div className="modal__buttons">
                    <Button onClick={() => setShow(false)}>Cancel</Button>
                    <Button onClick={registering ? submit_signup:submit_login}>{registering ? ("Register") : ("Login")}</Button>
                </div>

              </form>
          </Modal.Body>
          <ErrorAlert errMsg={errMsg}/>
        </Modal>

      </>
    )
}

UserModal.defaultProps = {
  modalTitle : "Welcome to Twooter",
  registering : false
 }

export default UserModal
