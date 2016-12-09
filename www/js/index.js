var app = angular.module('App', ['ngCordova','ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $httpParamSerializerProvider) {

    $stateProvider
    .state('main', {
        url: '/',
        controller: 'mainController',
        templateUrl: 'views/index.html'
    })
    .state('live', {
        url: '/live',
        controller: 'liveController',
        templateUrl: 'views/livestream.html',
        bclass: "live"
    });

    $urlRouterProvider.otherwise('/');

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $httpProvider.defaults.transformRequest = function(data) {
        return $httpParamSerializerProvider.$get()(data);
    }

});

app.run(function($cordovaStatusbar) {
    document.addEventListener("deviceready", function() {
        console.log("Setting Style");
        $cordovaStatusbar.overlaysWebView(true);
        $cordovaStatusbar.style(2);
        $cordovaStatusbar.styleHex("#EBE13A");
        // $cordovaStatusbar.styleHex("#FFFFFF");
    }, false);
});

app.controller("mainController", function($scope, $http, $state, $api) {
    $api.get('main', '', function(data) {
        if(data.main_image) {
            $scope.mainImage = data.main_image;
        }
    });
});
app.controller("liveController", function($scope, $http, $state, $api) {
    $api.get('main', '', function(data) {
        if(data.main_image) {
            $scope.mainImage = data.main_image;
        }
    });
});

app.controller('BodyController', function($scope) {


    var self = this;
    self.bclass = "";

    var audio = document.querySelector('audio');

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        if (angular.isDefined(toState.bclass)) {
            self.bclass = toState.bclass;
            return;
        }

        self.bclass = "";
    });

    $scope.streamSrc = "http://ec2-35-165-142-89.us-west-2.compute.amazonaws.com:8000/airtime_128";

    this.streamState = "playing";

    this.playPause = function() {
        console.log("pp");
        if(audio.paused) {
            audio.play();
            self.streamState = "playing";
        } else {
            audio.pause();
            self.streamState = "paused";
        }
    }

});