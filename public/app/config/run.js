/**
 * Application initialization event time
 *
 * @module bootstrap
 */
Application.run([
	'$rootScope', 'Storage', '$location',
	function ($rootScope, Storage, $location) {
		/**
		 * View state variables
		 * @type class
		 */
		$rootScope.state = {
			isAuthenticated: false,
			isAdmin: false,
			appInit: false,
			routeInit: false
		};

		$rootScope.$on('$routeChangeSuccess', function (event, route) {
			if (!$rootScope.state.routeInit) {
				$rootScope.state.routeInit = true;
				if (Storage.get('route')) {
					$location.path(Storage.get('route'));
				}
			}
			if (route.$$route && route.$$route.allowRemember) {
				Storage.put('route', $location.path());
			}
		});

					//@todo auth writes headers to contant
					//@todo CREA events
					//@todo events check for user, assign to location
					//@todo user names link to /user/:username
		/**
		 * 
		 */
		$rootScope.auth = {
			user: function (user) {
				if (user) {
					Storage.put('user', user);
					$rootScope.state.isAuthenticated = true;
					$rootScope.$broadcast('Auth.user');
					return user;
				}
				else {
					return Storage.get('user');
				}
			},
			isType: function (type) {
				return type == Storage.get('user').type;
			},
			initUser: function () {
				if (Storage.get('user')) {
					$rootScope.auth.user(Storage.get('user'));
				}
			}
		};

		$rootScope.$on('Auth.user', function () {
			var user = $rootScope.auth.user();
			if (user.type) {
				$rootScope.state.authenticated = true;
				$location.path('/my-schedule');
				if (user.type == 'admin') {
					$rootScope.$broadcast('Auth.adminLogin');
					$rootScope.state.isAdmin = true;
				}
			}
		});

		$rootScope.$on('Auth.adminLogin', function () {
			$location.path('/dashboard');
		});

		$rootScope.$on('State.initialize', function () {
			$rootScope.auth.initUser();
		});

		$rootScope.$broadcast('State.initialize');
	}
]);