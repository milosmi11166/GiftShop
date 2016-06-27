
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
                return $injector.get('gift-localStorage');
            });
    })

    .factory('gift-api', function ($resource) {
        'use strict';

        var store = {
            gifts: [],
            myGifts: [],
            myOffers: [],
            currentGift: {},

            api: $resource(GLOBAL_SETTINGS.apiPath + 'gift?ownerId=:ownerId', null,
                {
                    update: { method: 'PUT' }
                }
            ),

            get: function (id, ownerId) {
                if (id) {
                    return $resource(GLOBAL_SETTINGS.apiPath + 'gift?id=:id', { id: id }, null);
                } else if (ownerId) {
                    return store.api.query({ ownerId: ownerId }, function (resp) {
                        angular.copy(resp, store.myGifts);
                    });
                } else {
                    return store.api.query(function (resp) {
                        angular.copy(resp, store.gifts);
                    });
                }
            },

            getOffers: function (ownerId) {
                return $resource(GLOBAL_SETTINGS.apiPath + 'offer?ownerId=:ownerId', { ownerId: ownerId }, null)
                    .query(function (resp) {
                        angular.copy(resp, store.myOffers);
                    });
            },

            insert: function (gift) {
                //temp
                gift.ownerId = 1;
                gift.image1Path = '';
                gift.image2Path = '';
                gift.image3Path = '';
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