(function() {
	angular.module('properNgCordova', [
		'properNgCordova.plugins'
	]);
	angular.module('properNgCordova.plugins', [
		'properNgCordova.plugins.kvstore',
		'properNgCordova.plugins.properpush'
	]);
	//加密键值对存储
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

	//推送sdk集成
	angular.module('properNgCordova.plugins.properpush', [])
		.factory('$properProperpush', ['$q', '$window', function($q, $window) {
			return {
				init: function(kvs) {
					var d = $q.defer();

					$window.plugins.properpush.init(kvs, function(success) {
						d.resolve(success);
					}, function(error) {
						d.reject(error);
					});

					return d.promise;
				},
				bindUserid: function(kvs) {
					var d = $q.defer();

					$window.plugins.properpush.bindUserid(kvs, function(success) {
						d.resolve(success);
					}, function(error) {
						d.reject(error);
					});

					return d.promise;
				},
				unBindUserid: function() {
					var d = $q.defer();
					//取消userid与设备的绑定关系，其时就是将userid置为空
					var kvs={"userid":"","otherInfo":""};
					$window.plugins.properpush.bindUserid(kvs, function(success) {
						d.resolve(success);
					}, function(error) {
						d.reject(error);
					});

					return d.promise;
				},
				getDeviceInfo: function() {
					var d = $q.defer();

					$window.plugins.properpush.getDeviceInfo(function(success) {
						d.resolve(success);
					}, function(error) {
						d.reject(error);
					});

					return d.promise;
				}
			};
		}]);
})();