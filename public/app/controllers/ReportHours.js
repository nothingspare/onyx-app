/**
 * ReportHours controller
 *
 * @module Controllers
 * @submodule ReportHours
 * @class ReportHours
 */
Application.controller('ReportHours', [
	'$scope', '$location', '$rootScope', '$routeParams', 'API', '$modal', 'Users', 'Alertify',
	function ($scope, $location, $rootScope, $routeParams, API, $modal, Users, Alertify) {
		$scope.data = {};
		$scope.controls = {};
		$scope.params = {};
		$scope.helpers = {};

		//@todo date goes here /users/hours/offset/YYYY-MM-DD
		API.get('/users/hours/' + moment().utcOffset()).success(function (res) {
			console.log(res);
			$scope.data.employees = res;
			angular.forEach($scope.data.employees, function (employee) {
				if (employee.total_hours > 40) {
					employee.alert = true;
				}
			});
		});
	}
]);