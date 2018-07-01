import React from 'react';
import './header.css';

const Header = () => ({
  render() {
    return (
      	<header id="header" className="block double yellow">
	      <div className="content header">
	        <h1>#PupNamedOliver</h1>
	        <h4>by <a href="http://jns6971.com/" target="_blank" rel="noopener noreferrer">Jordan Simon</a></h4>
	        <ul className="soc">
	          <li>
	            <h3>Share: </h3>
	          </li>
	          <li>
	            <a className="soc-facebook" href="javascript:window.open('https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fpupnamedoliver.jns6971.com%2F','mywindowtitle','width=685,height=368')" target="_blank" rel="noopener noreferrer"></a>
	          </li>
	          <li>
	            <a className="soc-twitter" href="javascript:window.open('https://twitter.com/intent/tweet?source=http%3A%2F%2Fpupnamedoliver.jns6971.com%2F&amp;text=Pup%20Named%20Oliver: http%3A%2F%2Fpupnamedoliver.jns6971.com%2F','mywindowtitle','width=685,height=438')" target="_blank" title="Tweet" rel="noopener noreferrer"></a>
	          </li>
	          <li>
	            <a className="soc-google soc-icon-last" href="javascript:window.open('https://plus.google.com/share?url=http%3A%2F%2Fpupnamedoliver.jns6971.com%2F','mywindowtitle','width=500,height=438')" target="_blank" title="Share on Google+" rel="noopener noreferrer"></a>
	          </li>
	        </ul>
	      </div>
       	</header>
    );
  }
});

export default Header;