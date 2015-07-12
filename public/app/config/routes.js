/**
 * Application routes
 *
 * @module bootstrap
 */
Application.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/login', { controller: 'Login', templateUrl: 'partials/Login.html' })
		.when('/forgot', { controller: 'Forgot', templateUrl: 'partials/Forgot.html' })
		.otherwise({redirectTo: '/login'});
}]);