import React from 'react';
import LabelDetail from './labelDetail';

export default function AdminPage() {
  return (
    <>
      <form onSubmit={() => {}} method="post">
        <div className="w-4/5 lg:w-2/5 bg-white shadow mx-auto mb-10 mt-10 rounded-lg p-6">
          <div className="grid lg:grid-cols-1 gap-2">
            <div className="border-b pb-3">
              <h1 className="text-lg font-semibold text-2xl">My Profile</h1>
            </div>
            <div className="rows gap-6">
              <LabelDetail title="Fulname" value={'Fullname'} />
              <LabelDetail title="Email" value={'Fullname'} />
            </div>
          </div>
          <div className="border-t mt-6 pt-3">
            <button
              type="submit"
              className="rounded text-gray-100 px-3 py-1 bg-blue-500 hover:shadow-inner focus:outline-none hover:bg-blue-700 transition-all duration-300">
              <span>OK</span>
            </button>
            {/* <button
              onClick={() => hanldeClick('/')}
              type="reset"
              disabled={loading}
              className="rounded ml-3 text-gray-100 px-3 py-1 bg-gray-500 hover:shadow-inner focus:outline-none hover:bg-gray-700 transition-all duration-300">
              <span>Cancel</span>
            </button> */}
          </div>
        </div>
      </form>
    </>
  );
}
