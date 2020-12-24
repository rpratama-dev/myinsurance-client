import React from 'react';

export default function RadioButton(props) {
  /* eslint-disable react/prop-types */
  const { OnChange, title, checked, description, name, value } = props;
  return (
    <div>
      <label className="flex items-center mt-3">
        <input
          onChange={(e) => OnChange(e)}
          name={name}
          value={value}
          checked={checked || false}
          type="radio"
          className="form-radio h-5 w-5 text-gray-600"
          required
        />
        <span className="ml-2 text-gray-700">{title}</span>
      </label>
      <p className="ml-7 text-xs text-gray-700 capitalize">{description}</p>
    </div>
  );
}
