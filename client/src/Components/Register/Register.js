import { useState } from "react";
// import { gsap } from "gsap";

const Register = () => {
  const userData = {
    name: "",
    email: "",
    password: "",
  };

  const [user, setUser] = useState(userData);
  const [err, setErr] = useState();
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });

    document.querySelector(".err-msg").classList.add("hidden");
  };

  const handleClick = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);
      const repsonse = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await repsonse.json();

      if (!data.success) throw data;

      setLoading(!data.success);
      setMsg(data.message);

      console.log(data);
    } catch (error) {
      setLoading(error.success);
      let err_msg = error.message.replace(/"/g, "");
      setErr(err_msg.charAt(0).toUpperCase() + err_msg.slice(1));
      document.querySelector(".err-msg").classList.remove("hidden");
    }
  };

  return (
    <div className=" w-full h-screen flex flex-col justify-center items-center">
      {msg ? (
        <div className="bg-green-600 text-white absolute top-4 p-3 text-sm font-medium tracking-wide rounded-md animate-fromTop msg_scc">
          {msg}
        </div>
      ) : (
        ""
      )}
      <div className="w-reg_W h-reg_H rounded-3xl bg-white shadow-reg_BS flex flex-col justify-center items-center">
        <div className="logo">
          <img
            className="w-28 h-32"
            src="https://res.cloudinary.com/do63p55lo/image/upload/v1662295192/chatapp/chat_logo_hikcqr.png"
            alt="logo"
          />
        </div>
        <h1 className="text-xs font-extrabold tracking-reg_LS text-colr_80 my-5">
          REGISTER
        </h1>
        {err ? (
          <div className="text-red-600 font-semibold text-xs err-msg">
            {err}
          </div>
        ) : (
          ""
        )}
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleClick}
        >
          <input
            type="text"
            className="border border-black rounded placeholder-slate-500 text-xs p-2 w-72 my-4 focus:outline-none"
            placeholder="USERNAME"
            value={user.name}
            name="name"
            onChange={onInputChange}
          />
          <input
            type="text"
            className="border border-black rounded placeholder-slate-500 text-xs p-2 w-72 my-4 focus:outline-none"
            placeholder="EMAIL ADDRESS"
            value={user.email}
            name="email"
            onChange={onInputChange}
          />
          <input
            type="password"
            className="border border-black rounded placeholder-slate-500 text-xs p-2 w-72 my-4 focus:outline-none"
            placeholder="PASSWORD"
            value={user.password}
            name="password"
            onChange={onInputChange}
          />
          <button
            type="submit"
            className="w-28 h-8 rounded-md shadow-reg_BTN bg-bgcolr text-white text-xs font-bold tracking-wider mt-4 flex justify-center items-center"
          >
            {loading ? (
              <svg
                class="animate-spin mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              ""
            )}
            REGISTER
          </button>
        </form>
        <div className="w-0.5 h-4 bg-slate-500 my-5"></div>
        <span className="text-xs text-blue-900 underline decoration-blue-900 font-semibold">
          already register?
        </span>
      </div>
    </div>
  );
};

export default Register;
