import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './App.js';
import superagent from "superagent";

class SecondPart extends Component {
  constructor(props) {
    super(props);
    const images= this.props.images;
    const firstdata = this.props.firstValue;
    this.state = {
      firstpic: firstdata ,
      images: images ,
      selectedpic: '',
      secondpic: null,
      email: '',
      link: '',
      expand: true
    }
  }
 selectChangedHandler = event => {
    this.setState({ selectedpic: event.target.value });
    document.getElementById("upload").style.display="none";
  }
  fileChangedHandler = event => {
    this.setState({
      secondpic: event.target.files[0]
    })
    document.getElementById("first").style.display="none";
  }
  handleEmail = event => {
    this.setState({
      email: event.target.value
    })
  }


  finalForm(event){
    event.preventDefault();
    console.log(this.state.selectedpic);
    console.log(this.state.secondpic);
    console.log(this.state.firstpic);
    console.log(this.state.email);
    let payload = new FormData();
    payload.append("image_upload", this.state.firstpic);
    payload.append("style_upload", this.state.secondpic);
    payload.append("select_style", this.state.selectedpic);
    payload.append("email", this.state.email);

     superagent
      .post("http://35.190.172.180:8000/upload")
      .send(payload)
      .then(res => {
        console.log(res);
        this.setState({
          method: res.body.method,
          link: res.body.link
        })

        if(res.body.method=='redirect'){
        window.open(res.body.link);
        }
        else {
          this.setState({
            expand: false
          })
        }


      })
      .catch(err => {
    console.log(payload)
        console.log("err", err);
      });

  }


  render() {
    const isExpand= this.state.expand;
    let i=0;
    return (
      <div style={{marginTop: '2rem'}}>
      { isExpand ? (
      <div>
      <p className="text-center">Choose one from these or upload another</p>
      <form onSubmit={this.finalForm.bind(this)}>
      <div className="row" style={{marginTop: '2rem'}} id="first">
      <div className="offset-md-1">
      </div>
      {
        this.state.images.map(data=>{
          
          return (
          <div key={++i} className="col-md-2 text-center">
            <label>
            <input 
              type="radio" name="image"
              value={data}
              onChange={this.selectChangedHandler}
              className="input-hidden" />
              <img 
            src={data} width="100%"
            alt="pic" />
            </label>
          </div>
          )
          
        })
      }
      </div>
      <br/>
      <hr style={{borderBottom: '2px solid black'}}/>
      <h2 className="text-center"> OR </h2>
       <div className="text-center w-25 mx-auto">
                    <input
                      type="file"
                      className="form-control-file border"
                      onChange={this.fileChangedHandler}
                      id="upload"
                     
                    />
                  </div> 
                  <br/>
                  <input
                    type="email"
                    className="form-control w-25 mx-auto"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleEmail}
                    required
                  />
                  <br/>
      <div className="text-center">
      <button className="btn login_button w-25" type="submit">Submit</button>
      </div>
      </form>
      </div>

      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
      <p>{this.state.link}</p>
      </div>
      ) }
      </div>
    )
  }
}

export default SecondPart;
