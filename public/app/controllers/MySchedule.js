/**
 * MySchedule controller
 *
 * @module Controllers
 * @submodule MySchedule
 * @class MySchedule
 */
Application.controller('MySchedule', [
	'$scope', '$location', '$rootScope', 'API',
	function ($scope, $location, $rootScope, API) {
		console.log('schedule page');
		if (!$rootScope.auth.isType('employee')) {
			$location.path('/');
		}

		$scope.data = {};
		$scope.controls = {};
		$scope.helpers = {};

		$scope.data.user = $rootScope.auth.user();
		$scope.data.week = {
			start: moment().day(0).format('MM/DD'),
			end: moment().day(6).format('MM/DD')
		};

		$scope.controls.refresh = function (params) {
			var _params = {
				startDatetime: moment().day(0).hour(0).minute(0).second(0).format('YYYY-MM-DD HH:mm:ssZ'),
				endDatetime: moment().day(6).hour(23).minute(59).second(59).format('YYYY-MM-DD HH:mm:ssZ'),
				user_id: $rootScope.auth.user().id
			}

			params = _.extend(_params, params);

			API.post('/locations/schedule', params).success(function (schedule) {
				$scope.data.days = $scope.helpers.getRegularDays(schedule.shifts.regular);
				$scope.data.days = _.extend($scope.data.days, $scope.helpers.getPickupDays(schedule.shifts.pickup));
				$scope.helpers.removeLostDays($scope.data.days, schedule.shifts.lost);
				$scope.data.locations = schedule.locations;
			});
		};


		$scope.controls.refresh();

		$scope.helpers.removeLostDays = function (days, events) {
			var id = $rootScope.auth.user().id;
			angular.forEach(events, function (event, index) {
				delete days[event.day];
			});
		};
		$scope.helpers.getPickupDays = function (events) {
			var id = $rootScope.auth.user().id;
			var days = {};
			angular.forEach(events, function (event, index) {
				console.log(event);
				event.recurrent_event_id[event.day + '_shift'] = 1;
				event.recurrent_event_id[event.day + '_user_id'] = id;
				event.pickup = true;
				days[event.day] = event.recurrent_event_id;
			});

			console.log(days);
			return days;
		};

		$scope.helpers.getRegularDays = function (regular) {
			var id = $rootScope.auth.user().id;
			var days = {};
			angular.forEach(regular, function (shift, index) {
				if (shift.sunday_user_id == id) { days.sunday = shift; }
				if (shift.monday_user_id == id) { days.monday = shift; }
				if (shift.tuesday_user_id == id) { days.tuesday = shift; }
				if (shift.wednesday_user_id == id) { days.wednesday = shift; }
				if (shift.thursday_user_id == id) { days.thursday = shift; }
				if (shift.friday_user_id == id) { days.friday = shift; }
				if (shift.saturday_user_id == id) { days.saturday = shift; }
			});

			return days;
		};

		//@todo see my schedule
		$scope.helpers.init = function () {
			var data = _.pick($scope.data.user, 'id', 'viewed');
			data.viewed =  moment().format('YYYY-MM-DD HH:mm:ssZ');
			API.post('/users/edit', data).success(function (res) {
				console.log('updated', res);
			});
		};

		//@todo confirmation
		$scope.helpers.init();
	}
]);