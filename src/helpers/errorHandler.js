export default function errorHandler(error) {
  if (error.response) {
    const data = error.response.data;
    if (data) {
      console.log(data);
      return data.response;
    }
  }
}
