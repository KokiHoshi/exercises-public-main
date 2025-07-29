export function reverse(str) {
    const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
    const graphemes = Array.from(segmenter.segment(str), s => s.segment);
    return graphemes.reverse().join("");
  }
  