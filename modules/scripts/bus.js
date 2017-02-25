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
      updateItem: function(catid,key, item) {

        if(catid=="editState") {
          this.editing = item;
          return false;
        }
        if(catid == "category") {
          this.$set(this.categories,key, item);
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
