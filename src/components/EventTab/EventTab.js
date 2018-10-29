import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventTab extends Component {
  displayEventTab = () => {
    const { events } = this.props;
    console.log(events);
    events.map(event => {
      return <div>{event.name}</div>;
    });
  };

  render() {
    return <div>{this.displayEventTab()}</div>;
  }
}

export const mapStateToProps = state => ({
  events: state.events
});

export default connect(mapStateToProps)(EventTab);
