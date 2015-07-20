/**
 * Location controller
 *
 * @module Controllers
 * @submodule Location
 * @class Location
 */
Application.controller('Location', [
	'$scope', '$location', '$rootScope', '$routeParams', 'API', '$modal', 'Users',
	function ($scope, $location, $rootScope, $routeParams, API, $modal, Users) {
		$scope.data = {};
		$scope.controls = {};

		$scope.controls.refreshLocations = function () {
			return API.get('/locations/index')
				.success(function (res) {
					$scope.data.locations = res;
					$rootScope.locations = _.indexBy(res, 'id');
				});
		};

		$scope.controls.addShift = function () {
			var modal = $modal.open({
				templateUrl: 'partials/AddShift.html',
				controller: 'AddShift',
			});

			modal.result.then(function (obj) {
				$scope.controls.refreshShifts();
			});
		};

		Users.index($rootScope.auth.user().hash).then(function (res) {
			if (res.length) {
				$scope.data.employees = _.indexBy(res, 'id');
			}
			console.log($scope.data.employees);
		});

		$scope.controls.refreshShifts = function () {
			return API.post('/recurrent_events/index', {location_id: $routeParams.id})
				.success(function (res) {
					$scope.data.shifts = res;
					console.log(res);
				});
		};

		$scope.controls.refreshLocations().success(function () {
			$scope.data.location = $rootScope.locations[$routeParams.id];
		});
		$scope.controls.refreshShifts();
		//@todo controls.datepicker
		//@todo controls.submit saves updates
	}
]);