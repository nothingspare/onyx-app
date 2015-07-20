/**
 * MySchedule controller
 *
 * @module Controllers
 * @submodule MySchedule
 * @class MySchedule
 */
Application.controller('MySchedule', [
	'$scope', '$location', '$rootScope',
	function ($scope, $location, $rootScope) {
		console.log('schedule page');
		if (!$rootScope.auth.isType('employee')) {
			$location.path('/');
		}

		$scope.data = {};
		$scope.controls = {};

		$scope.data.user = $rootScope.auth.user();
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
		//@todo see my schedule
	}
]);