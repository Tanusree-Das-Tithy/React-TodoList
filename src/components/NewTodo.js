import React, { useRef, useState } from 'react'

const NewTodo = (props) => {
    const [todo, setTodo] = useState({ title: '' })

    const handleTodoChange = (event) => {
        const name = event.target.name
        setTodo((oldTodo) => {
            return { ...oldTodo, [name]: event.target.value }
        })
    }

    const handleSubmit = (event) => {
        if (todo.title === '') {
            alert('Please enter valid todo')
        } else {
            event.preventDefault()
            props.onAddTodo(todo)

            console.log(todo.title)
            setTodo({ title: '' })
        }
    }

    return (
        <form>
            <input
                type="text"
                id="title"
                name="title"
                className="box"
                value={todo.title}
                onChange={handleTodoChange}
            />
            <button className="Add" onClick={handleSubmit}>
                Add
            </button>
            <div></div>
        </form>
    )
}

export default NewTodo
