/* global youtubePlayerModule */
/**
 * @ngdoc service
 * @name youtubeApi
 * @description
 * Asynchronous loading of youtube iframe API
 * @see https://developers.google.com/youtube/iframe_api_reference
 */
youtubePlayerModule.service('youtubeApi', ['$window','$q','$timeout', function($window, $q, $timeout) {
    /**
     * Contains promise of loading youtube iframe API.
     * Used to request loading the API only once
     * @type {Object} $q.defer()
     */
    var iframeAPILoadingDeferred = null;

    /**
     * @ngdoc method
     * @name youtubeApi#youTubeIframeAPIReady
     * @description
     * Asynchronous loading of youtube iframe API
     *
     * @param {Number} timeout time to wait for youtube api to be loaded before rejecting the promise. Default is 15 seconds
     * @returns {Promise} resolved when youtube iframe api loaded
     */
    this.youTubeIframeAPIReady = function(timeout){
        if(!iframeAPILoadingDeferred){
            iframeAPILoadingDeferred = $q.defer();

            var tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            var resolved = false;
            $window.onYouTubeIframeAPIReady = function() {
                resolved = true;
                iframeAPILoadingDeferred.resolve();
            };
            $timeout(function(){
                if(!resolved){
                    iframeAPILoadingDeferred.reject('Could not load youtube iframe API');
                    iframeAPILoadingDeferred = null;
                    tag.parentNode.removeChild(tag);
                }
            }, timeout || 15000);
        }
        return iframeAPILoadingDeferred.promise;
    };

}]);