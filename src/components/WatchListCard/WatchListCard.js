import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './WatchListCard.css';

export class WatchListCard extends Component {

  handleClick = () => {    
    const { name, img, e_id, date, url, venue_name, address, handleSelection } = this.props;
    const favoriteInfo = { name, img, e_id, date, url, venue_name, address };
    handleSelection(favoriteInfo);
  }

  render() {
    const { name, e_id, img } = this.props;
    return (
      <div className='watch-list-card' key={e_id} onClick={this.handleClick}>
        <h1>{name}</h1>
        <img alt='shows who is playing the event' src={img}/>
      </div>
    );
  }
}

WatchListCard.propTypes = {
  name: PropTypes.string, 
  e_id: PropTypes.string, 
  img: PropTypes.string, 
  date: PropTypes.string, 
  url: PropTypes.string, 
  venue_name: PropTypes.string, 
  address: PropTypes.string,
  handleSelection: PropTypes.func
};
