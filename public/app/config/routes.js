/**
 * Application routes
 *
 * @module bootstrap
 */
Application.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider

		//expect unauthenticated
		.when('/login', { controller: 'Login', templateUrl: 'partials/Login.html', allowAuth: false, allowRemember: false })
		.when('/forgot', { controller: 'Forgot', templateUrl: 'partials/Forgot.html', allowAuth: false, allowRemember: false })

		//agnostic to authentication
		.when('/help', { controller: 'Help', templateUrl: 'partials/Help.html', allowAuth: null, allowRemember: true })
		.when('/reset', { controller: 'Reset', templateUrl: 'partials/Reset.html', allowAuth: null, allowRemember: true })

		//expect authenticated
			//type agnostic
			.when('/logout', { controller: 'Logout', template: '', allowAuth: true, allowRemember: false })

			//type: employee
			.when('/my-schedule', { controller: 'MySchedule', templateUrl: 'partials/MySchedule.html', allowAuth: true, allowRemember: true })
			.when('/profile', { controller: 'Profile', templateUrl: 'partials/Profile.html', allowAuth: true, allowRemember: true })

			//type: admin
			.when('/dashboard', { controller: 'Dashboard', templateUrl: 'partials/Dashboard.html', allowAuth: true, allowRemember: true })
			.when('/employees', { controller: 'Users', templateUrl: 'partials/Employees.html', allowAuth: true, allowRemember: true })
			.when('/employee/:username', { controller: 'User', templateUrl: 'partials/Employee.html', allowAuth: true, allowRemember: true })
			.when('/locations', { controller: 'Locations', templateUrl: 'partials/Locations.html', allowAuth: true, allowRemember: true })
			.when('/location/:id', { controller: 'Location', templateUrl: 'partials/Location.html', allowAuth: true, allowRemember: true })

		//otherwise
		.otherwise({redirectTo: '/login'});
}]);