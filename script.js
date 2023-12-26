const myLibrary = [];

function Book(Title,Author,Year,isRead) {  // the constructor...
    this.Title = Title;
    this.Author = Author;
    this.Year = Year;
    this.isRead = isRead;
}

Book.prototype.addBookToLibrary = function(){
    myLibrary.push(this);
}


function generateDummyBooks(){
    const b1 = new Book("The Hobbit","J.R.R. Tolkien",1937,true);
    const b2 = new Book("The Fellowship of the Ring","J.R.R. Tolkien",1954,false);
    const b3 = new Book("The Two Towers","J.R.R. Tolkien",1954,false);
    const b4 = new Book("The Return of the King","J.R.R. Tolkien",1955,false);
    const b5 = new Book("The Silmarillion","J.R.R. Tolkien",1977,false);
    const b6 = new Book("The Children of Hurin","J.R.R. Tolkien",2007,false);
    b1.addBookToLibrary();
    b2.addBookToLibrary();
    b3.addBookToLibrary();
    b4.addBookToLibrary();
    b5.addBookToLibrary();
    b6.addBookToLibrary();
}

function generateLibraryDivs(){
    const grid = document.querySelector("#book-container");
    grid.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const divHtml = `<div class="book">
        <h2>${book['Title']}</h2>
        <hr>
        <p>Author: ${book['Author']}</p>
        <p>Year: ${book['Year']}</p>
        <p>Read: ${book['isRead']}</p>
        </div>`;
        grid.innerHTML += divHtml;
    }
}

generateDummyBooks();
generateLibraryDivs();
