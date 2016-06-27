angular.module('core')
	.factory('categoryService', function ($http, $injector) {
		'use strict';

		// Detect if an API backend is present. If so, return the API module, else
		// hand off the localStorage adapter
		return $http.get(GLOBAL_SETTINGS.fullApiPath + 'category')
			.then(function () {
				return $injector.get('categoryApi');
			}, function () {
				return $injector.get('categoryLocalStorage');
			});
	})

	.factory('categoryApi', function ($resource) {
		'use strict';

		var store = {
			categories: [],

			api: $resource(GLOBAL_SETTINGS.apiPath + 'category/:id', null,
				{
					update: { method:'PUT' }
				}
			),

			get: function () {
				return store.api.query(function (resp) {
					angular.copy(resp, store.categories);
				});
			},

			
		};

		return store;
	})

	.factory('categoryLocalStorage', function ($q) {
		'use strict';

		var STORAGE_ID = 'gift-shop-categories';

		var store = {
			categories: [],

			_getFromLocalStorage: function () {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},

			_saveToLocalStorage: function (categories) {
				localStorage.setItem(STORAGE_ID, JSON.stringify(categories));
			},

			get: function () {
				var deferred = $q.defer();

				angular.copy(store._getFromLocalStorage(), store.categories);
				deferred.resolve(store.categories);

				return deferred.promise;
			}
		};

		return store;
	});