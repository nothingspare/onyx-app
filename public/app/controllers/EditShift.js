/**
 * EditShift controller
 *
 * @module Controllers
 * @submodule EditShift
 * @class EditShift
 */
Application.controller('EditShift', [
	'$scope', '$location', '$rootScope', '$routeParams', 'API', '$modal', 'Users', '$modalInstance', 'shift',
	function ($scope, $location, $rootScope, $routeParams, API, $modal, Users, $modalInstance, shift) {
		$scope.data = {
			shift: shift,
			date: {
				start: moment().hour(shift.start_hour).minute(shift.start_minute).second(0).toDate(),
				end: moment().hour(shift.end_hour).minute(shift.end_minute).second(0).toDate()
			}
		};
		$scope.controls = {};


		$scope.controls.submit = function () {

			$scope.data.shift.start_hour = moment($scope.data.date.start).hour();
			$scope.data.shift.start_minute = moment($scope.data.date.start).minute();
			$scope.data.shift.end_hour = moment($scope.data.date.end).hour();
			$scope.data.shift.end_minute = moment($scope.data.date.end).minute();

			console.log($scope.data);
			var user = $rootScope.auth.user();

			console.log($scope.data);
			API.post('/recurrent_events/edit', $scope.data.shift)
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
		
		Users.index($rootScope.auth.user().hash).then(function (res) {
			$scope.data.employees = res;
		});

		$scope.controls.cancel = function () {
			$modalInstance.close();
		};
	}
]);