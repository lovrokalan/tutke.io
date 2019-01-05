(function () {
  function user($window, $http, authentication) {
    
    var getUser = function (userId) {
      return $http.get('/api/users/' + userId, {
        params: {
          populate: true,
        }
      });
    }

    var addCommentToUser = function (userId, data) {
      console.log(data)
      return $http.post('/api/users/' + userId + '/comments', data, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    };

    return {
      getUser: getUser,
      addCommentToUser: addCommentToUser
    }
  }

  user.$inject = ['$window', '$http', 'authentication'];

  /* global angular */
  angular
    .module('tutke')
    .service('user', user);
})();