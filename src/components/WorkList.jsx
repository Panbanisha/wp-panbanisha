var React = require('react');
var Route = require('react-router');
var {RouteHandler} = Route;

module.exports = React.createClass({
  render() {
    return (
      <div>
        <div>WorkList</div>
        <RouteHandler {...this.props} />
      </div>
    )
  }
});
