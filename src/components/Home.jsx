var React = require('react');
var Route = require('react-router');
var {RouteHandler, Link} = Route;
var DocumentTitle = require('react-document-title');

var Logo = require('../data').logo;

var $ = require('jquery');
var MobileDetect = require('mobile-detect');
var isMobile = !!new MobileDetect(navigator.userAgent).mobile();
var imagesLoaded = require('imagesloaded');

module.exports = React.createClass({

  componentDidMount() {
    this.videoLoaded();
    $('.bg-video, .bg-video__inner, .logo img').css({'height': $(window).outerHeight() + 'px'});
    this.videoResize();
    $('svg').load((e) => {
      console.log('finished loading');
      console.log($(e.target).width());
      this.resizeSVGViewBox();
    });
    $(window).trigger('resize');
    $(window).resize(this.resizeSVGViewBox);
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
    const INITSVGWIDTH = 1200;
    var screenW = $(window).width();
    var screenH = $(window).height();
    var $svg = $('.logo__svg');

    var svgW = $svg.width();
    var svgH = $svg.height();

    console.log(svgH);

    var $panelLR = $('.fill-space--l, .fill-space--r');
    var $panelTB = $('.fill-space--t, .fill-space--b');

    // 横がはみ出る場合
    if(screenW > INITSVGWIDTH) {
      var fillW = (screenW - svgW) / 2 + 1;
      $panelLR.width(fillW);
      $panelTB.height(0);
      var fillH = null;
      // 縦がはみ出るかつ横もはみ出る場合
      if(screenH > svgH) {
        console.log('縦も!');
        fillH = (screenH - svgH) / 2;
        console.log(fillH);
        $panelTB.height(fillH);
        $panelLR.css({'top': fillH});
        $panelLR.height(screenH - 2 * fillH);
      }
    } else {
      // 縦のみがはみ出る場合
      var fillH = (screenH - svgH) / 2;
      $panelTB.height(fillH);
      $panelLR.width(0);
    }
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
              <span className="fill-space fill-space--l" />
              <span className="fill-space fill-space--r" />
              <span className="fill-space fill-space--t" />
              <span className="fill-space fill-space--b" />
              <svg className="logo__svg" viewBox="0 0 841.891 595.279">
                <g>
                  <defs>
                    <mask id="maskedText">
                      <rect fill="#fff" width="100%" height="100%" />
                      <path d={Logo.path} />
                    </mask>
                  </defs>
                  <rect id="svgBg" width="100%" height="100%" fill="rgba(51, 51, 51, .6)" className="svgLogoMask" />
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
