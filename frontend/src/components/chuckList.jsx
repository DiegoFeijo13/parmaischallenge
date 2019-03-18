import React from 'react'
import swagger from '../api'
import { Grid, Paper, Typography, Button, TextField, Select } from '@parmais/par-ui-material'
import { MenuItem } from '@material-ui/core';

/*
  TODO fetch data using the swagger API methods described in /docs
  hint:
  import swagger from '../api'
  swagger.then((client) => client.apis.facts.randomFact().then(console.log))
*/

class ChuckList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      facts: [{value:"Chuck Norris raced light. Now he is always in the dark!"}],      
      category: '',
      categories: [],
      query:''
    }

    this.listCategories();
    this.getRandom = this.getRandom.bind(this);
    this.getSearch = this.getSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);    
  }

  listCategories(){        
    swagger.then((client) => client.apis.facts.listCategories()
    .then(response => {             
      let cats = JSON.parse(response.data);         
      this.setState({categories:cats});
    }));   
  }

  getRandom(){
    let category = this.state.category;
    swagger.then((client) => client.apis.facts.randomFact({category:category})
    .then(response => {                 
      let newfact = JSON.parse(response.data);      
      console.log(newfact);
      this.setState({facts: [newfact]});      
    })); 
  }

  getSearch(){
    let query = this.state.query;    
    swagger.then((client) => client.apis.facts.search({query: query})
    .then(response => {                        
      this.setState({facts: JSON.parse(response.data)});      
    })); 
  }


  handleChange = name => e => {
    console.log(e.target.value);
    this.setState({ [name] :e.target.value });    
  }

  

  render(){    
    return (
      <div style={{padding: '100px'}}>
        <Grid container justify="center"
              alignItems="center">
          <Grid item>
            <Select 
              label="Category"                    
              onChange={this.handleChange('category')}
              value="catmenu">
              {this.state.categories.map((cat) => 
                <MenuItem value={cat}>{cat}</MenuItem>
              )}
            </Select>
          </Grid>
          <Grid item>
            <Button onClick={() => this.getRandom()}>Random Fact</Button>
          </Grid>
        </Grid>

        <Grid container justify="center"
              alignItems="center">
          <Grid item>
          <TextField
          id="query"
          label="Query"          
          value={this.state.query}
          onChange={this.handleChange('query')}
          margin="normal"          
        />
          </Grid>
          <Grid item>
            <Button onClick={() => this.getSearch()}>Search</Button>
          </Grid>
        </Grid>

        <Grid container justify="center"
              alignItems="center">
          <Grid item>
              {this.state.facts.map((fact) =>
                <Paper style={{padding: '100px', margin:'8px'}}>
                  <Typography>                    
                    {fact.value}
                  </Typography>
                </Paper>
              )}
        </Grid>      
      </Grid>
      </div>
    )
  }
}

export default ChuckList