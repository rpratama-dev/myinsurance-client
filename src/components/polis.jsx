import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import callServerV2 from '../helpers/callServer.v2';
import { formatter } from '../helpers/formatIDR';

export default function Polis() {
  const tableHead = ['Nomor Invoice', 'Alamat', 'Tipe Okupasi', 'Total yang dibayar', ''];
  const dispatch = useDispatch();
  // const history = useHistory();
  // console.log(history);
  const { insurances, stage } = useSelector((state) => state.reducerInsurance);
  useEffect(() => {
    (async () => {
      dispatch(
        callServerV2({
          url: 'insurance',
          stage: 'getAllInsurance',
          headers: true,
          type: 'SET_INSURANCES',
        }),
      );
    })();
  }, [stage]);

  console.log('insurances', insurances);
  useEffect(() => {}, [insurances]);

  const checkPolicy = (policyNumber) => {
    return policyNumber ? policyNumber : 'Belum Terbit';
  };

  const getTotal = (num1, num2) => {
    const total = Number(num1) + Number(num2);
    return formatter.format(total);
  };

  const handleApprove = (id, is_approved) => {
    (async () => {
      dispatch(
        callServerV2({
          url: 'insurance/approve/' + id,
          stage: 'rejectInsurance',
          method: 'PUT',
          data: {
            is_approved: is_approved,
          },
          headers: true,
          type: 'SET_INSURANCE',
        }),
      );
    })();
  };

  return (
    <div className="flex flex-col mt-70">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden mt-10 mx-10 border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {tableHead.map((el, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {el}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {insurances.length < 1 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      No History
                    </td>
                  </tr>
                ) : (
                  insurances.map((el) => (
                    <tr key={el._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {checkPolicy(el.invoice.invoice_number)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{el.addresses.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {el.occupation.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getTotal(el.invoice.base_premi, el.occupation.admin_fee)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex mx-2 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          <NavLink
                            to={`/polis/${el._id}`}
                            className="block px-3 py-1 rounded-full text-base font-medium text-black hover:text-white hover:bg-gray-700">
                            Lihat Rincian
                          </NavLink>
                        </span>
                        <span className="inline-flex mx-2 text-xs leading-5 font-semibold rounded-full bg-blue-500 text-green-800">
                          <button
                            disabled={el.is_approved}
                            onClick={() => handleApprove(el._id, true)}
                            className="block focus:outline-none px-3 py-1 rounded-full text-base font-medium text-white hover:text-white hover:bg-blue-400">
                            {el.is_approved ? 'Aproved' : 'Aprove'}
                          </button>
                        </span>
                        <span className="inline-flex mx-2 text-xs leading-5 font-semibold rounded-full bg-red-500 text-green-800">
                          <button
                            onClick={() => handleApprove(el._id, false)}
                            className="block focus:outline-none px-3 py-1 rounded-full text-base font-medium text-black hover:text-white hover:bg-red-400">
                            Reject
                          </button>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
