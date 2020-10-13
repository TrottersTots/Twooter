# Twooter
A full-stack Twitter clone
Developed By Nathan Inbar && Justin Stitt

[Project Writeup](https://docs.google.com/document/d/1-x0CJ0XkVqaihelHrf26Tq9Y-lgkB2f94qzkBu0FE0o/edit?usp=sharing)

## Important
* must set env variable if running server via "flask run"
  * use FLASK_APP=app.py
* using app.run() in the .py file means you can run the server by via "python app.py" like a normal python file
  * using app.run(debug=True) will restart the server when changes are detected
* you should add *.db to the .gitignore file
* sql.py makes DB connection and execution easy,
  * db = SQL("sqlite///databse.db")
  * db.execute("SELECT * FROM table")

