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
    footer.classList.add('hide');
    openn.classList.add('hide');
    
    popup.classList.add('show');
});


function closeForm() {
    header.classList.remove('hide');
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

function Book(title, author, pages, read, date) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.date = date;

    console.log("Added");
};

function getDate(dateTime){
	return `${dateTime.getDate()}-${dateTime.getMonth() + 1}-${dateTime.getFullYear()}`
}

function test(book) {
    if(book.author == '' || book.name == '' || book.pages <= 0 ||  book.date == undefined || book.date == "Invalid Date")
        return 0;
    return 1;
}

submit.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    console.log(document.getElementById('title').value + " ll");
    const author = document.getElementById('author').value;
    const pages = (Number)(document.getElementById('num').value);
    const read = document.getElementById('status').value;
    const tmp = document.getElementById('date').value;
    const date = tmp;
    
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

        closeForm();

    } else {
        alert("Please Complete the form");
    }

})

function addBookToLibrary(book) {
    myLibrary.push(book);
    createBook(book);
    console.log("bookkkkkk");
    console.log(book);
}



function createBook(item) {
    // Select the container of all books.
    const library = document.querySelector('.container');
    

    // Create div elements for each book.    
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const dateDiv = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    bookDiv.classList.add('book');      // add .book class to bookDiv

    titleDiv.setAttribute('id', 'title' + String(globalCnt));
    titleDiv.classList.add('title');
    titleDiv.textContent = item.title;
    console.log(typeof(bookDiv));
    console.log(bookDiv);
    console.log(typeof(item.title));
    console.log(item.title);

   
    console.log(titleDiv);
    authorDiv.textContent = item.author;
    authorDiv.classList.add('author');

    pageDiv.textContent = item.pages + ' Pages';
    pageDiv.classList.add('pages');

    readBtn.classList.add('readBtn');
    readBtn.setAttribute('id', 'readBtn' + globalCnt);

    dateDiv.textContent = item.date;
    dateDiv.setAttribute('id', 'date' + globalCnt);


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

    const btnWrapper = document.createElement('div');
    btnWrapper.setAttribute('id', 'btnWrapper'+globalCnt);
    btnWrapper.appendChild(readBtn);
    btnWrapper.appendChild(removeBtn);

    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(pageDiv);
    bookDiv.appendChild(dateDiv);
    bookDiv.appendChild(btnWrapper)

    library.appendChild(bookDiv);

    globalCnt ++;

    const btnn = document.getElementById('readBtn' + (globalCnt-1)); 
    btnn.addEventListener('click', handleClick);
    
    const delBtn = document.getElementById('removeBtn' + (globalCnt-1));
    delBtn.addEventListener('click', handleClick);

}   


function handleClick(e) {
    // check if the caller is change read state button
    if(e.target.innerHTML == 'Read') {
        const btnn = document.getElementById(e.target.id);
        btnn.style.backgroundColor = '#e04f63';
        btnn.textContent = 'Not Read';
        read_cnt --;
        not_cnt ++;
    } else if(e.target.innerHTML == 'Not Read') {
        const btnn = document.getElementById(e.target.id)
        btnn.style.backgroundColor = '#63da63';
        btnn.textContent = 'Read';
        read_cnt ++;
        not_cnt--;
    } else if(e.target.innerHTML == 'Delete Book') {
        const btnn = document.getElementById(e.target.id);
        const parent = btnn.parentElement;

        if(parent.childNodes[0].textContent == 'Read') {
            read_cnt --;
        } else {
            not_cnt --;
        }

        total_cnt --;
        const card = parent.parentNode;
        card.remove();

        
    }

    document.getElementById('booksCnt').innerHTML = total_cnt;
    document.getElementById('readCnt').innerHTML = read_cnt;
    document.getElementById('notCnt').innerHTML = not_cnt;

}

