(() => {
  function profileCtrl($window, $location, authentication, lectures, lecturesRequests, $routeParams, $uibModal, user, $route, $scope) {
    var vm = this;
    
    vm.msgError = '';
    vm.msgSuccess = '';
    vm.msgInfo = '';
    vm.isLoggedIn = authentication.isLoggedIn();

    vm.lecturesRequestsAccepted = [];
    vm.lecturesRequestsPending = [];
    
    /* Deletes user from database and loads login page. */
    vm.deleteUser = function() {
      vm.msgError = '';
      user.deleteUser(vm.user._id).then(
        function success(response) {
          authentication.doLogOut();
          $location.path('/login');
          $route.reload();
        },
        function error(error) {
          var errMsg = error.data ? error.data.message : error;
          vm.msgError = `There was an error when trying to delete user: ${errMsg}.`;
          console.log(error);
        }
      )
    }

    /* Deletes lecture. */
    vm.deleteLecture = function(lectureId) {
      vm.msgSuccess = '';
      vm.msgError = '';
      lectures.deleteLecture(lectureId).then(
        function success(response) {
          vm.msgSuccess = 'Lecture successfully deleted.';
          vm.user.postedLectures = vm.user.postedLectures.filter(x => x._id != lectureId);
        },
        function error(error) {
          var errMsg = error.data ? error.data.message : error;
          vm.msgError = `There was an error while deleting lecture: ${errMsg}.`;
          console.log(error);
        }
      )
    }

    /* Deletes lecture request. */
    vm.deletePendingLectureRequest = function(id) {
      vm.msgSuccess = '';
      vm.msgError = '';
      lecturesRequests.deleteLectureRequest(id).then(
        function success(response) {
          vm.msgSuccess = 'Lecture request successfully deleted.';
          vm.lecturesRequestsPending = vm.lecturesRequestsPending.filter(x => x._id != id);
        },
        function error(error) {
          var errMsg = error.data ? error.data.message : error;
          vm.msgError = `There was an error while deleting lecture request: ${errMsg}.`;
          console.log(error);
        }
      )
    }
    
    /* Updates user info. */
    vm.editUser = function(id) {
      console.log('edit '+ id);
    }

    /* Returns current logged in user. */
    if (vm.isLoggedIn) {
      authentication.getCurrentUser().then(
        function success(response) {
          vm.user = response.data;

          if(vm.user.role == 'tutor') {
            vm.lecturesRequestsAccepted = vm.user.lecturesRequests.filter(x => x.status == 'accepted' && x.requestType == 'studentRequest');
            vm.lecturesRequestsPending = vm.user.lecturesRequests.filter(x => x.status == 'pending' && x.requestType == 'tutorOffer');
          } else {
            vm.lecturesRequestsAccepted = vm.user.lecturesRequests.filter(x => x.status == 'accepted' && x.requestType == 'tutorOffer');
            vm.lecturesRequestsPending = vm.user.lecturesRequests.filter(x => x.status == 'pending' && x.requestType == 'studentRequest');
          }

          var createdAtDate = new Date(vm.user.createdAt);
          if(new Date(createdAtDate.getTime() + 1*60000) > new Date()) {
            vm.msgInfo = 'Welcome to Tutke.io. Hope you will have an awesome time using our application!';
          }
        },
        function error(error) {
          vm.isLoggedIn = false;
          authentication.doLogOut();
          console.log(error);
        }
      )
    } else {
      authentication.doLogOut();
      $location.path('/login');
      $route.reload();
    }
  }

  profileCtrl.$inject = ['$window', '$location', 'authentication', 'lectures', 'lecturesRequests', '$routeParams', '$uibModal', 'user' , '$route', '$scope'];

  /* global angular */
  angular
    .module('tutke')
    .controller('profileCtrl', profileCtrl);
})();