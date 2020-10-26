import React from 'react';
import '../styles/SidebarOption.css';
//import {Link} from 'react-router-dom';
/* components start with a capital */
function SidebarOption({active, text, Icon}) {
    return (
        
        <div className='sidebarOption'>
            <Icon />
            <h2>{text}</h2>
        </div>
        
    );
}
//<div className={`sidebarOption ${active && 'sidebarOption--active'}`}>
export default SidebarOption;