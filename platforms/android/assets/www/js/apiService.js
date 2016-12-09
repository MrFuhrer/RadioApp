app.service('$api', ['$http', function($http) {
    var apiUrl = "/api/api.php";

    this.get = function(command, data, callback, error) {
        $http.post(apiUrl, {
            c: command,
            params: data
        }).success(function(data) {
            if(callback) {
                callback(data);
            }
        }).error(function(data) {
            if(error) {
                error(data);
            }
        });
    }
}]);