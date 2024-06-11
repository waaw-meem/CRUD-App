import React, { useState } from 'react'

const CreateBook = ({ onCreate }) => {

    const [title, settitle] = useState('')

    const handleFormSubmit = (event) => {
        event.preventDefault()
        onCreate(title)
        settitle('')
    }

    const handleChange = (event) => {
        settitle(event.target.value)
    }

    return (
        <div className="book-create">
            <h3>Add a Book</h3>
            <form onSubmit={handleFormSubmit}>
                <label>Title</label>
                <input className="input" value={title} onChange={handleChange} />
                <button className="button">Create!</button>
            </form>
        </div>
    )
}

export default CreateBook
