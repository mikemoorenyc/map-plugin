function toggleMarkers(toggle) {

  $(App.markers).each(function(i,e){

    App.markers[i].setClickable(toggle);
    App.markers[i].setDraggable(toggle);
  });
}
