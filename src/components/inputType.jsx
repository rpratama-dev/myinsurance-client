import React from 'react';

export default function InputType(props) {
  /* eslint-disable react/prop-types */
  const { OnChange, title, name, type, value, placeholder } = props;
  return (
    <div className="border focus-within:border-blue-500 my-3 mb-5 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
      <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
        <p>
          <label htmlFor={name} className="bg-white text-gray-600 px-1">
            {title} *
          </label>
        </p>
      </div>
      <p>
        <input
          id={name}
          name={name}
          tabIndex={0}
          value={value ? value : ''}
          type={type}
          autoComplete="off"
          onChange={(e) => OnChange(e)}
          placeholder={placeholder}
          className="py-1 px-1 outline-none block h-full w-full"
          required
        />
      </p>
    </div>
  );
}
