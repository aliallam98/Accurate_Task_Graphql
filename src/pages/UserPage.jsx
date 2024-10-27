import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { USER } from "../graphql/queries/userQuery.js";
import { toast } from "sonner";

const UserPage = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(USER, {
    variables: {
      id: parseInt(id),
    },
  });

  if (loading) return "Loading...";
  if (error) toast.error(error.message);

  return (
    <section>
      <div className="container">
        <h1 className="font-semibold text-2xl mb-20">User Page</h1>
        <h2 className="font-semibold text-2xl">Username :{data.user.id}</h2>
        <h2 className="font-semibold text-2xl">Username :{data.user.username}</h2>
        <h2 className="font-semibold text-2xl">Status:{String(data.user.active)}</h2>
        <h2 className="font-semibold text-2xl">Role:{data.user.roles[0].name}</h2>
      </div>
    </section>
  );
};

export default UserPage;
