const open = document.getElementById('open');
const popup = document.getElementById('popup');
const body = document.getElementById('body');
const footer = document.getElementById('footer');
const openn = document.getElementById('open');
const header = document.getElementById('header');
const topp = document.getElementById('topp');
const cancel = document.getElementById('cancel');
const submit = document.getElementById('submit');

globalCnt = 1;

let total_cnt = 0, read_cnt = 0, not_cnt = 0;

open.addEventListener('click', () => {
    header.classList.add('hide');
    // topp.classList.add('hide');
    footer.classList.add('hide');
    openn.classList.add('hide');
    
    popup.classList.add('show');
    console.log('haha');
});


function closeForm() {
    header.classList.remove('hide');
    // topp.classList.remove('hide');
    footer.classList.remove('hide');
    openn.classList.remove('hide');
    popup.classList.remove('show');
}


cancel.addEventListener('click', () => {

    header.classList.remove('hide');
    // topp.classList.remove('hide');
    footer.classList.remove('hide');
    openn.classList.remove('hide');
    
    popup.classList.remove('show');
    
});





let myLibrary = [];

function Book(name, author, pages, read, date) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.date = date;

    console.log("Added");
};


function test(book) {
    if(book.author == '' || book.name == '' || book.pages <= 0 ||  book.date == undefined || book.date == "Invalid Date")
        return 0;
    return 1;
}

submit.addEventListener('click', () => {
    console.log("starttttttttttttt");
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = (Number)(document.getElementById('num').value);
    const read = document.getElementById('status').value;
    const date = new Date(document.getElementById('date').value);
    console.log(read);

    
    let myBook;
    if(read == 'yes') {     // the value in the html element option
        myBook = new Book(title, author, pages, 1, date);
    }
    else {
        myBook = new Book(title, author, pages, 0, date);
    }

    if(test(myBook) == 1) {
        addBookToLibrary(myBook);
        // Now, we want to hide the form...
        if(read == 'yes') {
            read_cnt ++;
        } else {
            not_cnt ++;
        }

        total_cnt ++;
        
        document.getElementById('booksCnt').innerHTML = total_cnt;
        document.getElementById('readCnt').innerHTML = read_cnt;
        document.getElementById('notCnt').innerHTML = not_cnt;

        console.log(total_cnt + "  "  + read_cnt + "  " + not_cnt);


        closeForm();

    } else {
        alert("Please Complete the form");
    }

})

function addBookToLibrary(book) {
    console.log('before push');
    myLibrary.push(book);
    console.log('after push');
    createBook(book);
}



function createBook(item) {
    // Select the container of all books.
    const library = document.querySelector('.container');
    

    // Create div elements for each book.    
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    bookDiv.classList.add('book');      // add .book class to bookDiv

    titleDiv.textContent = item.title;
    titleDiv.classList.add('title');

    
    authorDiv.textContent = item.author;
    authorDiv.classList.add('author');

    pageDiv.textContent = item.pages;
    pageDiv.classList.add('pages');

    readBtn.classList.add('readBtn');
    readBtn.setAttribute('id', 'readBtn' + globalCnt);


    if(item.read == 'no' || item.read == 0) {
        readBtn.textContent = 'Not Read';
        readBtn.style.backgroundColor = '#e04f63';
    } else {
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = '#63da63';
    }

    removeBtn.classList.add('removeBtn');
    removeBtn.setAttribute('id', 'removeBtn' + globalCnt);
    removeBtn.textContent = 'Delete Book';

    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(pageDiv);
    bookDiv.appendChild(readBtn);  
    bookDiv.appendChild(removeBtn);

    console.log('hahahaha');
    library.appendChild(bookDiv);

    globalCnt ++;

    const btnn = document.getElementById('readBtn' + (globalCnt-1)); 
    btnn.addEventListener('click', handleClick);
    
    const delBtn = document.getElementById('removeBtn' + (globalCnt-1));
    delBtn.addEventListener('click', handleClick);

}   


function handleClick(e) {
    console.log(e.target.innerHTML + " l;asdfj;als" + e.data + " " + e.textContent)
    // check if the caller is change read state button
    if(e.target.innerHTML == 'Read') {
        console.log("read");
        const btnn = document.getElementById(e.target.id);
        btnn.style.backgroundColor = '#e04f63';
        btnn.textContent = 'Not Read';
        read_cnt --;
        not_cnt ++;
    } else if(e.target.innerHTML == 'Not Read') {
        console.log("not read");
        const btnn = document.getElementById(e.target.id)
        btnn.style.backgroundColor = '#63da63';
        btnn.textContent = 'Read';
        read_cnt ++;
        not_cnt--;
    } else if(e.target.innerHTML == 'Delete Book') {
        console.log('delete');
        const btnn = document.getElementById(e.target.id);
        const parent = btnn.parentElement;

        if(parent.childNodes[3].textContent == 'Read') {
            read_cnt --;
        } else {
            not_cnt --;
        }

        total_cnt --;
        parent.remove();

        
    }

    document.getElementById('booksCnt').innerHTML = total_cnt;
    document.getElementById('readCnt').innerHTML = read_cnt;
    document.getElementById('notCnt').innerHTML = not_cnt;

}

