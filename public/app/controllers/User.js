/**
 * User controller
 *
 * @module Controllers
 * @submodule User
 * @class User
 */
Application.controller('User', [
	'$scope', '$location', '$rootScope', '$routeParams',
	function ($scope, $location, $rootScope, $routeParams) {
		$scope.data = {};
		$scope.controls = {};

		$scope.data.employee = $rootScope.employees[$routeParams.username];

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

		//@todo controls.submit saves updates
		//@todo controls.datepicker
		//@todo tooltip library
		//@todo explode cells from server period requests, all complete hours get a div element
		//@todo tooltip shows location, hours in set nodes (ex: 9am-5pm)
	}
]);