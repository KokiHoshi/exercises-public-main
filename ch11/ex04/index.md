## 予想

型付き配列は要素の型が固定されているため、JavaScript が型の推論を行う必要がない。そのため通常の配列よりも処理が効率的になり、型付き配列の方が大幅に高速になると考えられる。

## 結果

### [100, 200, 300]

node index.js
PS C:\Users\r00528332\AndroidStudioProjects\exercises-public-main\exercises\exercises-public-main\ch11\ex04> node index.js  
arrayMultiply: 581.9733999999999
typedArrayMultiply: 714.3118999999999

### [200, 300, 400]

node index.js
PS C:\Users\r00528332\AndroidStudioProjects\exercises-public-main\exercises\exercises-public-main\ch11\ex04> node index.js
arrayMultiply: 2982.7869
typedArrayMultiply: 3573.732899999999

### [300, 400, 500]

node index.js
PS C:\Users\r00528332\AndroidStudioProjects\exercises-public-main\exercises\exercises-public-main\ch11\ex04> node index.js
arrayMultiply: 7422.6273
typedArrayMultiply: 8571.530299999999
