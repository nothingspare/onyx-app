/**
 * Profile controller
 *
 * @module Controllers
 * @submodule Profile
 * @class Profile
 */
Application.controller('Profile', [
	'$scope', '$location', '$rootScope', 'API', 'Alertify',
	function ($scope, $location, $rootScope, API, Alertify) {
		if (!$rootScope.auth.user().type) {
			$location.path('/');
		}

		$scope.data = {};
		$scope.controls = {};
		$scope.params = {};

		$scope.data.user = $rootScope.auth.user();
		$scope.data.user.password = '';

		//@todo controls.update()
		$scope.controls.update = function () {
			var data = angular.copy($scope.data.user);
			if (data.password == "") {
				delete data.password;
			}
			API.post('/users/edit', data).then(function (res) {
				var updatedUser = {};
				angular.forEach(res[0], function (el, i) {
					if (_.has($scope.data.user, i)) {
						updatedUser[i] = el;
					}
				});
				$rootScope.auth.user(updatedUser);
				console.log(res);
				Alertify.success('Saved');
			}, function (error) {
				console.log(error);
				Alertify['error']('Error');
			});
		};
	}
]);