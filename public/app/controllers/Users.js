/**
 * Users controller
 *
 * @module Controllers
 * @submodule Users
 * @class Users
 */
Application.controller('Users', [
	'$scope', '$location', '$modal', 'API', '$rootScope', 'Users',
	function ($scope, $location, $modal, API, $rootScope, Users) {
		if (!$rootScope.auth.isType('admin')) {
			$location.path('/login');
		}
		$scope.data = {
			filter: {}
		};
		$scope.controls = {};

		$scope.data.user = $rootScope.auth.user();

		$scope.$watch('data.filter.last_name', function (current) {
			$scope.data.filter.first_name = current;
		});

		//@todo controls.showArchived() - filter by all columns if possible
		$scope.controls.showArchived = function () {
			console.log('show archived');
		};
		//@todo controls.add() - popup add modal
		$scope.controls.add = function () {
			console.log('add', $modal);
			//@todo after modal resolution, refresh user list
			var modal = $modal.open({
				templateUrl: 'partials/AddEmployee.html',
				controller: 'AddUser',
			})

			modal.result.then(function (obj) {
				$scope.controls.refresh();
			});
		};

		$scope.controls.refresh = function () {
			return Users.index($scope.data.user.hash).then(function (res) {
				$scope.data.employees = res;
			});
		};

		$scope.controls.refresh();
	}
]);