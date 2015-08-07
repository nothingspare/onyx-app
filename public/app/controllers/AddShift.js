/**
 * AddShift controller
 *
 * @module Controllers
 * @submodule AddShift
 * @class AddShift
 */
Application.controller('AddShift', [
	'$scope', '$location', '$rootScope', '$routeParams', 'API', '$modal', 'Users', '$modalInstance', 'shift',
	function ($scope, $location, $rootScope, $routeParams, API, $modal, Users, $modalInstance, shift) {
		$scope.params = {
			submitEndpoint: '/recurrent_events/add'
		};
		$scope.data = {
			shift: {
				location_id: $routeParams.id,
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

		if (angular.isObject(shift)) {
			shift = _.each(shift, function (element, index) {
				if (_.contains(['sunday_user_id', 'monday_user_id', 'tuesday_user_id', 'wednesday_user_id', 'thursday_user_id', 'friday_user_id', 'saturday_user_id'], index)) {
					shift[index] = element.id;
				}
			});
			$scope.data.shift = shift;
			console.log($scope.data.shift);
			$scope.params.submitEndpoint = '/recurrent_events/edit';
		}

		$scope.controls.submit = function () {
			$scope.data.shift.start_hour = moment($scope.data.date.start).hour();
			$scope.data.shift.start_minute = moment($scope.data.date.start).minute();
			$scope.data.shift.end_hour = moment($scope.data.date.end).hour();
			$scope.data.shift.end_minute = moment($scope.data.date.end).minute();

			console.log($scope.data);
			var user = $rootScope.auth.user();

			console.log($scope.data);
			API.post($scope.params.submitEndpoint, $scope.data.shift)
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