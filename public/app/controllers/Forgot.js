/**
 * Forgot password controller
 *
 * @module Controllers
 * @submodule Forgot
 * @class Forgot
 */
Application.controller('Forgot', [
	'$scope',
	function ($scope) {
		console.log('forgot');

		$scope.data = {};
		$scope.controls = {};

		//@todo forgot password reset request
		$scope.controls.submit = function () {
			console.log('request password');
		};
	}
]);