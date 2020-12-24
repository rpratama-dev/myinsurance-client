import React from 'react';

export default function TextArea(props) {
  /* eslint-disable react/prop-types */
  const { OnChange, title, name, placeholder } = props;
  return (
    <div className="border focus-within:border-blue-500 my-5 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
      <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
        <p>
          <label htmlFor="address" className="bg-white text-gray-600 px-1">
            {title} *
          </label>
        </p>
      </div>
      <p>
        <textarea
          id={name}
          name={name}
          autoComplete="off"
          tabIndex={0}
          onChange={(e) => OnChange(e)}
          className="py-1 px-1 outline-none block h-full w-full"
          required
          placeholder={placeholder}></textarea>
      </p>
    </div>
  );
}
