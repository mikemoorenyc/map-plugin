function pointListInt() {
  var template = (`
    <div id="point-list" :class="('map'+mapStatus)">

      <div v-for="cat in categories" v-if="cat.points.length" class="point-list" :key="cat.id">
        <h2>{{cat.title}}</h2>
        <ul>
          <li v-for="point in cat.points" :key="point.id">
            <div class="title">{{point.title}}</div>
            <div class="controls">

            </div>
          </li>
        </ul>
      </div>
    </div>
  `)


  App.pointList = new Vue({
    template: template,
    data: dObj,
    el:'#point-list-container'
  })


}
