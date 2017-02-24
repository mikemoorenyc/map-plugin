


var catTemp = (`
<div id="category-container" :class="('map'+mapStatus)">
<ul id="category-list">
  <li v-for="(category,index) in categories" :data-index="index" :data-id="category.id" :key="category.id" >
    <div class="form" v-if="category.id === editing.id && editing.set === 'category'" :data-new="category.new">
      <label>Title</label>
      <input type="text" :value="category.title" />
      <br/>
      <label>Color</label>
      <input type="color" :value="category.color" />
      <br/>
      <button :data-id="category.id" @click.prevent="cancelItem">Cancel</button>
      <button :data-id="category.id" @click.prevent="updateItem">Save</button>
    </div>
    <div v-else class='regular' v-bind:class="{disabled: editing}" :style="{borderColor:category.color}">
      {{category.title}}
      <a v-if="!editing" href="#" :data-id="category.id" class="del" @click.prevent="deleteItem(category.id)">Delete</a>
      <a v-if="!editing" href="#" :data-id="category.id" class="edit" @click.prevent="editItem">Edit</a>
      <br/>
      <a @click.prevent="moveItem" v-if="index !== 0 && !editing" href="#" :data-id="category.id" data-dir="up">Move Up</a>
      <a @click.prevent="moveItem" v-if="index !== (categories.length - 1) && !editing" :data-id="category.id" href="#" data-dir="down">Move Down</a>
    </div>

  </li>

</ul>
<div class="footer" v-if="!editing">
<button @click.prevent="addButton" class="button button-primary">Add Category</button>

</div>


</div>
`)



var catApp = new Vue({
  data: dObj,
  template: catTemp,
  updated: function() {
    updatePinColor();
  },
  methods: {
    cancelItem: function(e) {
      var p = $(e.target).closest('.form');

      if($(p).data('new')) {
        this.deleteItem(parseInt($(p).closest('li').data('id')));
          return false;
      }
      this.editing = false;

    },
    editItem: function(e) {
      var id = parseInt($(e.target).data('id'));
      this.editing = {
        id: id,
        set: 'category'
      }
    },
    updateItem: function(e) {
      var p = $(e.target).closest('.form');
      var title = $(p).find('input[type="text"]').val();
      var color = $(p).find('input[type="color"]').val();
      if(!title) {
        alert('You need to have a title');
        return false;
      }
      var key = this.categories.map(function(x){
        return x.id;
      }).indexOf(parseInt($(e.target).data('id')));
      var newItem = this.categories[key];
      newItem.title = title;
      newItem.color = color;
      newItem.new = false;
      this.$set(this.categories,key, newItem);

      this.editing = false;
    },
    moveItem: function(e) {
      var dupArray = this.categories.slice();
      var current = this.categories.map(function(x){
        return x.id;
      }).indexOf(parseInt($(e.target).data('id')));
      var toMove = current+1;
      if($(e.target).data('dir') == 'up') {
        toMove = current - 1;
      }
      dupArray.move(current,toMove);
      this.categories = dupArray;
      $(e.target).blur();
    },
    deleteItem: function(id) {

      if(this.categories.length < 2) {
        alert('You need at least one category.');
        return false;
      }
      var key = this.categories.map(function(x){
        return x.id;
      }).indexOf(id);
      if(this.categories[key].points.length) {
        alert('This category has point associated with it.')
        return false;
      }

      this.categories = this.categories.filter(function(e){
        return e.id !== id;
      });
      this.editing = false;
    },

    addButton: function(e) {
      var newId = new Date().getTime();
      var newItem = {
        id: newId,
        title: '',
        color: randomColor(),
        points: [],
        new: true
      }
      this.categories.push(newItem);
      this.editing = {
        id:newId,
        set: 'category'
      }
    }
  }
});



$(document).ready(function(){
catApp.$mount('#map-categories');

  var globalholder = new Vue({
    el: '#global-point-container',
    data: dObj,
    template: `<div>
                  <div>{{JSON.stringify(this.$data)}}</div>
                  <input name="globalObject" type="hidden" :value="JSON.stringify(this.$data)" />
                </div>`
  });

  mapInit();
  pointListInt();

})
