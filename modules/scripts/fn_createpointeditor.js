function createPointEditor(point,id, title, category, newStatus) {
  App.map.setCenter(point.position);
  App.ib.open(App.map, point);
  App.pointerEditor = new Vue({
    data: {
      lat:point.lat,
      lng:point.lng,
      title: title,
      category: category,
      allCats : dObj.categories,
      id: id,
      newStatus: newStatus
    },
    template: pointEditorTemplate
  });
  App.ib.addListener('domready', function() {
    App.pointerEditor.$mount("#point-editor");
  });
}
var pointEditorTemplate = (`
  <div class="pointeditor">
    <label>Title</label>
    <input type="text" value="" v-model="title" />
    <label>Category</label>
    <select v-model="category">
      <option v-for="c in allCats" :value="c.id" >{{c.title}}</option>
    </select>
    <div class="controls">
    <button>Cancel</button>
    <button>Save</button>
    </div>

  </div>

`);
