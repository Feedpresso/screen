'use strict';

// var userId = '56c1e6f0dfab183d5061e5ae';
// var accessToken = 'Arhsmq0lJSXOeNg2uyDlgnh1UdbqPplQYXvjYs4HxhVAfGG8SGyYniewQYuEUi5o';

function resizedImageUrl(url, width, height) {
    if (!url) {
        return null;
    }

    // let proxyUrl = 'https://imageproxyapp.azurewebsites.net/';
    var proxyUrl = 'https://imageproxy.feedpresso.com/';
    if (height && width === null) {
        proxyUrl += 'x' + height;
    }
    if (width && height === null) {
        proxyUrl += '' + width + 'x';
    }
    if (width && height) {
        proxyUrl += '' + width + 'x' + height;
    }

    proxyUrl += '/' + encodeURIComponent(url);

    return proxyUrl;
}


var services = angular.module('fpServices', ['ngResource', 'ngCookies', 'ngRoute']);
services
    .run(function ($http, $cookies) {
        // $http.defaults.headers.common = {
        //     'X-AuthToken': btoa(userId + ':' + accessToken)
        // };
    })
    .factory('Users', function ($resource) {
        return {
            auth: function (accessToken) {
                var headers = {};

                if (accessToken) {
                    headers['X-AuthToken'] = btoa(accessToken.user_id + ':' + accessToken.value);
                }

                return $resource('https://api.feedpresso.com/api/v1/users/:userId', {}, {
                    stream: {
                        method: 'GET',
                        url: 'https://api.feedpresso.com/api/v1/users/:userId/stream',
                        params: {
                            disable_score_reset: 'True',
                            skip_viewed_entries: 'False',
                            limit_result: 10,
                            slim_down: 'False'
                        },
                        headers: headers,
                        isArray: true,
                        transformResponse: function (data, headersGetter) {
                            data = angular.fromJson(data).filter(function (elem) {
                                return !!elem.feed_entry.images
                            });
                            return data;
                        },
                    },
                    create: {
                        method: 'POST',
                        params: {},
                        headers: {
                            'Content-Type': 'application/vnd.feedpresso.User+json'
                        },
                        transformResponse: function (data) {
                            data = angular.fromJson(data);
                            return data;
                        },
                    }
                });
            }
        }
    })
    .factory('Auth', function ($resource) {
        return $resource('https://api.feedpresso.com/api/v1/auth/quick_user_token', {}, {
            quickUser: {
                method: 'GET',
                transformResponse: function (data, headersGetter) {
                    data = angular.fromJson(data);
                    return data;
                },
            },
        });
    });

var module = angular.module('screen', ['angular-flexslider', 'fpServices', 'ngMaterial', 'ngSanitize', 'monospaced.qrcode', 'ngRoute']);
module
    .config(function ($locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }
    )
    .filter('htmlToPlaintext', function () {
        return function (text) {
            var html = text.replace(/<(?!br\s*\/?)[^>]+>/g, '');
            return html;
        };
    })
    .filter('resizeImageUrl', function () {
        return function (text) {
            return resizedImageUrl(text, 640);
        }
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
    .controller('RootCtrl', function ($scope, $rootScope, $location, Users, Auth, $cookies, $sanitize, $interval) {
        function getAccessToken(arg) {
            return Rx.Observable.create(function (observer) {
                var accessToken = null;
                var params = $location.search();
                if (params.userId && params.accessTokenValue) {
                    accessToken = {
                        user_id: params.userId,
                        value: params.accessTokenValue
                    };
                } else {
                    accessToken = $cookies.getObject('accessToken');
                }
                // var accessToken = false;
                if (accessToken) {
                    observer.onNext(accessToken);
                    observer.onCompleted();
                } else {

                    var user = {
                        email: "quickuser",
                        realm: "feedpresso.com",
                        system_profile: {
                            sim_country_iso: window.navigator.language,
                        }
                    };

                    Rx.Observable
                        .fromPromise(Users.auth().create(user).$promise)
                        .flatMap(function (user) {
                            return Rx.Observable
                                .fromPromise(Auth.quickUser({access_token: user.email}).$promise);
                        })
                        .subscribe(function (accessToken) {
                            $cookies.putObject('accessToken', accessToken);
                            observer.onNext(accessToken);
                            observer.onCompleted();
                        });
                }


                // Any cleanup logic might go here
                return function () {
                    console.log('disposed');
                }
            });
        }

        var interval = 10 * 60 * 1000;

        Rx.Observable.concat(
            Rx.Observable.just(1),
            Rx.Observable
                .interval(interval)
                .timeInterval()
        )
            .flatMap(getAccessToken())
            .subscribe(
                function (accessToken) {
                    console.log(accessToken);

                    var userId = accessToken.user_id;

                    $scope.news = Users.auth(accessToken).stream({userId: userId});
                });

    });
