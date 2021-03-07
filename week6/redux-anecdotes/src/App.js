import React, { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   anecdoteService
  //     .getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  // }, [dispatch])

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes()) 
  },[dispatch]) 

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App