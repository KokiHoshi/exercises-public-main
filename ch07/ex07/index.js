export function quickSort(array, compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {
    if (array.length <= 1) return array;
  
    const [pivot, ...rest] = array;
  
    const left = rest.filter(el => compare(el, pivot) < 0);
    const right = rest.filter(el => compare(el, pivot) >= 0);
  
    return [...quickSort(left, compare), pivot, ...quickSort(right, compare)];
  }
  
  