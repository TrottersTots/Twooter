import React, {useState} from 'react'
import {Alert} from 'react-bootstrap'
import '../styles/ErrorAlert.css';
function ErrorAlert({errMsg}) {
    {/* need to figure out dismiss/undismiss functionality */}
    const[showErr, setErr] = useState(true)

    if ((errMsg.length < 1) || showErr===false) {
        return null;
    }

    return (
        <Alert variant="danger" onClose={() => setErr(false)} >
            {errMsg}
        </Alert>
    )
}

export default ErrorAlert
