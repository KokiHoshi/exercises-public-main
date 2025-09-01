export function counterGroup() {
  
  const cells = [];

  return {
    // 新しいカウンタを作って返す
    newCounter: function() {
      let cell = { value: 0 };
      cells.push(cell);
      return {
        count: function() {
          return cell.value++;
        },
        reset: function() {
          cell.value = 0;
        }
      };
    },

    // 合計
    total: function() {
      return cells.reduce((sum, c) => sum + c.value, 0);
    },

    // 平均
    average: function() {
      if (cells.length === 0) {
        throw new TypeError("No counters in this group");
      }
      return this.total() / cells.length;
    },

    // 分散
    variance: function() {
      const n = cells.length;
      if (n < 2) {
        throw new TypeError("Need at least two counters");
      }
      const mean = this.total() / n;
      let ssd = 0; 
      for (const c of cells) {
        const d = c.value - mean;
        ssd += d * d;
      }
      return ssd / n;
    }
  };
}
