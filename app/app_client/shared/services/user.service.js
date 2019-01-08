(function () {
  function user($window, $http, authentication) {
    
    var getUser = function (userId) {
      return $http.get('/api/users/' + userId, {
        params: {
          populate: true,
        }
      });
    }
    
    var deleteUser = function (userId) {
      return $http.delete('/api/users/' + userId, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
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
      deleteUser: deleteUser,
      addCommentToUser: addCommentToUser
    }
  }

  user.$inject = ['$window', '$http', 'authentication'];

  /* global angular */
  angular
    .module('tutke')
    .service('user', user);
})();