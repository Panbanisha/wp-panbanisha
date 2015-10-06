var React = require('react');
var Route = require('react-router');
var {RouteHandler, Link} = Route;
var DocumentTitle = require('react-document-title');

var $ = require('jquery');
var MobileDetect = require('mobile-detect');
var isMobile = !!new MobileDetect(navigator.userAgent).mobile();

module.exports = React.createClass({

  componentDidMount() {
    this.videoLoaded();

    $('.bg-video, .bg-video__inner, .logo img').css({'height': $(window).outerHeight() + 'px'});
    this.videoResize();
  },

  componentDidUpdate() {
    this.videoResize();
  },

  videoResize() {
    $(window).resize(() => {
      $('.bg-video, .bg-video__inner, .logo img').css({'height': $(window).outerHeight() + 'px'});
    });
  },

  videoLoaded() {
    $('body').css('display', 'none');
    console.log(isMobile);
    if(isMobile) {
      $('body').fadeIn(500);
    } else {
      $('.bg-video .bg-video__item').on('canplay', (e) => {
        $(e.target).parents('body').fadeIn(500);
      });
    }
  },

  render() {
    var title = "Panbanisha Inc.";

    return (
      <DocumentTitle title={title}>
        <div>
          <div className="home-bg-wrapper">
            <div className="overlay"></div>
            <div className="bg-video">
              <div className="bg-video__inner">
                <video className="bg-video__item" loop muted autoPlay>
                  <source src="/assets/videos/panbanisha-home-video.mp4" type="video/mp4" />
                  <source src="/assets/videos/panbanisha-home-video.webm" type="video/webm" />
                  <source src="/assets/videos/panbanisha-home-video.ogv" type="video/ogg" />
                </video>
              </div>
            </div>
            <figure className="logo">
              <img className="logo__cover--lg" src="/assets/images/bg-video-cover.png" />
              <img className="logo__cover--sm" src="/assets/images/bg-video-cover--mobile.png" />
            </figure>
          </div>
          <nav className="home-nav">
            <ul>
              <li><Link to="/works/">Works</Link></li>
              <li><Link to="/people/">People</Link></li>
              <li><Link to="/contact/">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </DocumentTitle>
    );
  }
});
