var React = require('react');
var Route = require('react-router');
var {RouteHandler} = Route;

var Header = require('./Header');
var Footer = require('./Footer');

module.exports = React.createClass({

  render() {
    return (
        <div className="wrapper">
          <Header />
          <main className="page-main">
            <RouteHandler />
          </main>
          <Footer />
        </div>
    );
  }
});
