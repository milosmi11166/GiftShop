angular.module('gift').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('newGift', {
            url: '/gift/new',
            templateUrl: 'app/components/gift/views/gift.view.html',
            controller: 'gift.newController',
            controllerAs: 'vm',
            resolve: {
                giftStore: ['giftService', function (giftService) {
                    // Get the correct module (API or localStorage).
                    return giftService.then(function (module) {
                        return module;
                    });
                }]
            }
        })
        .state('gift', {
            url: '/gift/:giftId',
            templateUrl: 'app/components/gift/views/gift.details.view.html',
            controller: 'gift.detailsController',
            controllerAs: 'vm',
            resolve: {
                giftStore: ['giftService', function (giftService) {
                    // Get the correct module (API or localStorage).
                    return giftService.then(function (module) {
                        return module;
                    });
                }]
            }
        })
        .state('editGift', {
            url: '/gift/:giftId/edit',
            templateUrl: 'app/components/gift/views/gift.view.html',
            controller: 'gift.editController',
            controllerAs: 'vm',
            resolve: {
                giftStore: ['giftService', function (giftService) {
                    // Get the correct module (API or localStorage).
                    return giftService.then(function (module) {
                        return module;
                    });
                }]
            }
        })
        .state('searchGift', {
            url: '/search-gift?categoryId&keyword',
            templateUrl: 'app/components/gift/views/gift.search.view.html',
            controller: 'gift.searchController',
            controllerAs: 'vm',
            resolve: {
                giftStore: ['giftService', function (giftService) {
                    // Get the correct module (API or localStorage).
                    return giftService.then(function (module) {
                        return module;
                    });
                }]
            }
        });
    }]);
    