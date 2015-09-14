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
    var productionTeam = '';

    // if(work.acf.production_team !== '0') {
    //   var productionTeam = work.acf.production_team.map((team, index) => {
    //     if(index+1 === work.acf.production_team.length){
    //       return ( <span key={index}>{` ${team.pt_name}`}</span> )
    //     } else {
    //       return ( <span key={index}>{` ${team.pt_name} `}<span>X</span></span> )
    //     }
    //   });
    // }

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
      return {member: null, work: [], link: []};
  },

  getDetail() {
      var member = this.getParams().people;
      if (member == this.state.member) return;
      var state = {member: member, work: [], link: []};

      var getWorks = $.getJSON('/wp-json/posts', {'filter[tag]': member,  'filter[posts_per_page]': 200}).done((result) => {
        if(result.length) {
          result.map((entry) => {
            if (state[entry.terms.category[0].slug]) {
                state[entry.terms.category[0].slug].push(entry);
            }
          });
        }
      });

      var getLinks = $.getJSON(`/wp-json/pages/people/${member}`).done((result) => {
        if(result.acf.link !== '0') {
          var links = result.acf.link;
          state['link'] = links;
        }
      });

      $.when(getWorks, getLinks).done(() => {
        this.setState(state);
      });
  },

  componentDidMount() {
      this.getDetail();
  },

  componentWillReceiveProps() {
      this.getDetail();
  },

  _onClickItem(path) {
      this.transitionTo(`/post/${path}/`);
  },

  render() {

    var works = this.state.work.length ? this.state.work.map((work) => <WorkItem key={work.guid} {...work} />) : '';
    var links = this.state.link.length ? this.state.link.map((link) => <LinkItem key={link.link_title} {...link} />) : '';

    return (
      <div>
        {this.state.work.length ?
          <div className="project">
            <h1 className="project__title">Project</h1>
            <div className="project__list">{works}</div>
          </div>
        : ''}

        {this.state.link.length ?
          <div className="links">
            <h1 className="links__title">Link</h1>
            <div className="links__list">{links}</div>
          </div>
        : ''}
      </div>
    )
  }
});
