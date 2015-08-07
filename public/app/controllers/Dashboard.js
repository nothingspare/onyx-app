/**
 * Dashboard controller
 *
 * @module Controllers
 * @submodule Dashboard
 * @class Dashboard
 */
Application.controller('Dashboard', [
	'$scope', '$location', '$rootScope', '$modal', 'API', 'Users', 'Alertify', '$route',
	function ($scope, $location, $rootScope, $modal, API, Users, Alertify, $route) {
		console.log('Dashboard page');

		$scope.data = {};
		$scope.controls = {};

		if (!$rootScope.auth.isType('admin')) {
			$location.path('/login');
		}


		API.get('/recurrent_events/index').success(function (res) {
			angular.forEach(res, function (shift, i) {
				if (shift.events && shift.events.length > 0) {
					angular.forEach(shift.events, function (e, i ) {
						Users.find(e.user_id).then(function (r) {
							shift[e.day + '_user_id'] = r;
						});
					});
				}
			});
			$scope.shifts = _.groupBy(res, function (shift) { return shift.location_id; });
			API.get('/locations/index').success(function (res) {
				$scope.locations = res;
			});
		});

		$scope.controls.editShift = function (shift, day) {
			//@todo popualte pickupdate according to the calendar dates expressed
			var pickupdate = moment().day(day);

			var modal = $modal.open({
				templateUrl: 'partials/EditShift.html',
				controller: 'EditShift',
				resolve: {
					shift: function () { return shift; },
					day: function () { return day; },
					pickupDate: function () { return pickupdate; }
				}
			});

			modal.result.then(function () {
				$scope.controls.refresh();
			});
		};

		//@todo recurring employee shifts
		//@todo location shifts
		//@todo controls.events modal
		$scope.controls.addEvent = function () {
			var modal = $modal.open({
				controller: 'AddEvent',
				templateUrl: 'partials/AddEvent.html'
			});

			modal.result.then(function () {
				$scope.controls.refresh();
			});
		};

		$scope.controls.reportHours = function () {
			var modal = $modal.open({
				templateUrl: 'partials/report-hours-dashboard.html',
				controller: 'ReportHours'
			});
		};
		$scope.controls.notifyUpdates = function () {
			Alertify.confirm('Are you sure you want to text, all active employees?').then(function () {
				API.get('/users/textEveryone').success(function () {
					Alertify.success('Text Message Dispatched');
				});
			});
		};

		//@todo controls.refresh -> requests events
		$scope.controls.refresh = function () {
			$route.reload();
		};
	}
]);