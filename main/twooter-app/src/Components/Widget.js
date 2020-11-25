import React from 'react'
import '../styles/Widget.css';
import { Avatar, Button } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function Widget({widgetType, topic, sub_topic, text, link, thumbnail, flavor_data, displayName, userName, verified, avatar,
    get_connnections}) {
    if (widgetType === "whatsHappening")
    {
        return (
            <div className="widget">
                <div className="widget__topic">
                    <p>{topic} · {sub_topic}</p>
                </div>
                <div className="widget__content">
                    <p><a href={link} target="_blank">{text}</a></p>
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
        async function follow_user()
        {
            const username = {'username': userName}
            const response = await fetch('/api/follow_user/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(username)
            });
            switch(response.status)
            {
                case 200://follow success
                    get_connnections();
                    break;
                default:
                    break;
            }
        }
        return (
            <div className="widget widget__follow">
                <Avatar src={process.env.PUBLIC_URL+"/avatars/"+ avatar +".jpg"} className="widget__avatar"/>
                <div className="widget__followText">
                    
                    <h4>{displayName} {Boolean(verified) && <CheckCircleIcon className="post__badge" />}</h4>
                        
                    <p>@{userName}</p>
                </div>
                <div>
                    <Button 
                    onClick={follow_user}
                    className="widget__followButton">Follow</Button>
                </div>
            </div>
        )
    }

}

export default Widget
