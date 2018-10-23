import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

export class App extends Component {
  handleClick = () => {
    this.props.setUser();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello World</h1>
        </header>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect( mapStateToProps, mapDispatchToProps )(App);
