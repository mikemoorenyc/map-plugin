function mapInit() {
  App.mapVue = new Vue({
    el: '#map-vue',
    data: dObj,
    template: mapContainerTemplate,
    mounted: function() {
      var myStyles =[
          {
              featureType: "poi",
              elementType: "labels",
              stylers: [
                    { visibility: "off" }
              ]
          }
      ];
      App.map = new google.maps.Map(document.getElementById('theMap'),
      {
        zoom: dObj.mapInfo.zoom,
        center: {
          lat: dObj.mapInfo.lat,
          lng: dObj.mapInfo.lng
        },
        disableDefaultUI: true,
        zoomControl: true,
        styles: myStyles
      });
      App.ib = new google.maps.InfoWindow({
          content: '<div id="point-editor"></div>',
      });

      App.map.addListener('click', function(e) {
        if($('#overview-map-container').hasClass('adding')) {
          addAPoint(e.latLng);
        }
      });
    }
  });

}


var mapContainerTemplate = (`
  <div id="overview-map-container" :class="mapStatus">
    <div id="theMap"></div>
    <div class="controls">
      <button v-if="!mapStatus" @click.prevent="mapStatus = 'adding'">Add a point</button>
      <button v-if="mapStatus" @click.prevent="mapStatus = null">Cancel</button>
    </div>
  </div>
`);
