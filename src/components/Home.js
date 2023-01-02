import React, { useEffect, useRef, useState } from 'react'
import NewTodo from './NewTodo'
import Todos from './Todos'
import { v4 as uuidv4 } from 'uuid'

const Home = () => {
    const [todos, setTodos] = useState([])
    const [list, setList] = useState(todos)
    const [updatedTodo, setUpdatedTodo] = useState({
        id: '',
        todo: { title: '' },
    })

    const [searchShow, setSearchShow] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const inputSearch = useRef('null')
    //console.log("updatedTodo--->",updatedTodo )

    const handleShowList = (todo) => {
        setTodos((prevTodos) => {
            return [...prevTodos, { id: uuidv4(), todo }]
        })
    }

    const handleSearch = (event) => {
        event.preventDefault()

        const val = inputSearch.current.value.toLowerCase()

        console.log('val', val)

        const filterSearch = todos.filter((todo) => {
            if (todo.todo.title.toLowerCase().includes(val)) {
                console.log('todo', todo)
                return todo
            } else if (val === '') {
                return todo
            }
        })

        console.log({ filterSearch })
        setList(filterSearch)
    }

    console.log('todos', todos)
    console.log('list', list)

    const handleDelete = (id) => {
        const filterTodo = todos.filter((todo) => todo.id !== id)
        setTodos(filterTodo)
    }

    useEffect(() => {
        if (updatedTodo && updatedTodo.id !== '' && todos.length !== 0) {
            const find = todos.find((todo) => todo.id === updatedTodo.id)
            find.todo.title = updatedTodo.todo.title
            setTodos((find) => {
                return [...find]
            })
        }
    }, [updatedTodo])

    return (
        <div>
            <div className="searchTodo">
                <input
                    ref={inputSearch}
                    type="text"
                    placeholder="Search something"
                    className="searchBox"
                />
                <button className="ModalSearch" onClick={handleSearch}>
                    Search
                </button>
            </div>
            <h1>Plan for Today</h1>
            <NewTodo onAddTodo={handleShowList} />

            <Todos
                todos={list.length > 0 ? list : todos}
                onRemove={handleDelete}
                setUpdatedTodo={setUpdatedTodo}
            />
        </div>
    )
}

export default Home
