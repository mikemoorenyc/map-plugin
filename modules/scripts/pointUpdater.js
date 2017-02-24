function pointUpdater(point) {
  var item = {
    id: point.id,
    title: point.title,
    category: point.category,
    lat: point.lat,
    lng: point.lng
  }

  var categoryKey =  dObj.categories.map(function(x){
    return x.id;
  }).indexOf(point.category);

  if(point.newStatus) {
    dObj.categories[categoryKey].points.push(item)
    return false;
  }

  var key = dObj.categories[categoryKey].points.map(function(x){
    return x.id;
  }).indexOf(point.id);
  dObj.categories[categoryKey].points[key].lat = item.lat;
  dObj.categories[categoryKey].points[key].lng = item.lng;
  dObj.categories[categoryKey].points[key].title = item.title;
  dObj.categories[categoryKey].points[key].category = item.category;
}
