/**
 * Reset controller
 *
 * @module Controllers
 * @submodule Reset
 * @class Reset
 */
Application.controller('Reset', [
	'$scope', '$location',
	function ($scope, $location) {
		console.log('Reset page');

		$scope.data = {};
		$scope.controls = {};

		$scope.controls.reset = function () {
			//@todo reset user password request
			//^success password reset: go to user type dashboard
			//^fail error as to why, assume mismatch
			
			console.log('reset');
		}
	}
]);