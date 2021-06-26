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
import axios from 'axios';

import base_url from '../../pages/login/Env'



const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
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

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferList() {


  useEffect(() => {
    fetchData();
  }, [])
  // Update the document title using the browser API
  // alert("jkkjjk")

  async function fetchData() {


    const URL = base_url + 'api/card/3'
    const Bearer = sessionStorage.getItem('token')
    const AuthStr = "Bearer " + Bearer
    try {
      let response = await axios.get(URL, { headers: { Authorization: AuthStr } })
      let card = await response.data
      await setLeft(card.payload_json)
      await setCardName(card.card_name)
      console.log(card);

    }
    catch {
      console.log("error happend");

    }
  }



  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [cardName , setCardName] = useState('')
  const [right, setRight] = React.useState([]);


  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };


  const customList = (title, items) => (
    <Card >
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />

      <List className={classes.list} dense component="div" role="list">
        {items.map((value, Index) => {
          const labelId = `transfer-list-all-item-${value}-label`;
          const { displayname, filed, show, values, filedDesc } = value
          if (show === 1)
            return (
              <ListItem key={Index} role="listitem" button onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${Index + 1}. ${displayname}`} />
              </ListItem>
            );
        })}
        <ListItem />
      </List>
    </Card>
  );


  return (
    <>
      <TextField
        placeholder="Enter Template Name"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
     
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        style={{ marginLeft: 900, marginTop: 0, marginBottom: 10, marginRight: 0 }}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
      <div  className="card text-center">
      <h4 className="card-body"> {cardName}</h4> 
        </div>
      <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}
        style={{ margin: 5 }}>
        <Grid item>{customList('Choices for update', left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>

          </Grid>
        </Grid>
        <Grid item>{customList('Chosen', right)}</Grid>

      </Grid>
    </>
  );
}