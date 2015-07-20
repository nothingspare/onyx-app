/**
 * AddLocation controller
 *
 * @module Controllers
 * @submodule AddLocation
 * @class AddLocation
 */
Application.controller('AddLocation', [
	'$scope', '$location', '$modalInstance', 'API', '$rootScope',
	function ($scope, $location, $modalInstance, API, $rootScope) {
		$scope.data = {
			status: 1
		};
		$scope.controls = {};

		$scope.controls.submit = function () {
			var user = $rootScope.auth.user();

			API.post('/locations/add', $scope.data)
				.success(function (res) {
					//@todo success modal
					
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