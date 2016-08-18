(function() {
	angular.module('properNgCordova', [
		'properNgCordova.plugins'
	]);
	angular.module('properNgCordova.plugins', [
		'properNgCordova.plugins.kvstore'
	]);
	angular.module('properNgCordova.plugins.kvstore', [])
		.factory('$properKvstore', ['$q', '$window', function($q, $window) {
			return {
				kvSets: function(filename, kvs) {
					var d = $q.defer();

					$window.plugins.kvstore.kvSets(filename, kvs, function(success) {
						d.resolve(success);
					}, function(error) {
						d.reject(error);
					});

					return d.promise;
				},

				kvGets: function(filename, keys) {
					var d = $q.defer();

					$window.plugins.kvstore.kvGets(filename, keys, function(success) {
						d.resolve(success);
					}, function(error) {
						d.reject(error);
					});

					return d.promise;
				}
			};
		}]);
})();