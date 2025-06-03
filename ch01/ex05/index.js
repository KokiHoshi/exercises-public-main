export function abs(x) {
    if(x >= 0){
        return x;
    }
    else{
        return -x;
    }
  }

export function sum(array) {
    let sum = 0;
    for (let x of array){
        sum += x;
    }
    return sum;
}

export function factorial(n){
    let product =1;
    if (n < 0) {
        throw new Error("Negative");
    }
    while (n > 1){
        product *= n;
        n--;
    }
    return product;
}