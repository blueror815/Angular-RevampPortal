(function () {
  'use strict';

  angular
    .module('revapm.Portal.Usage')
    .controller('UsageWebController', UsageWebController);

  /*@ngInject*/
  function UsageWebController($scope, User, DTOptionsBuilder, DTColumnDefBuilder, AlertService, Stats, Util) {

    $scope._loading = true;
    $scope.accounts = [];
    $scope.selected = { val: null };
    $scope.month_year = new Date();
    $scope.month_year_symbol = $scope.month_year.toISOString().slice( 0, 7 );
    $scope.report = null;
    var pageLength = 10;

    $scope.accountsDtOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(pageLength)
      .withBootstrap()
      .withDOM('<<"pull-left"pl>f<t>i<"pull-left"p>>')
      .withOption('order', [[1, 'desc']]);

    $scope.colDefs = [{
      targets: [1],
      type: 'num-fmt'
    }, {
      targets: [6,7],
      type: 'num'
    }, {
      targets: [2,3,4,5],
      orderable: false
    }];

    //  ---------------------------------
    $scope.onAccountSelect = function ( acc ) {
      $scope.selected.val = acc;
      //  do not store 'All accounts'
      if ( acc.acc_id !== '' ) {
        User.selectAccount( acc );
      }
      // console.log( 'onAccountSelect', acc );
    };

    $scope.onAccountClick = function ( acc_id ) {
      var acc = $scope.accounts.find( function( a ) {
        return a.acc_id === acc_id;
      });
      $scope.selected.val = acc;
      //  do not store 'All account'
      if ( acc.acc_id !== '' ) {
        User.selectAccount( acc );
      }
      $scope.onUpdate();
      // console.log( 'onAccountClick', acc_id );
    };

    $scope.onTimeSet = function( newDate ) {
      newDate = new Date( newDate + 86400000 ); //  add one day to avoid glitches with timezones
      $scope.month_year = newDate;
      $scope.month_year_symbol = newDate.toISOString().slice( 0, 7 );
    };

    $scope.showTraffic = function() {
      return !$scope._loading && $scope.report && $scope.report.traffic.count !== '0';
    };
    $scope.showDomainsUsage = function() {
      return $scope.report && $scope.report.domains_usage;
    };
    $scope.showAccounts = function() {
      return $scope.report && $scope.report.accounts;
    };

    //  ---------------------------------
    var subFormat_ = function( data ) {
      if ( data.count !== undefined ) {
        data.count = Util.formatNumber( data.count );
        data.received_bytes = Util.humanFileSizeInGB( data.received_bytes, 3 );
        data.sent_bytes = Util.humanFileSizeInGB( data.sent_bytes, 3 );
      }
      if ( data.billable_received_bps !== undefined ) {
        data.billable_received_bps = Util.convertTrafficMbps( data.billable_received_bps, 3 );
        data.billable_sent_bps = Util.convertTrafficMbps( data.billable_sent_bps, 3 );
      }
      if ( data.cache_hits !== undefined ) {
        data.cache_hits.MISS = Util.formatNumber( data.cache_hits.MISS );
        data.cache_hits.HIT = Util.formatNumber( data.cache_hits.HIT );
        for ( var port in data.port_hits ) {
          data.port_hits[port] = Util.formatNumber( data.port_hits[port] );
        }
      }
    };

    var format_ = function( data ) {
      subFormat_( data );
      for ( var zone in data.traffic_per_billing_zone ) {
        subFormat_( data.traffic_per_billing_zone[zone] );
      }

      for ( var d in data.domains_usage ) {
        var dmn = data.domains_usage[d];
        subFormat_( dmn );
        for ( var t in dmn.traffic_per_billing_zone ) {
          subFormat_( dmn.traffic_per_billing_zone[t] );
        }
      }

      if ( data.traffic ) {
        subFormat_( data.traffic );
      }

      if ( data.accounts ) {
        for ( var i = 0, len = data.accounts.length; i < len; ++i ) {
          subFormat_( data.accounts[i] );
        }
      }

      if ( data.domains_usage !== undefined &&
           data.domains.list ) {
        data.domains.list.forEach( function( domain ) {
          if ( !data.domains_usage[domain] ) {
            data.domains_usage[domain] = {
              count: '0',
              received_bytes: '0 GB',
              sent_bytes: '0 GB',
              billable_received_bps: '0 Mbps',
              billable_sent_bps: '0 Mbps'
            };
          }
        });
      }
    };

    $scope.onUpdate = function () {

      if ( $scope.accounts.length === 0 || !$scope.selected.val ) {
        $scope._loading = false;
        return;
      }

      $scope._loading = true;
      var q = {
        from: moment($scope.month_year).utc().startOf( 'month' ).toISOString().slice( 0, 10 ),
        to: moment($scope.month_year).utc().endOf( 'month' ).toISOString().slice( 0, 10 )
      };
      //  not 'All Accounts'
      if ( $scope.selected.val.acc_id ) {
        q.account_id = $scope.selected.val.acc_id;
      }
      Stats.usage_web( q )
        .$promise
        .then( function( data ) {

          // console.log( data );

          var overall = data.data[data.data.length - 1/*overall summary*/];
          format_( overall );
          $scope.report = overall;
        })
        .catch( function(err) {
          $scope.toaster.error(err);
        })
        .finally( function() {
          $scope._loading = false;
          $scope.accountsDtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(pageLength)
            .withBootstrap()
            .withDOM('<<"pull-left"pl>f<t>i<"pull-left"p>>')
            .withOption('paging', ($scope.report.accounts.length > pageLength))
            .withOption('order', [[1, 'desc']]);
        });
    };

    //  ---------------------------------
    var sel_account = User.getSelectedAccount();
    if ( sel_account && sel_account.acc_id !== ''/*do not restore 'All accounts'*/ ) {
      // console.log( '(re)loaded', User.getSelectedAccount() );
      $scope.selected.val = sel_account;
    }

    User.getUserAccounts()
      .then(function ( accs ) {
        $scope.accounts = accs;
        if ( accs.length === 1 ) {
          $scope.selected.val = accs[0];
        }
        $scope.onUpdate();
      })
      .catch(function (err) {
        $scope.toaster.error(err);
        $scope._loading = false;
      });

  }
})();
