import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Backdrop } from '@material-ui/core';
import Home from 'views/Home';
import Country from 'views/Country';
import Countries from 'views/Countries';
import Navbar from 'components/Navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 0,
    paddingRight: 10
  },
  menu: {
    flexGrow: 1
  },
  link: {
    color: "white",
    textDecoration: 'none',
    "&:hover, &:focus": {
      color: "#ececec"
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

function App(props) {
  const classes = useStyles();
  useEffect(() => {

  }, []);
  const { openBackdrop } = props;

  return (
    <Router>
      <Navbar />
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/countries' component={Countries} />
          <Route exact path='/countries/:slug' component={Country} />
        </Switch>
    </Router>
  );
}

const mapStateToProps = state => {
  return {
    openBackdrop: state.main.openBackdrop
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
