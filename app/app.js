'use strict';

// Declare app level module which depends on views, and components


var services = angular.module('fpServices', ['ngResource', 'ngCookies']);
services.run(function ($http, $cookies) {
        // $http.defaults.headers.common.Authorization = 'Basic ' + btoa('56c19500dfab183954722063:Oh8wDN1aVR59jAAZhMLP2mLMVRxYFJlPx5r9NcHYyM13p9XC7fyfAupnQTngJPCa');
        // $cookies.put('userIdCredentials', btoa('56c19500dfab183954722063:Oh8wDN1aVR59jAAZhMLP2mLMVRxYFJlPx5r9NcHYyM13p9XC7fyfAupnQTngJPCa'));

        // $http.defaults.headers.common['Cookie'] = 'userIdCredentials=' + btoa('56c19500dfab183954722063:Oh8wDN1aVR59jAAZhMLP2mLMVRxYFJlPx5r9NcHYyM13p9XC7fyfAupnQTngJPCa') + ";";
        $http.defaults.headers.common['X-AuthToken'] = btoa('56c19500dfab183954722063:Oh8wDN1aVR59jAAZhMLP2mLMVRxYFJlPx5r9NcHYyM13p9XC7fyfAupnQTngJPCa');

    })
    .factory('NewsStream', function ($resource) {
        return $resource('http://api.feedpresso.com/api/v1/users/:userId/stream', {}, {
            query: {
                method: 'GET',
                params: {
                    limit_result: 100,
                    disable_score_reset: 'True',
                    slim_down: 'False'
                },
                isArray: true,
                transformResponse: function (data, headersGetter) {
                    data = angular.fromJson(data);
                    return data;
                },
                headers: {
                    // 'Cookie': 'userIdCredentials=' + btoa('56c19500dfab183954722063:Oh8wDN1aVR59jAAZhMLP2mLMVRxYFJlPx5r9NcHYyM13p9XC7fyfAupnQTngJPCa') + ";"
                }
            }
        });
    });

var module = angular.module('screen', ['angular-flexslider', 'fpServices', 'ngMaterial', 'ngSanitize', 'monospaced.qrcode']);
module
    .filter('htmlToPlaintext', function () {
        return function (text) {
            var html = text.replace(/<(?!br\s*\/?)[^>]+>/g, '');
            return html;
            // return text ? String(text).replace(/<[^>]+>/gm, '') : '';
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
    .controller('RootCtrl', function ($scope, $rootScope, NewsStream, $cookies, $sanitize) {
        $cookies.put('userIdCredentials', btoa('56c19500dfab183954722063:Oh8wDN1aVR59jAAZhMLP2mLMVRxYFJlPx5r9NcHYyM13p9XC7fyfAupnQTngJPCa'));
        // $scope.news = NewsStream.query({userId: '56c19500dfab183954722063'})

        $scope.news = [{
            "feed_entry": {
                "author": "15min.lt",
                "is_processed": true,
                "feed": {
                    "icon": "http://s1.15cdn.lt/img/touch_icons/144x144/15min_cons_4-17.png",
                    "description": "15min.lt / U\u017esienis",
                    "link": "http://www.15min.lt/",
                    "language": "lt-lt",
                    "title": "15min.lt RSS: U\u017esienis",
                    "last_checked_date": 1455529467258,
                    "tags": ["politikos", "konkursai", "ekonomikos", "Vilniaus", "Lietuvos naujienos", "orai", "sporto", "fotogalerijos", "Klaip\u0117dos", "pramogos", "aktualijos", "Kauno", "horoskopai", "u\u017esienio"],
                    "last_updated": 1455529260000,
                    "id": "54cf992eacc815000106e297",
                    "url": "http://www.15min.lt/rss/aktualu/pasaulis/",
                    "image": "http://s1.15cdn.lt/img/touch_icons/512x512/15min_cons_4-17.png",
                    "is_sponsored_source": false
                },
                "image": "http://s2.15cdn.lt/static/cache/NTgweDMwMyw0MDd4MjQzLDU5NzI2MSxvcmlnaW5hbCwsMzE1ODkwMjA3MQ==/1267794842dmitrijusrogozinas.jpg",
                "title": "Rusijos vicepremjeras Dmitrijus Rogozinas: \u201eJokia karin\u0117 operacija Irake neplanuojama\u201c",
                "system_created_date": 1455529467569,
                "tags": ["Irakas", "Rusija", "U\u017esienis"],
                "images": ["http://s2.15cdn.lt/static/cache/NTgweDMwMyw0MDd4MjQzLDU5NzI2MSxvcmlnaW5hbCwsMzE1ODkwMjA3MQ==/1267794842dmitrijusrogozinas.jpg", "http://s2.15cdn.lt/static/cache/NTgweDMwMyw0MDd4MjQzLDU5NzI2MSxvcmlnaW5hbCwsMzE1ODkwMjA3MQ==/1267794842dmitrijusrogozinas.jpg", "http://s1.15cdn.lt/static/cache/ODgweDU4MCw0MDd4MjQzLDU5NzI2MSxvcmlnaW5hbCwsMzkzMjQyOTI3OQ==/1267794842dmitrijusrogozinas.jpg", "http://s1.15cdn.lt/static/cache/ODgweDU4MCw0MDd4MjQzLDU5NzI2MSxvcmlnaW5hbCwsMzkzMjQyOTI3OQ==/1267794842dmitrijusrogozinas.jpg", "http://s2.15cdn.lt/static/cache/NTgweDMwMCw5NjB4NjY2LDYyNTU3MSxvcmlnaW5hbCwsMzUyMzUwNzE3OA==/rusijos-oro-desantininkai-56c19be42cf4f.jpg", "http://s2.15cdn.lt/static/cache/MTgweDE4MCw5NjB4NTgzLDYwOTIyMSxvcmlnaW5hbCwsMzY3Mjc4MDM1MQ==/pietu-korejos-karinis-sraigtasparnis-56c1708aa2a2c.jpg", "http://s2.15cdn.lt/static/cache/MzgweDE4MCw5NjB4NjM5LDU5NzI2MSxvcmlnaW5hbCwsMTY1ODA2MDA2NQ==/federica-mogherini-5592e78cdc830.jpg", "http://s2.15cdn.lt/static/cache/MjgweDE4MCwxMDYweDUzMyw2MjU1NzEsb3JpZ2luYWwsLDE5OTIzMTMwOTA=/meksikos-policininkas-56c18622f25bf.jpg", "http://s2.15cdn.lt/static/cache/MjgweDE4MCw5NjB4NjQwLDYyNTU3MSxvcmlnaW5hbCwsMzUxODAzNTg5OQ==/popiezius-pranciskus-meksikoje-56c17f8cd2194.jpg", "http://s2.15cdn.lt/static/cache/MTgweDEyMCw3MDl4MTkxLDYyNDY2MSxvcmlnaW5hbCwsMjc2Nzc4MjA4Mg==/palestinieciu-autonomijos-veliavos-vakaru-krante-netoli-ramalos-54100a54749ea.jpg", "http://s2.15cdn.lt/static/cache/MTgweDEyMCw3NDN4NzYyLDYyNTgwMSxvcmlnaW5hbCwsMjUyMjQwMjk1OA==/latvijoje-pakilusios-i-ora-balionais-susituoke-pussimtis-poru-56c1748bddf9b.jpg", "http://s1.15cdn.lt/static/cache/MTgweDEyMCwzMjl4ODksNjE2MjUxLG9yaWdpbmFsLCwzNjg0NDUzMDY4/popiezius-jonas-paulius-ii-desineje-hgulbinowicziaus-vis-klausdavo-kaip-laikosi-lietuva-50d34db59c471.jpg", "http://s1.15cdn.lt/static/cache/OTl4MTAwLDUwN3gzMTMsNjE2Mjg5LG9yaWdpbmFsLCwxMjE3OTQwNzY5/kipishas-56c0504150442.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDUwN3gzNDYsNjE2NjUzLG9yaWdpbmFsLCw3NzcwOTc4NTY=/romanas-56bf8f7598b7a.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDM3OXgzNDMsNjE2NjUzLG9yaWdpbmFsLCwzMzQ4OTcyODI1/zarasu-gimnazistu-nusiaubta-kaimo-turizmo-sodyba-56c0735621d2f.jpg", "http://s1.15cdn.lt/static/cache/OTl4MTAwLDEwNjZ4NTAwLDYxNjM0MCxvcmlnaW5hbCwsMTMxNzE3OTk3NQ==/x-faktoriaus-superfinalo-uzkulisiai-56c0bea843be3.jpg", "http://s1.15cdn.lt/static/cache/OTl4MTAwLDcwN3gyNTAsNjE2Mjg5LG9yaWdpbmFsLCw0MTQ2NzUyMjMy/vakarelio-sveciai-56bfbd6edf98c.jpg", "http://s1.15cdn.lt/static/cache/OTl4MTAwLDY0NXgzMjksNjE2MjgzLG9yaWdpbmFsLCwxODQ0ODc3MjQw/leonidas-donskis-561b70d0b81d7.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDg0MXg1MDEsNjE2MjgzLG9yaWdpbmFsLCwzMDMwNDc0NjIy/paulius-jurkevicius-56ab52c2a6eb5.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDcwOXgyNzgsNjE2MjgzLG9yaWdpbmFsLCwzMTg0NzE1Mjgx/vytaras-radzevicius-55d18ae2caeae.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDQyNngyMzUsNjE2MjgzLG9yaWdpbmFsLCwzNDU2MzIxMTc3/stasys-sedbaras-54579f39df41b.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDYwMHgyODYsNjE2MjgzLG9yaWdpbmFsLCwzMzU4NDc1Njk3/gediminas-kirkilas-5480871cb6be1.jpg", "http://s1.15cdn.lt/static/cache/OTl4MTAwLDY3OXgzMTksNjE2MjQ2LG9yaWdpbmFsLCw3MDQyODE4Mzk=/giedre-geciauskiene-52d527bae47e5.jpg", "http://s1.15cdn.lt/static/cache/ODgweDU4MCw0MDd4MjQzLDU5NzI2MSxvcmlnaW5hbCwsMzkzMjQyOTI3OQ==/1267794842dmitrijusrogozinas.jpg", "http://s2.15cdn.lt/static/cache/ZGV1Y2VfdGh1bWIsNDA3eDI0Myw1OTcyNjEsb3JpZ2luYWwsLDEwNTU4NzA2OTI=/1267794842dmitrijusrogozinas.jpg"],
                "duplicates": ["56c19e728e8f13015e27ca85"],
                "images_sized": [],
                "id": "56c19dfbae604704f7720c3a",
                "url": "http://www.15min.lt/naujiena/aktualu/pasaulis/rusijos-vicepremjeras-dmitrijus-rogozinas-jokia-karine-operacija-irake-neplanuojama-57-582191?utm_source=rssfeed_default&utm_medium=rss&utm_campaign=rssfeed",
                "canonical_url": "http://www.15min.lt/naujiena/aktualu/pasaulis/rusijos-vicepremjeras-dmitrijus-rogozinas-jokia-karine-operacija-irake-neplanuojama-57-582191",
                "published": 1455527820000,
                "content": "<a href=\"http://www.15min.lt/naujiena/aktualu/pasaulis/rusijos-vicepremjeras-dmitrijus-rogozinas-jokia-karine-operacija-irake-neplanuojama-57-582191?utm_source=rssfeed_default&amp;utm_medium=rss&amp;utm_campaign=rssfeed\" title=\"Rusijos vicepremjeras Dmitrijus Rogozinas: \u201eJokia karin\u0117 operacija Irake neplanuojama\u201c\"><img itemprop=\"image\" src=\"http://s2.15cdn.lt/static/cache/ZGV1Y2VfdGh1bWIsNDA3eDI0Myw1OTcyNjEsb3JpZ2luYWwsLDEwNTU4NzA2OTI=/1267794842dmitrijusrogozinas.jpg\" alt=\"Rusijos vicepremjeras Dmitrijus Rogozinas: &bdquo;Jokia karin\u0117 operacija Irake neplanuojama&ldquo;\" /></a>\t\t\t\t\t\t\tRusijos vicepremjeras Dmitrijus Rogozinas suskubo paneigti gandus, kad Kremlius ketina pl\u0117sti karin\u0119 operacij\u0105 Sirijoje ir su Bagdado leidimu prad\u0117ti bombardavimus ir Irake, ra\u0161o meduza.io.<br />\n\t\t\t\t\t\t\t<a href=\"http://www.15min.lt/naujiena/aktualu/pasaulis/rusijos-vicepremjeras-dmitrijus-rogozinas-jokia-karine-operacija-irake-neplanuojama-57-582191?utm_source=rssfeed_default&amp;utm_medium=rss&amp;utm_campaign=rssfeed\" >Skaitykite daugiau...</a><br />",
                "system_modified_date": 1455530050995,
                "images_meta": {
                    "http://s2.15cdn.lt/static/cache/NTA4eDI2NCw0MDd4MjQzLDU5NzI2MSxvcmlnaW5hbCwsMjUxOTY5Njk2Mg==/1267794842dmitrijusrogozinas.jpg": {
                        "width": 508,
                        "height": 264
                    },
                    "http://s2.15cdn.lt/static/cache/ZGV1Y2VfdGh1bWIsNDA3eDI0Myw1OTcyNjEsb3JpZ2luYWwsLDEwNTU4NzA2OTI=/1267794842dmitrijusrogozinas.jpg": {
                        "width": null,
                        "height": null
                    }
                }
            },
            "prediction": {
                "predictor_id": "68727e2e4d2d3ae4c7c4d99a64111d4d",
                "feed_id": "54cf992eacc815000106e297",
                "entry_id": "56c19dfbae604704f7720c3a",
                "show": true,
                "score": 1.0
            },
            "metadata": {
                "images": ["http://s2.15cdn.lt/static/cache/NTgweDMwMyw0MDd4MjQzLDU5NzI2MSxvcmlnaW5hbCwsMzE1ODkwMjA3MQ==/1267794842dmitrijusrogozinas.jpg", "http://s2.15cdn.lt/static/cache/NTgweDMwMyw0MDd4MjQzLDU5NzI2MSxvcmlnaW5hbCwsMzE1ODkwMjA3MQ==/1267794842dmitrijusrogozinas.jpg", "http://s1.15cdn.lt/static/cache/ODgweDU4MCw0MDd4MjQzLDU5NzI2MSxvcmlnaW5hbCwsMzkzMjQyOTI3OQ==/1267794842dmitrijusrogozinas.jpg", "http://s1.15cdn.lt/static/cache/ODgweDU4MCw0MDd4MjQzLDU5NzI2MSxvcmlnaW5hbCwsMzkzMjQyOTI3OQ==/1267794842dmitrijusrogozinas.jpg", "http://s2.15cdn.lt/static/cache/NTgweDMwMCw5NjB4NjY2LDYyNTU3MSxvcmlnaW5hbCwsMzUyMzUwNzE3OA==/rusijos-oro-desantininkai-56c19be42cf4f.jpg", "http://s2.15cdn.lt/static/cache/MTgweDE4MCw5NjB4NTgzLDYwOTIyMSxvcmlnaW5hbCwsMzY3Mjc4MDM1MQ==/pietu-korejos-karinis-sraigtasparnis-56c1708aa2a2c.jpg", "http://s2.15cdn.lt/static/cache/MzgweDE4MCw5NjB4NjM5LDU5NzI2MSxvcmlnaW5hbCwsMTY1ODA2MDA2NQ==/federica-mogherini-5592e78cdc830.jpg", "http://s2.15cdn.lt/static/cache/MjgweDE4MCwxMDYweDUzMyw2MjU1NzEsb3JpZ2luYWwsLDE5OTIzMTMwOTA=/meksikos-policininkas-56c18622f25bf.jpg", "http://s2.15cdn.lt/static/cache/MjgweDE4MCw5NjB4NjQwLDYyNTU3MSxvcmlnaW5hbCwsMzUxODAzNTg5OQ==/popiezius-pranciskus-meksikoje-56c17f8cd2194.jpg", "http://s2.15cdn.lt/static/cache/MTgweDEyMCw3MDl4MTkxLDYyNDY2MSxvcmlnaW5hbCwsMjc2Nzc4MjA4Mg==/palestinieciu-autonomijos-veliavos-vakaru-krante-netoli-ramalos-54100a54749ea.jpg", "http://s2.15cdn.lt/static/cache/MTgweDEyMCw3NDN4NzYyLDYyNTgwMSxvcmlnaW5hbCwsMjUyMjQwMjk1OA==/latvijoje-pakilusios-i-ora-balionais-susituoke-pussimtis-poru-56c1748bddf9b.jpg", "http://s1.15cdn.lt/static/cache/MTgweDEyMCwzMjl4ODksNjE2MjUxLG9yaWdpbmFsLCwzNjg0NDUzMDY4/popiezius-jonas-paulius-ii-desineje-hgulbinowicziaus-vis-klausdavo-kaip-laikosi-lietuva-50d34db59c471.jpg", "http://s1.15cdn.lt/static/cache/OTl4MTAwLDUwN3gzMTMsNjE2Mjg5LG9yaWdpbmFsLCwxMjE3OTQwNzY5/kipishas-56c0504150442.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDUwN3gzNDYsNjE2NjUzLG9yaWdpbmFsLCw3NzcwOTc4NTY=/romanas-56bf8f7598b7a.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDM3OXgzNDMsNjE2NjUzLG9yaWdpbmFsLCwzMzQ4OTcyODI1/zarasu-gimnazistu-nusiaubta-kaimo-turizmo-sodyba-56c0735621d2f.jpg", "http://s1.15cdn.lt/static/cache/OTl4MTAwLDEwNjZ4NTAwLDYxNjM0MCxvcmlnaW5hbCwsMTMxNzE3OTk3NQ==/x-faktoriaus-superfinalo-uzkulisiai-56c0bea843be3.jpg", "http://s1.15cdn.lt/static/cache/OTl4MTAwLDcwN3gyNTAsNjE2Mjg5LG9yaWdpbmFsLCw0MTQ2NzUyMjMy/vakarelio-sveciai-56bfbd6edf98c.jpg", "http://s1.15cdn.lt/static/cache/OTl4MTAwLDY0NXgzMjksNjE2MjgzLG9yaWdpbmFsLCwxODQ0ODc3MjQw/leonidas-donskis-561b70d0b81d7.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDg0MXg1MDEsNjE2MjgzLG9yaWdpbmFsLCwzMDMwNDc0NjIy/paulius-jurkevicius-56ab52c2a6eb5.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDcwOXgyNzgsNjE2MjgzLG9yaWdpbmFsLCwzMTg0NzE1Mjgx/vytaras-radzevicius-55d18ae2caeae.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDQyNngyMzUsNjE2MjgzLG9yaWdpbmFsLCwzNDU2MzIxMTc3/stasys-sedbaras-54579f39df41b.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDYwMHgyODYsNjE2MjgzLG9yaWdpbmFsLCwzMzU4NDc1Njk3/gediminas-kirkilas-5480871cb6be1.jpg", "http://s1.15cdn.lt/static/cache/OTl4MTAwLDY3OXgzMTksNjE2MjQ2LG9yaWdpbmFsLCw3MDQyODE4Mzk=/giedre-geciauskiene-52d527bae47e5.jpg", "http://s1.15cdn.lt/static/cache/ODgweDU4MCw0MDd4MjQzLDU5NzI2MSxvcmlnaW5hbCwsMzkzMjQyOTI3OQ==/1267794842dmitrijusrogozinas.jpg", "http://s2.15cdn.lt/static/cache/ZGV1Y2VfdGh1bWIsNDA3eDI0Myw1OTcyNjEsb3JpZ2luYWwsLDEwNTU4NzA2OTI=/1267794842dmitrijusrogozinas.jpg"],
                "is_sponsored": false,
                "thumbnail": "http://s2.15cdn.lt/static/cache/NTgweDMwMyw0MDd4MjQzLDU5NzI2MSxvcmlnaW5hbCwsMzE1ODkwMjA3MQ==/1267794842dmitrijusrogozinas.jpg",
                "redirect_url": "/redirector?url=http%3A%2F%2Fwww.15min.lt%2Fnaujiena%2Faktualu%2Fpasaulis%2Frusijos-vicepremjeras-dmitrijus-rogozinas-jokia-karine-operacija-irake-neplanuojama-57-582191%3Futm_source%3Drssfeed_default%26utm_medium%3Drss%26utm_campaign%3Drssfeed&feed_entry_id=56c19dfbae604704f7720c3a&user_id=53a05ab85829cbcbbf10091d&rank=1&server_request_id=298be0282afd4a23b4a236656e258190&server_request_date=1455531033865",
                "is_viewed": false,
                "trace_prototype": {
                    "server_request_id": "298be0282afd4a23b4a236656e258190",
                    "server_request_date": 1455531033865,
                    "rank": 1,
                    "user_id": "53a05ab85829cbcbbf10091d",
                    "feed_entry_id": "56c19dfbae604704f7720c3a"
                }
            }
        }, {
            "feed_entry": {
                "author": "BNS",
                "is_processed": true,
                "feed": {
                    "last_updated": 1455529432804,
                    "url": "http://ftr.fivefilters.org/makefulltextfeed.php?url=http%3A%2F%2Fkaunas.kasvyksta.lt%2Ffeed%2F&max=10",
                    "icon": "http://kaunas.kasvyksta.lt/wp-content/themes/kasvyksta/images/favicon-kvk.png",
                    "description": "",
                    "is_sponsored_source": false,
                    "link": "http://kaunas.kasvyksta.lt/",
                    "image": "http://cdn.kasvyksta.lt/wp-content/uploads/2016/02/vyras-1.jpg",
                    "title": "Kas vyksta Kaune",
                    "last_checked_date": 1455529429862,
                    "id": "53e2dc1366224cd988c241b5"
                },
                "image": "http://cdn.kasvyksta.lt/wp-content/uploads/2015/12/m2.jpg",
                "title": "Nutraukta byla d\u0117l LSMU rektoriaus rinkim\u0173",
                "system_created_date": 1455529432863,
                "tags": ["LSMU", "Kauno apylink\u0117s teismas", "Mokslas ir IT", "Rektorius"],
                "images": ["http://cdn.kasvyksta.lt/wp-content/uploads/2015/12/m2.jpg", "http://cdn.kasvyksta.lt/wp-content/uploads/2015/12/m2-1024x683.jpg", "http://cdn.kasvyksta.lt/wp-content/uploads/2015/12/m2-1024x683.jpg", "http://cdn.kasvyksta.lt/wp-content/uploads/2015/06/bns-logo.jpg", "http://cdn.kasvyksta.lt/wp-content/uploads/2015/12/m2-1024x683.jpg"],
                "duplicates": ["56c19e9dae604704f7720cb1", "56c19e9cedaf4d04297c327b", "56c1905a8e8f13016127c8d4", "56c18febae6047050c7206c1", "56c190458e8f13015e27c8ca", "56c1908f8e8f13016127c92e", "56c19e9eae604704f7720cbc", "56c1908f8e8f13016127c92f"],
                "images_sized": [],
                "id": "56c19dd8edaf4d041d7c326b",
                "url": "http://kaunas.kasvyksta.lt/2016/02/15/mokslas-ir-it/nutraukta-byla-del-lsmu-rektoriaus-rinkimu/",
                "canonical_url": "http://kaunas.kasvyksta.lt/2016/02/15/mokslas-ir-it/nutraukta-byla-del-lsmu-rektoriaus-rinkimu/",
                "published": 1455527760000,
                "content": "<div id=\"feat-img-reg\" class=\"relative left\"><span class=\"header-block-title paieska\"><img itemprop=\"image\" src=\"http://cdn.kasvyksta.lt/wp-content/uploads/2015/12/m2-1024x683.jpg\"/><span class=\"foto-descr\">Archyvo nuotr.</span></span></div>\n<div class=\"hide-title\"><span class=\"entry-title\" itemprop=\"name headline\">Nutraukta byla d\u0117l LSMU rektoriaus rinkim\u0173</span></div>\n<div id=\"sk-news\" class=\"sk-right\">\n<div class=\"sk-title\"><span>NAUJAUSIOS \u017dINIOS</span></div>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n</div>\n<div class=\"sk-content\" id=\"main-content\">\n<div id=\"left-content-mobi\">\n<div class=\"author-info-mob-wrap\"><span class=\"vcard author\"><span class=\"author-name left fn\" itemprop=\"author\"><a href=\"http://www.bns.lt/\" title=\"Autorius: BNS\" rel=\"nofollow\">BNS</a></span></span>\n<div class=\"post-date-wrap left relative post-date-mob\"><span class=\"post-date\"><time class=\"post-date updated\" itemprop=\"datePublished\" datetime=\"2016-02-15\" pubdate=\"\">2016/02/15 11:16</time></span></div>\n\n</div>\n</div>\n<div class=\"post-wrap-children\">\n<p><strong>Lietuvos sveikatos moksl\u0173 universiteto (LSMU) rinkimus neteis\u0117tais siek\u0119s pripa\u017einti buv\u0119s Kauno klinik\u0173 vadovas ir kandidatas \u012f \u0161io universiteto rektorius Juozas Pundzius atsi\u0117m\u0117 civilin\u012f ie\u0161kin\u012f, tad byl\u0105 Kauno apylink\u0117s teismas nusprend\u0117 j\u012f nutraukti.</strong></p>\n<p>Kaip BNS sak\u0117 J.Pundzius, sprendim\u0105 atsiimti ie\u0161kin\u012f l\u0117m\u0117 tai, kad \u0161io klausimo \u0117m\u0117si Akademin\u0117s etikos ir proced\u016br\u0173 kontrolieriaus tarnyba, o jo paties asmeniniai planai pasikeit\u0117.</p>\n<p>\u201eMano nat\u016bra yra, kad a\u0161 esu u\u017e konstruktyv\u0173 problem\u0173 sprendim\u0105 ir \u0161is padavimas (ie\u0161kinio \u2013 BNS) buvo gal tik toks ie\u0161kojimas i\u0161eities, ne pats geriausias problemos sprendimas. (\u2026) Akademin\u0117s etikos ir proced\u016br\u0173 kontrolieriaus tarnyba yra pateikusi i\u0161vadas pana\u0161iu klausimu ir tokiu b\u016bdu ji per\u0117m\u0117 t\u0105 vie\u0161ojo intereso gynim\u0105\u201c, \u2013 kalb\u0117jo J.Pundzius.</p>\n<p>Jis teig\u0117, kad apsisprendus kandidatuoti \u012f Seim\u0105 \u0161iemet vyksian\u010diuose rinkimuose dingo ir asmeni\u0161kai tur\u0117tas interesas siekti, kad \u012fvyk\u0119 rektoriaus rinkimai b\u016bt\u0173 pripa\u017einti neteis\u0117tais.</p>\n<div class=\"susijusios-naujienos-wrap\">\n<div>Susijusios naujienos:</div>\n\n</div>\n<p>\u201eA\u0161 apsisprend\u017eiau eiti kitu gyvenimo keliu \u2013 kandidatuoti \u012f Seim\u0105 ir mano asmeninis noras, kad b\u016bt\u0173 sudarytos s\u0105lygos dalyvauti rektoriaus rinkimuose, atkrito taip pat\u201c, \u2013 kalb\u0117jo T\u0117vyn\u0117s s\u0105jungai \u2013 Lietuvos krik\u0161\u010dionims demokratams priklausantis J.Pundzius.</p>\n<p>Kauno apylink\u0117s teismas m\u0117nesio pri\u0117m\u0117 nutart\u012f, kuria tenkino J.Pundziaus pra\u0161ym\u0105 d\u0117l ie\u0161kinio atsi\u0117mimo.</p>\n<p>Akademin\u0117s etikos ir proced\u016br\u0173 kontrolieriaus tarnyba yra paskelbusi sprendim\u0105, jog \u201eatsi\u017evelgiant \u012f (\u2026) tai, kad duomenys, pagrind\u017eiantys b\u016btinyb\u0119 i\u0161rinkti rektori\u0173 antrai kadencijai, nesibaigus rektoriaus pirmai kadencijai, Tarnybai nebuvo pateikti, darytina prielaida, kad Tarybos 2015 met\u0173 baland\u017eio 24 dienos sprendimas \u201eD\u0117l vie\u0161ojo konkurso rektoriaus pareigoms eiti paskelbimo\u201c yra nepagr\u012fstas\u201c.</p>\n<p>LSMU su \u0161iuo sprendimu nesutinka ir ruo\u0161iasi teisme siekti, kad sprendimas b\u016bt\u0173 pakeistas.</p>\n<p>LSMU rektoriumi pra\u0117jusi\u0173 met\u0173 rugs\u0117jo 18 dien\u0105 perrinktas profesorius Remigijus \u017dali\u016bnas. Jis \u0161iam universitetui vadovauja nuo 2010 met\u0173. Prie\u0161 tai R.\u017dali\u016bnas vadovavo ir Kauno medicinos universitetui, kuris po susijungimo su Lietuvos veterinarijos akademija tapo LSMU. Akademin\u0117s etikos kontrolieriui skund\u0105 d\u0117l rinkim\u0173 pateik\u0117 juose dalyvavusi Irena Misevi\u010dien\u0117, kurios teigimu, rektori\u0173 tur\u0117jo rinkti naujos kadencijos universiteto Taryba.</p>\n</div>\n\n\n\n<div class=\"saltinis\"><a href=\"http://www.bns.lt/\"><img src=\"http://cdn.kasvyksta.lt/wp-content/uploads/2015/06/bns-logo.jpg\"/></a></div>\n</div>\n\n<p><em>This entry passed through the Full-Text RSS service - if this is your content and you're reading it on someone else's site, please read the FAQ at fivefilters.org/content-only/faq.php#publishers.</em></p>",
                "system_modified_date": 1455530052416,
                "images_meta": {
                    "http://cdn.kasvyksta.lt/wp-content/uploads/2015/12/m2-1024x683.jpg": {
                        "width": null,
                        "height": null
                    },
                    "http://cdn.kasvyksta.lt/wp-content/uploads/2015/06/bns-logo.jpg": {
                        "width": null,
                        "height": null
                    }
                }
            },
            "prediction": {
                "predictor_id": "68727e2e4d2d3ae4c7c4d99a64111d4d",
                "feed_id": "53e2dc1366224cd988c241b5",
                "entry_id": "56c19dd8edaf4d041d7c326b",
                "show": true,
                "score": 0.76146285961466
            },
            "metadata": {
                "images": ["http://cdn.kasvyksta.lt/wp-content/uploads/2015/12/m2.jpg", "http://cdn.kasvyksta.lt/wp-content/uploads/2015/12/m2-1024x683.jpg", "http://cdn.kasvyksta.lt/wp-content/uploads/2015/12/m2-1024x683.jpg", "http://cdn.kasvyksta.lt/wp-content/uploads/2015/06/bns-logo.jpg", "http://cdn.kasvyksta.lt/wp-content/uploads/2015/12/m2-1024x683.jpg"],
                "is_sponsored": false,
                "thumbnail": "http://cdn.kasvyksta.lt/wp-content/uploads/2015/12/m2.jpg",
                "redirect_url": "/redirector?url=http%3A%2F%2Fkaunas.kasvyksta.lt%2F2016%2F02%2F15%2Fmokslas-ir-it%2Fnutraukta-byla-del-lsmu-rektoriaus-rinkimu%2F&feed_entry_id=56c19dd8edaf4d041d7c326b&user_id=53a05ab85829cbcbbf10091d&rank=2&server_request_id=298be0282afd4a23b4a236656e258190&server_request_date=1455531033865",
                "is_viewed": false,
                "trace_prototype": {
                    "server_request_id": "298be0282afd4a23b4a236656e258190",
                    "server_request_date": 1455531033865,
                    "rank": 2,
                    "user_id": "53a05ab85829cbcbbf10091d",
                    "feed_entry_id": "56c19dd8edaf4d041d7c326b"
                }
            }
        }, {
            "feed_entry": {
                "author": "admin",
                "is_processed": true,
                "feed": {
                    "last_updated": 1455524580000,
                    "url": "http://vceestartups.com/feed",
                    "icon": "http://vceestartups.com/vcee.png",
                    "description": "",
                    "is_sponsored_source": false,
                    "link": "http://vceestartups.com",
                    "language": "en-EN",
                    "title": "Startup ecosystem  of \u0421entral and Eastern Europe",
                    "last_checked_date": 1455526018425,
                    "id": "56404ee937ee050001e600d1"
                },
                "image": "http://vceestartups.com/wp-content/uploads/2016/02/seed_LOGO.png",
                "title": "Seed Forum, Riga",
                "system_created_date": 1455526020449,
                "tags": ["Contests", "entrepreneurs", "Events", "pitching", "Startups", "startups"],
                "images": ["http://vceestartups.com/wp-content/uploads/2016/02/seed_LOGO.png", "http://vceestartups.com/wp-content/uploads/2016/02/seed_LOGO.png", "http://vceestartups.com/wp-content/uploads/2016/02/seed_LOGO.png"],
                "duplicates": [],
                "images_sized": [],
                "id": "56c19084edaf4d04037c39be",
                "url": "http://vceestartups.com/seed-forum.html",
                "canonical_url": "http://vceestartups.com/seed-forum.html",
                "published": 1455524340000,
                "content": "<p>Seed Forum is a global organization that unites representatives in more than 40 countries. This is a series of local events where local investors, funds and financial intermediaries get the opportunity of investor matchmaking and thus improve their professional competencies. At the same time, Seed Forum is a great chance for startuppers and entrepreneurs to present their ideas and raise capital for the projects. The pitching companies are carefully selected by Seed Forum organizers. Check out all the Seed Forum locations on their website.</p>\n<p>\u0417\u0430\u043f\u0438\u0441\u044c <a rel=\"nofollow\" href=\"http://vceestartups.com/seed-forum.html\">Seed Forum</a> \u0432\u043f\u0435\u0440\u0432\u044b\u0435 \u043f\u043e\u044f\u0432\u0438\u043b\u0430\u0441\u044c <a rel=\"nofollow\" href=\"http://vceestartups.com\">Startup ecosystem  of \u0421entral and Eastern Europe</a>.</p> <p style=\"text-align: center;\"><img class=\"aligncenter size-full wp-image-2647\" alt=\"Seed Forum\" src=\"http://vceestartups.com/wp-content/uploads/2016/02/seed_LOGO.png\" width=\"300\" height=\"187\" title=\"Seed Forum\" /></a><br />\nSeed Forum is a global organization that unites representatives in more than 40 countries. This is a series of local events where local investors, funds and financial intermediaries get the opportunity of investor matchmaking and thus improve their professional competencies. At the same time, Seed Forum is a great chance for startuppers and entrepreneurs to present their ideas and raise capital for the projects. The pitching companies are carefully selected by Seed Forum organizers. Check out all the Seed Forum locations on their website.</p>\n<p>\u0417\u0430\u043f\u0438\u0441\u044c <a rel=\"nofollow\" href=\"http://vceestartups.com/seed-forum.html\">Seed Forum</a> \u0432\u043f\u0435\u0440\u0432\u044b\u0435 \u043f\u043e\u044f\u0432\u0438\u043b\u0430\u0441\u044c <a rel=\"nofollow\" href=\"http://vceestartups.com\">Startup ecosystem  of \u0421entral and Eastern Europe</a>.</p>",
                "system_modified_date": 1455526421958,
                "images_meta": {
                    "http://vceestartups.com/wp-content/uploads/2016/02/seed_LOGO.png": {
                        "width": 300,
                        "height": 187
                    }
                }
            },
            "prediction": {
                "predictor_id": "68727e2e4d2d3ae4c7c4d99a64111d4d",
                "feed_id": "56404ee937ee050001e600d1",
                "entry_id": "56c19084edaf4d04037c39be",
                "show": true,
                "score": 0.6445605125467573
            },
            "metadata": {
                "images": ["http://vceestartups.com/wp-content/uploads/2016/02/seed_LOGO.png", "http://vceestartups.com/wp-content/uploads/2016/02/seed_LOGO.png", "http://vceestartups.com/wp-content/uploads/2016/02/seed_LOGO.png"],
                "is_sponsored": false,
                "thumbnail": "http://vceestartups.com/wp-content/uploads/2016/02/seed_LOGO.png",
                "redirect_url": "/redirector?url=http%3A%2F%2Fvceestartups.com%2Fseed-forum.html&feed_entry_id=56c19084edaf4d04037c39be&user_id=53a05ab85829cbcbbf10091d&rank=3&server_request_id=298be0282afd4a23b4a236656e258190&server_request_date=1455531033865",
                "is_viewed": false,
                "trace_prototype": {
                    "server_request_id": "298be0282afd4a23b4a236656e258190",
                    "server_request_date": 1455531033865,
                    "rank": 3,
                    "user_id": "53a05ab85829cbcbbf10091d",
                    "feed_entry_id": "56c19084edaf4d04037c39be"
                }
            }
        }, {
            "feed_entry": {
                "author": "15min.lt",
                "is_processed": true,
                "feed": {
                    "icon": "http://s1.15cdn.lt/img/touch_icons/144x144/15min_cons_4-17.png",
                    "description": "Verslo naujienos, 15min.lt",
                    "link": "http://www.15min.lt/",
                    "language": "lt-lt",
                    "title": "15min.lt - \u017dinios gyvai!",
                    "last_checked_date": 1455525867503,
                    "tags": ["ekonomikos", "fotogalerijos", "horoskopai", "u\u017esienio", "Kauno", "konkursai", "orai", "aktualijos", "politikos", "Klaip\u0117dos", "pramogos", "sporto", "Lietuvos naujienos", "Vilniaus"],
                    "last_updated": 1455525720000,
                    "id": "54abb124e36ece0001504dc1",
                    "url": "http://www.15min.lt/rss/verslas/",
                    "image": "http://s1.15cdn.lt/img/touch_icons/512x512/15min_cons_4-17.png",
                    "is_sponsored_source": false
                },
                "image": "http://s1.15cdn.lt/static/cache/MTkyMHgxMDA1LDk2MHg2NDAsNjE2MTg5LG9yaWdpbmFsLCwyMDQ3NzYzNDE0/klaipedoje-pirmasis-ikea-prekiu-uzsakymo-ir-atsiemimo-punktas-560a6a8db0d0a.jpg",
                "title": "\u201eIkea\u201c kaltinama Europoje nusl\u0117pusi apie 1 mlrd. Eur mokes\u010di\u0173",
                "system_created_date": 1455525868076,
                "tags": ["Bendrov\u0117s", "ikea", "mokes\u010di\u0173 vengimas", "es"],
                "images": ["http://s1.15cdn.lt/static/cache/MTkyMHgxMDA1LDk2MHg2NDAsNjE2MTg5LG9yaWdpbmFsLCwyMDQ3NzYzNDE0/klaipedoje-pirmasis-ikea-prekiu-uzsakymo-ir-atsiemimo-punktas-560a6a8db0d0a.jpg", "http://s1.15cdn.lt/static/cache/MTkyMHgxMDA1LDk2MHg2NDAsNjE2MTg5LG9yaWdpbmFsLCwyMDQ3NzYzNDE0/klaipedoje-pirmasis-ikea-prekiu-uzsakymo-ir-atsiemimo-punktas-560a6a8db0d0a.jpg", "http://s2.15cdn.lt/static/cache/ODgweDU4MCw5NjB4NjQwLDYxNjE4OSxvcmlnaW5hbCwsMTc2NjA4OTEwMg==/klaipedoje-pirmasis-ikea-prekiu-uzsakymo-ir-atsiemimo-punktas-560a6a8db0d0a.jpg", "http://s2.15cdn.lt/static/cache/ODgweDU4MCw5NjB4NjQwLDYxNjE4OSxvcmlnaW5hbCwsMTc2NjA4OTEwMg==/klaipedoje-pirmasis-ikea-prekiu-uzsakymo-ir-atsiemimo-punktas-560a6a8db0d0a.jpg", "http://s2.15cdn.lt/static/cache/NTgweDMwMCw5NjB4NTA2LDYxNjI3MSxvcmlnaW5hbCwsNDAyODUyOTg2NQ==/volkswagen-budd-e-konceptas-568f7c82868bd.jpg", "http://s2.15cdn.lt/static/cache/MTgweDE4MCw5NjB4NjE2LDYxNjM0NCxvcmlnaW5hbCwsMzgxNTMxNzc1MA==/eurai-56b1eda27ec1a.jpg", "http://s2.15cdn.lt/static/cache/MzgweDE4MCw4MTB4NTQwLDYxNjIwOSxvcmlnaW5hbCwsMjc5MjAzMTA3NA==/prekybos-centre-54b926f98d4f8.jpg", "http://s1.15cdn.lt/static/cache/MjgweDE4MCwxMDAzeDgxNCw2MTYzNDQsb3JpZ2luYWwsLDEyNTA1MjE4MDU=/kempinski-hotel-cathedral-square-56bb61aba051b.jpg", "http://s1.15cdn.lt/static/cache/MjgweDE4MCw5NjB4NjcxLDYyNDY2MSxvcmlnaW5hbCwsNjUxNDI5NDEy/zaislai-56bc84110b4f5.jpg", "http://s2.15cdn.lt/static/cache/MTgweDEyMCwyNTd4MjAxLDYxNjIwNCxvcmlnaW5hbCwsMzI3ODc1NDE4Ng==/1270575633vaisiutikrinimas.jpg", "http://s1.15cdn.lt/static/cache/MTgweDEyMCw5NjB4NjQwLDYyNDY2MSxvcmlnaW5hbCwsMzE1OTc0NDIxOQ==/lukoil-degaline-rusijoje-56bdeb14cc434.jpg", "http://s1.15cdn.lt/static/cache/MTgweDEyMCw5NjB4NjQwLDYyMzI3NCxvcmlnaW5hbCwsNDA5MDc1Njc2OA==/renault-group-564f26b077dc3.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDgxMHg1NDAsNjE2MjA5LG9yaWdpbmFsLCwzNjYxNjIwNjA4/prekybos-centre-54b926f98d4f8.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDU4MHgzMDYsNjI1NzU4LG9yaWdpbmFsLCw4MzgwMDU2MDc=/lietuviu-valdomiems-zerich-ir-kapitalbank-piesiama-niuri-ateitis-56bcb13bc1fca.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDEwMDN4ODE0LDYxNjM0NCxvcmlnaW5hbCwsODM5MDcxMTE2/kempinski-hotel-cathedral-square-56bb61aba051b.jpg", "http://s1.15cdn.lt/static/cache/OTl4MTAwLDMyMngxNzAsNjE2MTMwLG9yaWdpbmFsLCwxNDEzMTgwODk2/1231478814minskas.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDc2NHg3MjksNjE2MjA5LG9yaWdpbmFsLCwzMTU2NDQzMjg1/vilniaus-oro-uoste-55549a5b08383.jpg", "http://s2.15cdn.lt/static/cache/ODgweDU4MCw5NjB4NjQwLDYxNjE4OSxvcmlnaW5hbCwsMTc2NjA4OTEwMg==/klaipedoje-pirmasis-ikea-prekiu-uzsakymo-ir-atsiemimo-punktas-560a6a8db0d0a.jpg", "http://s1.15cdn.lt/static/cache/ZGV1Y2VfdGh1bWIsOTYweDY0MCw2MTYxODksb3JpZ2luYWwsLDMxODQ0NzMyNjk=/klaipedoje-pirmasis-ikea-prekiu-uzsakymo-ir-atsiemimo-punktas-560a6a8db0d0a.jpg"],
                "duplicates": ["56c19eb38e8f13016127cb97"],
                "images_sized": [],
                "id": "56c18fec8e8f13015e27c897",
                "url": "http://www.15min.lt/verslas/naujiena/bendroves/ikea-kaltinama-europoje-nuslepusi-apie-1-mlrd-eur-mokesciu-663-582157?utm_source=rssfeed_verslas&utm_medium=rss&utm_campaign=rssfeed",
                "canonical_url": "http://www.15min.lt/verslas/naujiena/bendroves/ikea-kaltinama-europoje-nuslepusi-apie-1-mlrd-eur-mokesciu-663-582157",
                "published": 1455525720000,
                "content": "<a href=\"http://www.15min.lt/verslas/naujiena/bendroves/ikea-kaltinama-europoje-nuslepusi-apie-1-mlrd-eur-mokesciu-663-582157?utm_source=rssfeed_verslas&amp;utm_medium=rss&amp;utm_campaign=rssfeed\" title=\"\u201eIkea\u201c kaltinama Europoje nusl\u0117pusi apie 1 mlrd. Eur mokes\u010di\u0173\"><img itemprop=\"image\" src=\"http://s1.15cdn.lt/static/cache/ZGV1Y2VfdGh1bWIsOTYweDY0MCw2MTYxODksb3JpZ2luYWwsLDMxODQ0NzMyNjk=/klaipedoje-pirmasis-ikea-prekiu-uzsakymo-ir-atsiemimo-punktas-560a6a8db0d0a.jpg\" alt=\"&bdquo;Ikea&ldquo; kaltinama Europoje nusl\u0117pusi apie 1 mlrd. Eur mokes\u010di\u0173\" /></a>\t\t\t\t\t\t\tBald\u0173 parduotuvi\u0173 tinklas \u201eIkea\u201c kaltinamas nusl\u0117p\u0119s beveik 1 mlrd. Eur mokes\u010di\u0173 2009 \u2013 2014 m. Tokius skai\u010dius savo ataskaitoje paskelb\u0117 Europos Parlamento \u017dali\u0173j\u0173 partijos frakcija, ra\u0161o cnn.com.<br />\n\t\t\t\t\t\t\t<a href=\"http://www.15min.lt/verslas/naujiena/bendroves/ikea-kaltinama-europoje-nuslepusi-apie-1-mlrd-eur-mokesciu-663-582157?utm_source=rssfeed_verslas&amp;utm_medium=rss&amp;utm_campaign=rssfeed\" >Skaitykite daugiau...</a><br />",
                "system_modified_date": 1455530035222,
                "images_meta": {
                    "http://s1.15cdn.lt/static/cache/ZGV1Y2VfdGh1bWIsOTYweDY0MCw2MTYxODksb3JpZ2luYWwsLDMxODQ0NzMyNjk=/klaipedoje-pirmasis-ikea-prekiu-uzsakymo-ir-atsiemimo-punktas-560a6a8db0d0a.jpg": {
                        "width": null,
                        "height": null
                    },
                    "http://s1.15cdn.lt/static/cache/NTA4eDI2NCw5NjB4NjQwLDYxNjE4OSxvcmlnaW5hbCwsMzUzMzY5MTA3/klaipedoje-pirmasis-ikea-prekiu-uzsakymo-ir-atsiemimo-punktas-560a6a8db0d0a.jpg": {
                        "width": 508,
                        "height": 264
                    }
                }
            },
            "prediction": {
                "predictor_id": "68727e2e4d2d3ae4c7c4d99a64111d4d",
                "feed_id": "54abb124e36ece0001504dc1",
                "entry_id": "56c18fec8e8f13015e27c897",
                "show": true,
                "score": 0.5735035463793008
            },
            "metadata": {
                "images": ["http://s1.15cdn.lt/static/cache/MTkyMHgxMDA1LDk2MHg2NDAsNjE2MTg5LG9yaWdpbmFsLCwyMDQ3NzYzNDE0/klaipedoje-pirmasis-ikea-prekiu-uzsakymo-ir-atsiemimo-punktas-560a6a8db0d0a.jpg", "http://s1.15cdn.lt/static/cache/MTkyMHgxMDA1LDk2MHg2NDAsNjE2MTg5LG9yaWdpbmFsLCwyMDQ3NzYzNDE0/klaipedoje-pirmasis-ikea-prekiu-uzsakymo-ir-atsiemimo-punktas-560a6a8db0d0a.jpg", "http://s2.15cdn.lt/static/cache/ODgweDU4MCw5NjB4NjQwLDYxNjE4OSxvcmlnaW5hbCwsMTc2NjA4OTEwMg==/klaipedoje-pirmasis-ikea-prekiu-uzsakymo-ir-atsiemimo-punktas-560a6a8db0d0a.jpg", "http://s2.15cdn.lt/static/cache/ODgweDU4MCw5NjB4NjQwLDYxNjE4OSxvcmlnaW5hbCwsMTc2NjA4OTEwMg==/klaipedoje-pirmasis-ikea-prekiu-uzsakymo-ir-atsiemimo-punktas-560a6a8db0d0a.jpg", "http://s2.15cdn.lt/static/cache/NTgweDMwMCw5NjB4NTA2LDYxNjI3MSxvcmlnaW5hbCwsNDAyODUyOTg2NQ==/volkswagen-budd-e-konceptas-568f7c82868bd.jpg", "http://s2.15cdn.lt/static/cache/MTgweDE4MCw5NjB4NjE2LDYxNjM0NCxvcmlnaW5hbCwsMzgxNTMxNzc1MA==/eurai-56b1eda27ec1a.jpg", "http://s2.15cdn.lt/static/cache/MzgweDE4MCw4MTB4NTQwLDYxNjIwOSxvcmlnaW5hbCwsMjc5MjAzMTA3NA==/prekybos-centre-54b926f98d4f8.jpg", "http://s1.15cdn.lt/static/cache/MjgweDE4MCwxMDAzeDgxNCw2MTYzNDQsb3JpZ2luYWwsLDEyNTA1MjE4MDU=/kempinski-hotel-cathedral-square-56bb61aba051b.jpg", "http://s1.15cdn.lt/static/cache/MjgweDE4MCw5NjB4NjcxLDYyNDY2MSxvcmlnaW5hbCwsNjUxNDI5NDEy/zaislai-56bc84110b4f5.jpg", "http://s2.15cdn.lt/static/cache/MTgweDEyMCwyNTd4MjAxLDYxNjIwNCxvcmlnaW5hbCwsMzI3ODc1NDE4Ng==/1270575633vaisiutikrinimas.jpg", "http://s1.15cdn.lt/static/cache/MTgweDEyMCw5NjB4NjQwLDYyNDY2MSxvcmlnaW5hbCwsMzE1OTc0NDIxOQ==/lukoil-degaline-rusijoje-56bdeb14cc434.jpg", "http://s1.15cdn.lt/static/cache/MTgweDEyMCw5NjB4NjQwLDYyMzI3NCxvcmlnaW5hbCwsNDA5MDc1Njc2OA==/renault-group-564f26b077dc3.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDgxMHg1NDAsNjE2MjA5LG9yaWdpbmFsLCwzNjYxNjIwNjA4/prekybos-centre-54b926f98d4f8.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDU4MHgzMDYsNjI1NzU4LG9yaWdpbmFsLCw4MzgwMDU2MDc=/lietuviu-valdomiems-zerich-ir-kapitalbank-piesiama-niuri-ateitis-56bcb13bc1fca.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDEwMDN4ODE0LDYxNjM0NCxvcmlnaW5hbCwsODM5MDcxMTE2/kempinski-hotel-cathedral-square-56bb61aba051b.jpg", "http://s1.15cdn.lt/static/cache/OTl4MTAwLDMyMngxNzAsNjE2MTMwLG9yaWdpbmFsLCwxNDEzMTgwODk2/1231478814minskas.jpg", "http://s2.15cdn.lt/static/cache/OTl4MTAwLDc2NHg3MjksNjE2MjA5LG9yaWdpbmFsLCwzMTU2NDQzMjg1/vilniaus-oro-uoste-55549a5b08383.jpg", "http://s2.15cdn.lt/static/cache/ODgweDU4MCw5NjB4NjQwLDYxNjE4OSxvcmlnaW5hbCwsMTc2NjA4OTEwMg==/klaipedoje-pirmasis-ikea-prekiu-uzsakymo-ir-atsiemimo-punktas-560a6a8db0d0a.jpg", "http://s1.15cdn.lt/static/cache/ZGV1Y2VfdGh1bWIsOTYweDY0MCw2MTYxODksb3JpZ2luYWwsLDMxODQ0NzMyNjk=/klaipedoje-pirmasis-ikea-prekiu-uzsakymo-ir-atsiemimo-punktas-560a6a8db0d0a.jpg"],
                "is_sponsored": false,
                "thumbnail": "http://s1.15cdn.lt/static/cache/MTkyMHgxMDA1LDk2MHg2NDAsNjE2MTg5LG9yaWdpbmFsLCwyMDQ3NzYzNDE0/klaipedoje-pirmasis-ikea-prekiu-uzsakymo-ir-atsiemimo-punktas-560a6a8db0d0a.jpg",
                "redirect_url": "/redirector?url=http%3A%2F%2Fwww.15min.lt%2Fverslas%2Fnaujiena%2Fbendroves%2Fikea-kaltinama-europoje-nuslepusi-apie-1-mlrd-eur-mokesciu-663-582157%3Futm_source%3Drssfeed_verslas%26utm_medium%3Drss%26utm_campaign%3Drssfeed&feed_entry_id=56c18fec8e8f13015e27c897&user_id=53a05ab85829cbcbbf10091d&rank=4&server_request_id=298be0282afd4a23b4a236656e258190&server_request_date=1455531033865",
                "is_viewed": false,
                "trace_prototype": {
                    "server_request_id": "298be0282afd4a23b4a236656e258190",
                    "server_request_date": 1455531033865,
                    "rank": 4,
                    "user_id": "53a05ab85829cbcbbf10091d",
                    "feed_entry_id": "56c18fec8e8f13015e27c897"
                }
            }
        }, {
            "feed_entry": {
                "author": "LLRI",
                "is_processed": true,
                "feed": {
                    "last_updated": 1455529800000,
                    "url": "http://www.llri.lt/naujienos/feed",
                    "icon": "http://www.llri.lt/wp-content/themes/llri/images/favicon.ico",
                    "description": "",
                    "is_sponsored_source": false,
                    "link": "http://www.llri.lt",
                    "language": "lt-LT",
                    "title": "Naujienos \u2013 Lietuvos laisvosios rinkos institutas",
                    "last_checked_date": 1455529662986,
                    "id": "56b9aabdadacf20001085cf5"
                },
                "image": "http://www.llri.lt/wp-content/uploads/2016/02/IMG_0176_.jpg",
                "title": "D. J. Boudreaux. 5 mitai, kuriais tiki dauguma ekonomist\u0173 | Lietuvos laisvosios rinkos institutas",
                "system_created_date": 1455529664046,
                "tags": ["Naujienos", "Ekonomin\u0117 politika", "Bendroji ekonomin\u0117 politika"],
                "images": ["http://www.llri.lt/wp-content/uploads/2016/02/IMG_0176_.jpg", "http://www.llri.lt/wp-content/uploads/2016/02/IMG_0176_.jpg"],
                "duplicates": ["56c19eb0edaf4d04117c395b", "56c19e6bae60470503720ac2", "56c19e9bedaf4d041d7c32b5", "56c19e858e8f13016127cb2c", "56c1908f8e8f13016127c92b"],
                "images_sized": [],
                "id": "56c19ec08e8f13016127cbb2",
                "url": "http://www.llri.lt/naujienos/ekonomine-politika/5-mitai-kuriais-tiki-dauguma-ekonomistu/lrinka",
                "canonical_url": "http://www.llri.lt/naujienos/ekonomine-politika/5-mitai-kuriais-tiki-dauguma-ekonomistu/lrinka",
                "published": 1455528180000,
                "content": "<p>2015-\u0173j\u0173 gruod\u012f LLRI kvietimu kursuose \u201eRealistin\u0117 ekonomikos analiz\u0117 II\u201c vie\u0161\u0117jo \u017eymus JAV ekonomistas Donald J. Boudreaux. Paklaustas, apie did\u017eiausius ekonomikos mitus, kuriais tiki nema\u017eai dalis \u0161ios disciplinos tyrin\u0117toj\u0173 ir profesional\u0173, D. J. Boudreaux atsak\u0117, kad \u00a0\u201eEkonomikoje gausu neteising\u0173 \u012fsitikinim\u0173, kurie visi\u0161kai neatitinka tikrov\u0117s ir b\u016bt\u0173 labai sunku juos surikiuoti pagal j\u0173 absurdi\u0161kum\u0105 bei netikslum\u0105. Mano [&#8230;]</p>\n<p>The post <a rel=\"nofollow\" href=\"http://www.llri.lt/naujienos/ekonomine-politika/5-mitai-kuriais-tiki-dauguma-ekonomistu/lrinka\">D. J. Boudreaux. 5 mitai, kuriais tiki dauguma ekonomist\u0173</a> appeared first on <a rel=\"nofollow\" href=\"http://www.llri.lt\">Lietuvos laisvosios rinkos institutas</a>.</p> <p>2015-\u0173j\u0173 gruod\u012f LLRI kvietimu kursuose <a href=\"http://llri.lt/realistine\" target=\"_blank\">\u201eRealistin\u0117 ekonomikos analiz\u0117 II\u201c</a> vie\u0161\u0117jo \u017eymus JAV ekonomistas <a href=\"http://www.llri.lt/kitos/dr-donald-j-boudreaux/lrinka\" target=\"_blank\">Donald J. Boudreaux</a>. Paklaustas, apie did\u017eiausius ekonomikos mitus, kuriais tiki nema\u017eai dalis \u0161ios disciplinos tyrin\u0117toj\u0173 ir profesional\u0173, D. J. Boudreaux atsak\u0117, kad \u00a0\u201eEkonomikoje gausu neteising\u0173 \u012fsitikinim\u0173, kurie visi\u0161kai neatitinka tikrov\u0117s ir b\u016bt\u0173 labai sunku juos surikiuoti pagal j\u0173 absurdi\u0161kum\u0105 bei netikslum\u0105. Mano s\u0105ra\u0161as neabejotinai susij\u0119s su mano ekonominiais \u012fsitikinimais bei su subjektyviu absurdi\u0161kumo supratimu. Ta\u010diau klausimas smagus ir \u012fdomus, tod\u0117l nusprend\u017eiau pateikti penki\u0173, mano nuomone, absurdi\u0161kiausi\u0173 mit\u0173 reiting\u0105\u201c.</p>\n<p>5. \u012esitikinimas, kad valstyb\u0117s subsidijuojama sveikatos apsauga suma\u017eins jos kain\u0105 vartotojams.<br />\n4. Id\u0117ja, kad valstybei reikia tur\u0117ti pinig\u0173 leidimo gali\u0105 ir tai pad\u0117t\u0173 u\u017etikrinti stabil\u0173 ekonomikos veikim\u0105.<br />\n3. Nuostata, kad dideli skirtumai tarp \u017emoni\u0173 pajam\u0173 rodo rinkos klaidas, kurios b\u016btinai turi b\u016bti taisomos valstyb\u0117s.<br />\n2. Aklas tik\u0117jimas, kad demokratin\u0117je visuomen\u0117je vald\u017eios atstovai tur\u0117t\u0173 priimti sprendimus u\u017e \u017emones, kurie ekonomist\u0173 nuomone, negali priimti sprendim\u0173 patys.<br />\n1. (b) \u012esitikinimas, kad skiriant socialines i\u0161mokas subsidijuojami darbdaviai ir ma\u017e\u0117ja darbuotoj\u0173 atlyginimai.<br />\n1. (a) \u012esitikinimas, kad minimalus darbo u\u017emokestis yra, ar gali b\u016bti, naudingas visiems \u017eemos kvalifikacijos darbuotojams.</p>\n<p>Anot ekonomisto, kiekvienas i\u0161 i\u0161vardint\u0173 mit\u0173 ne tik iliustruoja istorijos nei\u0161manym\u0105, bet ir visi\u0161k\u0105 atramini\u0173\u0173 ekonomikos rei\u0161kini\u0173 nesuvokim\u0105.</p>\n<p><img class=\"alignright size-full wp-image-23184\" src=\"http://www.llri.lt/wp-content/uploads/2016/02/IMG_0176_.jpg\" alt=\"IMG_0176_\" width=\"3456\" height=\"1849\" srcset=\"http://www.llri.lt/wp-content/uploads/2016/02/IMG_0176_-300x161.jpg 300w, http://www.llri.lt/wp-content/uploads/2016/02/IMG_0176_-768x411.jpg 768w, http://www.llri.lt/wp-content/uploads/2016/02/IMG_0176_-1024x548.jpg 1024w, http://www.llri.lt/wp-content/uploads/2016/02/IMG_0176_-600x321.jpg 600w\" sizes=\"(max-width: 3456px) 100vw, 3456px\" /></p>\n<p><em>Straipsnis i\u0161verstas i\u0161 Foundation for Economic Education puslapio FEE.org</em></p>\n<p>The post <a rel=\"nofollow\" href=\"http://www.llri.lt/naujienos/ekonomine-politika/5-mitai-kuriais-tiki-dauguma-ekonomistu/lrinka\">D. J. Boudreaux. 5 mitai, kuriais tiki dauguma ekonomist\u0173</a> appeared first on <a rel=\"nofollow\" href=\"http://www.llri.lt\">Lietuvos laisvosios rinkos institutas</a>.</p>",
                "system_modified_date": 1455530059340,
                "images_meta": {
                    "http://www.llri.lt/wp-content/uploads/2016/02/IMG_0176_.jpg": {
                        "width": 3456,
                        "height": 1849
                    }
                }
            },
            "prediction": {
                "predictor_id": "68727e2e4d2d3ae4c7c4d99a64111d4d",
                "feed_id": "56b9aabdadacf20001085cf5",
                "entry_id": "56c19ec08e8f13016127cbb2",
                "show": true,
                "score": 0.5249805590164902
            },
            "metadata": {
                "images": ["http://www.llri.lt/wp-content/uploads/2016/02/IMG_0176_.jpg", "http://www.llri.lt/wp-content/uploads/2016/02/IMG_0176_.jpg"],
                "is_sponsored": false,
                "thumbnail": "http://www.llri.lt/wp-content/uploads/2016/02/IMG_0176_.jpg",
                "redirect_url": "/redirector?url=http%3A%2F%2Fwww.llri.lt%2Fnaujienos%2Fekonomine-politika%2F5-mitai-kuriais-tiki-dauguma-ekonomistu%2Flrinka&feed_entry_id=56c19ec08e8f13016127cbb2&user_id=53a05ab85829cbcbbf10091d&rank=5&server_request_id=298be0282afd4a23b4a236656e258190&server_request_date=1455531033865",
                "is_viewed": false,
                "trace_prototype": {
                    "server_request_id": "298be0282afd4a23b4a236656e258190",
                    "server_request_date": 1455531033865,
                    "rank": 5,
                    "user_id": "53a05ab85829cbcbbf10091d",
                    "feed_entry_id": "56c19ec08e8f13016127cbb2"
                }
            }
        }, {
            "feed_entry": {
                "author": "Algirdas Acus, LRT Televizijos laida \u201eSavait\u0117\u201c",
                "is_processed": true,
                "feed": {
                    "last_updated": 1455525849676,
                    "url": "http://www.delfi.lt/rss/feeds/world.xml",
                    "description": "Rubrikoje U\u017esienis \u2013 Europos ir viso pasaulio naujienos, kariniai konfliktai, politin\u0117s diskusijos, rinkim\u0173 rezultatai ir kt.",
                    "is_sponsored_source": false,
                    "link": "http://www.delfi.lt/rss/feeds/world.xml",
                    "title": "U\u017esienyje",
                    "last_checked_date": 1455525849427,
                    "id": "54abaf95e36ece0001504ce0"
                },
                "image": "http://g3.dcdn.lt/images/pix/graikijos-parlamento-naktinis-posedis-70411876.jpg",
                "title": "Ministras mai\u0161tininkas \u0117m\u0117si gelb\u0117ti ES",
                "system_created_date": 1455525849812,
                "tags": [],
                "images": ["http://g3.dcdn.lt/images/pix/graikijos-parlamento-naktinis-posedis-70411876.jpg", "http://g3.dcdn.lt/images/pix/graikijos-parlamento-naktinis-posedis-70411876.jpg", "http://gs.delfi.lt/images/pix/520x345/z63ZK4h8hfw/graikijos-parlamento-naktinis-posedis-70411876.jpg", "http://gs.delfi.lt/images/pix/520x345/z63ZK4h8hfw/graikijos-parlamento-naktinis-posedis-70411876.jpg", "http://g.delfi.lt/images/pix/518x0/c7mCxldwibI/graikijos-parlamento-naktinis-posedis-70411876.jpg"],
                "duplicates": ["56c181edae6047050c720362", "56c182018e8f13015427c9a7", "56c17430edaf4d03f97c304a", "56c182878e8f13015427c9ff", "56c174cd8e8f13015427c8e1"],
                "images_sized": [],
                "id": "56c18fd98e8f13015e27c892",
                "thumbnail": "http://g.delfi.lt/images/pix/125x125/JggoFdAfVRc/graikijos-parlamento-naktinis-posedis-70411864.jpg",
                "url": "http://www.delfi.lt/news/daily/world/ministras-maistininkas-emesi-gelbeti-es.d?id=70411732&utm_source=rss&utm_medium=rss&utm_campaign=rss",
                "canonical_url": "http://www.delfi.lt/news/daily/world/ministras-maistininkas-emesi-gelbeti-es.d?id=70411732",
                "published": 1455521880000,
                "content": "DELFI - Buv\u0119s Graikijos finans\u0173 ministras Janis Varufakis, palik\u0119s post\u0105, kai atsisak\u0117 sutikti su tre\u010dios Europos S\u0105jungos (ES) finansin\u0117s pagalbos Graikijai s\u0105lygomis, \u0117m\u0117si gelb\u0117ti ES nuo gri\u016bties. Jis prane\u0161\u0117 kuri\u0105s nauj\u0105 jud\u0117jim\u0105, kuris, jo \u017eod\u017eiais, \u201edemokratizuos \u017eemyn\u0105\u201c.",
                "system_modified_date": 1455526333046,
                "images_meta": {
                    "http://g.delfi.lt/images/pix/125x125/JggoFdAfVRc/graikijos-parlamento-naktinis-posedis-70411864.jpg": {
                        "width": null,
                        "height": null
                    }
                }
            },
            "prediction": {
                "predictor_id": "68727e2e4d2d3ae4c7c4d99a64111d4d",
                "feed_id": "54abaf95e36ece0001504ce0",
                "entry_id": "56c18fd98e8f13015e27c892",
                "show": true,
                "score": 0.4893345190925178
            },
            "metadata": {
                "images": ["http://g3.dcdn.lt/images/pix/graikijos-parlamento-naktinis-posedis-70411876.jpg", "http://g3.dcdn.lt/images/pix/graikijos-parlamento-naktinis-posedis-70411876.jpg", "http://gs.delfi.lt/images/pix/520x345/z63ZK4h8hfw/graikijos-parlamento-naktinis-posedis-70411876.jpg", "http://gs.delfi.lt/images/pix/520x345/z63ZK4h8hfw/graikijos-parlamento-naktinis-posedis-70411876.jpg", "http://g.delfi.lt/images/pix/518x0/c7mCxldwibI/graikijos-parlamento-naktinis-posedis-70411876.jpg"],
                "is_sponsored": false,
                "thumbnail": "http://g3.dcdn.lt/images/pix/graikijos-parlamento-naktinis-posedis-70411876.jpg",
                "redirect_url": "/redirector?url=http%3A%2F%2Fwww.delfi.lt%2Fnews%2Fdaily%2Fworld%2Fministras-maistininkas-emesi-gelbeti-es.d%3Fid%3D70411732%26utm_source%3Drss%26utm_medium%3Drss%26utm_campaign%3Drss&feed_entry_id=56c18fd98e8f13015e27c892&user_id=53a05ab85829cbcbbf10091d&rank=6&server_request_id=298be0282afd4a23b4a236656e258190&server_request_date=1455531033865",
                "is_viewed": false,
                "trace_prototype": {
                    "server_request_id": "298be0282afd4a23b4a236656e258190",
                    "server_request_date": 1455531033865,
                    "rank": 6,
                    "user_id": "53a05ab85829cbcbbf10091d",
                    "feed_entry_id": "56c18fd98e8f13015e27c892"
                }
            }
        }, {
            "feed_entry": {
                "author": "Nathan Yau",
                "is_processed": true,
                "feed": {
                    "last_updated": 1455529500000,
                    "url": "http://flowingdata.com/feed/",
                    "icon": "http://flowingdata.comimages/apple-touch-icon-114x114.png",
                    "description": "Strength in Numbers",
                    "is_sponsored_source": false,
                    "link": "http://flowingdata.com",
                    "language": "en-US",
                    "title": "FlowingData",
                    "last_checked_date": 1455529579383,
                    "image": "http://flowingdata.com/wp-content/uploads/2014/10/logo-lone-square-600-5451c585_site_icon-16x16.png",
                    "id": "53a062045829cb795f183f2d"
                },
                "image": "http://i1.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?fit=1145%2C376",
                "title": "Predictive policing",
                "system_created_date": 1455529579780,
                "tags": ["Statistics", "police", "Marshall Project", "crime"],
                "images": ["http://i1.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?fit=1145%2C376", "http://i0.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?fit=720%2C236"],
                "duplicates": ["56c19e6eedaf4d041d7c329e"],
                "images_sized": [],
                "id": "56c19e6bedaf4d04117c3941",
                "url": "http://flowingdata.com/2016/02/15/predictive-policing/",
                "canonical_url": "http://flowingdata.com/2016/02/15/predictive-policing/",
                "published": 1455529500000,
                "content": "<p><a href=\"http://flowingdata.com/2016/02/15/predictive-policing/\"><img width=\"720\" height=\"236\" src=\"http://i0.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?fit=720%2C236\" class=\"attachment-medium size-medium wp-post-image\" alt=\"Predictive policing\" srcset=\"http://i1.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?resize=210%2C69 210w, http://i0.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?resize=720%2C236 720w, http://i1.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?resize=768%2C252 768w, http://i0.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?resize=1090%2C358 1090w, http://i0.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?w=1145 1145w\" sizes=\"(max-width: 720px) 100vw, 720px\" /></a></p>Crime and data have an old history together, but because there are new methods of collection and analysis these days, there are new decisions to make. The Marshall Project, in&#8230;<p><strong>Tags:</strong> <a href=\"http://flowingdata.com/tag/crime/\" rel=\"tag\">crime</a>, <a href=\"http://flowingdata.com/tag/marshall-project/\" rel=\"tag\">Marshall Project</a>, <a href=\"http://flowingdata.com/tag/police/\" rel=\"tag\">police</a></p> <p><a href=\"http://flowingdata.com/2016/02/15/predictive-policing/\"><img width=\"720\" height=\"236\" src=\"http://i0.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?fit=720%2C236\" class=\"attachment-medium size-medium wp-post-image\" alt=\"Predictive policing\" srcset=\"http://i0.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?resize=210%2C69 210w, http://i2.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?resize=720%2C236 720w, http://i2.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?resize=768%2C252 768w, http://i1.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?resize=1090%2C358 1090w, http://i2.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?w=1145 1145w\" sizes=\"(max-width: 720px) 100vw, 720px\" /></a></p><p>Crime and data have an old history together, but because there are new methods of collection and analysis these days, there are new decisions to make. The Marshall Project, in collaboration with the Verge, <a href=\"https://www.themarshallproject.org/2016/02/03/policing-the-future\">looks at the current state of predictive policing and the social issues that surround it</a>.</p>\n<blockquote><p>As predictive policing has spread, researchers and police officers have begun exploring how it might contribute to a version of policing that downplays patrolling &mdash; as well as stopping, questioning, and frisking &mdash; and focuses more on root causes of particular crimes. <a href=\"http://www.riskterrainmodeling.com/overview.html\">Rutgers University researchers</a> specializing in \u201crisk terrain modeling\u201d have been using analysis similar to HunchLab to work with police on \u201cintervention strategies.\u201d In one Northeast city, they have enlisted city officials to board up vacant properties linked to higher rates of violent crime, and to advertise after-school programming to kids who tend to gather near bodegas in high-risk areas.</p></blockquote>\n<p>Of course, then there's the whole action-reaction stuff. More time required.</p>\n<p><strong>Tags:</strong> <a href=\"http://flowingdata.com/tag/crime/\" rel=\"tag\">crime</a>, <a href=\"http://flowingdata.com/tag/marshall-project/\" rel=\"tag\">Marshall Project</a>, <a href=\"http://flowingdata.com/tag/police/\" rel=\"tag\">police</a></p>",
                "system_modified_date": 1455529903595,
                "images_meta": {
                    "http://i0.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?fit=720%2C236": {
                        "width": 720,
                        "height": 236
                    }
                }
            },
            "prediction": {
                "predictor_id": "68727e2e4d2d3ae4c7c4d99a64111d4d",
                "feed_id": "53a062045829cb795f183f2d",
                "entry_id": "56c19e6bedaf4d04117c3941",
                "show": true,
                "score": 0.46180371154032895
            },
            "metadata": {
                "images": ["http://i1.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?fit=1145%2C376", "http://i0.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?fit=720%2C236"],
                "is_sponsored": false,
                "thumbnail": "http://i1.wp.com/flowingdata.com/wp-content/uploads/2016/02/Predictive-policing.png?fit=1145%2C376",
                "redirect_url": "/redirector?url=http%3A%2F%2Fflowingdata.com%2F2016%2F02%2F15%2Fpredictive-policing%2F&feed_entry_id=56c19e6bedaf4d04117c3941&user_id=53a05ab85829cbcbbf10091d&rank=7&server_request_id=298be0282afd4a23b4a236656e258190&server_request_date=1455531033865",
                "is_viewed": false,
                "trace_prototype": {
                    "server_request_id": "298be0282afd4a23b4a236656e258190",
                    "server_request_date": 1455531033865,
                    "rank": 7,
                    "user_id": "53a05ab85829cbcbbf10091d",
                    "feed_entry_id": "56c19e6bedaf4d04117c3941"
                }
            }
        }, {
            "feed_entry": {
                "is_processed": true,
                "feed": {
                    "last_updated": 1455532860000,
                    "url": "http://sodra.lt/lt/naujienos/rss",
                    "icon": "http://sodra.lt/favicon.ico",
                    "description": "RSS",
                    "is_sponsored_source": false,
                    "link": "http://sodra.lt/lt/",
                    "language": "lt",
                    "title": "www.sodra.lt",
                    "last_checked_date": 1455526021131,
                    "image": "http://sodra.lt/images/sodra.jpg",
                    "id": "5644d262d67a22000158c6ac"
                },
                "image": "http://sodra.lt/images/sodra.jpg",
                "title": "V\u0117lavusios i\u0161mokos pasiek\u0117 gyventojus, kitos bus mokamos laiku",
                "system_created_date": 1455526021706,
                "tags": ["darbus", "draudimo", "dien\u0105", "sistemos", "\u201eSodros\u201c"],
                "images": ["http://sodra.lt/images/sodra.jpg"],
                "duplicates": [],
                "images_sized": [],
                "id": "56c19085edaf4d04117c35fe",
                "url": "http://sodra.lt/lt/naujienos/velavusios-ismokos-pasieke-gyventojus-kitos-bus-mokamos-laiku",
                "published": 1455526021558,
                "content": "Pra\u0117jusi\u0105 savait\u0119 gyventojus tur\u0117jusios pasiekti pensijos ir kitos socialinio draudimo i\u0161mokos (ligos, motinyst\u0117s, nedarbingumo pa\u0161alpos ir pan.) jau i\u0161mok\u0117tos,&nbsp;kitos i\u0161mokos gyventojus pasieks laiku.",
                "system_modified_date": 1455526446053,
                "images_meta": {}
            },
            "prediction": {
                "predictor_id": "68727e2e4d2d3ae4c7c4d99a64111d4d",
                "feed_id": "5644d262d67a22000158c6ac",
                "entry_id": "56c19085edaf4d04117c35fe",
                "show": true,
                "score": 0.4397520291340695
            },
            "metadata": {
                "images": ["http://sodra.lt/images/sodra.jpg"],
                "is_sponsored": false,
                "thumbnail": "http://sodra.lt/images/sodra.jpg",
                "redirect_url": "/redirector?url=http%3A%2F%2Fsodra.lt%2Flt%2Fnaujienos%2Fvelavusios-ismokos-pasieke-gyventojus-kitos-bus-mokamos-laiku&feed_entry_id=56c19085edaf4d04117c35fe&user_id=53a05ab85829cbcbbf10091d&rank=8&server_request_id=298be0282afd4a23b4a236656e258190&server_request_date=1455531033865",
                "is_viewed": false,
                "trace_prototype": {
                    "server_request_id": "298be0282afd4a23b4a236656e258190",
                    "server_request_date": 1455531033865,
                    "rank": 8,
                    "user_id": "53a05ab85829cbcbbf10091d",
                    "feed_entry_id": "56c19085edaf4d04117c35fe"
                }
            }
        }
        ]
    });