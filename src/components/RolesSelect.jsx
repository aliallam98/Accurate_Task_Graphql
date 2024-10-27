/* eslint-disable react/prop-types */

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { useQuery } from "@apollo/client";
import { Roles } from "../graphql/queries/userQuery.js";
import { toast } from "sonner";

export default function RolesSelect({ roleName, setRoleName,setShowAccountInput }) {
  const { data, loading, error } = useQuery(Roles, { fetchPolicy: "no-cache" });

  if (loading) return "Loading...";
  if (error) toast.error(error.message);

  console.log(roleName);

  // const disabledHandler = (code) => {
  //   if (
  //     roleName.find((item) => item.code === code) &&
  //     (code !== "CSTMR" || code !== "DLVRY")
  //   ) {
  //     return true;
  //   }
  // };

  console.log("roleName", roleName);

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        onChange={(event, newValue) => {
          if(newValue.length == 0) setShowAccountInput("")
          setRoleName(newValue);
          (newValue?.[0]?.code === "DLVRY" || newValue?.[0]?.code === "CSTMR") &&  setShowAccountInput(newValue[0].code)
        }}
        multiple
        getOptionDisabled={(option) =>
          ["CSTMR", "DLVRY"].includes(roleName[0]?.code) ||
          option.code === roleName[1]?.code
        }
        id="tags-standard"
        options={data.listRolesDropdown}
        // value={data.listRolesDropdown}
        getOptionLabel={(role) => role.name}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Roles"
            placeholder="Favorites"
          />
        )}
      />
    </Stack>
  );
}
