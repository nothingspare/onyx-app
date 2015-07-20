/**
 * AddEvent controller
 *
 * @module Controllers
 * @submodule AddEvent
 * @class AddEvent
 */
Application.controller('AddEvent', [
	'$scope', '$location', '$modalInstance', 'API', '$rootScope',
	function ($scope, $location, $modalInstance, API, $rootScope) {
		$scope.data = {
			event: {
				start_timestamp: moment().format('YYYY-MM-DD HH:mm:ssZZ'),
				end_timestamp: moment().add(4, 'hours').format('YYYY-MM-DD HH:mm:ssZZ')
			}
		};
		$scope.controls = {};
		$scope.helpers = {};
		$scope.params = {
			employees: false,
			locations: false
		};

		//@todo controls.submit()
		$scope.controls.submit = function () {
			console.log('add', $scope.data.event);
			API.post('/events/add', $scope.data.event)
				.success(function (res) {
					console.log('success', res);
				})
				['error'](function (res) {
					console.log('error', res);
				});
			$modalInstance.close();
		};

		$scope.controls.cancel = function () {
			$modalInstance.close();
		};


		$scope.helpers.init = function () {
			API.post('/users/index', {key: $rootScope.auth.user().hash})
				.success(function (res) {
					$scope.data.employees = res;
					$scope.data.event.user_id = res[0].id;
				});
			API.get('/locations/index')
				.success(function (res) {
					$scope.data.locations = res;
					$scope.data.event.location_id = res[0].id;
				});
		};

		$scope.helpers.init();
	}
]);