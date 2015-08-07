var React = require('react');
var Route = require('react-router');
var {RouteHandler} = Route;
var DocumentTitle = require('react-document-title');

module.exports = React.createClass({

  render() {
    var title = "Panbanisha Inc.";

    return (
      <DocumentTitle title={title}>
        <figure className="logo">
          <img src="/assets/images/logo.png" />
        </figure>
      </DocumentTitle>
    );
  }
});
