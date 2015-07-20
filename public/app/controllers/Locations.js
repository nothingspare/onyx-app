/**
 * Locations controller
 *
 * @module Controllers
 * @submodule Locations
 * @class Locations
 */
Application.controller('Locations', [
	'$scope', '$location', '$modal', 'API', '$rootScope',
	function ($scope, $location, $modal, API, $rootScope) {
		$scope.data = {
			filter: ''
		};
		$scope.controls = {};

		//@todo controls.showArchived() - filter by all columns if possible
		$scope.controls.add = function () {
			console.log('add', $modal);
			var modal = $modal.open({
				templateUrl: 'partials/AddLocation.html',
				controller: 'AddLocation',
			});

			modal.result.then(function (obj) {
				$scope.controls.refresh();
			});
		};

		$scope.controls.refresh = function () {
			return API.get('/locations/index')
				.success(function (res) {
					$scope.data.locations = res;
					$rootScope.locations = _.indexBy(res, 'id');
				});
		};
		$scope.controls.refresh();
	}
]);