import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from './../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div >
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    console.log('anecdotes :', anecdotes)
    const sortedAnectodes = anecdotes.sort(function (a, b) {
        return b.votes - a.votes
    })

return (
    <div>
        {sortedAnectodes.map(anecdote =>
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() =>
                    dispatch(vote(anecdote.id))} />
        )}
    </div>
)
}

export default AnecdoteList