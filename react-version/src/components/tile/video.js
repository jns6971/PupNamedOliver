import React, {Component} from 'react';
import './video.css';

class Video extends Component {

	playVideo = () => {
		console.log('play: ',this);
		// this.playVideo();
	}

	stopVideo = () => {
		console.log('stop: ',this);
		// this.pause();
	}

	componentDidMount() {
		console.log('this.video: ',this.video);
		this.video.addEventListener('mouseover', this.playVideo());
		this.video.addEventListener('mouseout', this.stopVideo());
	}

  render() {
  	console.log('this: ',this);
  	let url;
  	const sources = this.props.videoUrls.map( (videoUrl, index) => {
  		url = `/media/${videoUrl.url}`;
  		return <source src={url} type={videoUrl.type} key={index} />;
  	});

    return (
	    <div className="block single">
	      <video ref={(video) => { this.video = video; }}>
					{sources}
				</video>
	    </div>
    );
  }
};

export default Video;