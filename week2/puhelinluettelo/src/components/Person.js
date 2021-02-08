import React from 'react'

const Person = ({ person, deletePerson }) => {
  return (
    <p>{person.name} {person.number} &nbsp;

    <button onClick={() => (deletePerson(person.id, person))}>Delete</button></p>
  )
}

export default Person