import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import PersonFilter from './components/PersonFilter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  // useEffect(() => {
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/persons')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setPersons(response.data)
  //     })
  // }, [])

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  
  // console.log('render', persons.length, 'persons')

  // personService
  //   .update(id, changedPerson)
  //   .then(response => {
  //     setPersons(persons.map(person => person.id !== id ? person : response.data))
  //   })

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (!persons.some(person => person.name === newName)) {
      
      console.log('moi!', newName)
      // setPersons(persons.concat(personObject))
      // setNewName('')
      // setNewNumber('')
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
        })
    } else {
      window.alert(`${newName} is already added to phonebook`);
    }
  }

// axios
// .post('http://localhost:3001/persons', personObject)
// .then(response => {
// console.log(response)
// })

// console.log('uus nimi', newName, newNumber)

//   if (!persons.some(person => person.name === newName)) {
//     console.log('moi!', newName)
//     setPersons(persons.concat(personObject))
//     setNewName('')
//     setNewNumber('')
//   } else {
//     window.alert(`${newName} is already added to phonebook`);
//   }
// }

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
    <PersonFilter persons={persons} newFilter={newFilter} showAll={showAll} />
  </div>
)

}

export default App