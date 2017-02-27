function pointListInt() {
  var template = (`
    <div id="point-list" :class="('map'+mapStatus)">

      <div v-for="cat in categories" v-if="cat.points.length" class="point-list" :key="cat.id">
        <h2 :style="{color:cat.color}">{{cat.title}}</h2>
        <ul>
          <li v-for="(point,index) in cat.points" :key="point.id">
            <div class="title">{{point.title}}</div>
            <div class="controls">
              <a href="#" @click.prevent="editClick(cat.id, point.id)">Edit</a>
              <a href="#" @click.prevent="deleteClick({id:point.id, category:cat.id})">Delete</a>
              <a href="#" @click.prevent="moveClick('up',point.id,cat.id)" v-if="index>0">Move Up</a>
              <a href="#" @click.prevent="moveClick('down',point.id,cat.id)" v-if="index< cat.points.length - 1">Move Down</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `)


  App.pointList = new Vue({
    template: template,
    data: dObj,
    el:'#point-list-container',
    created:function() {
      App.bus.$on('updateData', function(data){
        this.data = data;
      }.bind(this));
    },
    methods: {
      moveClick: function(dir,id,catid){
        var catKey = findKey(App.bus.categories,catid);
        App.bus.$emit('moveItem',catKey,id,dir);
        $("#point-list .controls a").blur();
      },
      deleteClick(point) {
    
        App.bus.$emit('deletePoint', point);
      },
      editClick: function(category,id) {

        $('html,body').scrollTop(0);
        var catKey = findKey(App.bus.categories, category);
        var pointKey = findKey(App.bus.categories[catKey].points, id);
        var point = App.bus.categories[catKey].points[pointKey];

        createPointEditor(point.lat,point.lng,point.id, point.title, point.category, false);
        $("#point-list .controls a").blur();
      }
    }
  })


}
