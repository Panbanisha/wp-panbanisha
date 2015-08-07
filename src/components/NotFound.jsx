var React = require('react');
var Route = require('react-router');
var {RouteHandler} = Route;
var DocumentTitle = require('react-document-title');

module.exports = React.createClass({

  render() {
    var title = "Sorry :( but it's under construction";

    return (
      <DocumentTitle title={title}>
        <figure class="logo">
          <img src="/assets/images/logo.png" />
        </figure>
        <p>The website is under construction...</p>
      </DocumentTitle>
    );
  }
});
