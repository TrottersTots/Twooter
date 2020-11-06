def query_to_dict (query):
    return [dict(row) for row in query.fetchall()]

def hash_id (user_id):
    return 1+6*user_id;