/**
 * EditShift controller
 *
 * @module Controllers
 * @submodule EditShift
 * @class EditShift
 */
Application.controller('EditShift', [
	'$scope', '$location', '$rootScope', '$routeParams', 'API', '$modal', 'Users', '$modalInstance', 'shift', 'day', 'pickupDate', 'Alertify',
	function ($scope, $location, $rootScope, $routeParams, API, $modal, Users, $modalInstance, shift, day, pickupDate, Alertify) {
		$scope.data = {
			shift: angular.copy(shift),
			date: {
				start: moment().hour(shift.start_hour).minute(shift.start_minute).second(0).toDate(),
				end: moment().hour(shift.end_hour).minute(shift.end_minute).second(0).toDate()
			}
		};
		$scope.controls = {};
		$scope.params = {
			edit: true,
			exclude: {
				sunday: true,
				monday: true,
				tuesday: true,
				wednesday: true,
				thursday: true,
				friday: true,
				saturday: true
			}
		};
		$scope.params.exclude[day] = false;

		$scope.$watch('data.shift', function (current, previous) {
			_.map(current, function (value, key) {
				if (previous[key] != value) {
					$scope.data.user = value;
				}
			});
		}, true);

		var originalShift = angular.copy(shift);

		$scope.controls.assignPickupShift = function () {
			if (!$scope.data.user) { return; }

			var replacing_user = null;
			if (originalShift[day + '_user_id']) {
				replacing_user = originalShift[day + '_user_id'].id;
			}

			var user_id = $scope.data.user;
			if (angular.isObject($scope.data.user)) {
				user_id = $scope.data.user.id;
			}

			var data = {
				recurrent_event_id: $scope.data.shift.id,
				date: pickupDate.format('YYYY-MM-DD 00:00:00Z'),
				user_id: $scope.data.user,
				day: day,
				replacing_user_id: replacing_user,
				location_id: $scope.data.shift.location_id
			};

			API.post('/events/add', data).then(function () {
				Alertify.success('Saved');
				$modalInstance.close();
			}, function () {
				Alertify['error']('Error');
			});
			console.log(day, data);
		};

		$scope.controls.assignSingleShiftInstance = function (day) {
			API.post('/events/add', {
				recurrent_event_id
			});
			console.log(day, $scope.data);
		};
		
		Users.index($rootScope.auth.user().hash).then(function (res) {
			$scope.data.employees = res;
		});

		$scope.controls.cancel = function () {
			$modalInstance.close();
		};
	}
]);