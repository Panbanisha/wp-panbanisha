var React = require('react/addons');
var cx = React.addons.classSet;
var Route = require('react-router');
var {State, Link} = Route;

var $ = require('jquery');
var _ = require('underscore');
var assign = require('object-assign');
require('snapsvg');

var MEMBERS = require('../data').members;

module.exports = React.createClass({

  mixins: [State],

  getInitialState() {
    return {
      post: null,
      crew_member: []
    }
  },

  responsiveIframe() {
    $allIframes = $('iframe');
    $allIframes.length ? $allIframes.removeAttr('width').removeAttr('height') : '';
    $allIframes.parent('p').addClass('iframe');
  },

  trimDate(date) {
    date = date.split('T');
    trimedDate = date[0].replace(/-/g, '.');
    return trimedDate;
  },

  createCrewMemberBlock() {
    $('.crew__item:nth-child(4n-2), .crew__item:nth-child(4n-3)').addClass('odd');
    $('.crew__item:nth-child(4n), .crew__item:nth-child(4n-1)').addClass('even');
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

          return $.when.apply(null, members).done((results)=> {
            if(members.length !== 1) {
              var result = Array.prototype.map.call(arguments, (result) => result[0]);
              this.setState({crew_member: result, post: post[0]});
            } else {
              var result = []
              result[0] = results;
              this.setState({crew_member: result, post: post[0]});
            }
          });
      } else {
        this.setState({post: post});
      }
    });
  },

  setLineOrder() {
    var $sections = $('.single-post__inner').find('section');
    var numOfSection = $sections.length - 1;
    $sections.filter(':nth-child(2)').find('h2').addClass('odd');
    switch (numOfSection) {
      case 2:
        $sections.filter(':last-of-type').find('h2').addClass('even');
        break;
      case 3:
        $sections.filter(`:nth-child(${numOfSection})`).find('h2').addClass('even');
        $sections.filter(':last-of-type').find('h2').addClass('odd');
        break;
      default:
        $sections.filter(':first-of-type').find('h2').addClass('odd');
        break;
    }
  },

  componentDidMount() {
    this.getInitData();
    this.responsiveIframe();
    this.setLineOrder();
    this.createCrewMemberBlock();
  },

  componentWillReceiveProps() {
    this.getInitData();
  },

  componentDidUpdate() {
    this.responsiveIframe();
    this.setLineOrder();
    this.createCrewMemberBlock();
    $('script#script-image-slider').remove();
    var images = this.state.post.acf.images;
    if(images !== '0') {
      if(images.length > 1) {
        $('body').append('<script id="script-image-slider" src="/assets/lib/image-slider.js"></script>');
        $('.product__images').removeClass('only-one');
      } else {
        $('.product__images').addClass('only-one');
      }
    }
  },

  render() {

    var post = this.state.post;

    return (
      <div className="single-post">
        {post ?
          <div className="single-post__inner">

            <section className="product">

              <div className="product__main" dangerouslySetInnerHTML={{__html: post.content}} />

              <div className="procuct__all">
                {post.acf.videos !== '0' ?
                  <div className="product__videos">
                    {
                      post.acf.videos.length == 1 ? <h2 className="product__videos__title"><span className="init">V</span>ideo</h2> : <h2 className="product__videos__title"><span className="init">V</span>ideos</h2>
                    }
                    <ul className="product__videos__list">
                      { post.acf.videos.map((video, index) => {
                        index += 1;
                        return (
                          <li key={`video-item-${index}`}  className="product__videos__item">
                            <div className="product__videos__item__wrapper" dangerouslySetInnerHTML={{__html: video.works_video}} />
                          </li>
                        )}
                      )}
                    </ul>
                  </div>
                : ''}

                {post.acf.images !== '0' ?
                  <div className="product__images">
                    {
                      post.acf.images.length == 1 ? <h2 className="product__images__title"><span className="init">I</span>mage</h2> : <h2 className="product__images__title"><span className="init">I</span>mages</h2>
                    }

                    <div className="product__images__wrapper">

                      <ul className="product__images__list"
                         data-step1="M1402,800h-2c0,0,0-213,0-423s0-377,0-377h1c0.6,0,1,0.4,1,1V800z" data-step2="M1400,800H724c0,0-297-155-297-423C427,139,728,0,728,0h671c0.6,0,1,0.4,1,1V800z" data-step3="M1400,800H0c0,0,1-213,1-423S1,0,1,0h1398c0.6,0,1,0.4,1,1V800z" data-step4="M-2,800h2c0,0,0-213,0-423S0,0,0,0h-1c-0.6,0-1,0.4-1,1V800z" data-step5="M0,800h676c0,0,297-155,297-423C973,139,672,0,672,0L1,0C0.4,0,0,0.4,0,1L0,800z" data-step6="M0,800h1400c0,0-1-213-1-423s0-377,0-377L1,0C0.4,0,0,0.4,0,1L0,800z">
                        {post.acf.images.map((image, index) => {
                          index += 1;
                          var imageTag = `
                              <defs>
                                <clipPath id="image-${index}">
                                  <path id="changing-path-${index}" d="M0,800C0,800,1400,800,1400,800C1400,800,1400,0,1400,0C1400,0,1,0,1,0C0.4,0,0,0.4,0,1C0,1,0,800,0,800C0,800,0,800,0,800" />
                                </clipPath>
                              </defs>
                              <image height="800px" width="1400px" clip-path="url(#image-${index})" xlink:href="${image.works_image}" />
                          `;
                          return(
                            <li key={`item-image-${index}`} className={cx({product__images__item: true, visible: index == 1})}>
                              <div className="image-svg-item-wrapper">
                                <svg viewBox="0 0 1400 800" dangerouslySetInnerHTML={{__html: imageTag}} />
                              </div>
                            </li>
                          )}
                        )}
                      </ul>

                      <ul className="product__images__navigation">
                        <li><a href="#0" className="next-slide">Next</a></li>
                        <li><a href="#0" className="prev-slide">Prev</a></li>
                    	 </ul>

                    		<ol className="product__images__controls">
                        {
                          post.acf.images.map((image, index) => {
                            index += 1;
                            if (index == 1) {
                              return ( <li key={`image-controls-${index}`} className="selected"><a href="#0"><em>Item {index}</em></a></li> )
                            } else {
                              return ( <li key={`image-controls-${index}`}><a href="#0"><em>Item {index}</em></a></li> )
                            }
                          })
                        }
                    		</ol>
                    </div>
                  </div>
                : ''}
              </div>

              <div className="product__desc">
                <h1 className="product__desc__title">{post.title}</h1>
                <time className="product__desc__date">{this.trimDate(post.modified)}</time>
                <div className="product__desc__caption" dangerouslySetInnerHTML={{__html: post.acf.caption}}></div>
              </div>
            </section>

            {this.state.crew_member.length ?
              <section className="crew">
                <h2 className="crew__title">Production Crew</h2>
                <div className="crew__list">
                  { this.state.crew_member.map((member, index) => <CrewMember index={index} key={member.guid} crewMember={post.acf.crew_member} member={assign(member, MEMBERS[member.slug])} />) }
                </div>
              </section>
            : ''}

            {post.acf.sound_track !== "0" ?
              <section className="sound-track">
                <h2 className="sound-track__title">Sound Track</h2>
                <div className="sound-track__list">
                  { post.acf.sound_track.map((track) => <SoundTrack key={track.name} track={track} />) }
                </div>
              </section>
            : ''}

            {post.acf.st_list !== "0" ?
              <section className="special-thanks">
                <h2 className="special-thanks__title">Special Thanks</h2>
                <div className="special-thanks__list">
                  { post.acf.st_list.map((item) => <SpecialThanks key={item.st_url} stItem={item} />) }
                </div>
              </section>
            : ''}
          </div>
        : ''}
      </div>
    )
  }
});

var SoundTrack = React.createClass({

  render() {

    var track = this.props.track;

    return (
      <div className="sound-track__item" key={this.props.key}>
        <div className="sound-track__item__sound">
          <figure className="sound-track__item__sound__img">
            <img src={track.img} />
          </figure>
          <audio controls className="sound-track__item__sound__track">
            {track.sounds.map((sound) => {
              return (
                <source key={sound.source} src={sound.source} type={`audio/${sound.type}`} />
              )
            })}
          </audio>
        </div>
        <div className="sound-track__item__desc">
          <h3 className="sound-track__item__desc__title">{track.title}</h3>
          <p className="sound-track__item__desc__author">{track.author}</p>
        </div>
      </div>
    )
  }
});

var SpecialThanks = React.createClass({

  render() {

    var stItem = this.props.stItem;

    return (
      <div className="special-thanks__item" key={this.props.key}>
        <figure className="special-thanks__item__img">
          <a href={stItem.st_url}>
            <img src={stItem.st_top_image} />
          </a>
        </figure>
        <div className="special-thanks__item__desc">
          <h2 className="special-thanks__item__title">{stItem.st_name}</h2>
          <a href={stItem.st_url} target="_blank">{stItem.st_url}</a>
        </div>
      </div>
    )
  }
});

var CrewMember = React.createClass({

  isOdd(num) {
    return num % 2 !== 0;
  },

  render() {

    var member = this.props.member;
    var crewMember = this.props.crewMember;
    var index = this.props.index + 1;

    return (
      <div className="crew__item" key={this.props.key}>
        <div className="crew__item__inner">
          <Link to="PeopleDetail" params={{people: member.slug}}>
            <figure className="crew__item__img" data-name={member.nick}></figure>
          </Link>
          <div className="crew__item__desc">
            {
              this.props.crewMember.length ?
                this.props.crewMember.map((crewMember) => {
                  return crewMember.name == member.slug ? <p key={crewMember.name} className="crew__item__desc__role">{crewMember.role}</p> : '';
                })
              : ''
            }
            <h2 className="crew__item__desc__name"><Link to="PeopleDetail" params={{people: member.slug}}>{member.name}</Link></h2>
            <p className="crew__item__desc__occupation">{member.occupation}</p>
            <p className="crew__item__desc__company">{member.company}</p>
          </div>
        </div>
      </div>
    )
  }
});
