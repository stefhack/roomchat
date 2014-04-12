
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'ChatRoom' });
    console.log("IP :"+req.ip);
};