angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, $http) {

    $scope.getNews = function (query) {
        $http({
            method: 'GET',
            url: 'http://localhost:8080/Lab10/rest/news/' + query,
            contentType: "application/json"

        }).success(function (data) {


            $scope.news = data.results;
            alert();



        })


    };



})

.controller('ChatsCtrl', function ($scope, $http) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});


    $scope.getSentiment = function (text) {


        $http({
            method: 'GET',
            url: "http://localhost:8080/Lab10/rest/sentiment/" + text,
            contentType: "application/json"

        }).success(function (data) {


            $scope.type = data.type;
            $scope.score = data.score * 100 + ' %';



        })

    };
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});