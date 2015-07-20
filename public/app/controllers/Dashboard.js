/**
 * Dashboard controller
 *
 * @module Controllers
 * @submodule Dashboard
 * @class Dashboard
 */
Application.controller('Dashboard', [
	'$scope', '$location', '$rootScope', '$modal', 'API',
	function ($scope, $location, $rootScope, $modal, API) {
		console.log('Dashboard page');

		$scope.data = {};
		$scope.controls = {};

		if (!$rootScope.auth.isType('admin')) {
			$location.path('/login');
		}


		API.get('/recurrent_events/index').success(function (res) {
			$scope.shifts = _.groupBy(res, function (shift) { return shift.location_id; });
			API.get('/locations/index').success(function (res) {
				$scope.locations = res;
			});
		});

		$scope.controls.editShift = function (shift, day) {
			console.log(day, shift);
			var modal = $modal.open({
				templateUrl: 'partials/AddShift.html',
				controller: 'EditShift',
				resolve: {
					shift: function () { return shift; }
				}
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

		//@todo controls.refresh -> requests events
		$scope.controls.refresh = function () {

		};

		//@todo datepicker: select date
		$scope.controls.datePicker = function () {

		};

		//@todo 7 day schedule viewer
		$('#calendar').fullCalendar({
			defaultView: 'agendaWeek',
		    events: [
		        {
		            title  : 'event1',
		            start  : '2015-07-14',
		            editable: true
		        },
		        {
		            title  : 'event2',
		            start  : '2015-07-16',
		            end    : '2015-07-18',
		            allDay: false
		        },
		        {
		            title  : 'event3',
		            start  : '2015-07-09T12:30:00',
		            allDay : false // will make the time show
		        }
		    ]
		});
	}
]);