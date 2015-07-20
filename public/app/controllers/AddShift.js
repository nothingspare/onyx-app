/**
 * AddShift controller
 *
 * @module Controllers
 * @submodule AddShift
 * @class AddShift
 */
Application.controller('AddShift', [
	'$scope', '$location', '$rootScope', '$routeParams', 'API', '$modal', 'Users', '$modalInstance',
	function ($scope, $location, $rootScope, $routeParams, API, $modal, Users, $modalInstance) {
		$scope.data = {
			shift: {
				location_id: $routeParams.id,
				user_id: null,
				sunday_shift: 1,
				monday_shift: 1,
				tuesday_shift: 1,
				wednesday_shift: 1,
				thursday_shift: 1,
				friday_shift: 1,
				saturday_shift: 1
			},
			date: {
				start: moment().hour(9).minute(0).second(0).toDate(),
				end: moment().hour(17).minute(0).second(0).toDate()
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
			API.post('/recurrent_events/add', $scope.data.shift)
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