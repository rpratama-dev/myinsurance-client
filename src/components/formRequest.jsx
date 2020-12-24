import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import callServerV2 from '../helpers/callServer.v2';
import errorHandler from '../helpers/errorHandler';
import DropDownMenu from './dropdown';
import InputType from './inputType';
import RadioButton from './radioButton';
import TextArea from './textArea';

export default function FormRequest() {
  const [errorMessage, setErrorMessagee] = useState('');
  const [itemsPeriod, setItemsPeriode] = useState([]);
  const [itemsOccupation, setItemsOccupation] = useState([]);
  const [payload, setPayload] = useState({
    OccupationId: '',
    period: 0,
    price_object: '',
    construction: '',
    address: '',
    province: '',
    city: '',
    area: '',
    earthquake: false,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const tempItem = [{ key: '', value: '---Pilih Periode---' }];
      for (let i = 1; i <= 10; i++) {
        tempItem.push({
          key: i,
          value: `${i} Tahun`,
        });
      }
      setItemsPeriode(tempItem);
      dispatch(
        callServerV2({
          url: 'occupation',
          stage: 'getOccupation',
          headers: true,
          type: 'SET_OCCUPATIONS',
        }),
      );
    })();
  }, []);

  const { occupations, loading: loadingOccupation, error: errorOccupation } = useSelector(
    (state) => state.reducerOccupation,
  );
  const { insurance, loading: loadingInsurance, error: errorInsurance, stage } = useSelector(
    (state) => state.reducerInsurance,
  );
  const loading = loadingOccupation || loadingInsurance;
  const error = errorOccupation || errorInsurance;

  useEffect(() => {
    if (occupations.length > 0) {
      const tempOccupation = occupations.map((el) => ({
        key: el._id,
        value: el.type[0].toUpperCase() + el.type.slice(1),
      }));
      tempOccupation.unshift({ key: '', value: '---Pilih Okupasi---' });
      setItemsOccupation(tempOccupation);
    }
  }, [occupations]);

  useEffect(() => {
    if (insurance) {
      if (stage === 'checkPremi') {
        console.log('result', insurance);
        history.push('/polis/check');
      }
    }
  }, [insurance]);

  useEffect(() => {
    if (error) {
      setErrorMessagee(errorHandler(error));
    }
  }, [errorInsurance, errorOccupation]);

  const hanldeClick = (path) => {
    history.push(path);
  };

  const submitForm = (e) => {
    (async () => {
      e.preventDefault();
      setErrorMessagee('');
      const { OccupationId, period } = payload;
      // console.log('payload', payload);
      if (!OccupationId || !period) {
        console.log('Please fill all required input!');
        setErrorMessagee('Please fill all required input!');
      } else {
        dispatch(
          callServerV2({
            url: 'insurance/cek-premi',
            stage: 'checkPremi',
            method: 'POST',
            data: payload,
            headers: true,
            type: 'SET_INSURANCE',
          }),
        );
      }
    })();
  };

  const handleForm = (e) => {
    let { name, value } = e.target;
    value = name === 'earthquake' ? e.target.checked : value;
    value = name === 'period' ? Number(value) : value;
    value = name === 'price_object' ? Number(value) : value;
    const inputForm = {
      ...payload,
      [name]: value,
    };
    setPayload(inputForm);
    console.log(name, value);
  };

  // const items = [
  //   { key: 1, value: 'Tests' },
  //   { key: 2, value: 'Tests2' },
  // ];

  return (
    <>
      <form onSubmit={(e) => submitForm(e)} method="post">
        <div className="w-4/5 lg:w-4/5 bg-white shadow mx-auto mb-10 mt-10 rounded-lg p-6">
          <div className="grid lg:grid-cols-1 gap-2">
            <div className="border-b pb-3">
              <h1 className="text-lg font-semibold text-2xl">Asuransi Kebakaran</h1>
            </div>
            <h1 className="text-sm text-xs text-red-500">{errorMessage}</h1>
            <div className="grid grid-cols-2 gap-6">
              <div className="rows gap-6">
                <DropDownMenu
                  items={itemsPeriod}
                  OnChange={handleForm}
                  title="Jangka waktu pertanggungan"
                  name="period"
                />
                <DropDownMenu
                  items={itemsOccupation}
                  OnChange={handleForm}
                  title="Okupasi"
                  name="OccupationId"
                />

                <InputType
                  OnChange={handleForm}
                  title="Harga Bangunan"
                  name="price_object"
                  type="number"
                  value={payload.price_object}
                  placeholder="Harga Bangunan"
                />
              </div>
              <div className="rows gap-6">
                <TextArea
                  OnChange={handleForm}
                  title="Alamat Object Pertanggungan"
                  name="address"
                  placeholder="Alamat Object Pertanggungan"
                />
                <InputType
                  OnChange={handleForm}
                  title="Provinsi"
                  name="province"
                  type="text"
                  value={payload.province}
                  placeholder="Provinsi"
                />
                <div className="grid grid-cols-2 gap-3">
                  <InputType
                    OnChange={handleForm}
                    title="Kota/Kabupaten"
                    name="city"
                    type="text"
                    value={payload.city}
                    placeholder="Kota/Kabupaten"
                  />
                  <InputType
                    OnChange={handleForm}
                    title="Daerah"
                    name="area"
                    type="text"
                    value={payload.area}
                    placeholder="Daerah"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="rows">
                <label htmlFor={name} className="bg-white w-full py-3 text-gray-600 px-1">
                  Konstruksi *
                </label>
                <RadioButton
                  OnChange={handleForm}
                  title="Kelas I"
                  description="Dinding, Lantai dan Semua Komponen Penunjang strukturalnya serta penutup atap terbuat seluruhnya dan sepenuhnya dari bahan-bahan yang tidak mudah terbakar"
                  name="construction"
                  value="kelas-I"
                />
                <RadioButton
                  OnChange={handleForm}
                  title="Kelas II"
                  description="Penutup atap terbuat dari sirap kayu keras, dinding-dinding mengandung bahan-bahan yang dappat terbakar sampai maksimum 20% dari luas dinding, lantai dan struktur-struktur penunjangnya terbuat dari kayu"
                  name="construction"
                  value="kelas-II"
                />
                <RadioButton
                  OnChange={handleForm}
                  title="Kelas III"
                  description="Selain Konstruksi Kelas I dan Kelas II"
                  name="construction"
                  value="kelas-III"
                />
              </div>
              <div className="rows gap-3">
                <label htmlFor={name} className="bg-white w-full py-3 text-gray-600 px-1">
                  Perluasan
                </label>
                <p className="flex flext-row px-1">
                  <label className="inline-flex items-center">
                    <input
                      onChange={(e) => handleForm(e)}
                      name="earthquake"
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-gray-600"
                    />
                    <span className="ml-2 text-gray-700">Gempa Bumi</span>
                  </label>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t mt-6 pt-3">
            <button
              disabled={loading}
              type="submit"
              className="rounded text-gray-100 px-3 py-1 bg-blue-500 hover:shadow-inner focus:outline-none hover:bg-blue-700 transition-all duration-300">
              {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : ''}
              <span>{loading ? 'Processing' : 'Cek Premi'}</span>
            </button>
            <button
              onClick={() => hanldeClick('/polis')}
              type="reset"
              disabled={loading}
              className="rounded ml-3 text-gray-100 px-3 py-1 bg-gray-500 hover:shadow-inner focus:outline-none hover:bg-gray-700 transition-all duration-300">
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
