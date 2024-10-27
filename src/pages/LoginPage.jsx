import { useMutation } from "@apollo/client";
import { useState } from "react";
import { USER_LOGIN } from "../graphql/mutations/userMutation.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [login, { loading }] = useMutation(USER_LOGIN);

  if (loading) return null;

  const onClickHandler = async (e) => {
    e.preventDefault();
    console.log("username", username);
    console.log("password", password);
    login({
      variables: {
        input: {
          username,
          password,
        },
      },
    })
      .then((res) => {
        console.log("res", res.data.login.token);
        localStorage.setItem("token", res.data.login.token);
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error.message);
      });
  };
  return (
    <section>
      <h1 className="font-semibold text-4xl">Login Page</h1>
      <div className="container">
        <form
          className="flex flex-col gap-10  w-md mx-auto border p-10 mt-10"
          onSubmit={onClickHandler}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="p-2 border "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              className="p-2 border "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="py-2 px-6 border bg-black text-white"
            disabled={loading}
          >
            {loading ? "Loading ... " : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
