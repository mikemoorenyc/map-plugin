function mapInit() {
  App.mapVue = new Vue({
    el: '#map-vue',
    data: dObj,
    template: mapContainerTemplate,
    created: function() {
      App.bus.$on('updateData', function(data){
        this.data = data;
      }.bind(this));
    },
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
        styles: myStyles,
        clickableIcons: false
      });
      App.ib = new google.maps.InfoWindow({
          content: '<div id="point-editor" ></div>',
          maxWidth: 300
      });

      App.map.addListener('click', function(e) {
    
        if($('#overview-map-container').hasClass('adding')) {
          createPointEditor(e.latLng.lat(),e.latLng.lng(),new Date().getTime(), '', dObj.categories[0].id, true);
        }
      });
    }
  });

}


var mapContainerTemplate = (`
  <div id="overview-map-container" :class="mapStatus">
    <div id="theMap"></div>
    <div class="controls" v-if="mapStatus !== 'editing'">
      <button v-if="!mapStatus" @click.prevent="mapStatus = 'adding'">Add a point</button>
      <button v-if="mapStatus" @click.prevent="mapStatus = null">Cancel</button>
    </div>
  </div>
`);
