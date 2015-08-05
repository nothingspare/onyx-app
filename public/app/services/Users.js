/**
 * Users service
 *
 * @module Wrappers
 * @submodule Users
 * @class Users
 */
Application.service('Users', [
	'API', '$q', '$rootScope',
	function (API, $q, $rootScope) {
		var Module = {};
		Module.index = function (hash) {
			var deferred = $q.defer();
			var data = {};
			API.post('/users/index', {key: hash})
				.success(function (res) {
					angular.forEach(res, function (e) {
						delete e['password'];
						delete e['hash'];
						delete e['created'];
					});
					data.employees = res;
					$rootScope.employees = _.indexBy(res, 'id');

					deferred.resolve(data.employees);
				});

			return deferred.promise;
		};

		Module.find = function (id) {
			var deferred = $q.defer();
			var data = {};
			API.post('/users/find', {id: id})
				.success(function (res) {
					angular.forEach(res, function (e) {
						delete e['password'];
						delete e['hash'];
						delete e['created'];
					});
					data.employees = res;

					deferred.resolve(data.employees[0]);
				});

			return deferred.promise;
		}

		return Module;
	}
]);