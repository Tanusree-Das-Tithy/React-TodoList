import React, { useState, useRef } from 'react'

const Modal = (props) => {
    const { closeModal, setUpdatedTodo, id } = props

    const inputRef = useRef(null)

    const closeTodoModal = (e) => {
        closeModal()
    }

    return (
        <div className="containModal">
            <form>
                <h4>Edit your plan</h4>
                <div className="form">
                    <input
                        ref={inputRef}
                        type="text"
                        name="title"
                        placeholder="Enter updated plan here"
                        id="Modal"
                        className="boxModal"
                    />
                </div>
                <button
                    className="ModalSave"
                    onClick={() => {
                        setUpdatedTodo({
                            id,
                            todo: { title: inputRef.current.value },
                        })
                        closeModal()
                    }}
                >
                    Save
                </button>
                <button className="ModalCancel" onClick={closeTodoModal}>
                    Cancel
                </button>
            </form>
        </div>
    )
}

const Todo = (props) => {
    const {
        todo: { title },
        id,
        onRemove,
        setUpdatedTodo,
    } = props
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <section>
            {showModal && (
                <Modal
                    closeModal={handleCloseModal}
                    setUpdatedTodo={setUpdatedTodo}
                    id={id}
                />
            )}
            <div className="container">
                {title}

                <div style={{ display: 'flex', gap: '3px' }}>
                    <button
                        className="edit"
                        onClick={() => {
                            handleShowModal()
                        }}
                    >
                        <img
                            src="./Pencil.jpg"
                            alt="description of image"
                            style={{ height: '27px', width: '27px' }}
                        ></img>
                    </button>

                    <button
                        className="delete"
                        onClick={() => {
                            onRemove(id)
                        }}
                    >
                        <i className="fa fa-trash fa-2x"></i>
                    </button>
                </div>
            </div>
        </section>
    )
}

const Todos = (props) => {
    const { setUpdatedTodo } = props

    return (
        <div>
            <>
                {props.todos.map((todo) => (
                    <Todo
                        todo={todo.todo}
                        key={todo.id}
                        id={todo.id}
                        onRemove={props.onRemove}
                        setUpdatedTodo={setUpdatedTodo}
                    />
                ))}
            </>
        </div>
    )
}

export default Todos
