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
    switch(currentPath) {
      case 'home':
        $('body').attr('id', 'home');
        break;
      case 'works':
        $('body').attr('id', 'works');
        break;
      case 'people':
        $('body').attr('id', 'people');
        break;
      case 'post':
        $('body').attr('id', 'post');
        break;
      default:
        $('body').attr('id', 'contact');
        break;
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
