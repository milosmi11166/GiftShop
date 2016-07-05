
angular.module('gift')
    .factory('giftService', function ($http, $injector) {
        'use strict';

        //return $injector.get('gift-api');

        // Detect if an API backend is present. If so, return the API module, else
        // hand off the localStorage adapter
        return $http.get(GLOBAL_SETTINGS.fullApiPath + 'gift')
            .then(function () {
                return $injector.get('gift-api');
            }, function () {
                return $injector.get('gift-api');
                //                return $injector.get('gift-localStorage');
            });
    })

    .factory('gift-api', function ($resource, authenticationService) {
        'use strict';

        var store = {
            gifts: [],
            myGifts: [],
            myOffers: [],
            currentGift: {},

            api: $resource(GLOBAL_SETTINGS.apiPath + 'gift', null,
                {
                    update: { method: 'PUT' }
                }
            ),

            get: function (id, ownerId) {
                return store.api.query(function (resp) {
                    angular.copy(resp, store.gifts);
                });
            },

            getByOwner: function (ownerId, cb) {
                return $resource(GLOBAL_SETTINGS.apiPath + 'gift/ownerId/:ownerId', { ownerId: ownerId }, null)
                    .query(cb);
            },

            getById: function (giftId, cb) {
                return $resource(GLOBAL_SETTINGS.apiPath + 'gift/id/:giftId', { giftId: giftId }, null)
                    .get(cb);
            },

            getByCategory: function (ownerId, categoryId, cb) {
                return $resource(GLOBAL_SETTINGS.apiPath + 'gift/ownerId/:ownerId/categoryId/:categoryId', { ownerId: ownerId, categoryId: categoryId }, null)
                    .query(cb);
            },
            getByKeyword: function (ownerId, keyword, cb) {
                return $resource(GLOBAL_SETTINGS.apiPath + 'gift/ownerId/:ownerId/searchTerm/:keyword', { ownerId: ownerId, keyword: keyword }, null)
                    .query(cb);
            },

            insert: function (gift) {
                //temp
                gift.image1Path = null;
                gift.image2Path = null;
                gift.image3Path = null;
                gift.ownerId = authenticationService.currentUser.id;
                return store.api.save(gift,
                    function success(resp) {
                        store.gifts.push(gift);
                    }, function error(err) {
                        alert('gift inserting error')
                    }).$promise;
            },

            update: function (gift) {
                return store.api.update(gift,
                    function success(resp) {
                        store.gift = resp;
                    }, function error(err) {
                        console.log('User update gift: ', gift, err);
                    }).$promise;
            },

            remove: function (giftId) {
                return $resource(GLOBAL_SETTINGS.apiPath + 'gift/id/:giftId', null, null)
                    .remove({ giftId: giftId }).$promise;
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