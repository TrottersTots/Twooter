import React, {useState, useEffect} from 'react'
import { Modal } from 'react-bootstrap';
import '../styles/More.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import GitHubIcon from '@material-ui/icons/GitHub';

function DeleteModal({show_delete, set_showDelete, deleteErr, set_deleteErr}) {

    async function delete_account(){
        const response = await fetch('/api/delete_account/',{
            method: 'GET',
          }
        );
        
        switch(response.status)
        {
          case(200):
            //log the user out
            //setLoggedIn(false);
            console.log('DELETE SUCCESS')
            window.location.href = '/';
            //window.location.reload()
            break;
          case(500):
            set_deleteErr(true);
            console.log('DELETE ERROR')
            break;
          default:
            set_deleteErr(true);
            return;
        }
      }

    return (
        <>
            <Modal
             show={show_delete} 
             onHide={() => set_showDelete(false)}
             aria-labelledby="modal__title" 
            >
                <Modal.Header closeButton>
                    Delete Your Twooter Account
                </Modal.Header>
                <Modal.Body>
                    <div className="confirmation">
                    Are you sure you want to permanently delete your Twooter account?
                    </div>
                    <div className="confirmButtons">
                        <button onClick={() => delete_account()}>Yes, delete my account</button>
                        <button onClick={() => set_showDelete(!show_delete)}>No, keep my account</button>
                    </div>
                    {deleteErr ? (
                        <div className="confirmation delete__error">
                            <h5>Account could not be deleted</h5>
                        </div>
                    ) : ('')}
                    
                </Modal.Body>
            </Modal>
        </>
    )
}

function More() {
    const [show_delete, set_showDelete] = useState(false);
    const [deleteErr, set_deleteErr] = useState(false);

    useEffect(() => {
    }, [deleteErr])

    return (
        <div className='more'>
            <div className="more__header">
                <h2>More</h2>
            </div>
            <div className="more__body">
                <div className="more__element deleteAccount">
                    <DeleteOutlineIcon />
                    <div>
                        <button onClick={() => set_showDelete(!show_delete)}><h4>Delete Your Twooter Account</h4></button>
                    </div>
                </div>
                <div className="more__element githubLink">
                    <GitHubIcon/>
                    <div className="githubLink__text">
                        <h4><a href="https://github.com/TrottersTots/Twooter" target="_blank">Twooter's Github Repository</a></h4>
                        <h6>A collaboration between Nathan Inbar & Justin Stitt</h6>
                    </div>
                </div>

            </div>
            <DeleteModal
                show_delete={show_delete}
                set_showDelete={set_showDelete}
                deleteErr={deleteErr}
                set_deleteErr={set_deleteErr}
            />
        </div>
    )
}

export default More
