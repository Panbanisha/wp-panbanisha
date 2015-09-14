var React = require('react');
var Route = require('react-router');
var {State, Link, Navigation} = Route;

var $ = require('jquery');
require('row-grid/row-grid.min.js');
var imagesLoaded = require('imagesloaded');

var WorkItem = React.createClass({

  mixins: [State],

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
              <time className="works__item__caption__date">{work.modified}</time>
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
    console.log('currentPath: ' + currentPath);

    return $.getJSON('/wp-json/posts', data).done((result) => {
      console.log(result);
      this._loading = !result.length;
      this.setState({works: result});
      this.adjustWidthAndHeight(result.length);
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
      this.adjustWidthAndHeight(result.length);
    });
  },

  // addClassToNewItem(numOfNewItems) {
  //   $(`.works__item`).slice(0, numOfNewItems).addClass('new');
  // },

  adjustWidthAndHeight(numOfNewItems) {
    // this.addClassToNewItem(numOfNewItems);

    $('.works__item').each((index, item) => {
      // hide item
      // if(!$(item).hasClass('new')) {
      //   $(item).removeClass('loaded');
      // }

      // when images all loaded
      imagesLoaded('.works__list', () => {
        var GridHeight = 300;
        var $GridItem = $(item);
        var $GridItemImg = $GridItem.find('img');

        var w = $GridItemImg.width();
        var h = $GridItemImg.height();

        if(w > h) {
          var ratio = w / h;
          var newWidth = GridHeight * ratio;
          $GridItem.css({width: `${newWidth}px`, height: `${GridHeight}px`});
          $GridItemImg.attr('width', `${newWidth}px`).attr('height', `${GridHeight}px`);
        } else {
          var ratio = h / w;
          var newWidth = GridHeight / ratio;
          $GridItem.css({width: `${newWidth}px`, height: `${GridHeight}px`});
          $GridItemImg.attr('width', `${newWidth}px`).attr('height', `${GridHeight}px`);
        }
        this.rowGridInit();

        // show item
        $(item).addClass('loaded');
      });
    });
  },

  rowGridInit() {
    var options = {minMargin: 15, maxMargin: 15, itemSelector: ".works__item", firstItemClass: "works__item--first-item", resize: true, };
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
    // this._currentPath = this.getPathname();
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

    // reset state when a button gets clicked
    $('.works__filter__item > a').on('click', this.onNavClick);
  },

  onNavClick(e) {
    e.preventDefault();
    var targetRoute = $(e.target).attr("href");
    this.transitionTo(targetRoute);
    // this.resetWorks();
  },

  componentWillUnmount() {
    $(window).off('scroll', this._onScroll);
  },

  componentWillReceiveProps() {
    this.resetWorks();
  },

  componentDidUpdate() {

    this._onScroll();
  },

  render() {

    var works = this.state.works.map((work) => <WorkItem key={work.guid} {...work} />);

    return (
      <div className="works">
        <nav className="works__filter">
          <ul className="works__filter__list">
            <li className="works__filter__item"><a href="/works/">All</a></li>
            <li className="works__filter__item"><a href="/works/movie/">Movie</a></li>
            <li className="works__filter__item"><a href="/works/photograph/">Photograph</a></li>
            <li className="works__filter__item"><a href="/works/graphic/">Graphic</a></li>
            <li className="works__filter__item"><a href="/works/product/">Product</a></li>
          </ul>
        </nav>
        <section className="works__list" ref="worksList">{works}</section>
      </div>
    )
  }
});
