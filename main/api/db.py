from sqlalchemy import create_engine

db = create_engine('sqlite:///database.db')
db.connect()