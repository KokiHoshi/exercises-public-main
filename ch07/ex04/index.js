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

// 1. mathの全員の合計点
const totalMath = data.reduce((sum, student) => sum + student.math, 0);

// 2. クラスAのchemistryの平均点
const classAChemistry = data
  .filter(student => student.class === "A")
  .map(student => student.chemistry);
const classAChemistryAvg = classAChemistry.reduce((a, b) => a + b, 0) / classAChemistry.length;

// 3. クラスC内の3科目合計点の平均
const classCTotalAvg = data
  .filter(student => student.class === "C")
  .map(student => student.math + student.chemistry + student.geography)
  .reduce((sum, total) => sum + total, 0) / 3; // クラスCは3人

// 4. 3科目合計点が最も高い人のname
const topStudentName = data
  .map(student => ({
    name: student.name,
    total: student.math + student.chemistry + student.geography
  }))
  .reduce((max, curr) => (curr.total > max.total ? curr : max)).name;

// 5. 全体のgeographyの標準偏差
const geos = data.map(s => s.geography);
const geoAvg = geos.reduce((a, b) => a + b, 0) / geos.length;
const geoVariance = geos.map(x => (x - geoAvg) ** 2).reduce((a, b) => a + b, 0) / geos.length;
const geoStdDev = Math.sqrt(geoVariance);

// 出力（確認用）
console.log("1. mathの合計点:", totalMath);
console.log("2. クラスA chemistry平均点:", classAChemistryAvg);
console.log("3. クラスC 3科目合計平均点:", classCTotalAvg);
console.log("4. 合計点が最も高い人:", topStudentName);
console.log("5. geographyの標準偏差:", geoStdDev);
