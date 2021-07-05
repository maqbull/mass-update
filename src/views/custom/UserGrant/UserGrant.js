import base_url from '../../pages/login/Env'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';

import axios from 'axios'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function EnhancedTable({ id }) {

  const [modules, setModules] = useState([])
  const [user_grant, setUser_grant] = useState([])
  const [card, setCard] = useState([])

  // handle sorting
  



  const fetchData = async () => {
    // const URL = base_url
    const Bearer = sessionStorage.getItem('token')
    const AuthStr = "Bearer " + Bearer

    const response = await axios.get(`${base_url}api/user_grant/${id}`, { headers: { Authorization: AuthStr } })
      .catch(err => console.log(err))

    if (response) {
      setUser_grant(response.data)
      await Promise.allSettled(
        [axios(`${base_url}api/api_modules/`, { headers: { Authorization: AuthStr } }),
        axios(`${base_url}api/cards/`, { headers: { Authorization: AuthStr } })
        ]).then((result) => {
          // console.log(result);

          const [modules, cards] = result
          const status = 'fulfilled'
          if (modules.status === status) {


            setModules(modules.value.data)
          }
          if (cards.status === status) {


            setCard(cards.value.data)
          }

        }).catch(err => console.log(err))

    }
    else {
      console.log("error");

    }


  }

  useEffect(() => {
    fetchData();
  }, [])

  let data = []
  if (modules.length > 1) {
    for (let i = 0; i < modules.length; i++) {
      data.push({
        ...modules[i],
        ...(card.find((itmInner) => itmInner.id === modules[i].id))
      })
    }
  }

  
  


  const classes = useStyles();
  return (<TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell> Modules</TableCell>
          <TableCell > Cards</TableCell>
          <TableCell > Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length > 1 &&
          data.map((row) => (
            <TableRow key={row.id}>
              <TableCell> {row.name} </TableCell>
              {row.card_name ? <TableCell> {row.card_name} </TableCell>
                : <TableCell>------</TableCell>
              }
              <TableCell>
                <button>
                  <CloseIcon />
                </button>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>

  </TableContainer>
    
  );
}

