from sqlalchemy import create_engine

db = create_engine('sqlite:///_database.db')
db.connect()