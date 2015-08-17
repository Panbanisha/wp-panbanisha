var React = require('react');
var Route = require('react-router');
var {State, Link} = Route;

var $ = require('jquery');

var WorkItem = React.createClass({

  mixins: [State],

  render() {

    var work = this.props;

    return (
      <figure className="works__item" key={this.props.key}>
        <Link to="Post" params={{post: work.slug}}>
          <img src={work.featured_image.guid} />
          <figcaption className="works__item__caption">
            <h2 className="works__item__caption__title">{work.title}</h2>
            <div className="works__item__caption__member">
              {work.acf.all_member !== "0" || work.acf.all_member !== undefined ?
                work.acf.all_member.map((member) => <p key={member.all_member_role}>{member.all_member_role}<span>:</span>{member.all_member_name}</p>)
              : ''}
            </div>
          </figcaption>
        </Link>
      </figure>
    )
  }
});

module.exports = React.createClass({

  mixins: [State],

  getInitialState() {
    return {works: []}
  },

  getWorks() {
    var currentPath = this.getPathname();
    currentPath = currentPath.replace(/\/works/g, '').replace(/\//g, '').replace(/\//g, '');

    var data = {'filter[category_name]': 'work', 'filter[tag]': currentPath, 'filter[posts_per_page]': 20};
    $.getJSON('/wp-json/posts', data).done((result) => {
      this.setState({works: result});
    });
  },

  componentDidMount() {
    this.getWorks();
  },

  componentWillReceiveProps() {
    this.getWorks();
  },

  render() {

    var works = this.state.works.map((work) => <WorkItem key={work.guid} {...work} />);

    return (
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
        <section className="works__list">{works}</section>
      </div>
    )
  }
});
