import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonFilter from './components/PersonFilter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
        })
    } else {
      window.alert(`${newName} is already added to phonebook`);
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