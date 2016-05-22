angular.module('home').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'app/components/home/views/home.view.html',
            controller: 'homeController',
            controllerAs: 'vm'
        });
    }]);