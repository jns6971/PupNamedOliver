import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import Image from './image';
import Video from './video';
import './tile.css';

class Tile extends PureComponent {

  constructor(props) {
    super(props)
    this.handleScroll = this.scrollReveal.bind(this);
    this.state = {
      reveal: false,
      styles: this.randomizeStyles()
    };
  }

  componentDidMount() {
    if(!this.props.revealed){
      this.el = ReactDOM.findDOMNode(this.refs.tile);
      if(this.inView(this.el)){
        this.setRevealedState();
      }
      else{
        document.addEventListener('scroll', this.scrollReveal);
      }
    }
  }

  scrollReveal = () => {
    if (this.inView(this.el)) {
      document.removeEventListener('scroll', this.scrollReveal);
      this.setRevealedState();
    }
  }

  inView = el => {
    const bound = el.getBoundingClientRect();

    return ( 
      bound.bottom > 0 &&
      bound.top <= window.innerHeight
    );
  }

  randomizeStyles = () => {
    let directions = {
      0: 'translate(-100%, 0)', //left
      1: 'translate(100%, 0)',  //right
      2: 'translate(0, -100%)', //up
      3: 'translate(0, 100%)'   //down
    };

    return {
      transform: directions[(Math.floor(Math.random() * 4))],
      transitionDelay: (Math.random() * 1000) + 'ms',
      transitionProperty: 'transform'
    };
  }

  setRevealedState = () => {
    this.setState({
      reveal: true,
      styles: {
        ...this.state.styles,
        transform: 'translate(0, 0)'
      }
    });
  }

  render() {
    const type = this.props.type.toLowerCase();

    if(type === 'image'){
      return <Image ref="tile" {...this.props} revealClass={this.state.revealClass} styles={this.state.styles} />;
    }
    else if(type === 'video'){
      return <Video ref="tile" {...this.props} revealClass={this.state.revealClass} styles={this.state.styles} />
    }
    return;
  }
};

export default Tile;