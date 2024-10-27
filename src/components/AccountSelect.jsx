/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import { useQuery } from "@apollo/client";
import {
  ACCOUNTS,
  ACCOUNTS_FOR_DELIVERY,
} from "../graphql/queries/userQuery.js";
import { toast } from "sonner";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function AccountSelect({ accountsNames, setAccountsNames,roleCode }) {
  const { data, loading, error } = useQuery(
    roleCode === "CSTMR" ? ACCOUNTS : ACCOUNTS_FOR_DELIVERY,
    {
      fetchPolicy: "no-cache",
    }
  );

  if (loading) return "Loading...";
  if (error) toast.error(error.message);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log("value", value);

    setAccountsNames(
      // On autofill we get a stringified value.
      value
    );
  };


  return (
    <div className="w-1/2">
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="demo-multiple-checkbox-label">Accounts</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={accountsNames}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          MenuProps={MenuProps}
        >
          {(roleCode === "CSTMR" ? data?.listCustomersDropdown: data?.listDeliveryAgentsDropdown).map((account) => {

            return (
              <MenuItem key={account.id} value={account.id}>
                <ListItemText primary={account.name} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
