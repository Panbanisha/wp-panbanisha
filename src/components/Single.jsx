var React = require('react');
var Route = require('react-router');
var {State} = Route;

var $ = require('jquery');
var _ = require('underscore');
var assign = require('object-assign');

var MEMBERS = require('../data').members;

module.exports = React.createClass({

  mixins: [State],

  getInitialState() {
    return {
      post: null,
      crew_member: []
    }
  },

  getInitData() {
    var data = {
      'filter[name]': this.getParams().post,
      'filter[category_name]': 'work'
    };
    var getPost = $.getJSON('/wp-json/posts', data);

    $.when(getPost).done((post) => {
      var crewMembers = post[0].acf.crew_member;
      if(crewMembers.length) {
        var members = crewMembers.map((member) => {
            return $.getJSON(`/wp-json/pages/people/${member.name}`);
        });
        return $.when.apply(null, members).done(()=> {
            var result = Array.prototype.map.call(arguments, (result) => result[0]);
            this.setState({crew_member: result, post: post[0]});
        });
      } else {
        this.setState({post: post});
      }
    });
  },

  componentDidMount() {
    this.getInitData();
  },

  componentWillReceiveProps() {
    this.getInitData();
  },

  render() {

    var post = this.state.post;
    console.log(this.state.crew_member);
    console.log('post');
    console.log(post);

    return (
      <div className="single-post">
        {post ?
          <div className="single-post__inner">

            <section className="product">
              <div className="product__main" dangerouslySetInnerHTML={{__html: post.content}}></div>
              <div className="product__desc">
                <h1 className="product__desc__title">{post.title}</h1>
                <time className="product__desc__date">{post.modified}</time>
                <div className="product__desc__caption" dangerouslySetInnerHTML={{__html: post.acf.caption}}></div>
              </div>
            </section>

            <section className="crew">
              {this.state.crew_member.length ? <h2 className="crew__title">Production Crew</h2> : '' }
              {this.state.crew_member.length ? this.state.crew_member.map((member) => <CrewMember key={member.guid} member={assign(member, MEMBERS[member.slug])} />) : '' }
            </section>

            <section className="sound">
            </section>

            <section className="special-thanks">
              {post.acf.st_list !== "0" ?
                <h2 className="special-thanks__title">Special Thanks</h2>
              : ''}
              {post.acf.st_list !== "0" ?
                post.acf.st_list.map((item) => {
                  return (
                    <div className="special-thanks__block" key={item.st_name}>
                      <figure className="special-thanks__img">
                        <img src={item.st_top_image} />
                      </figure>
                      <div className="special-thanks__desc">
                        <h2 className="special-thanks__title">{item.st_name}</h2>
                        <a href={item.st_url}>{item.st_url}</a>
                      </div>
                    </div>
                  )
                })
              : ''}
            </section>
          </div>
        : ''}
      </div>
    )
  }
});


var CrewMember = React.createClass({

  render() {

    var member = this.props.member;

    return (
      <div className="crew__list" key={member.guid}>
        <div className="crew__item">
          <p>member</p>
        </div>
      </div>
    )
  }
});
