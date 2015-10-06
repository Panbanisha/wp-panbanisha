var React = require('react/addons');
var cx = React.addons.classSet;
var Route = require('react-router');
var {State, Link} = Route;

var $ = require('jquery');

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

  _onScroll() {
    var scrollTop = $(window).scrollTop();
    var headerH = $('.header').height();
    var $navList = $('.header__nav__list');
    var $worksFilter = $('.works__filter');

    if(scrollTop >= headerH) {
      $navList.addClass('sticky');
      $worksFilter.addClass('sticky');
    } else {
      $navList.removeClass('sticky');
      $worksFilter.removeClass('sticky');
    }
  },

  componentDidMount() {
    $(window).on('scroll', this._onScroll);
    this.setCurrentWorksActive(this.getPathname());
  },

  componentWillUnmount() {
    $(window).off('scroll', this._onScroll);
  },

  componentWillReceiveProps() {
    this.setCurrentWorksActive(this.getPathname());
  },

  componendDidUpdate() {},

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
