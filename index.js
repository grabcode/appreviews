const micro = require('micro');
const getAllReviews = require('./lib/reviews');
const { send } = micro;

const getParams = (search) => search.split("&").reduce(function(prev, curr, i, arr) {
    var p = curr.split("=");
    prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
    return prev;
}, {});



const server = micro(async (req, res) => {
  const search = req.url.substring(req.url.indexOf('?') + 1);
  const params = search.length === 0 ? {} : getParams(search);
  const statusCode = 200;
  const data = await getAllReviews(params);
  res.setHeader('Access-Control-Allow-Origin', '*');
  send(res, statusCode, data);
})

server.listen(3000)
