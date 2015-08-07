var React = require('react');
var Route = require('react-router');
var {RouteHandler} = Route;

module.exports = React.createClass({

  render() {
    return (
      <DocumentTitle title={title}>
        <div>
          <RouteHandler />
        </div>
      </DocumentTitle>
    );
  }
});
