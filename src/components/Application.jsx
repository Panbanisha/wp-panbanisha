var React = require('react');
var Route = require('react-router');
var {RouteHandler, State} = Route;

var $ = require('jquery');

var Header = require('./Header');
var Footer = require('./Footer');

module.exports = React.createClass({

  mixins: [State],

  addCurrentClass(currentPath) {
    currentPath = currentPath.split('/');
    currentPath = currentPath[1] !== '' ? currentPath[1] : 'home';
    if(currentPath == 'home' || 'works' || 'people' || 'post' || 'contact') {
      $('body').attr('id', currentPath);
    } else {
      $('body').attr('id', '404');
    }
  },

  componentDidMount() {
    this.addCurrentClass(this.getPathname());
  },

  componentDidUpdate() {
    this.addCurrentClass(this.getPathname());
  },

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
