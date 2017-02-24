function setPoints() {
  App.markers = [];
  $(dObj.categories).each(function(i,e){
    $(e.points).each(function(index,p){

      dropMarker(p,e.id,e.color);
    });

  });

  function dropMarker(point,catid,catColor) {

    var marker = new google.maps.Marker({
          position: {
            lat:point.lat,
            lng:point.lng
          },
          map: App.map,
          id: point.id,
          catid: catid,
          title: point.title,
          icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|'+(catColor.replace('#','')),
          draggable: true
    });


    App.markers.push(marker)
    App.markers[App.markers.length - 1].addListener('dragend', function(e) {

      updatePointPosition(this.id,this.catid,e.latLng.lat(),e.latLng.lng());
    })
  }
}