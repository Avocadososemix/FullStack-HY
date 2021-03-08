import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'
// import { changeNotification, removeNotification } from './../reducers/notificationReducer'
import { setNotification } from './../reducers/notificationReducer'
import anecdoteService from './../services/anecdotes'
import { changeFilter } from '../reducers/filterReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote  = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        const note = 'Added "'.concat(content, '" ')
        dispatch(setNotification(`you voted '${content}'`, 5))
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