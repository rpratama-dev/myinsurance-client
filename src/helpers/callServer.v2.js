import { axios } from '../config/axios';

/**
 *
 * @param {url, stage, method, data, headers, type, id} option
 */
export default function callServerV2(option) {
  const payloadAxios = {
    url: option.url,
    method: option.method || 'GET',
  };

  if (option.data) {
    payloadAxios['data'] = option.data;
  }

  if (option.headers) {
    payloadAxios['headers'] = {
      access_token: localStorage.getItem('access_token'),
    };
  }

  return async (dispatch) => {
    try {
      dispatch({ type: option.type + '_LOADING', payload: true });
      const { data } = await axios(payloadAxios);
      console.log('Data From Axios: ' + option.stage, data);
      dispatch({
        type: option.type,
        stage: option.stage,
        payload: option.id ? option.id : option.deletedId ? option.deletedId : data,
      });
    } catch (error) {
      // console.error('axios', error.message, 'stage', option.stage);
      dispatch({
        type: option.type + '_ERROR',
        stage: option.stage,
        payload: error,
      });
    } finally {
      dispatch({ type: option.type + '_LOADING', payload: false });
    }
  };
}
