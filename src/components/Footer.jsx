var React = require('react');

module.exports = React.createClass({
  render() {
    return (
      <footer className="footer">
        <div className="footer__inner">
          <nav className="footer__author">
            <ul className="footer__author__list">
              <li>Produce<span className="separator">:</span><a href="">Shohei Suwa</a><span className="separator">/</span></li>
              <li>Graphic<span className="separator">:</span><a href="">Ryota Fujinaka</a><span className="separator">/</span></li>
              <li>Engineering<span className="separator">:</span><a href="">Ryo Ikarashi</a></li>
            </ul>
          </nav>
          <small className="footer__copyright">Copyright<span className="copyright-mark">&copy;</span>2015 Panbanisha inc. All Rights Reserved.</small>
        </div>
      </footer>
    )
  }
});
