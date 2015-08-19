var React = require('react/addons');
var cx = React.addons.classSet;
var Route = require('react-router');
var {State, Link} = Route;

module.exports = React.createClass({

  mixins: [State],

  getInitialState() {
    return {isWorks: false};
  },

  setCurrentWorksActive(currentPath) {
    currentPath = currentPath.split('/');
    var isWorks = currentPath[1] === 'works';
    this.setState({isWorks: isWorks});
  },

  componentDidMount() {
    this.setCurrentWorksActive(this.getPathname());
  },

  componentWillReceiveProps() {
    this.setCurrentWorksActive(this.getPathname());
  },

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
            <li><Link to="WorkList" className={cx({active: this.state.isWorks})}>Works</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
});
