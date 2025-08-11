import React from "react";

const LoginForm = () => {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <div>
          <h1 className=" text-2xl font-bold mb-6 text-center">Login</h1>

          <form action="" className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1" htmlFor="">
                Email
              </label>
              <input type="email" className="border px-3 py-2 rounded" />
            </div>

            <div className="flex flex-col">
              <label className="mb-1" htmlFor="">
                Password
              </label>
              <input type="password" className="border px-3 py-2 rounded" />
            </div>
          </form>
          <div>
            <button className="bg-indigo-700 text-white w-full mt-2 py-2 rounded hover:bg-indigo-800">
              Signin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
