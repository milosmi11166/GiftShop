
angular.module('gift')
    .factory('giftService', function ($http, $injector) {
        'use strict';

        // Detect if an API backend is present. If so, return the API module, else
        // hand off the localStorage adapter
        return $http.get(GLOBAL_SETTINGS.fullApiPath + 'gift')
            .then(function () {
                return $injector.get('gift-api');
            }, function () {
                return $injector.get('gift-localStorage');
            });
    })

    .factory('gift-api', function ($resource) {
        'use strict';

        var store = {
            gifts: [],

            api: $resource(GLOBAL_SETTINGS.apiPath + 'gift/:id', null,
                {
                    update: { method: 'PUT' }
                }
            ),

            get: function () {
                return store.api.query(function (resp) {
                    angular.copy(resp, store.gifts);
                });
            },

            insert: function (gift) {
                return store.api.save(gift,
                    function success(resp) {
                        store.gifts.push(gift);
                    }, function error(err) {
                        alert('gift inserting error')
                    }).$promise;
            },


        };

        return store;
    })

    .factory('gift-localStorage', function ($q) {
        'use strict';

        var STORAGE_ID = 'gift-shop-gifts';

        var store = {
            gifts: []
        };

        return store;
    });