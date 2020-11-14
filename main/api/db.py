from sqlalchemy import create_engine
import re

def regexp(expr, item):
    reg = re.compile(expr)
    return reg.search(item) is not None

db = create_engine('sqlite:///data/database/database.db')
db.connect()
