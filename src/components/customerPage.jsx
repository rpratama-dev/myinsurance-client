import React, { useState } from 'react';
import InputType from './inputType';
import LabelDetail from './labelDetail';

export default function CustomerPage() {
  const [edit, setEdit] = useState(false);
  const [payload, setPayload] = useState({
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
  });
  const handleForm = (e) => {
    let { name, value } = e.target;
    const inputForm = {
      ...payload,
      [name]: value,
    };
    setPayload(inputForm);
  };

  return (
    <>
      <div>
        <div className="w-4/5 lg:w-2/5 bg-white shadow mx-auto mb-10 mt-10 rounded-lg p-6">
          <div className="grid lg:grid-cols-1 gap-2">
            <div className="border-b pb-3">
              <h1 className="text-lg font-semibold text-2xl">My Profile</h1>
            </div>
            {!edit ? (
              <div className="rows gap-6">
                <LabelDetail title="Fulname" value={payload.name} />
                <LabelDetail title="Email" value={payload.email} />
              </div>
            ) : (
              <div className="rows gap-6">
                <InputType
                  OnChange={handleForm}
                  title="Fulname"
                  value={payload.name}
                  name="name"
                  type="text"
                  placeholder="Fullname"
                />
                <InputType
                  OnChange={handleForm}
                  title="Email"
                  value={payload.email}
                  name="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
            )}
          </div>
          <div className="border-t mt-6 pt-3">
            <button
              onClick={() => setEdit(!edit)}
              className="rounded text-gray-100 px-3 py-1 bg-blue-500 hover:shadow-inner focus:outline-none hover:bg-blue-700 transition-all duration-300">
              <span>{edit ? 'UPDATE' : 'EDIT'}</span>
            </button>
            {/* <button
              onClick={() => hanldeClick('/')}
              type="reset"
              disabled={loading}
              className="rounded ml-3 text-gray-100 px-3 py-1 bg-gray-500 hover:shadow-inner focus:outline-none hover:bg-gray-700 transition-all duration-300">
              <span>Cancel</span>
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
