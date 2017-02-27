function findKey(array, id) {
  return array.map(function(x){
    return x.id;
  }).indexOf(id);
}
