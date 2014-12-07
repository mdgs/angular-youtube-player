/* global youtubePlayerModule */
/**
 * @ngdoc directive
 * @name youtubeVideo
 * @restrict AE
 *
 * @description
 * HTML element with youtube player.
 *
 * @example
 * ```html
 * <div youtube-video video-id="{{videoId}}" media-content-url="{{mediaContentUrl}}"
 *     width="{{width}}" height="{{height}}"
 *     video-parameters="videoParameters"
 *     player-vars="playerVars"
 *     on-ready="onReady(event)"
 *     on-state-change="onStateChange(event)"
 *     on-playback-quality-change="onPlaybackQualityChange(event)"
 *     on-playback-rate-change="onPlaybackRateChange(event)"
 *     on-error="onError(event)"
 *     on-api-change="onApiChange(event)"
 *     on-controller-ready="onControllerReady(controller)"
 *     on-api-loading-failure="onApiLoadingFailure(controller)"></div>
 * ```
 *
 * @param {number} height of player. The default value is 640. Watched
 * @param {number} width of player. The default value is 390. Watched
 * @param {string} videoId, optional if mediaContentUrl is provided. Watched
 * @param {string} mediaContentUrl fully qualified YouTube player URL in the format http://www.youtube.com/v/VIDEO_ID?version=3 . Watched
 * @param {expression} playerVars identify player parameters that can be used to customize the player, e.g. {'autoplay':1, 'controls':0}. Not watched
 * @param {expression} videoParameters according to the youtube api, {startSeconds:Number, endSeconds:Number, suggestedQuality:String(small, medium, large, hd720, hd1080, highres or default)}. Watched
 * @param {expression} onReady bind to external function. See youtube api -> onReady event
 * @param {expression} onStateChange bind to external function. See youtube api -> onStateChange event
 * @param {expression} onPlaybackQualityChange bind to external function. See youtube api -> onPlaybackQualityChange event
 * @param {expression} onPlaybackRateChange bind to external function. See youtube api -> onPlaybackRateChange event
 * @param {expression} onError bind to external function. See youtube api -> onError event
 * @param {expression} onApiChange bind to external function. See youtube api -> onApiChange event
 * @param {expression} onControllerReady bind to external function. The callback instantiated when controller of this directive gets available.
 * @param {expression} onApiLoadingFailure bind to external function. Triggered when youtube api could not be loaded (e.g. connection lost)
 *
 */
youtubePlayerModule.directive('youtubeVideo', function() {
    return {
        restrict: 'AE',
        scope: {
            height: '@',
            width: '@',
            videoId: '@',
            mediaContentUrl: '@',
            playerVars: '=?',
            videoParameters: '=?',
            onReady: '&?',
            onStateChange: '&?',
            onPlaybackQualityChange: '&?',
            onPlaybackRateChange: '&?',
            onError: '&?',
            onApiChange: '&?',
            onControllerReady: '&?',
            onApiLoadingFailure: '&?'
        },
        template: '<div></div>',
        controller: 'youtubeVideo',
        link: function($scope, element, attrs, ctrl) {
            $scope.onControllerReady({controller:ctrl});
            ctrl.setPlayerElement(element.children()[0]);
            ctrl.init();

            $scope.$watch('height + width', function(newValue, oldValue) {
                if (newValue===oldValue || !ctrl.valid()) {return;}
                ctrl.getPlayer().setSize($scope.width, $scope.height);
            });
            $scope.$watch('[videoId,mediaContentUrl]', function(newValue, oldValue) {
                //if there is videoId and it is not changed then change of the mediaContentUrl should be ignored
                if ((newValue[0] && oldValue[0]===newValue[0]) || angular.equals(oldValue,newValue) || !ctrl.valid()) {return;}
                ctrl.cueVideo();
            });
            $scope.$watch('videoParameters', function(newValue, oldValue) {
                if (angular.equals(oldValue,newValue) || !ctrl.valid()) {return;}
                ctrl.cueVideo();
            }, true); //true for objectEquality
        }
    };
});
