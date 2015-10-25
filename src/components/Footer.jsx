var React = require('react');
var Route = require('react-router');
var { Link } = Route;

require('date-utils');

module.exports = React.createClass({

  render() {

    var dt = new Date();
    var year = dt.toFormat("YYYY");

    return (
      <footer className="footer">
        <div className="footer__inner">
          <nav className="footer__author">
            <ul className="footer__author__list">
              <li>Produce<span className="separator">:</span><Link to="/people/shohei_suwa/">Syohei Suwa</Link><span className="separator">/</span></li>
              <li>Graphic<span className="separator">:</span>Ryota Fujinaka<span className="separator">/</span></li>
              <li>Engineering<span className="separator">:</span><Link to="/people/ryo_ikarashi/">Ryo Ikarashi</Link></li>
            </ul>
          </nav>
          <small className="footer__copyright">Copyright<span className="copyright-mark">&copy;</span>{year} Panbanisha inc. All Rights Reserved.</small>
        </div>
      </footer>
    )
  }
});
