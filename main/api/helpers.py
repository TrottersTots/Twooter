import os

current_dir = os.path.dirname(__file__)
def appendAvatar(q, session):
    
    avatar_path = f"../twooter-app/public/avatars/{session['hashed_id']}.jpg"
    if(os.path.exists(os.path.join(current_dir, avatar_path))):  #if there is a custom avatar for this user
        #set an avatar attribute in the JSON to its dir
        q[0].update({'avatar':session['hashed_id']})
        
def query_to_dict (query):
    return [dict(row) for row in query.fetchall()]