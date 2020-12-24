import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import callServerV2 from '../helpers/callServer.v2';
import InputType from './inputType';
import LabelDetail from './labelDetail';

export default function CustomerPage() {
  const [edit, setEdit] = useState(false);
  const [payload, setPayload] = useState({
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
  });
  const dispatch = useDispatch();

  const handleButton = () => {
    if (edit) {
      console.log('submited', payload);
      dispatch(
        callServerV2({
          url: 'users/' + localStorage.getItem('_id'),
          stage: 'updateUser',
          method: 'PUT',
          data: payload,
          headers: true,
          type: 'SET_USER',
        }),
      );
    } else {
      console.log('edited');
    }
    setEdit(!edit);
  };

  const { user, loading, stage } = useSelector((state) => state.reducerUser);

  useEffect(() => {
    if (user) {
      if (stage === 'updateUser') {
        for (const key in user) {
          if (Object.prototype.hasOwnProperty.call(user, key)) {
            localStorage.setItem(key, user[key]);
            setPayload({
              ...payload,
              [key]: user[key],
            });
          }
        }
      }
    }
  }, [user]);

  const submitForm = (e) => {
    e.preventDefault();
    console.log(payload);
  };

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
                <form onSubmit={(e) => submitForm(e)}>
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
                </form>
              </div>
            )}
          </div>
          <div className="border-t mt-6 pt-3">
            <button
              disabled={loading}
              type={edit ? 'submit' : 'button'}
              onClick={() => handleButton()}
              className="rounded text-gray-100 px-3 py-1 bg-blue-500 hover:shadow-inner focus:outline-none hover:bg-blue-700 transition-all duration-300">
              {/* <span>{edit ? 'UPDATE' : 'EDIT'}</span> */}
              {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : ''}
              <span>{loading ? 'Processing' : edit ? 'UPDATE' : 'EDIT'}</span>
            </button>
            {edit && (
              <button
                onClick={() => setEdit(false)}
                type="reset"
                disabled={loading}
                className="rounded ml-3 text-gray-100 px-3 py-1 bg-gray-500 hover:shadow-inner focus:outline-none hover:bg-gray-700 transition-all duration-300">
                <span>Cancel</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
