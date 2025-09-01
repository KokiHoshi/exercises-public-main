## 修正前のテストログ
npm test ch09/ex07
x13> npm test ch09/ex07                                                                                 
> preset-js@1.0.0 test
> node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand ch09/ex07

(node:37472) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 FAIL  ch09/ex07/index.test.js
  InstrumentedLinkedList                                                                                
    √ #push (2 ms)                                                                                      
    × #pushAll (1 ms)                                                                                   
                                                                                                        
  ● InstrumentedLinkedList › #pushAll                                                                   
                                                                                                        
    expect(received).toBe(expected) // Object.is equality

    Expected: 2
    Received: 4

      10 |     const list = new InstrumentedLinkedList();
      11 |     list.pushAll("A", "B");
    > 12 |     expect(list.pushCount).toBe(2);
         |                            ^
      13 |   });
      14 | });
      15 |

      at Object.toBe (ch09/ex07/index.test.js:12:28)

Test Suites: 1 failed, 1 total                                                                          
Tests:       1 failed, 1 passed, 2 total                                                                
Snapshots:   0 total
Time:        0.35 s
Ran all test suites matching /ch09\\ex07/i.
