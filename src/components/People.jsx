var React = require('react');
var Router = require('react-router');
var {RouteHandler, State, Navigation} = Router;

var DocumentTitle = require('react-document-title');

var _ = require('underscore');
var $ = require('jquery');
var assign = require('object-assign');

var MEMBERS = require('../data').members;

TopText = React.createClass({
  render() {
    return (
      <section className="top-text">
        <div className="contanier">
          <div className="top-text__inner">
            <h1 className="top-text__title">タイトル</h1>
            <p>
              Panabanishaはいろんな専門性をもった奴らが<br />
              何か素敵なことをするために集まるステーションです。<br />
              出会って、なんかして、また帰っていく。<br />
              そんな会社です。
            </p>
          </div>
        </div>
      </section>
    )
  }
});

Member = React.createClass({

  mixins: [State, Navigation],

  _onClick() {
    this.transitionTo(`/people/${this.props.member.slug}/`);
  },

  componentDidMount() {
  },

  componentWillReceiveProps() {
  },

  render() {
    var member = this.props.member;

    return (
        <article key={member.name} className={'member__item ' + member.mode} onClick={member.mode == 'list' ? this._onClick : null}>
          <div className="member__item__inner">
            <div className="member__item__all">
              <div className="member__item__block">
                <h2 className="member__item__title">{member.name}</h2>
                <p className="member__item__birthday">{member.birthday}</p>
                <p className="member__item__occupation">{member.occupation}</p>
                <p className="member__item__company"><a href={member.company_url}>{member.company}</a></p>
              </div>
              <div className="member__item__block">
                <figure className="member__item__img">
                  <img src={member.prof_img} />
                </figure>
              </div>
            </div>
            <div className="member__item__single">
              <div className="member__item__single__prof">
                <figure className="member__item__single__img">
                  <img src={member.prof_img} />
                </figure>
                <div className="member__item__single__name">
                  <h1 className="member__item__single__name__main"><img src={member.name_img} /></h1>
                  <p className="memner__item__single__name__sub">{member.name}</p>
                </div>
              </div>
              <div className="member__item__single__desc" dangerouslySetInnerHTML={{__html: member.acf.prof_desc}}></div>
            </div>
          </div>
        </article>
    )
  }
});

module.exports = React.createClass({

  mixins: [State],

  getInitialState() {
    return { members: [] }
  },

  _setFlags(state) {
    var current = this.getParams().people;
    state.members.map((member) => {
        if (current) {
          member.mode = member.slug == current ? 'open' : 'close';
        } else {
            member.mode = 'list';
        }
    });
    return state;
  },

  componentDidMount() {
    var members = _.keys(MEMBERS).map((name) => {
        return $.getJSON(`/wp-json/pages/people/${name}`);
    });
    $.when.apply(null, members).done(()=> {
        var result = Array.prototype.map.call(arguments, (result) => result[0]);
        this.setState(this._setFlags({members: result}));
    });
  },

  componentWillReceiveProps() {
    this.setState(this._setFlags(this.state));
  },

  render() {

    var currentPath = this.getParams().people;
    var params = null;

    return (
      <DocumentTitle title="People | Panbanisha">
          <section className="member">
            <div className="container">
              <div className="member__inner">
                <did className="member__list">
                  {this.getParams().people === undefined ? <TopText /> : ''}
                  {this.state.members.map(member => <Member key={member.guid} member={assign(member, MEMBERS[member.slug])} />)}
                  <RouteHandler member={params} />
                </did>
              </div>
            </div>
          </section>
      </DocumentTitle>
    )
  }
});
