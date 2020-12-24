import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import callServerV2 from '../helpers/callServer.v2';
import InputType from './inputType';

export default function AdminPage() {
  const [edit, setEdit] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  // const [selectedItem, setSelectedItem] = useState({});
  const [payload, setPayload] = useState({
    type: '',
    rate: 0,
    admin_fee: 0,
    id: '',
  });
  const dispatch = useDispatch();

  const { occupations, stage } = useSelector((state) => state.reducerOccupation);

  useEffect(() => {
    (async () => {
      dispatch(
        callServerV2({
          url: 'occupation',
          stage: 'getAllOccupation',
          headers: true,
          type: 'SET_OCCUPATIONS',
        }),
      );
    })();
  }, [stage]);

  useEffect(() => {
    if (occupations.length > 0) {
      console.log('Occupation', occupations);
      handleReset();
    }
  }, [occupations]);

  const submitForm = (e) => {
    e.preventDefault();
    console.log(payload);
    prosesSubmit(payload);
  };

  const prosesSubmit = (payload) => {
    if (payload.admin_fee && payload.rate && payload.type) {
      if (edit) {
        console.log('submited', payload);
        dispatch(
          callServerV2({
            url: 'occupation/' + payload.id,
            stage: 'updateOccupation',
            method: 'PUT',
            data: payload,
            headers: true,
            type: 'SET_OCCUPATION',
          }),
        );
        setEdit(false);
      } else {
        dispatch(
          callServerV2({
            url: 'occupation',
            stage: 'addOccupation',
            method: 'POST',
            data: payload,
            headers: true,
            type: 'SET_OCCUPATION',
          }),
        );
      }
      setEdit(false);
    } else {
      setErrorMessage('All field required!');
      console.log('All field required!');
    }
  };

  const handleForm = (e) => {
    let { name, value } = e.target;
    const inputForm = {
      ...payload,
      [name]: value,
    };
    setPayload(inputForm);
  };

  const handleEdit = (id) => {
    console.log(id);
    const filtered = occupations.filter((el) => String(el._id) === String(id));
    const temp = filtered[0];
    setPayload({
      type: temp.type,
      rate: temp.rate,
      admin_fee: temp.admin_fee,
      id,
    });
    setEdit(true);
  };

  const handleReset = () => {
    setPayload({
      type: '',
      rate: '',
      admin_fee: '',
      id: '',
    });
    setErrorMessage('');
    setEdit(false);
  };

  return (
    <>
      <div onSubmit={() => {}} method="post">
        <div className="w-4/5 lg:w-3/5 bg-white shadow mx-auto mb-10 mt-10 rounded-lg p-6">
          <div className="grid lg:grid-cols-1 gap-2">
            <div className="border-b pb-3 flex justify-between">
              <h1 className="text-lg font-semibold text-2xl">Okupasi</h1>
              <div>
                {edit ? (
                  <button
                    onClick={() => handleReset()}
                    type="reset"
                    className="rounded ml-3 text-gray-100 px-3 py-1 bg-gray-500 hover:shadow-inner focus:outline-none hover:bg-gray-700 transition-all duration-300">
                    <span>CANCEL</span>
                  </button>
                ) : (
                  ''
                )}
                <button
                  onClick={submitForm}
                  // type="submit"
                  className="rounded text-gray-100 mx-2 px-3 py-1 bg-blue-500 hover:shadow-inner focus:outline-none hover:bg-blue-700 transition-all duration-300">
                  <span>{edit ? 'UPDATE' : 'ADD NEW'}</span>
                </button>
              </div>
            </div>
            <div className="rows gap-6">
              <form onSubmit={(e) => submitForm(e)}>
                <h1 className="text-sm text-xs mb-2 text-red-500">{errorMessage}</h1>
                <div className="grid grid-cols-3 gap-6">
                  <InputType
                    OnChange={handleForm}
                    title="Type"
                    value={payload.type}
                    name="type"
                    type="text"
                    placeholder="Type"
                  />
                  <InputType
                    OnChange={handleForm}
                    title="Rate"
                    value={payload.rate}
                    name="rate"
                    type="number"
                    placeholder="Rate"
                  />
                  <InputType
                    OnChange={handleForm}
                    title="Admin Fee"
                    value={payload.admin_fee}
                    name="admin_fee"
                    type="number"
                    placeholder="Admin Fee"
                  />
                </div>
              </form>
            </div>
            <table className="table-auto">
              <thead className="justify-start">
                <tr className="bg-gray-800">
                  <th className="py-2 text-left">
                    <span className="text-gray-300 px-5">Type</span>
                  </th>
                  <th className="py-2 text-left">
                    <span className="text-gray-300 px-5">Premi</span>
                  </th>
                  <th className="py-2 text-left">
                    <span className="text-gray-300 px-5">Admin Fee</span>
                  </th>
                  <th className="py-2 text-left">
                    <span className="text-gray-300 px-5">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {occupations.map((el) => (
                  <tr key={el._id} className="bg-white border-4 border-gray-200">
                    <td>
                      <span className="text-center px-5 font-semibold">{el.type}</span>
                    </td>
                    <td className="py-2 px-5">
                      <span>{el.rate}</span>
                    </td>
                    <td className="py-2 px-5">
                      <span>{el.admin_fee}</span>
                    </td>
                    <td className="py-2 px-5">
                      <span>
                        <button
                          onClick={() => handleEdit(el._id)}
                          className="focus:outline-none no-underline hover:underline ...">
                          Edit
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t mt-6 pt-3">
            {/* <button
              type="submit"
              className="rounded text-gray-100 px-3 py-1 bg-blue-500 hover:shadow-inner focus:outline-none hover:bg-blue-700 transition-all duration-300">
              <span>OK</span>
            </button> */}
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
