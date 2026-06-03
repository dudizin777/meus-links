const bookList = document.querySelector('#book-list');
const bookModal = document.querySelector('#modal-edit');
const bookModalClose = document.querySelector('.close-button');
const btnAddBook = document.querySelector('#btn-add-book');

const editBookTitle = document.querySelector('#edit-book-title');
const editAuthor = document.querySelector('#edit-author');
const editGenre = document.querySelector('#edit-genre');
const editYear = document.querySelector('#edit-year');
const editDifficulty = document.querySelector('#edit-difficulty');
const form = document.querySelector('form');

const armazenamentoLocal =JSON.parse(localStorage.getItem('BookListas'))

let books = [];
if(armazenamentoLocal){
    books=armazenamentoLocal
}

btnAddBook.addEventListener('click', () => {
    bookModal.classList.add('active');
});

bookModalClose.addEventListener('click', () => {
    bookModal.classList.remove('active');
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const book = {
        title: editBookTitle.value,
        author: editAuthor.value,
        genre: editGenre.value,
        year: editYear.value,
        difficulty: editDifficulty.value,
    };

    books.push(book);
    localStorage.setItem('BookListas', JSON.stringify(books))

    form.reset();

  render(books)
});

function render(array){
    array.forEach((book,i) => {
        const li = document.createElement("li")
        li.innerHTML=`
        <span>O ${book.title} - Autor: ${book.author}</span>
        <button class="btn-delete">Excluir</button>
        <button class="btn-edit">Editar</button>`
        const excluir = li.querySelector('.btn-delete')

        const editar = li.querySelector('.btn-edit')


        excluir.addEventListener('click', ()=>{
            books.splice(i,1);
            li.remove()
            render(books)
            localStorage.setItem('BookListas', JSON.stringify(books))
        })
        bookList.append(li)
    }); 
}  
render(books)