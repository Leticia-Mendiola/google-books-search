import React, { useContext, useRef } from "react";
import { Paper, InputBase, makeStyles, IconButton, Grid } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      paddingLeft: 10,
    },
  }));

function SearchForm({ setResultsState }) {
  const searchInput = useRef();
  // const { handleResultsState } = useContext(SearchContext);
  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput.current.value}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      // handleResultsState(data.items)
      setResultsState(data.items)
    })
    .catch(e => console.log(e));
  };
  const classes = useStyles();

    return (
      <Paper 
      component="form"
      onSubmit={handleOnSubmit}
      >
        <Grid container alignItems="center" justify="space-between">
          <InputBase
              className={classes.input}
              placeholder="Search Google Books"
              inputProps={{ 'aria-label': 'search google books' }}
              inputRef={searchInput}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
          </IconButton>
        </Grid>
      </Paper>
    )
}

export default SearchForm;