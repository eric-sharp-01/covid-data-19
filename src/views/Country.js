import { useParams, useLocation } from "react-router-dom";
import { Container, Box } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import moment from 'moment';
import axios from 'axios';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}


const Country = (props) => {
  const params = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const name = query.get('name');
  const [countryData, setCountryData] = useState([]);
  const { openBackdrop, closeBackdrop } = props;

  useEffect(() => {
    openBackdrop();
    axios.get(`/countries/${params.slug}`).then(res => {
      let data = res.data.map((item, index) => {
        let d = moment(new Date(item.date)).format('YYYY-MM-DD');
        return {
          ...item,
          date: d,
          index
        }
      })
      setCountryData(data);
      closeBackdrop();
    })
  }, [openBackdrop, closeBackdrop])

  const [columns] = useState([
    { name: 'date', title: 'Date' },
    { name: 'confirmed', title: 'Confirmed' },
    { name: 'active', title: 'Active' },
    { name: 'recovered', title: 'Recovered' },
    { name: 'deaths', title: 'Deaths' }
  ]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let tableBody = countryData.filter((item, index) => {
    return index >= page * rowsPerPage && index < page * rowsPerPage + rowsPerPage
  }).map((item, index) => {
    return <TableRow className="table-row" key={index}>
      <TableCell className="table-cell">{item.date}</TableCell>
      <TableCell className="table-cell">{item.confirmed}</TableCell>
      <TableCell className="table-cell">{item.active}</TableCell>
      <TableCell className="table-cell">{item.recovered}</TableCell>
      <TableCell className="table-cell">{item.deaths}</TableCell>
    </TableRow>;
  })

  return <Container className='country' maxWidth='lg'>
    <Box className='country-header'>{name}</Box>
    <TableContainer component={Paper} className="table-container">
      <Table stickyHeader>
        <TableHead className="table-head">
          <TableRow className="table-row">
            <TableCell className="table-cell">Date</TableCell>
            <TableCell className="table-cell">Confirmed</TableCell>
            <TableCell className="table-cell">Active</TableCell>
            <TableCell className="table-cell">Recovered</TableCell>
            <TableCell className="table-cell">Deaths</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="table-body">
          {tableBody}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      className="table-paging"
      rowsPerPageOptions={[10, 20, 50]}
      component="div"
      count={countryData.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  </Container>;
}

const mapStateToProps = state => {
  return {
    
  }
}

const mapDispatchToProps = {
  openBackdrop: () => ({ type: "OPEN_BACKDROP", payload: true }),
  closeBackdrop: () => ({ type: "CLOSE_BACKDROP", payload: false })
}

export default connect(mapStateToProps, mapDispatchToProps)(Country);