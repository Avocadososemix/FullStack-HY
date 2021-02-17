import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonFilter from './components/PersonFilter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log(initialPersons)
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (!persons.some(person => person.name === newName)) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setErrorMessage(
            `'${personObject.name}' added to phonebook`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

        })
    } else {
      const id = persons.find(person => person.name === newName).id
      if (window.confirm(`Change number for ${personObject.name}?`)) {
        personService
          .update(id, personObject)
          .then(returnedPerson => {
            setPersons((persons.filter(person => person.id !== id)).concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage(
              `'${personObject.name}' number changed`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const deletePerson = (id, personObject) => {
    if (window.confirm(`Delete ${personObject.name} ?`)) {
      personService
        .deletePerson(id, personObject)
        .then(response => {
          setPersons(persons.filter(person => (person.id !== id)))
        })
      setErrorMessage(
        `'${personObject.name}' was deleted from phonebook`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input value={newFilter}
            onChange={handleFilterChange} />
        </div>
      </form>
      <h2>add a new</h2>
      <Notification message={errorMessage} />
      <PersonForm newName={newName} newNumber={newNumber}
        addPerson={addPerson} handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PersonFilter persons={persons} newFilter={newFilter}
        deletePerson={deletePerson} />
    </div>
  )
}

export default App