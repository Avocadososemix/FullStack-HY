import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { changeNotification } from './../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        console.log(content)
        const note = 'Added "'.concat(content, '" ')
        console.log(note)
        dispatch(changeNotification(note, 5))
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /> </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm