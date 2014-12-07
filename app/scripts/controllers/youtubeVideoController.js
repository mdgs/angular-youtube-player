/* global YT, youtubePlayerModule */
/**
 * @ngdoc object
 * @name youtubePlayer.youtubeVideo
 * @requires  $scope, youtubeApi
 * @description
 * Controller for youtubeVideo directive
 */
youtubePlayerModule.controller('youtubeVideo', ['$scope','youtubeApi', function($scope, youtubeApi) {

    this.player = null;
    this.element = null;
    var playerReady = false;
    var self = this;

    /**
     * @ngdoc method
     * @name youtubePlayer.youtubeVideo#init
     * @description
     * Initiate controller of the current player.
     * This will load youtube api and initiate player with given parameters
     *
     * @see youtubeApi.youTubeIframeAPIReady
     * @see cueVideo
     */
    this.init = function(){
        youtubeApi.youTubeIframeAPIReady().then(
            function(){
                if(self.valid()) {
                    self.cueVideo();
                }
            },
            function(){
                $scope.onApiLoadingFailure({controller:self});
            }
        );
    };

    /**
     * @ngdoc method
     * @name youtubePlayer.youtubeVideo#reload
     * @description
     * Try to re-initiate controller of the current player.
     * This can be useful when youtube api could not be loaded (e.g. connection lost)
     * @example
     * Example of how it can be used to catch failure of youtube api loading and attempt to load it again
     * ```html
     *   <div youtube-video video-id="{{player1.videoId}}" on-api-loading-failure="onApiLoadingFailure(controller)"></div>
     * ```
     * ```js
     *   $scope.onApiLoadingFailure = function(controller){
     *      controller.reload(); // try load youtube api again
     *   };
     * ```
     *
     * @see init
     */
    this.reload = function(){
        this.init();
    };

    /**
     * @ngdoc method
     * @name youtubePlayer.youtubeVideo#setPlayerElement
     * @description
     * Set html element that will be used for youtube player
     *
     * @param {Object} element - html element that will be used for youtube player
     */
    this.setPlayerElement = function(element){
        this.element = element;
    };

    /**
     * @ngdoc method
     * @name youtubePlayer.youtubeVideo#getPlayer
     * @description
     * Proper way of getting player.
     * This method will initialize youtube player if it is not set yet
     *
     * @returns {Object}
     */
    this.getPlayer = function(){
        if(!this.player){
            this.player = new YT.Player(this.element, {
                playerVars: $scope.playerVars || {},
                height: $scope.height || '390',
                width: $scope.width || '640',
                events: getPlayerEvents()
            });
        }
        return this.player;
    };

    /**
     * @ngdoc method
     * @name youtubePlayer.youtubeVideo#cueVideo
     * @description
     * Loads the specified video's thumbnail and prepares the player to play the video.
     * If videoId is provided then mediaContentUrl has no effect.
     */
    this.cueVideo = function(){
        var player = this.getPlayer();
        if(!playerReady){
            //see getPlayerEvents().onReady for the first player instantiation
            return;
        }

        var context = $scope.videoId ? 'id' : 'url';
        var videoParameters = $scope.videoParameters || {};
        switch(context){
            case 'id':
                videoParameters.videoId = $scope.videoId;
                player.cueVideoById(videoParameters);
                break;
            case 'url':
                videoParameters.mediaContentUrl = $scope.mediaContentUrl;
                player.cueVideoByUrl(videoParameters);
                break;
        }
    };

    /**
     * @ngdoc method
     * @name youtubePlayer.youtubeVideo#valid
     * @description
     * Validate video $scope
     *
     * @returns {boolean}
     */
    this.valid = function(){
        return this.element && ($scope.videoId || ($scope.mediaContentUrl && $scope.mediaContentUrl.match(/^http(s)?:\/\/(www.)?youtube/)));
    };

    /**
     * @ngdoc method
     * @name youtubePlayer.youtubeVideo#getPlayerEvents
     * @description
     * Get list of callbacks for player events according to youtube player api
     *
     * @returns {Object}
     */
    var getPlayerEvents = function(){
        return {
            'onReady': function(event){
                $scope.onReady({event:event});
                playerReady = true;
                self.cueVideo();
            },
            'onStateChange': function(event) {
                $scope.onStateChange({event:event});
            },
            'onPlaybackQualityChange': function(event) {
                $scope.onPlaybackQualityChange({event:event});
            },
            'onPlaybackRateChange': function(event) {
                $scope.onPlaybackRateChange({event:event});
            },
            'onError': function(event) {
                $scope.onError({event:event});
            },
            'onApiChange': function(event) {
                $scope.onApiChange({event:event});
            }
        };
    };

}]);