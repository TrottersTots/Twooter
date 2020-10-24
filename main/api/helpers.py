
def query_to_dict (query):
    return [dict(row) for row in query.fetchall()]