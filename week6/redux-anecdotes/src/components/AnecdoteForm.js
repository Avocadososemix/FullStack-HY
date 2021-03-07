import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { changeNotification, removeNotification } from './../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'
import { changeFilter } from '../reducers/filterReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote  = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
        const note = 'Added "'.concat(content, '" ')
        dispatch(changeNotification(note))
        setTimeout(() => {
            dispatch(removeNotification(note))
        }, 5000)
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