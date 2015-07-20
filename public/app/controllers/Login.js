/**
 * Login controller
 *
 * @module Controllers
 * @submodule Login
 * @class Login
 */
Application.controller('Login', [
	'$scope', '$location', '$rootScope', 'API', '$modal',
	function ($scope, $location, $rootScope, API, $modal) {
		console.log('login page');

		$scope.data = {};
		$scope.controls = {};

		$scope.controls.submit = function () {			
			return API.post('/users/read', $scope.data)
				.success(function (res) {
					$rootScope.auth.user(res);
				})
				['error'](function (res) {
					$modal.open({
						controller: function () {
							$scope.message = res;
						},
						template: res.error
					});
				});
		};

		$scope.controls.forgot = function () {
			$location.path('/forgot');
		};
	}
]);