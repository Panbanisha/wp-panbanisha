var React = require('react');
var Route = require('react-router');
var {State, Link, Navigation} = Route;
var DocumentTitle = require('react-document-title');

var $ = require('jquery');
require('row-grid/row-grid.min.js');
var imagesLoaded = require('imagesloaded');
var MobileDetect = require('mobile-detect');
var isMobile = !!new MobileDetect(navigator.userAgent).mobile();

var WorkItem = React.createClass({

  mixins: [State],

  trimDate(date) {
    date = date.split('T');
    var trimDate = date[0].replace(/-/g, '.');
    return trimDate;
  },

  render() {

    var work = this.props;

    return (
      <figure className="works__item" key={this.props.key} ref="workItem">
        <Link to="Post" params={{post: work.slug}}>
          <img ref="work" src={work.featured_image.guid} width={work.featured_image.attachment_meta.width} height={work.featured_image.attachment_meta.height} />
          <figcaption className="works__item__caption">
            <div className="works__item__caption__inner">
              <h2 className="works__item__caption__title">{work.title}</h2>
              <div className="works__item__caption__member">
                {work.acf.all_member !== "0" || work.acf.all_member !== undefined ?
                  work.acf.all_member.map((member) => <p key={member.all_member_role}>{member.all_member_role}<span>:</span>{member.all_member_name}</p>)
                : ''}
              </div>
              <time className="works__item__caption__date">{this.trimDate(work.modified)}</time>
            </div>
          </figcaption>
        </Link>
      </figure>
    )
  }
});

module.exports = React.createClass({

  mixins: [State, Navigation],

  getInitialState() {
    return {
      works: []
    }
  },

  getWorks() {
    currentPath = this.getPathname();

    currentPath = currentPath.replace(/\/works/g, '').replace(/\//g, '').replace(/\//g, '');

    var CATEGORY_NAME = 'work';
    var POSTS_PER_PAGE = 10;

    var data = {
        'filter[category_name]': CATEGORY_NAME,
        'filter[posts_per_page]': POSTS_PER_PAGE,
        page: this._currentPage
    };

    currentPath !== '' ? data['filter[tag]'] = currentPath : '';

    return $.getJSON('/wp-json/posts', data).done((result) => {
      this._loading = !result.length;
      this.setState({works: result});
      this.adjustWidthAndHeight();
    });
  },

  getMoreWorks() {
    currentPath = this.getPathname();

    currentPath = currentPath.replace(/\/works/g, '').replace(/\//g, '').replace(/\//g, '');

    var CATEGORY_NAME = 'work';
    var POSTS_PER_PAGE = 10;

    var data = {
        'filter[category_name]': CATEGORY_NAME,
        'filter[posts_per_page]': POSTS_PER_PAGE,
        page: this._currentPage
    };

    currentPath !== '' ? data['filter[tag]'] = currentPath : '';

    return $.getJSON('/wp-json/posts', data).done((result) => {
      this._loading = !result.length;
      this.setState({works: this.state.works.concat(result)});
      this.adjustWidthAndHeight();
    });
  },

  adjustWidthAndHeight() {
    $('.works__item').each((index, item) => {

      // when all images get loaded
      imagesLoaded('.works__list', () => {
        var GridHeight = 300;
        var $GridItem = $(item);
        var $GridItemImg = $GridItem.find('img');

        var w = $GridItemImg.width();
        var h = $GridItemImg.height();

        var ratio = 1;
        var newWidth = 0;

        if(w > h) {
          ratio = w / h;
          newWidth = GridHeight * ratio;
        } else {
          ratio = h / w;
          newWidth = GridHeight / ratio;
        }
        $GridItem.css({width: `${newWidth}px`, height: `${GridHeight}px`});
        $GridItemImg.attr('width', `${newWidth}px`).attr('height', `${GridHeight}px`);

        // when mobile, then make images' width and height 100%
        if(isMobile) {
          $GridItem.css({width: '100%', height: '100%'});
          $GridItemImg.attr('width', '100%').attr('height', '100%');
        } else {
          this.rowGridInit();
        }

        // show item
        $(item).addClass('loaded');
      });
    });
  },

  rowGridInit() {
    var options = {minMargin: 15, maxMargin: 15, itemSelector: ".works__item", firstItemClass: "works__item--first-item", resize: true};
    $(React.findDOMNode(this.refs.worksList)).rowGrid(options);
  },

  _onScroll() {
    if (!this._loading && this.state.works.length > 0) {
      var win = $(window).height();
      var scrollTop = $(window).scrollTop();
      var bottom = win - $(window).scrollTop();
      if (bottom < 300) {
        this._loading = true;
        this._currentPage++;
        this.getMoreWorks();
      }
    }
  },

  resetWorks() {
    this._loading = false;
    this._currentPage = 1;
    this.setState({ works: [] });
    this.getWorks();
  },

  componentDidMount() {
    this._loading = false;
    this._currentPage = 1;
    this.setState({works: []});
    this.getWorks().then(() => {
      $(window).on('scroll', this._onScroll);
      this._onScroll();
    });
  },

  componentWillUnmount() {
    $(window).off('scroll', this._onScroll);
  },

  componentWillReceiveProps() {
    this.resetWorks();
  },

  componentDidUpdate() {
    this._onScroll();
    $.when(this._onScroll).done(() => {
      this.adjustWidthAndHeight();
    });
  },

  render() {

    var works = this.state.works.map((work) => <WorkItem key={work.guid} {...work} />);
    var title = "Works";

    return (
      <DocumentTitle title={`${title} | Panbanisha`}>
        <div className="works">
          <nav className="works__filter">
            <ul className="works__filter__list">
              <li className="works__filter__item"><Link to="WorkList">All</Link></li>
              <li className="works__filter__item"><Link to="WorkListMovie">Movie</Link></li>
              <li className="works__filter__item"><Link to="WorkListPhotograph">Photograph</Link></li>
              <li className="works__filter__item"><Link to="WorkListGraphic">Graphic</Link></li>
              <li className="works__filter__item"><Link to="WorkListProduct">Product</Link></li>
            </ul>
          </nav>
          <section className="works__list" ref="worksList">{works}</section>
        </div>
      </DocumentTitle>
    )
  }
});
