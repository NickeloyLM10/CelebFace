import React from 'react';
import Navigation from './components/Navigation';
import Logo from './components/Logo/Logo';
import Particles from 'react-particles-js';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import Signin from './components/signin/signin';
import Register from './components/register/register';
import FaceRec from './components/FaceRec/FaceRec';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';
import { Component } from 'react';

const app = new Clarifai.App({
  apiKey: '47aee612339c43be8cd15faf4baff22a'
});


const ParticlesOptions = {
  particles: {
      number: {
        value: 120,
        density: {
          enable: true,
          value_area: 2400
        }
      }
  }
}

const initialState = 
  {
    input: '',
    imageUrl:'',
    box:{},
    route: 'signin',
    isSignedIn: false,
    user: {
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined: ''
    }
  }


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({ user: {
              id: data.id,
              name: data.name,
              email: data.email,
              entries: data.entries,
              joined: data.joined,
            }

    })
  }


  calculateFaceLoc = (data) => {
   const clarFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const x = data.outputs[0].data.regions[0].data.concepts;
   x.sort();
  // const name1= 
   const image = document.getElementById('inputImage');
   const width = Number(image.width);
   const height = Number(image.height);
   console.log(x);
   return{
     leftcol: clarFace.left_col * width,
     toprow: clarFace.top_row * height,
     rightcol: width - (clarFace.right_col * width),
     bottomrow: height - (clarFace.bottom_row * height),
     name1: x[0].name,
     value1: x[0].value,
     
   }
  }

  displayFace = (box) => {
    console.log(box);
    this.setState({box: box});
  }
  onRouteChange = (route) => {
    if(route==='signout'){
      this.setState(initialState)
    }
    else if(route==='home'){
      this.setState({isSignedIn:true});
    }
    this.setState({route: route});
  }
  onInputChange = (event) => {
     this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.CELEBRITY_MODEL,
      this.state.input)
      //.then(response => response.json())
    .then(response =>{
      if(response){
      fetch('http://localhost:4000/image', {
        method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
      })
      })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, 
          { entries: count}))
      })
      .catch(console.log)
    }
    this.displayFace(this.calculateFaceLoc(response))
    })
    .catch(err => console.log(err)); 
    // const a=response.outputs[0].data.regions[0].data.concepts;
      // a.sort();
      // console.log(a);
      //   alert(a[0].name);
        // do something with responseconsole.log(response);
  } 

  render(){
    const {isSignedIn, imageUrl, route, box } = this.state;
  return (
    <div className="App">
      <Particles className='particles' 
                params={ParticlesOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>{
        route==='home'
        ? <div>
          <Logo/>
            <Rank 
            name={this.state.user.name} 
            entries={this.state.user.entries}/>
          <ImageLinkForm 
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRec box={box} imageUrl={imageUrl}/>
        </div>
        : (
          route === 'signin'
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
      }
    </div>
  );
 }
}

export default App;
