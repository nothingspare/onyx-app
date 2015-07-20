/**
 * Profile controller
 *
 * @module Controllers
 * @submodule Profile
 * @class Profile
 */
Application.controller('Profile', [
	'$scope', '$location', '$rootScope',
	function ($scope, $location, $rootScope) {
		if (!$rootScope.auth.user().type) {
			$location.path('/');
		}

		$scope.data = {};
		$scope.controls = {};

		$scope.data.user = $rootScope.auth.user();
		$scope.data.user.password = '';

		//@todo controls.update()
		$scope.controls.update = function () {
			console.log('update');
		};
	}
]);