define([
    'app',
], function (app) {
    'use strict';

    app.controller('Main',
    ['$scope',
    function ($scope) {
        $scope.text = 'Hello world!';
    }]);
});
