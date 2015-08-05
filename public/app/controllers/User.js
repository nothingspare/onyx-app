/**
 * User controller
 *
 * @module Controllers
 * @submodule User
 * @class User
 */
Application.controller('User', [
	'$scope', '$location', '$rootScope', '$routeParams', 'Users', 'API', 'Alertify',
	function ($scope, $location, $rootScope, $routeParams, Users, API, Alertify) {
		$scope.data = {};
		$scope.controls = {};
		$scope.params = {};

		Users.index($rootScope.auth.user().hash).then(function (res) {
			console.log(res);
			$rootScope.employees = _.indexBy(res, 'username');
			$scope.data.employee = $rootScope.employees[$routeParams.username];
			$scope.params.employee = angular.copy($scope.data.employee);
		});

		$scope.controls.submit = function () {
			var data = angular.copy($scope.data.employee);
			if ($scope.params.employee.password == data.password) {
				delete data.password;
			}
			API.post('/users/edit', data).then(function () {
				Alertify.success('Saved');
			}, function (error) {
				console.log(error);
				Alertify['error']('Error');
			});
		};
		//@todo controls.datepicker
		//@todo tooltip library
		//@todo explode cells from server period requests, all complete hours get a div element
		//@todo tooltip shows location, hours in set nodes (ex: 9am-5pm)
	}
]);