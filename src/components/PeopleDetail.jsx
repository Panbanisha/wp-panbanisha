var React = require('react');
var Router = require('react-router');
var {State, Navigation, Link} = Router;

var $ = require('jquery');
var _ = require('underscore');

var WorkItem = React.createClass({

  trimDate(date) {
    date = date.split('T');
    return date[0].replace(/-/g, '.');
  },

  render() {

    var work = this.props;

    return (
      <div className="project__item">
        <Link to="Post" params={{post: work.slug}}>
          <fugure className="project__item__img">
            <img src={work.featured_image.guid} />
            <figcaption className="project__item__caption">
              <div className="project__item__caption__inner">
                <h2 className="project__item__caption__title">{work.title}</h2>
                <div className="project__item__caption__title__sub">
                  <p className="project__item__caption__date">{this.trimDate(work.modified)}</p>
                </div>
              </div>
            </figcaption>
          </fugure>
        </Link>
      </div>
    )
  }
});

var BgItemsInYear = React.createClass({
  render() {
    var itemsInYear = this.props.itemsInYear;
    return (
      <div>
        { itemsInYear.map((item) => <div key={item.bg_message} className="background__item__message" dangerouslySetInnerHTML={{__html: item.bg_message}} />) }
      </div>
    )
  }
});

var BackgroundItems = React.createClass({

  sortBgItems(bgItems) {

    var sortedBgItems = {};

    function sortDescending(value) {
      return value * 1;
    }

    var groupedBgItems = _.groupBy(bgItems, (obj) => {
      return obj.bg_year;
    });

    var years = _.sortBy(_.keys(groupedBgItems), sortDescending);

    years.map((year) => { sortedBgItems[year] = groupedBgItems[year]; })

    return sortedBgItems;
  },

  render() {

    var bgItems = this.sortBgItems(this.props.backgroundItems);

    return (
      <div>
        {
          Object.keys(bgItems).map((year) => {
            return (
              <div key={year} className="background__item">
                <div className="background__item__inner">
                  <div className="background__item__date"><span>{{year}}</span></div>
                  <BgItemsInYear itemsInYear={bgItems[year]} />
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

});

var LinkItem = React.createClass({

  render() {

    var link = this.props;

    return (
      <div className="links__item">
        <div className="links__item__inner">
          <figure className="links__item__img">
            <a href={link.link_url} target="_blank"><img src={link.link_img} /></a>
          </figure>
          <div className="links__item__desc">
            <h2 className="links__item__desc__title">{link.link_title}</h2>
            <a href={link.link_url} target="_blank">{link.link_url}</a>
          </div>
        </div>
      </div>
    )
  }

});

module.exports = React.createClass({
  mixins: [State, Navigation],

  getInitialState() {
      return {
        member: null,
        work: [],
        background: [],
        link: [],
        sns: []
      };
  },

  getDetail() {
      var member = this.getParams().people;
      if (member == this.state.member) return;
      var state = {member: member, work: [], background: [], link: []};

      var getWorks = $.getJSON('/wp-json/posts', {'filter[tag]': member,  'filter[posts_per_page]': 200}).done((result) => {
        if(result.length) {
          result.map((entry) => {
            if (state[entry.terms.category[0].slug]) {
                state[entry.terms.category[0].slug].push(entry);
            }
          });
        }
      });

      var getPeopleDetails = $.getJSON(`/wp-json/pages/people/${member}`).done((result) => {
        if(result.acf.link !== '0') {
          var links = result.acf.link;
          state['link'] = links;
        }
        if(result.acf.background != '0') {
          var background = result.acf.background;
          state['background'] = background;
        }
        if(result.acf.sns != '0') {
          var sns = result.acf.sns;
          state['sns'] = sns;
        }
      });

      $.when(getWorks, getPeopleDetails).done(() => {
        this.setState(state);
      });
  },

  countMemberSection() {
    var $sections = $('.member-info > div');
    var numOfSection = $sections.length;

    $.each($sections, (index) => {
      var mark = (index + 1) % 2 == 0 ? 'even' : 'odd';
      $sections.eq(index).find('h1').addClass(mark);
    });
  },

  addSNS() {
    // remove already existed DOM
    $('.member__item__single__sns').remove();

    // add SNS list
    if(this.state.sns !== '0' && this.state.sns !== undefined) {
      var parentDOM = `<ul class="member__item__single__sns"></ul>`;
      $('.member__item__single__desc').append(parentDOM);

      this.state.sns.map((item) => {
        var childDOM = `<li class="sns__item"><a href="${item.sns_url}" class="fa fa-${item.sns_media}"></a></li>`;
        $('.member__item__single__sns').append(childDOM);
      });
    }
  },

  componentDidMount() {
    this.getDetail();
    this.countMemberSection();
  },

  componentWillReceiveProps() {
    this.getDetail();
  },

  componentDidUpdate() {
    this.countMemberSection();
    this.addSNS();
  },

  _onClickItem(path) {
    this.transitionTo(`/post/${path}/`);
  },

  render() {

    var works = this.state.work.length ? this.state.work.map((work) => <WorkItem key={work.guid} {...work} />) : '';
    var links = this.state.link.length ? this.state.link.map((link) => <LinkItem key={link.link_title} {...link} />) : '';
    var backgroundItems = this.state.background.length ? <BackgroundItems backgroundItems={this.state.background} /> : '';

    return (
      <div className="member-info">
        {this.state.work.length ?
          <div className="project">
            <h1 className="project__title">Project</h1>
            <div className="project__list">{works}</div>
          </div>
        : ''}

        {this.state.background.length ?
          <div className="background">
            <h1 className="background__title">Background</h1>
            <section className="background__list">{backgroundItems}</section>
          </div>
        : ''}

        {this.state.link.length ?
          <div className="links">
            <h1 className="links__title">Link</h1>
            <section className="links__list">{links}</section>
          </div>
        : ''}
      </div>
    )
  }
});
