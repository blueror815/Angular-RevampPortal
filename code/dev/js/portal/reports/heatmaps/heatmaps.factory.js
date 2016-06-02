(function () {
  'use strict';

  angular
    .module('revapm.Portal.Domains')
    .factory('HeatmapsDrawer', HeatmapsDrawer);

  /*@ngInject*/
  function HeatmapsDrawer() {

    /** *********************************
     * conf for the maps, common parts
     */
    function getConfig_() {

      return {
        credits: { enabled: false },
        chart: {
          style: {
            fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
            fontSize: '12px'
          },
        },
        title : {
          text : null
        },
        mapNavigation: {
          enabled: true,
          enableButtons: true,
          enableMouseWheelZoom: false,
          enableTouchZoom: false,
          buttonOptions: {
            align: 'left',
            verticalAlign: 'bottom'
          }
        },
        colorAxis: {
          minColor: '#99CCFF',
          maxColor: '#0050A1',
          type: 'logarithmic',
          tickPixelInterval: 100
        },
        tooltip: {
          useHTML: true,
          formatter: function () {
            // console.log( this.point );
            return '<span style="font-weight: bold; color: #004090;">' + this.point.name + '</span><br>' + this.point.tooltip;
          }
        },
        legend: {
          enabled: true,
          itemDistance: 60,
          symbolHeight: 6,
          symbolWidth: 400
        },
        series: [{
          name: '',
          borderColor: 'white',
          states: {
            hover: { color: '#A9DCFF' }
          },
          dataLabels: {
            enabled: false,
            formatter: function () {
              return this.point.labelrank && this.point.name && this.point.labelrank > 1000000 ? this.point.name : null;
            }
          },
          nullColor: '#B0B0B0'
        }]
      };
    }

    /** *********************************
     *  ctor
     *
     * @param {string} DOM node ID
     */
    function Drawer( containerID ) {
      this.reInit( containerID );
      this.currentMap = '';
      this.currentOpts = {};
      this.currentData = null;
    }

    /** *********************************
     *  re-init context
     *
     * @param {string} DOM node ID
     */
    Drawer.prototype.reInit = function ( containerID ) {
      if ( !containerID ) {
        throw new Error( 'Drawer: containerID should be provided' );
      }
      this.destroy();
      this.$el = $( containerID );
      this.$el.css({ width: '100%', 'padding-bottom': '55%' });
      this.$wrapper = $( '<div></div>' );
      this.$el.append( this.$wrapper );
      this.$wrapper.css({ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 });
      this.$btn = $( '<button style="position:absolute;top:0px;left:0px;" class="btn">Show USA Map</button>' );
      this.$el.append( this.$btn );
      this.$btn.on( 'click', function() {
        if ( this.currentMap === 'world' ) {
          this.drawUSAMap( this.currentData, this.currentOpts );
        } else {
          this.drawWorldMap( this.currentData, this.currentOpts );
        }
      }.bind( this ) );
    };

    /** *********************************
     *
     *
     */
    Drawer.prototype.destroy = function () {
      if ( !this.$el ) {
        return;
      }
      this.$wrapper.highcharts().destroy();
      this.$wrapper.remove();
      this.$btn.off();
      this.$btn.remove();
      this.$btn = null;
      this.$wrapper = null;
      this.$el = null;
    };

    /** *********************************
     * Draw World map
     *
     * @param {object} data:
        world: [{
            name: 'United States of America',
            id: 'US',
            value: 42,
            tooltip: 'something: <strong>666</strong> ms'
          },{
            name: 'China', ............
          }],
        usa: [{
            name: 'AL',
            id: 'AL',
            value: 12,
            tooltip: 'something: <strong>12</strong> ms'
          },{
            name: 'MI', ............
          }]
     * @param {object} options to override maps config
     */
    Drawer.prototype.drawWorldMap = function ( data, opts ) {

      this.currentData = data;
      this.currentOpts = opts;
      var conf = getConfig_();

      conf.colorAxis.max = data.world.reduce( function( prev, curr ) {
        return curr.value === undefined || curr.id === '--' || curr.value <= prev ? prev : curr.value;
      }, 0 );
      conf.colorAxis.min = data.world.reduce( function( prev, curr ) {
        return curr.value === undefined || curr.id === '--' || curr.value >= prev ? prev : curr.value;
      }, conf.colorAxis.max );

      if ( !data.world || !data.world.length || !conf.colorAxis.min ) {
        conf.colorAxis.type = 'linear';
      } else {
        conf.colorAxis.type = 'logarithmic';
      }

      conf.series[0].joinBy = ['iso-a2', 'id'];
      conf.series[0].data = data.world.map( function( item ) {
        return _.clone( item );
      });
      conf.series[0].mapData = Highcharts.maps['custom/world-highres'];
      this.$wrapper.highcharts( 'Map', _.defaultsDeep( {}, ( opts || {} ), conf ) );
      this.currentMap = 'world';
      this.$btn.html( 'Show USA Map' );
    };

    /** *********************************
     * Draw US map
     *
     * @param {object} data - see above drawWorldMap description
     * @param {object} options to override maps config
     */
    Drawer.prototype.drawUSAMap = function ( data, opts ) {

      this.currentData = data;
      this.currentOpts = opts;
      var conf = getConfig_();

      conf.colorAxis.max = data.usa.reduce( function( prev, curr ) {
        return curr.value === undefined || curr.id === '--' || curr.value <= prev ? prev : curr.value;
      }, 0 );
      conf.colorAxis.min = data.usa.reduce( function( prev, curr ) {
        return curr.value === undefined || curr.id === '--' || curr.value >= prev ? prev : curr.value;
      }, conf.colorAxis.max );

      conf.colorAxis.type = 'linear';
      conf.series[0].joinBy = ['postal-code', 'id'];
      conf.series[0].data = data.usa.map( function( item ) {
        return _.clone( item );
      });
      conf.series[0].mapData = Highcharts.maps['countries/us/us-all'];
      this.$wrapper.highcharts( 'Map', _.defaultsDeep( {}, ( opts || {} ), conf ) );
      this.currentMap = 'usa';
      this.$btn.html( 'Show World Map' );
    };

    /** *********************************
     * (re)Draw current map with the new data, world for the first call
     *
     * @params  - see above drawWorldMap/drawUSAMap descriptions
     */
    Drawer.prototype.drawCurrentMap = function ( data, opts ) {

      if ( this.currentMap === 'usa' ) {
        this.drawUSAMap( data, opts );
      } else {
        this.drawWorldMap( data, opts );
      }
    };

    //  ---------------------------------
    return {
      create: function( containerID ) {
        return new Drawer( containerID );
      }
    };

  }

})();
