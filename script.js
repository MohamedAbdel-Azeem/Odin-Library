// Model and View Generator
const myLibrary = [];

function Book(Title,Author,Pages,Year,isRead) {  // the constructor...
    this.Title = Title;
    this.Author = Author;
    this.Pages = Pages;
    this.Year = Year;
    this.isRead = isRead;
}

function addBookToLibrary(Title,Author,Pages,Year,isRead){
    const book = new Book(Title,Author,Pages,Year,isRead);
    myLibrary.push(book);
}



function generateLibraryDivs(){
    const grid = document.querySelector("#book-container");
    const empty = document.querySelector("#empty-library");
    if (myLibrary.length == 0){
        empty.innerHTML = "<h3>Your Library is Empty! Add a Book to get started !</h3>";
        grid.innerHTML = "";
    }
    else{
        empty.innerHTML = "";
        grid.innerHTML = "";
        for (let i = 0; i < myLibrary.length; i++) {
            const book = myLibrary[i];
            const divHtml = `
            <div class="book" id="book${i}">
                <button class="remove-book" onclick="removeBook(${i})">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>delete</title>
                        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                    </svg>
                </button>
                <h2>${book['Title']}</h2>
                <hr>
                <p>Author: ${book['Author']}</p>
                <p>Pages: ${book['Pages']}</p>
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
}

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
          <input id="swal-input3" type="number" class="swal2-input" placeholder="Number of Pages" required>
          </div>
          <div class="swal-input-element">
          <input id="swal-input4" type="number" class="swal2-input" placeholder="Year" min=0 required>
          </div>
          </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value, // 0 corresponfs to Title
            document.getElementById("swal-input2").value, // 1 corresponds to Author
            document.getElementById("swal-input3").value, // 2 corresponds to Pages
            document.getElementById("swal-input4").value // 3 corresponds to Year
          ];
        }
      });
      if (formValues) {
        if (formValues[0].trim() == "" || formValues[1].trim() == "" || formValues[2].trim() == "" || formValues[3].trim() == "" || formValues[2] < 0 || formValues[3] < 0){
            swal.fire({
                title: "Invalid Input",
                text: "Please enter valid input",
                icon: "error",
                confirmButtonText: "Ok",
              });
        } else {
            addBookToLibrary(formValues[0],formValues[1],formValues[2],formValues[3],"No");
            generateLibraryDivs();
        }
      }
});


// Change Read Status Functionality
document.querySelector('#book-container').addEventListener('change', function(event) {
    if (event.target.type === 'radio') {
        var changedRadioName = event.target.name;
        var index = parseInt(changedRadioName.substring(4));
        myLibrary[index].isRead = event.target.value;
    }
});


// Remove Book Functionality
function removeBook(index){
    myLibrary.splice(index,1);
    generateLibraryDivs();
}