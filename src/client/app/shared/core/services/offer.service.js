angular.module('core')
	.factory('offerService', function ($http, $injector) {
		'use strict';

		// Detect if an API backend is present. If so, return the API module, else
		// hand off the localStorage adapter
		return $http.get(GLOBAL_SETTINGS.fullApiPath + 'offer')
			.then(function () {
				return $injector.get('offerApi');
			}, function () {
				return $injector.get('offerApi');
				//				return $injector.get('offerLocalStorage');
			});
	})

	.factory('offerApi', function ($resource) {
		'use strict';

		var store = {
			offers: [],

			api: $resource(GLOBAL_SETTINGS.apiPath + 'offer/:id', null,
				{
					update: { method: 'PUT' }
				}
			),

            add: function (offer) {
                offer.accepted = 0;
                return $resource(GLOBAL_SETTINGS.apiPath + 'offer', null, null)
                    .save(offer).$promise;
            },
            getForUser: function (ownerId, cb) {
                return $resource(GLOBAL_SETTINGS.apiPath + 'offer/ownerId/:ownerId', { ownerId: ownerId }, null)
                    .query(cb);
            },
            getByGift: function (giftId, cb) {
				return $resource(GLOBAL_SETTINGS.apiPath + 'gift/:giftId/offers', { giftId: giftId }, null)
                    .query(cb);
            },
            update: function (offer) {
                return $resource(GLOBAL_SETTINGS.apiPath + 'offer/id/:offerId', { offerId: offer.id }, { update: { method: 'PUT' } })
					.update(offer).$promise;
            }
		};

		return store;
	})

	.factory('offerLocalStorage', function ($q) {
		'use strict';

		var STORAGE_ID = 'gift-shop-offers';

		var store = {
		};

		return store;
	});