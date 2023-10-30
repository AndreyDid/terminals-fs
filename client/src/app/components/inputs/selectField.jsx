import React from 'react'
import Select from "react-select";
import PropTypes from "prop-types";
import CreatableSelect from "react-select/creatable";
import login from "../../layouts/login";

const SelectField = ({
                         label,
                         defaultValue,
                         onChange,
                         options,
                         name,
                         error,
                         placeholder,
                         isSearchable,
                         isCreatable
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
            {isCreatable ? (
                <CreatableSelect
                    styles={style}
                    className={'border border-1 rounded-2 ' + (error ? 'border-danger' : 'border-1')}
                    isSearchable={isSearchable}
                    closeMenuOnSelect={true}
                    defaultValue={defaultValue}
                    options={optionsArray}
                    onChange={handleChange}
                    name={name}
                    placeholder={placeholder}
                />
            ) : (
                <Select
                    styles={style}
                    className={'border border-1 rounded-2 ' + (error ? 'border-danger' : 'border-1')}
                    isSearchable={isSearchable}
                    closeMenuOnSelect={true}
                    defaultValue={defaultValue}
                    options={optionsArray}
                    onChange={handleChange}
                    name={name}
                    placeholder={placeholder}
                />
            )}
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
    isSearchable: PropTypes.bool,
    isClearable: PropTypes.bool,

};

export default SelectField