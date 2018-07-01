import React from 'react';
import './image.css';

const Image = () => ({
  render() {
  	console.log('props: ',this.props);
  	const thumbUrl = `/media/${this.props.thumbUrl}`;
    return (
      <div className="block single">
      	<div className="content opacity" style={this.props.styles}>
      		<h2>{this.props.title}</h2>
        	<img src={thumbUrl} alt={this.props.title} />
        	<h3>{this.props.description}</h3>
        </div>
      </div>
    );
  }
});

export default Image;