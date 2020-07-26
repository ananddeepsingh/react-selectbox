import React, { useState, useEffect } from 'react';

const SelectBox = ({ options, addCountry, isPrivilege }) => {
  const [renderAllRecords, setRenderAllRecords] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [searchString, setSearchString] = useState('');
  const [defaultValue] = useState('Select a Location');
  const [defaultValueoptions, setDefaultValueOptions] = useState(options);

  const formRef = React.createRef();

  const reset = () => {
    setShowSearchBox(!showSearchBox)
    setRenderAllRecords(false);
  }

  useEffect(() => {
    setDefaultValueOptions(options);
  }, [options]);

  const getSelectedCountry = event => {
    if (
      !event.target.classList.contains("country-not-found") &&
      event.target.tagName !== "STRONG"
    ) {
      if (event.target.classList.contains("add-country")) {
        addCountry(searchString);
        setSelectedCountry(searchString);
        setShowSearchBox(!showSearchBox)
        setSearchString('')
      } else {
        addCountry(event.target.innerText);
        setSelectedCountry(event.target.innerText);
        setShowSearchBox(!showSearchBox)
        setSearchString('')
      }

      // reset the form
      formRef.current.reset()
    }
  }

  const filterRecords = event => {
    setTimeout(
      renderCountryView.bind(null, event.target.value),
      1000
    )
  }

  const renderCountryView = (searchTerm) => {
    setSearchString(searchTerm)
  }

  const renderRemainingRecords = (countries) => {
    return !renderAllRecords && countries.length !== 0
      ? <div className="remaining-records" onClick={() => setRenderAllRecords(!renderAllRecords)}>
        {defaultValueoptions.length - 5} more ...
      </div>
      : ""
  }

  const renderCountries = (countries, searchString) => {
    if (countries.length) {
      return countries.map((country, index) => { return <li key={index}>{country.label} </li> })
    }

    if (isPrivilege) {
      return (
        <li className="country-not-found">
          <strong>"{searchString}" not found</strong>
          <button className="add-country">Add & Select</button>
        </li>
      )
    } else {
      return (
        <li className="country-not-found">
          <strong>"{searchString}" not found</strong>
        </li>
      )
    }
  }

  const renderDefaultHeading = () => {
    return <div className="search-result" onClick={reset}>
      <p>{selectedCountry ? selectedCountry : defaultValue}</p>
    </div>;
  }

  let countries = defaultValueoptions;
  let searchedString = searchString.trim().toLowerCase();
  if (searchedString.length > 0) {
    countries = defaultValueoptions.filter(country => {
      return country.label.toLowerCase().match(searchedString)
    });
  }

  return (
    <div className={"custom-selectbox-wrapper " + (showSearchBox ? 'show' : 'hide')}>
      {renderDefaultHeading()}
      <div className={"result-wrapper " + (renderAllRecords ? 'render-all-records' : '')}>
        {renderRemainingRecords(countries)}

        <form id="form" ref={formRef}>
          <div className="search-input-box">
            <div className="search-input-box__element">
              <input
                id="searchBox"
                type="text"
                placeholder="Search"
                onChange={event => filterRecords(event)} />
            </div>
          </div>
        </form>
        <ul onClick={event => getSelectedCountry(event)}>
          {renderCountries(countries, searchString)}
        </ul>
      </div>
    </div>
  )
}

export default SelectBox