var React = require('react');
var Route = require('react-router');
var {RouteHandler, Link} = Route;
var DocumentTitle = require('react-document-title');

var Logo = require('../data').logo;

var $ = require('jquery');
var MobileDetect = require('mobile-detect');
var isMobile = !!new MobileDetect(navigator.userAgent).mobile();

module.exports = React.createClass({

  componentDidMount() {
    this.videoLoaded();

    $('.bg-video, .bg-video__inner, .logo img').css({'height': $(window).outerHeight() + 'px'});
    this.videoResize();
    this.resizeSVGViewBox();
  },

  componentDidUpdate() {
    this.videoResize();
  },

  videoResize() {
    $(window).resize(() => {
      $('.bg-video, .bg-video__inner, .logo img').css({'height': $(window).outerHeight() + 'px'});
    });
  },

  resizeSVGViewBox() {
    var screenH = $(window).height();
    var screenW = $(window).width();
    $('svg').attr('viewBox', `0 0 ${screenW} ${screenH}`);

    $(window).on('resize', () => {
      screenH = $(window).height();
      screenW = $(window).width();
      $('svg').attr('viewBox', `0 0 ${screenW} ${screenH}`);
    });

  },

  videoLoaded() {
    $('body').css('display', 'none');
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
              <svg viewBox="0 0 841.891 595.279" style={{'display': 'block'}}>
                <g>
                  <defs>
                    <mask id="maskedText">
                      <rect fill="#fff" width="100%" height="100%" />
                      <path d={Logo.path} />
                    </mask>
                  </defs>
                  <rect id="svgBg" width="100%" height="100%" fill="rgba(51, 51, 51, .7)" className="svgLogoMask" />
                </g>
              </svg>
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
