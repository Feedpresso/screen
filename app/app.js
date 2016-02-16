'use strict';

var userId = '56c1e6f0dfab183d5061e5ae';
var accessToken = 'Arhsmq0lJSXOeNg2uyDlgnh1UdbqPplQYXvjYs4HxhVAfGG8SGyYniewQYuEUi5o';

var services = angular.module('fpServices', ['ngResource', 'ngCookies']);
services
    .run(function ($http, $cookies) {
        $http.defaults.headers.common = {
            'X-AuthToken': btoa(userId + ':' + accessToken)
        };

    })
    .factory('NewsStream', function ($resource) {
        return $resource('http://api.feedpresso.com/api/v1/users/:userId/stream', {}, {
            query: {
                method: 'GET',
                params: {
                    limit_result: 100,
                    disable_score_reset: 'True',
                    skip_viewed_entries: 'False',
                    slim_down: 'False'
                },
                isArray: true,
                transformResponse: function (data, headersGetter) {
                    data = angular.fromJson(data);
                    return data;
                },
            }
        });
    });

var module = angular.module('screen', ['angular-flexslider', 'fpServices', 'ngMaterial', 'ngSanitize', 'monospaced.qrcode']);
module
    .filter('htmlToPlaintext', function () {
        return function (text) {
            var html = text.replace(/<(?!br\s*\/?)[^>]+>/g, '');
            return html;
        };
    })
    .filter('shorten', function () {
        return function (text) {
            text = text.substring(0, 500);
            return (text);
        }
    })
    .filter('customSanitize', function ($sanitize) {
        return function (text) {
            return $sanitize(text);
        };
    })
    .filter('newline', function ($sce) {
        return function (text) {
            text = text.replace(/\n/g, '<br />');
            return (text);
        }
    })
    .controller('RootCtrl', function ($scope, $rootScope, NewsStream, $cookies, $sanitize, $interval) {
        $scope.news = NewsStream.query({userId: userId})
        $interval(function () {
            $scope.news = NewsStream.query({userId: userId})
        }, 30 * 60 * 1000);
    });