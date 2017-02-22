function generateNewId(array) {
  var id = 1;
  $(array).each(function(i,e){
    if(id < e.id) {
      id = e.id

    }
  });
  return id+1;
}
