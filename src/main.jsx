var React = require('react');
var Router = require('react-router');
var {Route, DefaultRoute, NotFoundRoute} = Router;

var Application = require("./components/Application");
var Home = require("./components/Home");
var PeopleList = require('./components/People');
var PeopleDetail = require('./components/PeopleDetail');
var WorkList = require('./components/WorkList');
var WorkDetail = require('./components/WorkDetail');
var Contact = require('./components/Contact');
var NotFound = require('./components/NotFound');

var routes = (
    <Route name="Application" path="/" handler={Application}>
        <DefaultRoute name="Root" handler={Home} />
        <Route name="PeopleList" path="people/" handler={PeopleList}>
          <Route name="PeopleDetail" path=":people/" handler={PeopleDetail} />
        </Route>
        <Route name="WorkList" handler={WorkList}>
          <Route name="WorkDetail" path=":work/" handler={WorkDetail} />
        </Route>
        <Route name="Contact" path="contact/" />
        <NotFoundRoute handler={NotFound} />
    </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  React.render(<Handler/>, document.body);
});
