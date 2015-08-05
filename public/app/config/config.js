/**
 * Application constants
 *
 * @module bootstrap
 */
if (window.location.href.match(/localhost/)) {
	Application.constant('Config', {
		name: 'app',
		endpoint: 'http://localhost:1337',
		headers: {}
	});
}
else {
	Application.constant('Config', {
		name: 'app',
		endpoint: 'http://api.onyx.tools',
		headers: {}
	});
}