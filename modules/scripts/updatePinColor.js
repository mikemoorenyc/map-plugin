function findCat(catid) {
var theCat = App.bus.categories.filter(function(e){
  return e.id === catid;
})[0];
return theCat;
/*
  $(App.markers).each(function(i,marker){
    var category = dObj.categories.filter(function(e){
      return marker.catid == e.id;
    })[0];
    App.markers[i].setIcon('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|'+(category.color.replace('#','')));

  });*/
}
