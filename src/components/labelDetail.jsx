import React from 'react';

export default function LabelDetail(props) {
  /* eslint-disable react/prop-types */
  const { title, value } = props;
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
        <span className="mx-2 py-1">{value}</span>
      </p>
    </div>
  );
}
