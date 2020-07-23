import React, { useState, useEffect } from 'react';
import './App.css';
import * as service from "./server";
const SelectBox = React.lazy(() => import('./select-search-dropdown/select-box'));


const App = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isPrivilege] = useState(true);
  const [countries, setCountries] = useState([]);


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

  async function fectchAPI() {
    await service.getData() 
    .then(res => {
      console.log('res', res);
      setCountries(res)

      console.log(countries)
    })
    .catch((err) => console.error(err))
  }
  
  useEffect(() =>{
    // fectchAPI()
    service.getData() 
    .then(res => {
      setCountries(res);
    })
    .catch((err) => console.error(err))
  },[]);

  return (
    <div className="app">
      <React.Suspense fallback='Loading Selectbox...'>
        <SelectBox
          isPrivilege={isPrivilege}
          options={countries}
          addCountry={addCountry}
        />
      </React.Suspense>
      
      {
        selectedCountry
          ? <p>Selected Value is  <strong>{selectedCountry} </strong></p>
          : ""
      }
    </div>
  );
}

export default App;
