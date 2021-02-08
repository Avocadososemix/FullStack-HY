import React, { useState, useEffect } from 'react'
import CountryFilter from './components/CountryFilter'
import axios from 'axios'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountry] = useState([])
  const [countryNames, setCountryNames] = useState([])
  const [showAll, setShowAll] = useState(true)

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountry(response.data)
        setCountryNames(countries.name)
      })
  }, [])
  //console.log('render', countries.length, 'all')

  return (
    <div>
      find countries<input value={newFilter} onChange={handleFilterChange} />
      countries <CountryFilter countries={countries} newFilter={newFilter} showAll={showAll} />
    </div>
  )
}

export default App