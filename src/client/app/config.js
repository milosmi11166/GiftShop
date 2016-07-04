/*exported AppConfig*/

// Init the application configuration module for AngularJS application
var AppConfig = (function () {


    // Init module configuration options
    var appModuleDependencies = [
        'ui.router',
        'ngResource',
        'cgNotify',
        'angular-growl'
    ];

    // cgNotify a new vertical module
    var registerModule = function (moduleName, dependencies) {
        // Create angular module
        angular.module(moduleName, dependencies || []);

        // Add the module to the AngularJS configuration file
        angular.module('GiftShop').requires.push(moduleName);
    };

    return {
        appModuleName: 'GiftShop',
        appModuleDependencies: appModuleDependencies,
        registerModule: registerModule
    };
})();