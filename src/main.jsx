var React = require('react');
var Router = require('react-router');
var {Route, DefaultRoute, NotFoundRoute} = Router;

var Application = require("./components/Application");
var Home = require("./components/Home");
var PeopleList = require('./components/People');
var PeopleDetail = require('./components/PeopleDetail');
var WorkList = require('./components/WorkList');
var Single = require('./components/Single');
var Contact = require('./components/Contact');
var NotFound = require('./components/NotFound');

var routes = (
    <Route name="Application" path="/" handler={Application}>
        <DefaultRoute name="Root" handler={Home} />

        <Route name="PeopleList" path="people/" handler={PeopleList}>
          <Route name="PeopleDetail" path=":people/" handler={PeopleDetail} />
        </Route>

        <Route name="WorkList" path="works/" handler={WorkList} />
        <Route name="WorkListMovie" path="works/movie/" handler={WorkList} />
        <Route name="WorkListPhotograph" path="works/photograph/" handler={WorkList} />
        <Route name="WorkListGraphic" path="works/graphic/" handler={WorkList} />
        <Route name="WorkListProduct" path="works/product/" handler={WorkList} />
        <Route name="WorkListSounds" path="works/sounds/" handler={WorkList} />

        <Route name="Post" path="post/:post/" handler={Single} />

        <Route name="Contact" path="contact/" handler={Contact} />
        <NotFoundRoute handler={NotFound} />
    </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  React.render(<Handler/>, document.body);
  ga('send', 'pageview', {page: state.pathname});
});
