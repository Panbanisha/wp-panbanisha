var React = require('react');
var Route = require('react-router');
var {RouteHandler} = Route;
var DocumentTitle = require('react-document-title');

module.exports = React.createClass({

  render() {
    var title = "お探しのページがみつかりませんでした";

    return (
      <DocumentTitle title={title}>
        <div className="not-found">
          <p>お探しのページがみつかりませんでした。</p>
        </div>
      </DocumentTitle>
    );
  }
});
