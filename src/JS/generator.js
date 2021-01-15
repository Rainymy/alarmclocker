export default function generateNewId(idLength) {
  idLength = idLength || 12;
  
  function generator() {
    return Math.random().toString(36).substring(2);
  }
  
  let newId = generator();
  
  if (idLength > newId.length) {
    if (Math.floor(idLength - newId.length) === 0) {
      newId += generator();
    }
    else {
      for (let i = 0; i < Math.floor(idLength / newId.length); i++) {
        newId += generator();
      };
    }
  }
  
  return newId.substring(0, idLength);
} 