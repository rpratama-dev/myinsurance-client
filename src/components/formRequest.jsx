import React from 'react';

export default function FormDeveloper() {
  const hanldeClick = (path) => {
    history.push(path);
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log('clicked submit');
  };
  const loading = false;
  const handleForm = (e) => {
    const { name, value } = e.target;
    const inputForm = {
      // ...payload,
      [name]: value,
    };
    console.log(inputForm);
  };

  return (
    <>
      <form onSubmit={(e) => submitForm(e)} method="post">
        <div className="w-4/5 lg:w-3/6 bg-white shadow mx-auto mb-10 mt-10 rounded-lg p-6">
          <div className="grid lg:grid-cols-1 gap-6">
            <div className="border-b pb-3">
              <h1 className="text-lg font-semibold text-2xl">Asuransi Kebakaran</h1>
            </div>
            <h1 className="text-sm text-xs text-red-500">Error Message</h1>

            <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                <p>
                  <label htmlFor="name" className="bg-white text-gray-600 px-1">
                    Fullname *
                  </label>
                </p>
              </div>
              <p>
                <input
                  id="name"
                  name="name"
                  tabIndex={0}
                  type="text"
                  autoComplete="off"
                  onChange={(e) => handleForm(e)}
                  placeholder="Fullname"
                  className="py-1 px-1 outline-none block h-full w-full"
                  required
                />
              </p>
            </div>
            <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                <p>
                  <label htmlFor="email" className="bg-white text-gray-600 px-1">
                    Email *
                  </label>
                </p>
              </div>
              <p>
                <input
                  id="email"
                  name="email"
                  autoComplete="off"
                  tabIndex={0}
                  type="email"
                  onChange={(e) => handleForm(e)}
                  placeholder="Email"
                  className="py-1 px-1 outline-none block h-full w-full"
                  required
                />
              </p>
            </div>
            <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                <p>
                  <label htmlFor="address" className="bg-white text-gray-600 px-1">
                    Address *
                  </label>
                </p>
              </div>
              <p>
                <textarea
                  id="address"
                  name="address"
                  autoComplete="off"
                  tabIndex={0}
                  onChange={(e) => handleForm(e)}
                  className="py-1 px-1 outline-none block h-full w-full"
                  required
                  placeholder="Address"></textarea>
              </p>
            </div>
          </div>
          <div className="border-t mt-6 pt-3">
            <button
              disabled={loading}
              type="submit"
              className="rounded text-gray-100 px-3 py-1 bg-blue-500 hover:shadow-inner focus:outline-none hover:bg-blue-700 transition-all duration-300">
              {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : ''}
              <span>{loading ? 'Processing' : 'Save'}</span>
            </button>
            <button
              onClick={() => hanldeClick('/developers')}
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
