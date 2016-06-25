angular.module('gift').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('gift', {
            abstact: true,
            url: '/gift',
           // templateUrl: 'app/components/gift/views/gift.view.html',
            //controller: 'giftController',
            //controllerAs: 'vm',

        })
        .state('gift.new', {
            url: '/new',
            templateUrl: 'app/components/gift/views/gift.view.html',
            controller: 'giftController',
            controllerAs: 'vm'
        });
    }]);