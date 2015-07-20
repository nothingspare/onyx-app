/**
 * AddUser controller
 *
 * @module Controllers
 * @submodule AddUser
 * @class AddUser
 */
Application.controller('AddUser', [
	'$scope', '$location', '$modalInstance', 'API', '$rootScope',
	function ($scope, $location, $modalInstance, API, $rootScope) {
		$scope.$watch('data.first_name', function (current, previous) {
			if (current) {
				$scope.data.username = current.toLowerCase() + '.' + $scope.data.last_name.toLowerCase();
			}
		});
		$scope.$watch('data.last_name', function (current, previous) {
			if (current) {
				$scope.data.username = $scope.data.first_name.toLowerCase() + '.' + current.toLowerCase();
			}
		});

		$scope.data = {
			first_name: '',
			last_name: '',
			username: '',
			type: 'employee',
			status: 1
		};
		$scope.controls = {};

		$scope.controls.submit = function () {
			var user = $rootScope.auth.user();
			console.log($scope.data);
			API.post('/users/add', $scope.data)
				.success(function (res) {
					//@todo success modal
					//@todo send new user an email
					//@todo create new user password
					
					console.log(res);
				})
				['error'](function (res) {
					//@todo error modal
					console.log('error', res);
				});
			$modalInstance.close();
		};
		
		$scope.controls.cancel = function () {
			$modalInstance.close();
		};
	}
]);