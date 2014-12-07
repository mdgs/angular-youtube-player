(function(angular) {
    'use strict';
    var demoApp = angular.module('demoApp', ['youtubePlayer']);
    demoApp.controller('appController', ['$scope', function($scope) {

        $scope.onReady = function(event){
            console.log('onReady');
            console.log(event);
            // var player = event.target;
            // player.playVideo();
        };
        $scope.onStateChange = function(event){
            console.log('onStateChange');
            console.log(event);
        };
        $scope.onPlaybackQualityChange = function(event){
            console.log('onPlaybackQualityChange');
            console.log(event);
        };
        $scope.onPlaybackRateChange = function(event){
            console.log('onPlaybackRateChange');
            console.log(event);
        };
        $scope.onError = function(event){
            console.log('onError');
            console.log(event);
        };
        $scope.onApiChange = function(event){
            console.log('onApiChange');
            console.log(event);
        };
        $scope.onControllerReady = function(controller){
            console.log('onControllerReady');
            console.log(controller);
            // can manipulate controller
        };
        $scope.onApiLoadingFailure = function(controller){
            console.log('onApiLoadingFailure');
            console.log(controller);
            // controller.reload(); // try load youtube api again
        };

        $scope.player1 = {
            width: '640',
            height: '390',
            videoId: 'i9MHigUZKEM',
            videoParameters: {}
        };
        $scope.player2 = {
            mediaContentUrl: 'https://www.youtube.com/v/62RvRQuMVyg?version=3',
            playerVars: {
                'autoplay':1,
                'controls':0
            }
        };

    }]);
})(window.angular);