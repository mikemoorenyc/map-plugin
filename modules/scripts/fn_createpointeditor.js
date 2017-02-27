function createPointEditor(lat,lng,id, title, category, newStatus) {
  toggleMarkers(false);
  App.bus.$emit('mapStatus','editing');
  if(!newStatus) {
    var markerKey = findKey(App.markers, id);
    App.markers[markerKey].setMap(null);
  }
  App.newMarker = new google.maps.Marker({
    position: {lat:lat,lng:lng},
    map: App.map,
    icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569',
    zIndex: 999
  });
  App.map.setCenter({lat:lat,lng:lng});
  App.ib.addListener('domready', function() {
    pointFormInit(lat,lng,id, title, category, newStatus);
  });
  App.ib.open(App.map, App.newMarker);

  //REMOVE markers
  /*
  $(App.markers).each(function(i,e){
    google.maps.event.clearInstanceListeners(e);
    e.setMap(null);
  });
  App.markers = [];
  dObj.mapStatus = 'editing';

  App.newMarker = new google.maps.Marker({
    position: {lat:lat,lng:lng},
    map: App.map,
    icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569'
  });
  App.map.setCenter({lat:lat,lng:lng});
//  App.ib.open(App.map, App.newMaker);
  App.pointerEditor = new Vue({
    data: {
      lat:lat,
      lng:lng,
      title: title,
      category: category,
      allCats : dObj.categories,
      id: id,
      newStatus: newStatus
    },
    template: pointEditorTemplate,
    mounted: function() {
      $('#point-editor').parent().parent().parent().next().remove();
    },
    methods: {
      cancelClick: function() {
        google.maps.event.clearListeners(App.ib, 'domready');
        App.pointerEditor.$destroy();
        App.ib.close();
        App.newMarker.setMap(null);
        App.newMarker = null;
        dObj.mapStatus = false;
        setPoints();
      },
      saveClick: function() {
        if(!this.title) {
          alert('You need a title for this map point.');
          return false;
        }
        pointUpdater({
          lat: this.lat,
          lng: this.lng,
          id: this.id,
          category: this.category,
          title: this.title,
          newStatus: this.newStatus
        });
        this.cancelClick();
      }
    }
  });
  App.ib.addListener('domready', function() {
    App.pointerEditor.$mount("#point-editor");
  });

  App.ib.open(App.map, App.newMarker);
}
var pointEditorTemplate = (`
  <div id="point-editor" class="pointeditor" style="width:300px;">
    <label>Title </label>
    <input type="text" value="" v-model="title" />
    <label>Category </label>
    <select v-model="category">
      <option v-for="c in allCats" :value="c.id" >{{c.title}}</option>
    </select>
    <div class="controls">
    <button @click.prevent="cancelClick">Cancel</button>
    <button @click.prevent="saveClick">Save</button>
    </div>

    <div class="close-cover"

  </div>

`);*/
}
