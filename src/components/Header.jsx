var React = require('react');

module.exports = React.createClass({
  render() {
    return (
      <header className="header">
        <figure className="header__logo">
          <a href=""><img src="" alt="ホームへ" /></a>
        </figure>
        <nav className="header__nav">
          <ul className="header__nav__list">
            <li><a href="">Works</a></li>
            <li><a href="">People</a></li>
            <li><a href="">Contact</a></li>
          </ul>
        </nav>
      </header>
    )
  }
});
