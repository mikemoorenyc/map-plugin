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
        zoom: 14,
        center: {
          lat: 40.7680441,
          lng: -73.9845609
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
      //ADD intitial points
      $(this.categorie).each(function(i,e){
        $(e.points).each(function(index,point){
          setPoint(point,e.id,e.color);
        });
      });

      App.map.addListener('click', function(e) {

        if($('#overview-map-container').hasClass('adding')) {
          createPointEditor(e.latLng.lat(),e.latLng.lng(),new Date().getTime(), '', App.bus.categories[0].id, true);
        }
      });
      App.searchBox = new google.maps.places.SearchBox(document.getElementById('search-input'));
      App.map.addListener('bounds_changed', function() {
        App.searchBox.setBounds(App.map.getBounds());
      });
      App.searchBox.addListener('places_changed', function() {
        if(App.searchBox.getPlaces().length < 1) {
          return false;
        }
        var point = App.searchBox.getPlaces()[0];

        createPointEditor(point.geometry.location.lat(),point.geometry.location.lng(),new Date().getTime(), point.name, App.bus.categories[0].id, true);
        $('#search-input').val('').blur();

      });
    },
    methods: {
      addPoint: function(status) {
        App.bus.$emit('mapStatus',status);
      },
      enterStop: function(e) {

        if (e.keyCode == 13) {
    //  searchFetcher();
          e.preventDefault();
          return false;
        }
      }
    }
  });

}


var mapContainerTemplate = (`
  <div id="overview-map-container" :class="mapStatus">
    <div id="theMap"></div>
    <div class="controls" v-show="mapStatus !== 'editing'">
      <input @keydown="enterStop" type="text" :disabled="mapStatus" id="search-input" placeholder="Search for a place or address..." />
      <button v-if="!mapStatus" @click.prevent="addPoint('adding')">Add a point</button>
      <button v-if="mapStatus" @click.prevent="addPoint(null)">Cancel</button>
    </div>
  </div>
`);
