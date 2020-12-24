import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import callServerV2 from '../helpers/callServer.v2';
import { formatter } from '../helpers/formatIDR';

export default function Table() {
  const tableHead = ['Premi Terbaik', 'Periode', 'Perluasan', 'Harga Bangunan'];
  const { insurance, request, stage } = useSelector((state) => state.reducerInsurance);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log('insurance table', request);
  useEffect(() => {
    if (request) {
      if (stage === 'submitRequest') {
        history.push('/polis');
        console.log('Request submited');
      }
    }
  }, [request]);

  const getOccupation = (occupation) => {
    if (occupation === 'rumah') {
      return 'Rumah Tinggal Bukan Ruko';
    } else if (occupation === 'ruko') {
      return 'Ruko Bukan Rumah Tinggal';
    } else {
      return `${occupation[0].toUpperCase()}${occupation.slice(1)} Bukan Rumah Tinggal`;
    }
  };

  const submitPembayaran = () => {
    dispatch(
      callServerV2({
        url: 'insurance',
        stage: 'submitRequest',
        method: 'POST',
        data: insurance,
        headers: true,
        type: 'REQUEST_INSURANCE',
      }),
    );
  };

  const getTotal = (num1, num2) => {
    const total = Number(num1) + Number(num2);
    return formatter.format(total);
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
                {!insurance ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      No History
                    </td>
                  </tr>
                ) : (
                  <>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                              alt=""
                            />
                          </div> */}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {insurance.policy_type}
                            </div>
                            <div className="text-sm text-gray-500">
                              {getOccupation(insurance.occupation)}
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {insurance.invoice_number}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{insurance.period} Tahun</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span> */}

                        <div className="text-sm text-gray-900">
                          {insurance.earthquake ? 'Gempa Bumi' : '--'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatter.format(Number(insurance.price_object))}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="px-6 py-4 text-right whitespace-nowrap"></td>

                      <td className="px-6 py-4 text-right whitespace-nowrap"></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                        {/* Premi Dasar : {insurance.base_premi} */}
                        {formatter.format(Number(insurance.base_premi))}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="px-6 py-4 whitespace-nowrap"></td>
                      <td
                        colSpan="2"
                        className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                        Biaya Administrasi :{formatter.format(Number(insurance.admin_fee))}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="px-6 py-4 whitespace-nowrap"></td>
                      <td
                        colSpan="2"
                        className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                        Total: {getTotal(insurance.base_premi, insurance.admin_fee)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="px-6 py-4 whitespace-nowrap"></td>
                      <td
                        colSpan="2"
                        className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                        <button
                          onClick={() => submitPembayaran()}
                          type="button"
                          className="rounded text-gray-100 px-3 py-1 bg-blue-500 hover:shadow-inner focus:outline-none hover:bg-blue-700 transition-all duration-300">
                          <span>Lanjut Ke Pembayaran</span>
                        </button>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
