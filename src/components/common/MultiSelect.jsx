import { useState } from 'react';

export const MultiSelect = (({options, setValue, label, labelForDisplay, multiSelectLabel}) => {
    const [ currentSelectedOptions, setSelectedOptions ] = useState([]);
    const [ canShowDropdown, updateDropdownConfig ] = useState(false);
    const [ localisedOptions , updateLocalisedOptions ] = useState(options);
    <label for={multiSelectLabel} >{labelForDisplay}</label>
    const dynamicGetter = (object, key) => {
        return object[key] || '';
    }
    const triggerDropdown = () => {
        updateDropdownConfig(!canShowDropdown);
        return;
    }
    const removeOptionFromSelected = (option) => {
        updateLocalisedOptions(localisedOptions.push(option));
        let updatedOptions =  currentSelectedOptions.filter((op) => op.value !== option.value);
        setSelectedOptions(updatedOptions);
        setValue(updatedOptions);
        return;
    }
    const updateSelectedOptions = (option) => {
        setSelectedOptions(currentSelectedOptions.push(option));
        let updatedLocalisedOptions = localisedOptions.filter((op) => op.value !== option.value);
        updateLocalisedOptions(updatedLocalisedOptions);
        setValue(currentSelectedOptions);
        return;
    }
    return (
        <>
            <div id={multiSelectLabel} class="multi-select-options" onClick={(() => triggerDropdown())}>
                {
                    currentSelectedOptions.length && currentSelectedOptions.map((selectedOption) => {
                        return (
                        <div className="selected-option d-inline-block">
                            {selectedOption.label}
                            <button className="ps-2 black-fill" onClick={(selectedOption) => removeOptionFromSelected(selectedOption)}>Remove</button>
                        </div>)
                    })
                }
            </div>
            <div className="multiselect-dropdown">
                {localisedOptions.map((option) => {
                    return (
                        <div className="multiselect-dropdown" onClick={updateSelectedOptions(option)}>{dynamicGetter(option, label)}</div>
                    )
                })}
            </div>
        </>
    )
})