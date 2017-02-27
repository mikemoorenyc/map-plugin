function setPoint(point,catid,catColor) {
  /*
  $(App.markers).each(function(i,e){
    google.maps.event.clearInstanceListeners(e);
    e.setMap(null);
  });
  App.markers = [];
  $(App.bus.categories).each(function(i,e){
    $(e.points).each(function(index,p){

      dropMarker(p,e.id,e.color);
    });

  });
  */


    var marker = new google.maps.Marker({
          position: {
            lat:point.lat,
            lng:point.lng
          },
          map: App.map,
          id: point.id,
          category: catid,
          title: point.title,
          icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|'+(catColor.replace('#','')),
          draggable: true
    });


    App.markers.push(marker);

    App.markers[App.markers.length - 1].addListener('dragend', function(e) {
      App.bus.$emit('updatePoint', {
        id:this.id,
        category: this.category,
        title: this.title,
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });

    })

    App.markers[App.markers.length - 1].addListener('click',function(e){

    createPointEditor(this.position.lat(),this.position.lng(),this.id, this.title, this.category, false);
    });


}
