var React = require('react/addons');
var cx = React.addons.classSet;
var Router = require('react-router');
var {RouteHandler, State, Navigation} = Router;

var DocumentTitle = require('react-document-title');

var _ = require('underscore');
var $ = require('jquery');
var assign = require('object-assign');

require('zoom/zoom.min.js');
require('bootstrap-transition/transition.js');

var MEMBERS = require('../data').members;

TopText = React.createClass({
  render() {
    return (
      <section className="top-text">
        <div className="contanier">
          <div className="top-text__inner">
            <p className="top-text__desc">
              Panabanishaはいろんな専門性をもった奴らが<br />
              何か素敵なことをするために集まるステーションです。<br />
              出会って、なんかして、また帰っていく。<br />
              そんな場所です。
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

  rotateDesc(e) {
    var $elements = $('.member__item__block__img', this.getDOMNode());
    $elements.hover(
      (e) => { $(e.target).parents('.member__item').addClass('hover'); },
      (e) => { $(e.target).parents('.member__item').removeClass('hover'); }
    );
  },

  hoverProf() {
    $profImage = $('.member__item__block__img').find('img');
    $profImage.hover((e) => {
      var $normalImage = $(e.target);
      var $hoverImage = $normalImage.siblings('img');
      $profImage.removeClass('active');
      $hoverImage.addClass('active');
    });
  },

  componentDidMount() {
    this.rotateDesc();
    this.hoverProf();
  },

  componentWillReceiveProps() {
  },

  componentDidUpdate() {
    this.rotateDesc();
  },

  render() {
    var member = this.props.member;
    var index = this.props.index;
    var mode = member.mode;

    var classes = {
      'member__item': true,
      'even': index % 2 === 0,
      'odd': index % 2 !== 0
    }
    classes[mode] = true;

    return (
        <article key={member.name} className={cx(classes)}>
          <div className="member__item__inner">
            <div className="member__item__all">
              <div className="member__item__block member__item__block--img">
                <figure className="member__item__block__img"
                       onClick={member.mode == 'list' ? this._onClick : null}
                       data-name={member.nick}>
                </figure>
              </div>
              <div className="member__item__block member__item__block--desc">
                <h2 className="member__item__block__title" onClick={member.mode == 'list' ? this._onClick : null}>{member.name}</h2>
                <p className="member__item__blcok__birthday">{member.birthday}</p>
                <p className="member__item__block__occupation">{member.occupation}</p>
                <p className="member__item__block__company"><a href={member.company_url}>{member.company}</a></p>
              </div>
            </div>

            </div>
            <div className="member__item__single">
              <div className="member__item__single__prof">
                <figure className="member__item__single__img">
                  <img src={member.prof_img} data-action="zoom" />
                </figure>
                <div className="member__item__single__name">
                  <h1 className="member__item__single__name__main"><img src={member.name_img} /></h1>
                  <p className="member__item__single__name__sub">{member.name}</p>
                </div>
              </div>
              <div className="member__item__single__desc" dangerouslySetInnerHTML={{__html: member.acf.prof_desc}}></div>
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
                  {this.state.members.map((member, index) => <Member key={member.guid} member={assign(member, MEMBERS[member.slug])} index={index + 1} />)}
                  <RouteHandler member={params} />
                </did>
              </div>
            </div>
          </section>
      </DocumentTitle>
    )
  }
});
