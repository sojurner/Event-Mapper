import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EventTab.css';

class EventTab extends Component {
  displayEventTab = () => {};

  render() {
    const { events } = this.props;
    const x = events.map(event => {
      return <div>{event.name}</div>;
    });
    return <div className="tab-name">{x}</div>;
  }
}

export const mapStateToProps = state => ({
  events: state.events
});

export default connect(mapStateToProps)(EventTab);
