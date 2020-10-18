import React from 'react'
import '../styles/Widget.css';
import { Avatar, Button } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function Widget({widgetType, topic, sub_topic, text, thumbnail, flavor_data, displayName, userName, verified, avatar}) {
    if (widgetType === "whatsHappening")
    {
        return (
            <div className="widget">
                <div className="widget__topic">
                    <p>{topic} · {sub_topic}</p>
                </div>
                <div className="widget__content">
                    <p>{text}</p>
                    <Avatar src={thumbnail} alt="" variant="rounded" className="widget__content__Avatar"/>
                </div>
                <div className="widget__topic">
                    <p>{flavor_data}</p>
                </div>
            </div>
        )
    }

    if (widgetType === "whoToFollow")
    {
        return (
            <div className="widget widget__follow">
                <div>{/* avatar and names */}
                    <Avatar src={avatar} />
                </div>
                <div className="widget__followText">
                    
                    <h4>{displayName} {verified && <CheckCircleIcon className="post__badge" />}</h4>
                        
                    <p>@{userName}</p>
                </div>
                <div>
                    <Button className="widget__followButton">Follow</Button>
                </div>
            </div>
        )
    }

}

export default Widget
