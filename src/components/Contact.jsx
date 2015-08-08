var React = require('react');

module.exports = React.createClass({
  render() {
    return (
      <div className="contact">
        <section className="contact-form">
          <h1 className="contact-form__title">Contact Form</h1>
          <form action="" className="contact-form__form">
            <div className="contact-form__form__block">
              <div className="input">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" />
              </div>
              <div className="input">
                <label htmlFor="company">Company</label>
                <input type="text" name="company" id="company" />
              </div>
              <div className="input">
                <label htmlFor="email">E-mail Address</label>
                <input type="email" name="email" id="email" />
              </div>
              <div className="input">
                <label htmlFor="number">Phone Number</label>
                <input type="number" name="number" id="number" />
              </div>
            </div>
            <div className="contact-form__form__block">
              <div className="input">
                <label htmlFor="message">Message</label>
                <div className="message__bg">
                  <div className="message__bg__input">
                    <label htmlFor="title">Title</label>
                    <input name="title" id="title" type="text" />
                  </div>
                  <textarea name="message" id="message" cols="60" rows="11"></textarea>
                </div>
              </div>
            </div>
            <div className="contact-form__form__submit-btn">
              <input type="submit" value="Send" />
            </div>
          </form>
        </section>

        <section className="access">
          <h1 className="access__title">Access</h1>
          <div className="access__inner">
            <figure className="access__map">
              <img src="/assets/images/map.png" />
            </figure>
            <div className="access__info">
              <div className="access__info__name">
                <h2>Panbanisha Inc.</h2>
                <p>Fujisawa Lab</p>
              </div>
              <div className="access__info__addr">
                <p>〒251-0861</p>
                <p>神奈川県藤沢市大庭5125-35</p>
                <a href="" className="access__info__gmap">Google map</a>
              </div>
              <div className="access__info__root">
                <p>JR「辻堂駅」北口より<br />34系統バス「南センター前」で降車徒歩15分</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    )
  }
});
