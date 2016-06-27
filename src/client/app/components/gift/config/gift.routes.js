angular.module('gift').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('newGift', {
            url: '/newGift',
            templateUrl: 'app/components/gift/views/newGift.view.html',
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
            templateUrl: 'app/components/gift/views/giftDetails.view.html',
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
            url: '/editGift/:giftId',
            templateUrl: 'app/components/gift/views/newGift.view.html',
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
        });
    }]);
    