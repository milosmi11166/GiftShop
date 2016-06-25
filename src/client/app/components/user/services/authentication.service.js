
angular.module('user')
    .factory('authenticationService', function ($http, $injector) {
        'use strict';

        // Detect if an API backend is present. If so, return the API module, else
        // hand off the localStorage adapter
        return $http.get(GLOBAL_SETTINGS.fullApiPath + 'user')
            .then(function () {
                return $injector.get('authentication-api');
            }, function () {
                return $injector.get('authentication-localStorage');
            });
    })

    .factory('authentication-api', function ($resource) {
        'use strict';

        var store = {
            users: [],

            api: $resource(GLOBAL_SETTINGS.apiPath + 'user/:id', null,
                {
                    update: { method: 'PUT' }
                }
            ),

            get: function () {
                return store.api.query(function (resp) {
                    angular.copy(resp, store.users);
                });
            },

            insert: function (user) {
                var originalUsers = store.users.slice(0);

                return store.api.save(user,
                    function success(resp) {
                        user.id = resp.id;
                        store.users.push(user);
                    }, function error() {
                        angular.copy(originalUsers, store.users);
                    }).$promise;
            },


            login: function (user) {
                return store.api.update(user,
                    function success(resp) {
                       console.log('Login Success', resp);
                    }, function error(err) {
                       console.log('Login Error', err);                        
                    }).$promise;
            }

        };

        return store;
    })

    .factory('authentication-localStorage', function ($q) {
        'use strict';

        var STORAGE_ID = 'gift-shop-users';

        var store = {
            users: [],

            _getFromLocalStorage: function () {
                return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            },

            _saveToLocalStorage: function (users) {
                localStorage.setItem(STORAGE_ID, JSON.stringify(users));
            },

            _getNextId: function () {
                var users = store._getFromLocalStorage();
                var max = 0;
                for (var i = 0; i < users.length; i++) {
                    if (users[i].id > max) {
                        max = users[i].id;
                    }
                }
                return max;
            },

            get: function () {
                var deferred = $q.defer();

                angular.copy(store._getFromLocalStorage(), store.users);
                deferred.resolve(store.users);

                return deferred.promise;
            },

            insert: function (user) {
                var deferred = $q.defer();
                debugger
                user.id = store._getNextId() + 1;
                store.users.push(user);

                store._saveToLocalStorage(store.users);
                deferred.resolve(store.users);

                return deferred.promise;
            },

            login: function (user) {
                var deferred = $q.defer();
                var currentUsers = store._getFromLocalStorage();

                var registeredUser = currentUsers.filter(function (cUser) {
                    return (cUser.email === user.email && cUser.password === user.password);
                });

                if (registeredUser.length === 1) {
                    deferred.resolve(registeredUser[0]);
                } else {
                    deferred.reject('User does not exist');
                }


                return deferred.promise;
            }
        };

        return store;
    });