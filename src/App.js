import React, { useState } from 'react';
import './App.css';
import SelectBox from './select-search-dropdown/select-box';
import data from './data/countries.json';

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isPrivilege] = useState(true);
  const [countries, setCountries] = useState(data);

  const addCountry = (country) => {
    let isRecordExist = countries.filter(c => c.label === country).length > 0 ? true : false;
    const obj = {
      value: countries.length + 1,
      label: country
    }
    setSelectedCountry(country)

    if (!isRecordExist) {
      countries.push(obj)
    }
  }

  return (
    <div className="app">
      <SelectBox
        isPrivilege={isPrivilege}
        options={countries}
        addCountry={addCountry}
      />
      {
        selectedCountry
          ? <p>Selected Value is  <strong>{selectedCountry} </strong></p>
          : ""
      }
    </div>
  );
}

export default App;
