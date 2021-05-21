import React from 'react'
import './selectInput.css'

const SelectInput = ({ label, id, value, handleChange, options }) => {
    return (
        <>
            <label className="label">{label}:</label>
            <select className="input" id={id} name={id} value={value} onChange={(event) => handleChange(event)}>
                {options.map(({ key, value }) => <option value={key}>{value}</option>)}
            </select>
        </>
    )
}

export default SelectInput