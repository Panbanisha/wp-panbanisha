var React = require('react');
var DocumentTitle = require('react-document-title');

var $ = require('jquery');

module.exports = React.createClass({

  setSubject() {
    $('input[name="title"]').keyup((e) => {
      $('input[name="_subject"]').attr('value', $(e.target).val());
    });
  },

  sendForm() {
    var $contactForm = $('.contact-form__form');

    $contactForm.submit((e) => {
      e.preventDefault();
      var EMAIL = 'ryo.5630@gmail.com';
      var jsonData = {};
      var data = $(e.target).serializeArray();
      var $overlay = $('.contact-form__form__overlay');

      $.each(data, function() {
         if (jsonData[this.name]) {
           if (!jsonData[this.name].push) {
               jsonData[this.name] = [jsonData[this.name]];
           }
           jsonData[this.name].push(this.value || '');
         } else {
            jsonData[this.name] = this.value || '';
         }
      });

      $.ajax({
        url: `//formspree.io/${EMAIL}`,
        method: 'POST',
        data: jsonData,
        dataType: 'json',
        beforeSend: function() {
          $overlay.fadeIn(500);
          $overlay.find('.contact-form__form__overlay__message--beforeSend').fadeIn(500);
        },
        success: function(data) {
          $overlay.fadeIn(500)
          $overlay.find('.contact-form__form__overlay__message--beforeSend').hide();
          $overlay.find('.contact-form__form__overlay__message--success').fadeIn(500);
        },
        error: function(err) {
          $overlay.fadeIn(500);
          $overlay.find('.contact-form__form__overlay__message--beforeSend').hide();
          $overlay.find('.contact-form__form__overlay__message--error').fadeIn(500);
        }
      });
    });
  },

  componentDidMount() {
    this.setSubject();
    this.sendForm();
  },

  componentDidUpdate() {
    this.sendForm();
  },

  render() {

    var title = "Contact";
    var ccEmail = 'office@panbanisha.com';

    return (
      <DocumentTitle title={`${title} | Panbanisha`}>
        <div className="contact">
          <section className="contact-form">
            <h1 className="contact-form__title">Contact Form</h1>
            <form action="" className="contact-form__form">
              <div className="contact-form__form__content">
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
                        <input type="hidden" name="_subject" value="" />
                      </div>
                      <textarea name="message" id="message" cols="60" rows="11"></textarea>
                    </div>
                  </div>
                </div>
                <div className="contact-form__form__submit-btn">
                  <input type="submit" value="Send" />
                </div>
                <input type="hidden" name="_cc" value={ccEmail} />
                <input type="text" name="_gotcha" style={{display: 'none'}} />
              </div>
              <div className="contact-form__form__overlay">
                <div className="contact-form__form__overlay__message--beforeSend">
                  <h2>送信しています。</h2>
                </div>
                <div className="contact-form__form__overlay__message--success">
                  <h2>ありがとうございます。</h2>
                  <p>〜のくらいで返信します。</p>
                </div><div className="contact-form__form__overlay__message--error">
                  <h2>エラーが発生しました。</h2>
                  <p>もう一度ページを読み込んで、再度送信しなおしてください。</p>
                </div>
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
      </DocumentTitle>
    )
  }
});
