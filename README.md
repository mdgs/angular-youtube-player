angular-youtube-player
======================

Angular module for youtube player API

How to use
---------

First it is required to read and understand [YouTube Player API](https://developers.google.com/youtube/iframe_api_reference).
The following example includes the most of possible functionality. For more information read comments in files (`JSDoc` formatted).
Built example see in `/demo` folder

First add `youtubePlayer` module to your application:

    var yourApp = angular.module('yourApp', ['youtubePlayer']);

Then configure controller, for example:

    yourApp.controller('appController', ['$scope', function($scope) {
    $scope.onReady = function(event){
        console.log(event);
        // var player = event.target;
        // player.playVideo();
    };
    $scope.onStateChange = function(event){
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(function(){
                event.target.stopVideo();
            }, 5000);
        }
    };
    $scope.onPlaybackQualityChange = function(event){
        console.log(event);
    };
    $scope.onPlaybackRateChange = function(event){
        console.log(event);
    };
    $scope.onError = function(event){
        console.log(event);
    };
    $scope.onApiChange = function(event){
        console.log(event);
    };
    $scope.onControllerReady = function(controller){
        console.log(controller);
        // can manipulate controller
    };
    $scope.onApiLoadingFailure = function(controller){
        console.log(controller);
        // youtube api could not be loaded (e.g. connection lost)
        // controller.reload(); // try load youtube api again
    };
    $scope.player = {
        width: '640',
        height: '390',
        // videoId: 'i9MHigUZKEM',
        mediaContentUrl: 'https://www.youtube.com/v/62RvRQuMVyg?version=3',
        videoParameters: {
            startSeconds:25,
            endSeconds:50,
            suggestedQuality:small //e.g. for slow connection
        }
        playerVars: {
            autoplay:1,
            controls:0
        }
    };
    }]);

Finally, HTML element with youtube player:

    <div youtube-video video-id="{{player.videoId}}" media-content-url="{{player.mediaContentUrl}}"
    width="{{player.width}}" height="{{player.height}}"
    video-parameters="player.videoParameters"
    player-vars="player.playerVars"
    on-ready="onReady(event)"
    on-state-change="onStateChange(event)"
    on-playback-quality-change="onPlaybackQualityChange(event)"
    on-playback-rate-change="onPlaybackRateChange(event)"
    on-error="onError(event)"
    on-api-change="onApiChange(event)"
    on-controller-ready="onControllerReady(controller)"
    on-api-loading-failure="onApiLoadingFailure(controller)"></div>

**Parameters**:
  * width (number) – The width of the video player. The default value is 640. Watched.
  * height (number) – The height of the video player. The default value is 390. Watched.
  * videoId (string) – The YouTube video ID that identifies the video that the player will load. Optional if mediaContentUrl is provided. Watched.
  * mediaContentUrl - fully qualified YouTube player URL in the format http://www.youtube.com/v/VIDEO_ID?version=3 . Watched.
  * playerVars (object) – The object's properties identify player parameters that can be used to customize the player, e.g. {'autoplay':1, 'controls':0}. Not watched.
  * videoParameters (object) – according to the youtube api, {startSeconds:Number, endSeconds:Number, suggestedQuality:String(small, medium, large, hd720, hd1080, highres or default)}. Watched

**Events** bind to external function (see example above):
  * onReady - See youtube api -> onReady event
  * onStateChange - See youtube api -> onStateChange event
  * onPlaybackQualityChange - See youtube api -> onPlaybackQualityChange event
  * onPlaybackRateChange - See youtube api -> onPlaybackRateChange event
  * onError - See youtube api -> onError event
  * onApiChange - See youtube api -> onApiChange event
  * onControllerReady - The callback instantiated when controller of this directive gets available.
  * onApiLoadingFailure - Triggered when youtube api could not be loaded (e.g. connection lost)

Development
---------

### Building youtubePlayer module

First the environment should be configured including `git`, `node`, `npm`, `gulp`
Then run:

    npm install
    gulp

This will generate two files into `/build` folder: minified to normal versions

### Play with Demo

Demo application is located at `/demo`. Configure your server to open that directory in browser.
`bower` should be configured in the environment to build the demo app.
Then run:

    bower install
    gulp demo

This will copy angular.js and youtubePlayer module files into `/demo/vendor` folder