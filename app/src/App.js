import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SecondPart from './second.js';
import superagent from "superagent";

class App extends Component {
  constructor() {
    super();
    this.state = {
      firstpic: null ,
      expand: true,
      images: []
    }
  }
 fileChangedHandler = event => {
    this.setState({ firstpic: event.target.files[0] });
  }

  submitFirst(event){
    event.preventDefault();
    this.setState({
      expand: false
    })
    console.log(this.state.firstpic);
    
  }

  componentDidMount() {
    superagent
      .get("http://35.190.172.180:8000/links")
      .then(res => {
        console.log(res);
        this.setState({
          images: res.body.links
        })
        console.log(this.state.images[0]);
      })
      .catch(err => {
        console.log("err", err);
      });
  }


  render() {
  const isExpand = this.state.expand;
    return (
      <div>
      { isExpand ? (
         <div className="wrapper pt-5">
          <form onSubmit={this.submitFirst.bind(this)}
            className="form-signin pt-5"
            >
            <h2 className="text-center">Pic Upload</h2>
            <br/>
             <div className="text-center">
                    <input
                      type="file"
                      className="form-control-file border"
                      onChange={this.fileChangedHandler}
                      id="upload"
                     required
                    />
                  </div> 
                  <br/>    
            <button className="login_button btn btn-block btn-lg" type="submit">Next</button>   
          </form>
        </div>
        ) : (
        <div>
        <SecondPart firstValue={this.state.firstpic} images={this.state.images} />
        </div>
        )
      }
      </div>
    );
  }
}

export default App;
