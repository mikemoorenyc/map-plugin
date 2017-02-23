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
  }
}
