import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { areOptionsEqual } from '@mui/base';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 50,
    },
  },
};



const names = [
  "desserts",
  "bistro",
  "ambiance",
  "fast-food",
  "fruits de mer",
  "hamburgers",
  "végétarien",
  "santé",
  "mexicain",
  "café",
  "libanais",
  "italien",
  "happy hour",
  "japonais",
  "asiatique",
  "steakhouse",
  "boulangerie",
  "grec",
  "charcuterie",
  "pizzeria",
  "cuisine moléculaire",
  "vietnamien",
  "indien",
  "européen"
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

let FilteredGenres = []

const getFilteredGenres = () => {
  return {
      FilteredGenres
  }
}

 const MultipleSelectPlaceholder = () => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    FilteredGenres = event.target.value;
  };

  return (
    <div>
      <FormControl sx={{ mx: 1.6, width: 0.9, mt: 1.5, mb: 2, display: 'flex' }}>
        <Select
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Pick one or more genre...</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Placeholder</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export {MultipleSelectPlaceholder, getFilteredGenres};