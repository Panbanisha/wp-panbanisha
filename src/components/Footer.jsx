var React = require('react');

module.exports = React.createClass({
  render() {
    return (
      <footer className="footer">
        <nav className="footer__author">
          <ul className="footer__author__list">
            <li>Produce<span>:</span><a href="">Shohei Suwa</a></li>
            <li>Graphic<span>:</span><a href="">Ryota Fujinaka</a></li>
            <li>Engineering<span>:</span><a href="">Ryo Ikarashi</a></li>
          </ul>
        </nav>
        <small className="footer__copyright">Copyright&copy;2015 Panbanisha inc. All Rights Reserved.</small>
      </footer>
    )
  }
});
