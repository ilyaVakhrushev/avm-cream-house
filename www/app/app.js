'use strict';

angular.module('avm', [
	'avm.components',
	'avm.modules'
])

	.config(function ($settings, $logProvider, $locationProvider, $urlRouterProvider, //                    localeProvider,
                    RestangularProvider, $stateProvider) {

		// Configure logging
		$logProvider.debugEnabled($settings.debug);

		// Configure localization
//		localeProvider.setLocalesBasePath('/app/locales');

		// Configure Restangular
		(function () {
			RestangularProvider.setBaseUrl($settings.apiURL);
			RestangularProvider.setRequestSuffix('/');
			RestangularProvider.setDefaultHttpFields({
				cache: !$settings.debug
			});
			RestangularProvider.setDefaultHeaders({
				'Content-Type': 'application/json',
				'X-Requested-With': 'XMLHttpRequest'
			});
			RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params, httpConfig) {
				if (operation === 'remove' || (operation === 'put' && angular.equals(element, {id: undefined}))) {
					// Send a delete WITHOUT a body.
					element = null;
				} else if (headers['Content-Type'] && headers['Content-Type'] === 'application/x-www-form-urlencoded') {
					// Convert json request to x-www-form-urlencoded request
					element = $.param(element);
				}

				return {
					headers: headers,
					element: element,
					params: params,
					httpConfig: httpConfig
				};
			});
		})();

		// Configure routes
//		$locationProvider
//			.html5Mode(true)
//			.hashPrefix('!');

		// Configure default router
		$urlRouterProvider.otherwise('/menu/drinks');
	})

	.run(function ($rootScope, $settings, $log, $interval, $cacheFactory, $location, $window, $state, gettextCatalog) {

		// Make $settings global
		$rootScope.$settings = $settings;
		// Make $state global
		$rootScope.$state = $state;

    $rootScope.$on('gettextLanguageChanged', function () {
      $rootScope.lang = angular.copy(gettextCatalog.currentLanguage);
    });

    // todo set up user's language
    $rootScope.lang = angular.copy(gettextCatalog.currentLanguage);

    // Log app info
		$log.info('AVM ' + $settings.version +
			'; Debug: ' + $settings.debug +
			'; Build Date: ' + $settings.buildDate);

		// Clear $http cache every 10 sec.
//		$interval(function () {
//			$cacheFactory.get('$http').removeAll();
//		}, 10000, 0, false);

		// Show loading on state changes
		(function () {
			$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
				$rootScope.dataLoading = true;
			});
			$rootScope.$on('$stateChangeSuccess', function () {
				$rootScope.dataLoading = false;
			});
			$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
				$rootScope.dataLoading = false;
				$log.error(error.message);
			});
			$rootScope.$on('$stateNotFound', function () {
				$rootScope.dataLoading = false;
			});
			$rootScope.$on('$serverError', function () {
				$rootScope.dataLoading = false;
			});
			$rootScope.$on('$transitionSuccess', function () {
				$rootScope.dataLoading = false;
			});
			$rootScope.$on('$transitionError', function (error) {
				$rootScope.dataLoading = false;
			});
		})();

		// Google analytics users activity tracking
//		$rootScope.$on('$stateChangeSuccess', function (event, data) {
//			if (_.isFunction($window.ga) && data.name.indexOf('manager.') === -1) {
//				$window.ga('send', 'pageview', { page: $location.path() });
//			}
//		});
	})
  .controller('LeftMenuCtrl', function($scope, gettextCatalog, $ionicSideMenuDelegate) {
    $scope.languages = [
      {
        value: 'en',
        label: 'English'
      },
      {
        value: 'ru',
        label: 'Русский'
      }
    ];

    $scope.leftMenu = {lang: gettextCatalog.currentLanguage};

    $scope.changeLang = function () {
      gettextCatalog.setCurrentLanguage($scope.leftMenu.lang);
      $ionicSideMenuDelegate.toggleLeft();
    }
  });


//	// Init intercom
//	.run(function (intercom) {
//		intercom.init();
//	});

// Set lang
//	.run(function ($acceptLanguage) {
//		var currentLang = {};

//		$acceptLanguage.$init();
//		currentLang = $acceptLanguage.$get();
//		Restangular.addFullRequestInterceptor(acceptLanguageRequestInterceptor);
//
//		if (currentLang && currentLang.language) {
//			locale.setLocale(currentLang.language);
//		} else {
//			locale.setLocale($settings.defaultLocale);
//		}
//	});
