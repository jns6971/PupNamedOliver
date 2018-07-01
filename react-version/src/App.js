import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Tile from './components/tile';
import {connect} from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      index: 0,
      increment: this.props.increment || 24
    };
  }

  componentDidMount() {
    if(!this.props.data){
      return fetch('./oliver-data.json')
        .then(response => response.json())
        .then((responseJson) => {

          if(this.props.hideVideo){
            responseJson.feeds = responseJson.feeds.filter(tile => tile.type.toLowerCase() === "image");
          }

          // correction for header taking up 2 tiles
          const initialIncrement = this.state.increment - 2; 

          this.setState({
            isLoading: false,
            data: responseJson.feeds,
            revealedData: responseJson.feeds.slice(0, initialIncrement),
            index: ( this.state.index + initialIncrement )
          });

          document.addEventListener('scroll', this.trackScrolling);

        })
        .catch(error => {
          this.setState({
            isLoading: false,
            data: false
          });
          console.log('error: ',error);
        });
    }
  }

  revealMoreTiles = () => {
    this.setState({
      revealedData: this.state.data.slice(0, (this.state.index + this.state.increment)),
      index: ( this.state.index + this.state.increment )
    });
    if(this.state.index+1 <= this.state.data.length){
      document.addEventListener('scroll', this.trackScrolling);
    }
  }

  trackScrolling = () => {
    const App = document.getElementById('App');
    if (this.isBottom(App)) {
      document.removeEventListener('scroll', this.trackScrolling);
      this.revealMoreTiles();
    }
  }

  isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  render() {
    if (this.state.isLoading) { //display loading screen while waiting for jobs data
      return (
        <main>
          <Header />
        </main>
      );
    }
    else if(!this.state.data){ //display message if data failed 
      return (
        <main>
          <Header />
        </main>
      );
    }

    const tiles = this.state.revealedData.map( (tile, index) => {
        return <Tile {...tile} key={index} />;
    });

    return (
      <div id="App" className="App body-container">
        <Header />
        {tiles}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
