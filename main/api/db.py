from sqlalchemy import create_engine

db = create_engine('sqlite:///database/data/database.db')
db.connect()
