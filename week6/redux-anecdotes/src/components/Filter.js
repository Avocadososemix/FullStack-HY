import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeFilter } from './../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    let state = {value: ''};
    const [input, setInput] = useState('')

    const handleChange = (event) => {
        event.preventDefault()
        console.log('filter event target value: ', event.target.value)
        const filter = event.target.value
        event.target.value = ''
        dispatch(changeFilter(filter))
        console.log('Current filter: ', filter)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input value={input} onInput={e => setInput(e.target.value)} type='text'  
            onChange={handleChange} />
        </div>
    )
}

export default Filter