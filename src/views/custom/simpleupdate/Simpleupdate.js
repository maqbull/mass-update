import React, { useState, useEffect } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { green } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SaveIcon from '@material-ui/icons/Save';
import ViewListIcon from '@material-ui/icons/ViewList';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import axios from 'axios';

import base_url from '../../pages/login/Env'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    justifyContent: 'center',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 350,
    height: 350,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(1, 0),
  },
}));

export default function TransferList() {

  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [cardName , setCardName] = useState('')
  const [right, setRight] = React.useState([]);

  async function fetchData() {
    const URL = base_url + 'api/card/1'
    const Bearer = sessionStorage.getItem('token')
    const AuthStr = "Bearer " + Bearer
    try {
      let response = await axios.get(URL, { headers: { Authorization: AuthStr } })
      let card = await response.data
      await setLeft(card.payload_json)
      await setCardName(card.card_name)
      // console.log(card);

    }
    catch {
      console.log("error happend");

    }
     
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
   
    <div  className="cardname" >
     <p className="name"> { cardName} </p>
        </div>
      
     
      <Grid item xs={12} sm={12} md={4} lg={4}
      style={{
        textAlign:'center' // this does the magic
    }}
      >
      
     <div className="action">
     <div className="upload">
    <CloudUploadIcon style = {{fontSize:150}}/> 
   <div className="text">choose files to upload</div>
    </div> 
     <div className="download">
    <ArrowDownwardIcon style = {{fontSize:100 ,marginBottom:20,
      background:'#48b3dd',color:'whitesmoke'}}/> 
   <div className="text">choose templates to download</div>

    </div> 
     </div>
      </Grid>
      
        </>
  )

}
