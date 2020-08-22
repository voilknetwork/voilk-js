var voilk = require('../lib');

voilk.api.getAccountCount(function(err, result) {
	console.log(err, result);
});

voilk.api.getAccounts(['voilk'], function(err, result) {
	console.log(err, result);
	var reputation = voilk.formatter.reputation(result[0].reputation);
	console.log(reputation);
});

voilk.api.getState('trending/voilk', function(err, result) {
	console.log(err, result);
});

voilk.api.getFollowing('bilal', 0, 'blog', 10, function(err, result) {
	console.log(err, result);
});

voilk.api.getFollowers('voilk', 0, 'blog', 10, function(err, result) {
	console.log(err, result);
});

voilk.api.streamOperations(function(err, result) {
	console.log(err, result);
});

voilk.api.getDiscussionsByActive({
  limit: 10,
  start_author: 'thecastle',
  start_permlink: 'this-week-in-level-design-1-22-2017'
}, function(err, result) {
	console.log(err, result);
});
