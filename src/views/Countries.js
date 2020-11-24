import { Container, InputBase, Button, Box } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const Countries = (props) => {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const handleInputValue = (e) => {
    setSearchInput(e.target.value);
  }

  const search = (e) => {
    if(e.which === 13) {
      props.openBackdrop();
      axios.get(`/countries?name=${searchInput.trim()}`).then(res => {
        setCountries(res.data);
        props.closeBackdrop();
      })
    }
  }

  const openCountryPage = (e) => {
    let slug = e.currentTarget.getAttribute('data-slug');
    let country = e.currentTarget.getAttribute('data-country');
    props.history.push(`/countries/${slug}?name=${country}`);
  }

  let countryElements = countries.map(c => { 
    return <Box className='item' data-slug={c.slug} data-country={c.country} key={c.slug} onClick={openCountryPage}>
      <div className='item-header'>{c.country}</div>
    </Box>;
  })
  return (
    <Container className='countries'>
      <Box className='search-bar' display='flex' justifyContent='center'>
        <InputBase placeholder={'search...'} className='search-bar-input' onChange={handleInputValue} onKeyPress={search}></InputBase>
        <Button variant="contained" color="primary" onClick={search}>Search</Button>
      </Box>
      <Box className='result-box'>
        {countryElements}
      </Box>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    
  }
}

const mapDispatchToProps = {
  openBackdrop: () => ({ type: "OPEN_BACKDROP", payload: true }),
  closeBackdrop: () => ({ type: "CLOSE_BACKDROP", payload: false })
}

export default connect(mapStateToProps, mapDispatchToProps)(Countries);