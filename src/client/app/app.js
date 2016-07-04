//Start by defining the main module and adding the module dependencies
angular.module(AppConfig.appModuleName, AppConfig.appModuleDependencies);


angular.module(AppConfig.appModuleName).config(['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
}]);


//Then define the init function for starting up the application
angular.element(document).ready(function () {
    //Then init the app
    angular.bootstrap(document, [AppConfig.appModuleName]);
});


// angular.module(AppConfig.appModuleName).config(function ($locationProvider) {
//     // use the HTML5 History API
//     $locationProvider.html5Mode({
//         enabled: true,
//         requireBase: false
//     });
// });