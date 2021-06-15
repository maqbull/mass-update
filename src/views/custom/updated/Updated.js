import React, { useState, useEffect } from 'react';
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

const useStyles = makeStyles((theme) => ({
    root: {
      margin: 'auto',
      fontSize: 25
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
  
  
  export default function Updated() {
    const classes = useStyles();
   return (
       <div className={classes.root}>Hello
       I have made that separate component
       </div>
   )
   
   
  }