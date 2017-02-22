function addAPoint(point) {
  
  App.newMarker = new google.maps.Marker({
    position: point,
    map: App.map,
  });
  createPointEditor(App.newMarker,new Date().getTime(), '', dObj.categories[0].id, true);
}
