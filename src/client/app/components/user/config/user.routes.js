
angular.module('user').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('user', {
                abstract: true,
                url: '/user',
                templateUrl: 'app/components/user/views/user.view.html',
                controller: 'userController',
                controllerAs: 'vm'
            })
            .state('user.profile', {
                url: '/profile',
                templateUrl: 'app/components/user/views/user.profile.view.html',
                controller: 'user.profileController',
                parent: 'user',
                resolve: {
                    userStore: ['userService', function (userService) {
                        return userService.then(function (module) {
                            return module;
                        });
                    }]
                }
            })
            .state('user.myGifts', {
                url: '/gifts',
                templateUrl: 'app/components/user/views/user.myGifts.view.html',
                controller: 'user.myGiftsController',
                parent: 'user',
                resolve: {
                    giftStore: ['giftService', function (giftService) {
                        return giftService.then(function (module) {
                            return module;
                        });
                    }]
                }
            })
            .state('user.myOffers', {
                url: '/offers',
                templateUrl: 'app/components/user/views/user.myOffers.view.html',
                controller: 'user.myOffersController',
                parent: 'user',
                resolve: {
                    giftStore: ['giftService', function (giftService) {
                        return giftService.then(function (module) {
                            return module;
                        });
                    }]
                }
            })
    }]);
