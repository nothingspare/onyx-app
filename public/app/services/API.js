/**
 * An API wrapping service
 *
 * @module Services
 * @submodule API 
 * @class API
 */
Application.service('API', [
	'$http', '$q', 'Config',
	function ($http, $q, Config) {
		var Module = {
			get: function (path, config) {
				//merge request params
				var requestObj = _.extend({
					method: 'GET',
					headers: Config.headers,
					url: Config.endpoint + path
				}, config);

				return $http(requestObj);
			},
			post: function (path, data, config) {
				//handle empty data object
				if (angular.isObject(data)) {
					var deferred = $q.defer();
					deferred.reject('No data passed to request');
					return deferred.promise;
				}

				//merge request params
				var requestObj = _.extend({
					method: 'POST',
					data: data,
					headers: Config.headers,
					url: Config.endpoint + path
				}, config);

				return $http(requestObj);
			},
			put: function (path, data, config) {
				//handle empty data object
				if (angular.isObject(data)) {
					var deferred = $q.defer();
					deferred.reject('No data passed to request');
					return deferred.promise;
				}

				//merge request params
				var requestObj = _.extend({
					method: 'PUT',
					data: data,
					headers: Config.headers,
					url: Config.endpoint + path
				}, config);

				return $http(requestObj);
			},
			del: function (path, config) {
				//merge request params
				var requestObj = _.extend({
					method: 'DELETE',
					headers: Config.headers,
					url: Config.endpoint + path
				}, config);

				return $http(requestObj);
			}
		};
		return Module;
	}
]);