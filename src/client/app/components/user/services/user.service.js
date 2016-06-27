
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

            get: function (userId) {
                return store.api.query({ id: userId }, function (resp) {
                    if (resp.length === 1) {
                        angular.copy(resp[0], store.user);
                        
                        //temp
                        store.user.email = store.user.Email;
                        store.user.fullName = store.user.FullName;
                        store.user.phone = store.user.Phone;
                        store.user.address = store.user.Address;
                        store.user.created = store.user.Created;
                        store.user.userTypeId = 1;
                        store.user.password = store.user.Password;
                    }
                });
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