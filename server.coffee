express = require('express')
app = express()
path = require('path')
request = require('request')

app.get /^\/wp-json.*$/, (req, res) ->
  request('http://vccw-panbanisha.dev' + req.originalUrl).pipe(res)
  console.log(res)

app.get /^[\w\-\/]*$/, (req, res) ->
  res.set('Content-Type', 'text/html')
  res.sendFile(path.resolve(__dirname, 'dist/theme/index.php'))

module.exports = app
