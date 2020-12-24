import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import callServerV2 from '../helpers/callServer.v2';

export default function MyRequest() {
  const tableHead = ['Nomor Polis', 'Jenis Penanggungan', 'Nomor Invoice', 'Status', ''];
  const dispatch = useDispatch();
  // const history = useHistory();
  // console.log(history);
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
  }, []);

  const { insurances } = useSelector((state) => state.reducerInsurance);
  console.log('insurances', insurances);
  useEffect(() => {
    // if (stage === 'getAllInsurance') {
    // }
  }, [insurances]);

  const checkPolicy = (policyNumber) => {
    return policyNumber ? policyNumber : 'Belum Terbit';
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
                      colSpan="4"
                      className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      No History
                    </td>
                  </tr>
                ) : (
                  insurances.map((el) => (
                    <>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {checkPolicy(el.policy.policy_number)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{el.policy.policy_type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {el.invoice.invoice_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {el.invoice.is_paid ? 'Sudah dibayar' : 'Belum dibayar'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            <NavLink
                              to="/polis/request"
                              className="block px-3 py-2 rounded-full text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                              Lihat Rincian
                            </NavLink>
                          </span>
                        </td>
                      </tr>
                    </>
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
