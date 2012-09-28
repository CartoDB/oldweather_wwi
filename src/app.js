var OldWeatherMap = Class.extend({
  initMap: function() {

    // initialise the google map
    this.map = new google.maps.Map(document.getElementById('oldWeatherMap'), {
      center: new google.maps.LatLng( 30.95940879245423, -0.609375),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      mapTypeControl: false,
      minZoom: 1
    });

    var map_style = {};
    map_style.google_maps_customization_style = [{
      stylers: [{ invert_lightness: true },
        { weight: 1 },
        { saturation: -100 },
        { lightness: -40 }
        ]},{
          elementType: "labels",
          stylers: [
            { visibility: "simplified" }
          ]
        }
    ];

    this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    this.map.setOptions({
      scrollwheel: false,
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      styles: map_style.google_maps_customization_style
    });

    this.livemap = {
      user       : 'viz2',
      table      : 'ow',
      column     : 'date',
      steps      : 750,
      resolution : 2,
      cumulative : false,
      clock      : true,
      fps        : 24,
      fitbounds  : false,
      blendmode  : 'lighter',
      trails     : true,
      point_type : 'circle',
      cellsize   : 1,
      autoplay   : false
    };

    this.heatmap = {
      user       : 'viz2',
      table      : 'ow',
      column     : 'date',
      steps      : 750,
      resolution : 2,
      cumulative : true,
      clock      : true,
      fps        : 24,
      fitbounds  : false,
      blendmode  : 'source-over',
      trails     : false,
      point_type : 'square',
      cellsize   : 1
    };
  },

  initTorque: function() {
    // configure Torque - default is livemap
    var self = this;
    this.torque = null;
    Torque(function(env) {
      Torque.app = new env.app.Instance();
      self.torque = new Torque.app.addLayer(self.map, self.livemap);
      Torque.env = env;
    });

  },

  bindButtons: function() {
    var self = this;
    // play / pause
    $('.playButton, .pauseButtonLayer').click(function(){
      self.torque.pause();
      if(!$('.map').is('.playing')) {
        // $('.pauseButtonLayer').fadeIn();
        $('.buttonLayer').fadeOut();
        $('.subsContent').fadeIn();
      } else {
        $('.pauseButtonLayer').fadeOut();
        $('.buttonLayer').fadeIn();
        $('.subsContent').fadeOut();
      }

      $('.map').toggleClass('playing');

      return false;
    });

    // heatmap type
    $('#heatmap').click(function(){
      self.heatmap.autoplay = true;
      self.torque.setOptions(self.heatmap);

      $('.lowerButtonLayer a').removeClass('selected');
      $('.lowerButtonLayer a#heatmap').addClass('selected');

      return false;
    });

    // live type
    $('#live').click(function(){
      self.livemap.autoplay = true;
      self.torque.setOptions(self.livemap);

      $('.lowerButtonLayer a').removeClass('selected');
      $('.lowerButtonLayer a#live').addClass('selected');


      return false;
    })
  },

  init: function() {
    this.initMap();
    this.initTorque();
    this.bindButtons();
    setTimeout(function() {
      $('.torque_time').html('<span id="ow_month">Feb</span><span id="ow_year">1913</span>');
      $('.torque_time span').hide().fadeIn('slow');
    },3000);

  }
});

window.map = new OldWeatherMap();

$(document).ready(function() {

});
