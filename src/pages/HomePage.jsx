import { useQuery } from "@apollo/client";
import { USERS } from "../graphql/queries/userQuery.js";
import { userAuthContext } from "../context/UserAuthProvider.jsx";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { token } = userAuthContext();
  console.log(token);

  const { loading, data, error } = useQuery(USERS);
  console.log("loading", loading);
  // console.log("data", data);
  console.log("error", error);

  if (loading) return "Loading...";

  const metadeta = data.listUsers.paginatorInfo;
  const users = data.listUsers.data;
  console.log(users);
  console.log(metadeta);

  return (
    <section>
      <div className="container">
        <h1 className="font-semibold text-3xl">Users Table</h1>
        <table className="w-[80%] border shadow-md mx-auto mt-20">
          <thead className="bg-gray-300 border">
            <tr>
              <td>id</td>
              <td>Username</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.username}</td>
                <td>
                  <Link to={`/profile/${user.id}`}>Visit Profile</Link>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="w-full border-2">
            <td className="">Total Users:{metadeta.total}</td>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default HomePage;
