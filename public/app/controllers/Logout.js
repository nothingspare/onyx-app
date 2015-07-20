/**
 * Logout controller
 *
 * @module Controllers
 * @submodule Logout
 * @class Logout
 */
Application.controller('Logout', [
	'$scope', '$location', '$rootScope', 'Storage',
	function ($scope, $location, $rootScope, Storage) {
		console.log('Logout con');

		$scope.data = {};
		$scope.controls = {};

		Storage.put('user', false);

		$rootScope.state.isAuthenticated = false;
		$rootScope.state.isAdmin = false;
		$location.path('/');
	}
]);