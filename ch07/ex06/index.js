const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// mathの点数が高い順、同点の場合はchemistryが高い順、さらに同点の場合はgeographyが高い順にソート
const sorted = [...data].sort((a, b) => {
  if (b.math !== a.math) {
    return b.math - a.math;
  }
  if (b.chemistry !== a.chemistry) {
    return b.chemistry - a.chemistry;
  }
  return b.geography - a.geography;
});

// 出力確認
console.log("【math → chemistry → geography の降順】");
sorted.forEach((s) => {
  console.log(
    `${s.name} (math: ${s.math}, chemistry: ${s.chemistry}, geography: ${s.geography})`
  );
});
