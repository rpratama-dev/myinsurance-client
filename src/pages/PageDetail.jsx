import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import LabelDetail from '../components/labelDetail';
// import DropDownMenu from './dropdown';
import RadioButton from '../components/radioButton';
import callServerV2 from '../helpers/callServer.v2';

export default function PageDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { params } = useRouteMatch();

  useEffect(() => {
    (async () => {
      dispatch(
        callServerV2({
          url: `insurance/${params.id}`,
          stage: 'getInsurance',
          headers: true,
          type: 'SET_INSURANCE',
        }),
      );
    })();
  }, []);

  const { insurance, loading } = useSelector((state) => state.reducerInsurance);

  const newInsurance = insurance && insurance[0];
  console.log('insurance Page Detail', insurance);

  const hanldeClick = (path) => {
    history.push(path);
  };

  const getDescription = (construction) => {
    if (construction === 'kelas-I') {
      return 'Dinding, Lantai dan Semua Komponen Penunjang strukturalnya serta penutup atap terbuat seluruhnya dan sepenuhnya dari bahan-bahan yang tidak mudah terbakar';
    } else if (construction === 'kelas-II') {
      return 'Penutup atap terbuat dari sirap kayu keras, dinding-dinding mengandung bahan-bahan yang dappat terbakar sampai maksimum 20% dari luas dinding, lantai dan struktur-struktur penunjangnya terbuat dari kayu';
    }
    return 'Selain Konstruksi Kelas I dan Kelas II';
  };

  if (!insurance || insurance.length < 1) return null;

  return (
    <>
      <form onSubmit={() => {}} method="post">
        <div className="w-4/5 lg:w-4/5 bg-white shadow mx-auto mb-10 mt-10 rounded-lg p-6">
          <div className="grid lg:grid-cols-1 gap-2">
            <div className="border-b pb-3">
              <h1 className="text-lg font-semibold text-2xl">Asuransi Kebakaran</h1>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="rows gap-6">
                <LabelDetail title="Nomor Invoice" value={newInsurance.invoice.invoice_number} />
                <LabelDetail
                  title="Jangka Waktu Pertanggungan"
                  value={newInsurance.period + ' Tahun'}
                />
                <LabelDetail title="Okupasi" value={newInsurance.occupation.type} />
                <LabelDetail title="Harga Bangunan" value={'IDR ' + newInsurance.price_object} />
              </div>
              <div className="rows gap-6">
                <LabelDetail
                  title="Nomor Polis"
                  value={
                    newInsurance.policy.policy_number
                      ? newInsurance.policy.policy_number
                      : 'Belum Terbit'
                  }
                />
                <LabelDetail
                  title="Alamat Object Pertanggungan"
                  value={newInsurance.addresses.address}
                />
                <LabelDetail title="Provinsi" value={newInsurance.addresses.province} />
                <div className="grid grid-cols-2 gap-3">
                  <LabelDetail title="Kota/Kabupaten" value={newInsurance.addresses.city} />
                  <LabelDetail title="Daerah" value={newInsurance.addresses.area} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="rows">
                <label htmlFor={name} className="bg-white w-full py-3 text-gray-600 px-1">
                  Konstruksi *
                </label>
                <RadioButton
                  OnChange={() => {}}
                  checked={true}
                  title={
                    newInsurance.construction[0].toUpperCase() + newInsurance.construction.slice(1)
                  }
                  description={getDescription(newInsurance.construction)}
                  name="construction"
                  value="kelas-1"
                />
              </div>
              <div className="rows gap-3">
                <LabelDetail
                  title="Perluasan"
                  value={newInsurance.expansion.earthquake ? 'Gempa Bumi' : '--'}
                />
              </div>
            </div>
          </div>
          <div className="border-t mt-6 pt-3">
            <button
              onClick={() => hanldeClick('/')}
              disabled={loading}
              className="rounded ml-3 text-gray-100 px-3 py-1 bg-gray-500 hover:shadow-inner focus:outline-none hover:bg-gray-700 transition-all duration-300">
              <span>Back</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
