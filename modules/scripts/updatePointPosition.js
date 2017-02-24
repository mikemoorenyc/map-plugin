function updatePointPosition(id,catid,lat,lng) {
  var categoryKey = dObj.categories.map(function(x){
    return x.id;
  }).indexOf(catid);
  var key = dObj.categories[categoryKey].points.map(function(x){
    return x.id;
  }).indexOf(id);
  dObj.categories[categoryKey].points[key].lat = lat;
  dObj.categories[categoryKey].points[key].lng = lng;
}
