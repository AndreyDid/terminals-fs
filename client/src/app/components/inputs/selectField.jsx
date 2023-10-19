import React from 'react'
import Select from "react-select";
import PropTypes from "prop-types";

const SelectField = ({
                         label,
                         defaultValue,
                         onChange,
                         options,
                         name,
                         error,
                         placeholder
                     }) => {
    const handleChange = value => {
        onChange({name, value})
    }

    const style = {
        control: base => ({
            ...base,
            border: 0,
            boxShadow: 'none',
        })
    }
    const optionsArray =
        !Array.isArray(options) && typeof options === 'object'
            ? Object.values(options)
            : options
    return (
        <div className="mb-4">
            <div className="form-label">
                {label}
            </div>
            <Select
                styles={style}
                className={'border border-1 rounded-2 ' + (error ? 'border-danger' : 'border-1')}
                isSearchable={false}
                closeMenuOnSelect={true}
                defaultValue={defaultValue}
                options={optionsArray}
                onChange={handleChange}
                name={name}
                placeholder={placeholder}
            />
        </div>
    )
}
SelectField.propTypes = {
    defaultValue: PropTypes.object,
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    placeholder: PropTypes.string,
};

export default SelectField