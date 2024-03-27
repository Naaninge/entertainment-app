function getItemsFromStorage(name) {
  const items = JSON.parse(localStorage.getItem(name));
  if (items) {
    return items;
  } else {
    return [];
  }
}

function setItemsToStorage(name, list) {
  try {
    localStorage.setItem(name, JSON.stringify(list));
  
  } catch (error) {
     console.log(error)
  }
  
}


export {
    getItemsFromStorage,
    setItemsToStorage,
}