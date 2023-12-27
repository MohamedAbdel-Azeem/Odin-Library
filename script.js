// Model and View Generator
const myLibrary = [];

function Book(Title,Author,Year,isRead) {  // the constructor...
    this.Title = Title;
    this.Author = Author;
    this.Year = Year;
    this.isRead = isRead;
}

function addBookToLibrary(Title,Author,Year,isRead){
    const book = new Book(Title,Author,Year,isRead);
    myLibrary.push(book);
}


function generateDummyBooks(){
    addBookToLibrary("The Hobbit","J.R.R. Tolkien",1937,"no");
    addBookToLibrary("The Fellowship of the Ring","J.R.R. Tolkien",1954,"no");
    addBookToLibrary("The Two Towers","J.R.R. Tolkien",1954,"no");
    addBookToLibrary("The Return of the King","J.R.R. Tolkien",1955,"no");
    addBookToLibrary("The Silmarillion","J.R.R. Tolkien",1977,"no");
    addBookToLibrary("The Children of Hurin","J.R.R. Tolkien",2007,"no");
}

function generateLibraryDivs(){
    const grid = document.querySelector("#book-container");
    grid.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const divHtml = `
        <div class="book">
            <h2>${book['Title']}</h2>
            <hr>
            <p>Author: ${book['Author']}</p>
            <p>Year: ${book['Year']}</p>
            <div style="margin-top: 10px">
                <p>Read?</p>
                <br>
                <div class="radio">
                    <input label="Yes" type="radio" name="read${i}" value="yes"/>
                    <input label="No" type="radio" name="read${i}" value="no" checked="checked"/>
                </div> 
            </div>
        </div>`;
        grid.innerHTML += divHtml;
    }
}

generateDummyBooks();
generateLibraryDivs();


// Add Book Functionality
const addBook = document.querySelector("#add-book");




addBook.addEventListener("click",async function(){
    const { value: formValues } = await Swal.fire({
        title: "Add a Book to the Library",
        confirmButtonText: "Add Book",
        confirmButtonColor: "#333",
        html: `
          <div id="swal-inputs">
          <div class="swal-input-element">
          <input id="swal-input1" type="text" class="swal2-input" placeholder="Title" required>
          </div>
          <div class="swal-input-element">
          <input id="swal-input2" type="text" class="swal2-input" placeholder="Author Name" required>
          </div>
          <div class="swal-input-element">
          <input id="swal-input3" type="number" class="swal2-input" placeholder="Year" min=0 required>
          </div>
          </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value,
            document.getElementById("swal-input3").value,
          ];
        }
      });
      if (formValues) {
        if (formValues[0].trim() == "" || formValues[1].trim() == "" || formValues[2] == null || formValues[2] < 0){
            swal.fire({
                title: "Invalid Input",
                text: "Please enter valid input",
                icon: "error",
                confirmButtonText: "Ok",
              });
        } else {
            addBookToLibrary(formValues[0],formValues[1],formValues[2],"No");
            generateLibraryDivs();
        }
      }
});


document.querySelector('#book-container').addEventListener('change', function(event) {
    if (event.target.type === 'radio') {
        var changedRadioName = event.target.name;
        var index = parseInt(changedRadioName.substring(4));
        myLibrary[index].isRead = event.target.value;
    }
});
