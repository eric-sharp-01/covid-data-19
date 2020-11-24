import React, { useEffect, useState } from 'react';
import { Container, Grid, Box } from '@material-ui/core';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';



const Home = (props) => {
  const [worldData, setWorldData] = useState({
    newConfirmed: 0,
    newDeaths: 0,
    newRecovered: 0,
    totalConfirmed: 0,
    totalDeaths: 0,
    totalRecovered: 0
  });

  const [countries, setCountries] = useState([]);
  
  useEffect(() => {
    props.openBackdrop();

    axios.get('/summary').then(res => {
      let data = res.data;
      setWorldData(data.global)
      let countryData = data.countries.sort((b, a) => {
        return a.totalConfirmed - b.totalConfirmed;
      }).slice(0, 50);
      setCountries(countryData)
      props.closeBackdrop();
    })
  }, [])

  const countryElements = countries.map(c => {
    let maximum = countries[0].totalConfirmed;
    let width = `calc((100% - 240px) * ${c.totalConfirmed / maximum})`;

    return <div className="header-country" key={c.country}>
      <span>{c.country}</span>
      <Box className="quantity-indicator" width={width}>{c.totalConfirmed}</Box>
    </div>;
  })

  return (
    <Container className="home">
      <Grid container>
        <Grid item xs={12}>
          <div className="header-world">World</div>
          <Box className="today">Today: {moment(new Date()).format('YYYY-MM-DD')}</Box>
        </Grid>
        <Grid item xs={12}>
          <div className="world-data">
            <div>New Confirmed: {worldData.newConfirmed}</div>
            <div>New Deaths: {worldData.newDeaths}</div>
            <div>New Recovered: {worldData.newRecovered}</div>
            <div>Total Confirmed: {worldData.totalConfirmed}</div>
            <div>Total Deaths: {worldData.totalDeaths}</div>
            <div>Total Recovered: {worldData.totalRecovered}</div>
          </div>
        </Grid>
      </Grid>
      <Box marginTop={'20px'} />
      <Grid container>
        <Grid item xs={12}>
          {countryElements}
        </Grid>
      </Grid>
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


export default connect(mapStateToProps, mapDispatchToProps)(Home);