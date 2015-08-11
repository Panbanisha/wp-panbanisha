var React = require('react');
var Router = require('react-router');
var {Route, DefaultRoute, NotFoundRoute} = Router;

var Application = require("./components/Application");
var Home = require("./components/Home");
var PeopleList = require('./components/People');
var PeopleDetail = require('./components/PeopleDetail');
var WorkList = require('./components/WorkList');
var WorkCategorizedList = require('./components/WorkCategorizedList');
var WorkDetail = require('./components/WorkDetail');
var Single = require('./components/Single');
var Contact = require('./components/Contact');
var NotFound = require('./components/NotFound');

var routes = (
    <Route name="Application" path="/" handler={Application}>
        <DefaultRoute name="Root" handler={Home} />

        <Route name="PeopleList" path="people/" handler={PeopleList}>
          <Route name="PeopleDetail" path=":people/" handler={PeopleDetail} />
        </Route>

        <Route name="WorkList" path="works/" handler={WorkList}>
          <Route name="WorkListMovie" path="movie/" handler={WorkCategorizedList} />
          <Route name="WorkListPhotography" path="photograph/" handler={WorkCategorizedList} />
          <Route name="WorkListGraphic" path="graphic/" handler={WorkCategorizedList} />
          <Route name="WorkListProduct" path="product/" handler={WorkCategorizedList} />
        </Route>

        <Route name="Post" path="post/:post/" handler={Single} />

        <Route name="Contact" path="contact/" handler={Contact} />
        <NotFoundRoute handler={NotFound} />
    </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  React.render(<Handler/>, document.body);
});
