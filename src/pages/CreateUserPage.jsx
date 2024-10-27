import { useMutation } from "@apollo/client";
import { SAVE_USER } from "../graphql/mutations/userMutation.js";
import { useState } from "react";
import { toast } from "sonner";
import SwitchState from "../components/Switch.jsx";
import AccountSelect from "../components/AccountSelect.jsx";
import RolesSelect from "../components/RolesSelect.jsx";

const CreateUserPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(false);
  const [roleName, setRoleName] = useState([]);
  const [accountsNames, setAccountsNames] = useState("");
  const [showAccountInput, setShowAccountInput] = useState("");

console.log("accountsNames",accountsNames);
console.log("roleName",roleName);
  

  // useEffect(() => {
  //   if (roleName.find(x=>x.code == "CSTMR" ||x.code == "DLVRY" ) ) {
  //     setShowAccountInput(true);
  //   } else {
  //     setShowAccountInput(false);
  //   }
  // }, [roleName]);

  const [saveuser, { loading }] = useMutation(SAVE_USER);
  const onClickHandler = async (e) => {
    e.preventDefault();
    console.log("username", username);
    console.log("password", password);
    console.log("roles", roleName);
    console.log("active", active);
    saveuser({
      variables: {
        input: {
          username,
          password,
          roles: roleName.map((x)=>x.id),
          active,
          accountId:parseInt(accountsNames)
        },
      },
    })
      .then((res) => {
        console.log("res", res.data);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error.message);
      });
  };

  console.log(roleName);

  return (
    <section>
      <form
        className="flex flex-col gap-10  w-md mx-auto border p-10 mt-10  "
        onSubmit={onClickHandler}
      >
        <SwitchState active={active} setActive={setActive} />

        <div className="flex gap-4">
          <div className="flex flex-col gap-1  w-1/2">
            <label className="" htmlFor="password">
              Password
            </label>
            <input
              type="text"
              name="password"
              className="p-2 border  "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-1 w-1/2">
            <label className="" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="p-2 border  "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex gap-5 justify-end">
          {showAccountInput && (
            <AccountSelect
              accountsNames={accountsNames}
              setAccountsNames={setAccountsNames}
              roleCode = {showAccountInput}
            />
          )}
          <RolesSelect roleName={roleName} setRoleName={setRoleName} setShowAccountInput={setShowAccountInput} />
        </div>
        <button
          type="submit"
          className="py-2 px-6 border bg-[#f56b6b] "
          disabled={loading}
        >
          {loading ? "Loading ... " : "Login"}
        </button>
      </form>
    </section>
  );
};

export default CreateUserPage;
