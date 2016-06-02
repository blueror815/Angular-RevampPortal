(function () {
  'use strict';

  angular
    .module('revapm.Portal.Signup')
    .controller('SignupController', SignupController);

  /*@ngInject*/
  function SignupController($scope,
                            Users,
                            $localStorage,
                            User,
                            Companies,
                            BillingPlans,
                            CRUDController,
                            Countries,
                            $state,
                            AlertService,
                            $injector) {

    //Invoking crud actions
    $injector.invoke(CRUDController,
      this, {$scope: $scope});

    $scope.$on('$stateChangeSuccess', function (state) {
      if ($state.is('signup')){
        $scope.model = _.clone(User.getUser());
        $scope.model.country = 'US';
        // if(!$scope.model.billing_plan){
        //   $state.go('billing_plans');
        // }
      }


    });


    //$scope.user = User.getUser();


    // $scope.chooseBillingPlan = function (id, name) {
    //   $localStorage.user = {billing_plan: id};
    //   $state.transitionTo('signup');

    // };

    $scope.chooseBillingPlan = function (bp) {
      $state.go('signup.contact_info',{billing_plan_handler:bp.chargify_handle});
    };

    $scope.initBillingPlans = function () {
      $scope.newUser = {};
      $scope.setResource(BillingPlans);
      $scope.list();
    };

    $scope.initLoginRedirect = function () {
      setTimeout(function () {
          $state.go('login');
      }, 10000);
    };

    $scope.countries = Countries.query();

    $scope.getQueryString = function (model) {
        var q = '?first_name=' + encodeURIComponent(model.firstname ? model.firstname : '') +
          '&last_name=' + encodeURIComponent(model.lastname ? model.lastname : '') +
          '&email=' + encodeURIComponent(model.email ? model.email : '') +
          '&phone=' + encodeURIComponent(model.phone_number ? model.phone_number : '') +
          '&reference=' + encodeURIComponent(model.user_id ? model.user_id : '') +
          '&organization=' + encodeURIComponent(model.companyName ? model.companyName : '') +
          '&billing_address=' + encodeURIComponent(model.address1 ? model.address1 : '') +
          '&billing_address_2=' + encodeURIComponent(model.address2 ? model.address2 : '') +
          '&billing_city=' +  encodeURIComponent(model.city ? model.city : '') +
          '&billing_zip=' + encodeURIComponent(model.zipcode ? model.zipcode : '') +
          '&billing_country=' + encodeURIComponent(model.country ? model.country : '');
        $scope.query = q;
    };

    $scope.zipRegex = '[0-9]{1,10}';
    $scope.phoneRegex = '[0-9, \\s, \\+, \\-, \\(, \\)]{1,20}';



    $scope.createUser = function (model) {
      if (!model) {
        return;
      }
      if (model.passwordConfirm !== model.password) {
        $scope.alertService.danger('Passwords did not match', 5000);
        return;
      }
      $scope.userData = _.clone(model);
      $scope.alertService.clear();
//      delete model.passwordConfirm;
//      model.collection_method = ['Automatic'];
//      model.billing_schedule = 'monthly';

      Users.signup(model)
        .$promise
        .then(function (data) {
          $localStorage.user.email = model.email;
          $state.go('email_sent');
        })
        .catch(function (err) {
          model.passwordConfirm = model.password;
          // NOTE: detect type problem
          console.log(err);
          // - 1. Not fount billing plan info
          // - 2. User with email alraedy exists
          // - 3. Server error (email, send)

          AlertService.danger(err, 5000);
        });
    };
    $scope._loading = false;
  }
})();
