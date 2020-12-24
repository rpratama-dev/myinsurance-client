import React from 'react';

export default function DropDownMenu(props) {
  /* eslint-disable react/prop-types */
  const { items, OnChange, title, name } = props;

  return (
    <div className="border focus-within:border-blue-500 my-5 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
      <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
        <p>
          <label htmlFor={name} className="bg-white text-gray-600 px-1">
            {title} *
          </label>
        </p>
      </div>
      <p>
        <select
          onChange={(e) => OnChange(e)}
          onBlur={() => {}}
          name={name}
          id={name}
          className="py-1 px-1 bg-white outline-none block h-full w-full">
          {items.map((el, i) => {
            return (
              <option key={i} value={el.key} className="py-2">
                {el.value}
              </option>
            );
          })}
        </select>
      </p>
    </div>
  );
}
