function pointFormInit(lat,lng,id, title, category, newStatus){
  App.pointEditor = new Vue({
    data: {
      catList: App.bus.categories,
      id: id,
      lat:lat,
      lng:lng,
      title:title,
      newStatus:newStatus,
      category: category
    },
    el:"#point-editor",
    mounted: function(){
      $('#point-editor').parent().parent().parent().next().remove();
      this.updatePinColor();
    },
    template: pointFormTemplate,
    methods: {
      deleteClick: function() {
        App.bus.$emit('deletePoint', {id:id,category:category});
        this.cancelClick('delete');
      },
      cancelClick: function(update) {
        App.newMarker.setMap(null);
        App.newMarker = null;
        if(!newStatus && update !== 'delete') {
          App.markers[findKey(App.markers,id)].setMap(App.map);
        }
        google.maps.event.clearListeners(App.ib, 'domready');
        this.$destroy();
        App.bus.$emit('mapStatus',null);
        toggleMarkers(true);

      },
      saveClick: function() {
        if(!this.title.length) {
          alert('Your point needs a title');
          return false;
        }
        if(newStatus) {
          App.bus.$emit('addPoint', {
            id: this.id,
            category: this.category,
            title: this.title,
            lat: this.lat,
            lng: this.lng,
          });
          this.cancelClick();

        } else {
          if(category === this.category) {
            App.bus.$emit('updatePoint', {
              id:this.id,
              category: this.category,
              title: this.title,
              lat: lat,
              lng: lng
            });
            this.cancelClick(true);
          } else {
            App.bus.$emit('deletePoint', {id:id,category:category});
            App.bus.$emit('addPoint', {
              id: this.id,
              category: this.category,
              title: this.title,
              lat: this.lat,
              lng: this.lng,
            });

            this.cancelClick('update');
          }
        }


      },
      updatePinColor: function() {

        var color = findCat(this.category).color.replace('#','');

        App.newMarker.setIcon('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|'+color);
      }
    }
  })
}
var pointFormTemplate = (`
  <div id="point-editor" class="pointeditor" style="width:300px;">
    <label>Title </label><br/>
    <input type="text" value="" v-model="title" /><br/>
    <label>Category </label><br/>
    <select @change.prevent="updatePinColor" v-model="category">
      <option v-for="c in catList" :value="c.id" >{{c.title}}</option>
    </select>
    <div class="controls">
    <button @click.prevent="cancelClick">Cancel</button>
    <button @click.prevent="saveClick" :disabled="!title.length">Save</button>
    <a v-if="!newStatus" href="#" @click.prevent="deleteClick">Delete</a>
    </div>



  </div>
`);
