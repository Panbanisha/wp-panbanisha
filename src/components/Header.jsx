var React = require('react');
var Route = require('react-router');
var {Link} = Route;

module.exports = React.createClass({
  render() {
    return (
      <header className="header">
        <figure className="header__logo">
          <Link to="Root"><img src="/assets/images/header__logo.png" alt="ホームへ" /></Link>
        </figure>
        <nav className="header__nav">
          <ul className="header__nav__list">
            <li><Link to="Contact">Contact</Link></li>
            <li><Link to="PeopleList">People</Link></li>
            <li><Link to="WorkList">Works</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
});
