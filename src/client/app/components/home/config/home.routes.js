angular.module('home').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'app/components/home/views/home.view.html',
            controller: 'homeController',
            controllerAs: 'vm',
            resolve: {
                categoryStore: ['categoryService', function (categoryService) {
                    // Get the correct module (API or localStorage).
                    return categoryService.then(function (module) {
                        module.get();
                        return module;
                    });
                }]
            }
        });
    }]);