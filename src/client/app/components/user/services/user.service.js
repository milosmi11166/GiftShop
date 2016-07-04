
angular.module('user')
    .factory('userService', function ($http, $injector) {
        'use strict';

        // Detect if an API backend is present. If so, return the API module, else
        // hand off the localStorage adapter
        return $http.get(GLOBAL_SETTINGS.fullApiPath + 'user')
            .then(function () {
                return $injector.get('userApi');
            }, function () {
                return $injector.get('userApi');
                //return $injector.get('userLocalStorage');
            });
    })

    .factory('userApi', ['$resource', function ($resource) {
        'use strict';
        var store = {
            user: {},

            api: $resource(GLOBAL_SETTINGS.apiPath + 'user?id=:id', null,
                {
                    update: { method: 'PUT' }
                }
            ),

            get: function (userId, cb) {
                return $resource(GLOBAL_SETTINGS.apiPath + 'user/id/:id', null, null)
                    .get({ id: userId }, cb);
            },
            update: function (user) {
                return store.api.update(user,
                    function success(resp) {
                        store.user = resp;
                    }, function error(err) {
                        console.log('User update error: ', user, err);
                    }).$promise;
            },

        };

        return store;
    }])

    .factory('userLocalStorage', function ($q) {
        'use strict';

        var STORAGE_ID = 'gift-shop-users';

        var store = {
        };

        return store;
    });