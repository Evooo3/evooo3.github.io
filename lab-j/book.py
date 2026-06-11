from flask import Flask, g, request, render_template, redirect, url_for
import sqlite3

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            database='data.db',
        )
        g.db.row_factory = sqlite3.Row
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

app = Flask(__name__)

@app.route("/")
@app.route("/books")
def index():
    db = get_db()
    books = db.execute('select * from book').fetchall()
    return render_template('books/index.html', title='Books', books=books)

@app.route("/books/<int:id>")
def show(id):
    db = get_db()
    book = db.execute('select * from book where id = ?', (id,)).fetchone()
    if book is None:
        return "book not found", 404
    return render_template('books/show.html', title=book['title'], book=book)

@app.route('/books/create', methods=['GET', 'POST'])
def create():
    if request.method == 'POST':
        title = request.form.get('title','')
        author = request.form.get('author','')

        db = get_db()
        book = db.execute('insert into book (title, author) values (?, ?)', (title, author))
        db.commit()

        return redirect(url_for('show', id=book.lastrowid))

    return render_template('books/create.html', title="Book Create")

@app.route('/books/<int:id>/edit', methods=['GET', 'POST'])
def edit(id):
    db = get_db()

    if request.method == 'POST':
        title = request.form.get('title','')
        author = request.form.get('author','')

        db.execute('update book set title = ?, author = ? where id = ?', (title,author,id))
        db.commit()
        return redirect(url_for('show', id=id))

    book = db.execute('select * from book where id = ?', (id,)).fetchone()
    if book is None:
        return "book not found", 404

    return render_template('books/edit.html', title=f"Edit {book['title']}", book=book)

@app.route('/books/<int:id>/delete', methods=['GET', 'POST'])
def delete(id):
    db = get_db()
    db.execute('delete from book where id = ?', (id,)).fetchone()
    db.commit()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, port=57760)