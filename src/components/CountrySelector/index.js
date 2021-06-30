import React from "react";
import {
  FormControl,
  InputLabel,
  NativeSelect,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CountrySelector({ value, countries, handleOnChange }) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink id="label-select-countries">
        Country
      </InputLabel>
      <NativeSelect
        value={value}
        onChange={handleOnChange}
        inputProps={{
          name: "country",
          id: "country-selector",
        }}
      >
        {countries.map(({ Country, ISO2 }) => (
          <option key={ISO2} value={ISO2.toLowerCase()}>
            {Country}
          </option>
        ))}
      </NativeSelect>
      <FormHelperText>Choosing country</FormHelperText>
    </FormControl>
  );
}

CountrySelector.defaultProps = {
  countries: [],
};
