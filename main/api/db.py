from sqlalchemy import create_engine

db = create_engine('sqlite:///database/database.db')
db.connect()