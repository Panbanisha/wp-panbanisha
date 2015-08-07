var React = require('react');
var Route = require('react-router');
var {RouteHandler} = Route;

var Header = require('./Header');
var Footer = require('./Footer');

module.exports = React.createClass({

  render() {
    return (
        <div>
          <Header />
          <div className="page-main">
            <RouteHandler />
          </div>
          <Footer />
        </div>
    );
  }
});
