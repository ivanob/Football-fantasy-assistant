import React, { useEffect, useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function FiltersComponent() {
  const handleChange = e => {
    setOptionSearch(e.target.value);
    onDisplayPosition(e.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <Select
        native
        value={optionSearch}
        onChange={handleChange}
        inputProps={{}}
      >
        <option value="ID">Search by ID</option>
        <option value="Portero">Portero</option>
        <option value="Defensa">Defensa</option>
        <option value="Mediocentro">Mediocentro</option>
        <option value="Delantero">Delantero</option>
      </Select>
    </FormControl>
  );
}
