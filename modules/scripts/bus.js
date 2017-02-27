function createBus() {
  App.bus = new Vue({
    el: '#global-point-container',
    template: `<div>
                  <div>{{JSON.stringify(this.$data)}}</div>
                  <input name="globalObject" type="hidden" :value="JSON.stringify(this.$data)" />
                </div>`,
    data: dObj,
    created: function() {
      this.$on('addItem',function(id){
        App.bus.createItem(id);
      });
      this.$on('deleteItem', function(catid,id){
        App.bus.deleteItem(catid,id);
      });
      this.$on('updateItem',function(catid,key,item){
        App.bus.updateItem(catid,key,item);
      });
      this.$on('moveItem',function(catid,id,dir){
        this.moveItem(catid,id,dir)
      });
      this.$on('mapStatus',function(stat){
        this.mapStatus = stat;
        this.$emit('updateData',this.data);
      }.bind(this));
      this.$on('addPoint',function(point){
        this.createPoint(point);
      });
      this.$on('updatePoint',function(point){
        this.updatePoint(point);
      });
      this.$on('deletePoint',function(point){
        this.deletePoint(point);
      });

    },
    methods: {
      deleteItem: function(catid,id) {
        if(catid = 'category') {
          this.categories = this.categories.filter(function(e){
            return e.id !== id;
          });
        }
        this.editing = false;
        this.$emit('updateData',this.data);
      },
      updatePoint: function(point) {
        var catKey = findKey(this.categories,point.category);
        var pointKey = findKey(this.categories[catKey].points, point.id);
        this.$set(this.categories[catKey].points, pointKey, point);
        this.$emit('updateData',this.data);
        App.markers[pointKey].title = point.title;
      },
      updateItem: function(catid,key, item) {

        if(catid=="editState") {
          this.editing = item;
          return false;
        }
        if(catid == "category") {
          this.$set(this.categories,key, item);
          $(App.markers).each(function(i,e){
            if(e.category === item.id) {
              App.markers[i].setIcon('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|'+(item.color.replace('#','')));
            }
          });
        }
        this.editing = false;

        this.$emit('updateData',this.data);
      },
      createItem: function(id) {
        var newItem = {
          id: new Date().getTime(),
          new: true,
          title: ''
        }
        if(id = 'category') {
          newItem.color = randomColor(),
          newItem.points = [];
          this.categories.push(newItem);
        }
        this.editing = {
          id:newItem.id,
          set: id
        }
        this.$emit('updateData',this.data);
      },
      createPoint: function(point) {
        var catKey = findKey(this.categories,point.category);


        this.categories[catKey].points.push(point);
        this.mapStatus = null;
        this.$emit('updateData',this.data);
        setPoint(point,this.categories[catKey].id,this.categories[catKey].color);
      },
      deletePoint: function(point) {
        var catKey = findKey(this.categories, point.category);
        var markerKey = findKey(App.markers, point.id);
        this.categories[catKey].points = this.categories[catKey].points.filter(function(e){
          return e.id !== point.id;
        });
        this.$emit('updateData',this.data);
        App.markers[markerKey].setMap(null);
        App.markers = App.markers.filter(function(e){
          return e.id !== point.id;
        });

      },
      moveItem: function(catid,id,dir) {


        if(catid === 'categories') {
          var dupArray = this.categories.slice();
        } else {
          var dupArray = this.categories[catid].points.slice();
        }
        var current = dupArray.map(function(x){
          return x.id;
        }).indexOf(id);
        var toMove = current+1;
        if(dir === 'up') {
          toMove = current - 1;
        }
        dupArray.move(current,toMove);
        if(catid === 'categories') {
          this.categories = dupArray;
        } else {
          this.categories[catid].points = dupArray;
        }
        this.editing = false;
        this.$emit('updateData',this.data);

      }
    }
  });
}
