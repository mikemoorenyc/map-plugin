function addItem(array,itemTemplate) {
  var newArray = array;
  var newItem = itemTemplate;
  newItem.id = generateNewId(array);
  newItem.editing.id = newItem.id;
  return newArray.push(newItem);
}
