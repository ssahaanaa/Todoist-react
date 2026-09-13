import { useState } from "react";

export const Dropdown = ({
  options,
  setValue,
  label,
  labelForDisplay,
  DropdownLabel,
}) => {
  const [canShowDropdown, updateDropdownConfig] = useState(false);
  const [localisedOptions, updateLocalisedOptions] = useState([...options]);
  let selectedOptions = localisedOptions.filter((op) => op.isSelected) || [];
  <label for={DropdownLabel}>{labelForDisplay}</label>;
  const dynamicGetter = (object, key) => {
    return object[key] || "";
  };
  const triggerDropdown = () => {
    updateDropdownConfig(!canShowDropdown);
    return;
  };
  const updateSelectedOptions = (isSelected, option) => {
    let updatedOptions = localisedOptions.map((op) => {
      if (op.id === option.id) {
        return {
          ...option,
          isSelected,
        };
      }
      return op;
    });

    updateLocalisedOptions(updatedOptions);
    setValue(updatedOptions);
    updateDropdownConfig(false);
    return;
  };
  return (
    <div className="position-relative">
      <div
        id={DropdownLabel}
        className="multi-select-selected-options"
        onClick={() => triggerDropdown()}
      >
        {selectedOptions.length > 0 ? (
          <div>
            <span>{selectedOptions.length} option(s) Selected</span>
          </div>
        ) : (
          <div className="no-option-selected">No Options Selected </div>
        )}
      </div>
      {canShowDropdown && (
        <div className="dropdown-trigger">
          {localisedOptions.length > 0 ? (
            localisedOptions.map((option) => {
              return (
                <div
                  className={`dropdown-option ${
                    option.isSelected && "selected"
                  }`}
                  key={option.id}
                  onClick={() =>
                    updateSelectedOptions(!option.isSelected, option)
                  }
                >
                  <input
                    type="checkbox"
                    onChange={() =>
                      updateSelectedOptions(!option.isSelected, option)
                    }
                    checked={option.isSelected}
                    value={option.isSelected}
                    id={option.id}
                  />
                  <label htmlFor={option.id}>
                    {dynamicGetter(option, label)}
                  </label>
                </div>
              );
            })
          ) : (
            <div className="no-option-avail">No Options available</div>
          )}
        </div>
      )}
    </div>
  );
};
