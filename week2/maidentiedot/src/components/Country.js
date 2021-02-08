import React from 'react'

const Country = ({ person: country }) => {
  return (
    <p>{country.name} {country.number}</p>
  )
}

export default Country