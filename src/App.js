import React, { useEffect, useState } from 'react'
import CreateBook from './components/CreateBook'
import BookList from "./components/BookList"
import axios from 'axios'

const App = () => {
  const [books, setbooks] = useState([])

  const fetchbooks = async () => {
    const response = await axios.get('http://localhost:3000/books')

    setbooks(response.data)
  }

  useEffect(() => {
    fetchbooks();
  }, [])

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3000/books/${id}`,
      {
        title: newTitle,
      })

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }

      return book;
    });

    setbooks(updatedBooks);
  };

  const deleteBookById = async (id) => {

    await axios.delete(`http://localhost:3000/books/${id}`)

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });
    setbooks(updatedBooks);
  };


  const createBook = async (title) => {
    const response = await axios.post('http://localhost:3000/books',
      {
        title
      })

    const updatedBooks = [...books, response.data];
    setbooks(updatedBooks);

    // WITH THE HELP OF ES6 FUNCTIONS
    // const updatedBooks = [...books, {
    //   id: Math.round(Math.random() * 9999),
    //   title
    // }
    // ]
    // setbooks(updatedBooks);
  }


  return (
    <div className="app">
      <BookList
        books={books}
        onEdit={editBookById}
        onDelete={deleteBookById}
      />
      <CreateBook onCreate={createBook} />
    </div>
  )
}

export default App
