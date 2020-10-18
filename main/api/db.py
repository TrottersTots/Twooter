from sqlalchemy import create_engine

db = create_engine('sqlite:////data/database/database.db')
db.connect()
