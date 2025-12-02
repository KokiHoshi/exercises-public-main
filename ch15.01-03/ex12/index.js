javascript: (async () => {
  const e = "__summary_bookmarklet_overlay__",
    t = window.getSelection().toString().trim();
  if (!t) {
    alert("要約したいテキストを選択してください。");
    return;
  }
  if ("undefined" == typeof Summarizer) {
    alert("このブラウザでは Summarizer API (Gemini Nano) が利用できません。");
    return;
  }
  let n = "",
    o = "";
  try {
    const e = await Summarizer.availability();
    if ("available" !== e) {
      alert(
        "Gemini Nano がまだ利用できません（状態: " +
          e +
          "）。しばらく待って再試行してください。"
      );
      return;
    }
    const r = await Summarizer.create({
        type: "key-points",
        length: "medium",
        format: "markdown",
      }),
      i = await r.summarize(t, {
        context:
          "以下の文章を日本語で短く、重要なポイントだけを箇条書きで5行以内に要約してください。箇条書きは「・」で始めてください。",
      });
    (n = i.replace(/^\s*-\s*/gm, "・").replace(/\n{3,}/g, "\n\n")),
      (o = "Gemini Nano による要約"),
      "function" == typeof r.destroy && r.destroy();
  } catch (e) {
    console.error("Gemini Nano 要約中にエラー:", e),
      alert(
        "Gemini Nano の要約に失敗しました。\nコンソールを確認してください。"
      );
    return;
  }
  const r = document.getElementById(e);
  r && r.remove();
  const i = document.createElement("div");
  (i.id = e),
    Object.assign(i.style, {
      position: "fixed",
      right: "16px",
      bottom: "16px",
      width: "360px",
      maxHeight: "50vh",
      background: "white",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      borderRadius: "8px",
      padding: "12px",
      fontSize: "14px",
      fontFamily: "system-ui, sans-serif",
      zIndex: 999999,
    });
  const d = document.createElement("div");
  (d.textContent = "選択範囲の要約（Gemini Nano）"),
    Object.assign(d.style, { fontWeight: "bold", marginBottom: "8px" });
  const c = document.createElement("textarea");
  (c.value = n),
    Object.assign(c.style, {
      width: "100%",
      height: "140px",
      resize: "vertical",
      boxSizing: "border-box",
      fontSize: "13px",
      fontFamily: "monospace",
    });
  const l = document.createElement("div");
  (l.textContent = o),
    Object.assign(l.style, {
      marginTop: "4px",
      fontSize: "12px",
      color: "#666",
    });
  const s = document.createElement("div");
  Object.assign(s.style, {
    marginTop: "8px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
  });
  const a = document.createElement("button");
  (a.textContent = "コピー"),
    Object.assign(a.style, {
      padding: "4px 10px",
      fontSize: "12px",
      cursor: "pointer",
    });
  const p = document.createElement("button");
  (p.textContent = "閉じる"),
    Object.assign(p.style, {
      padding: "4px 10px",
      fontSize: "12px",
      cursor: "pointer",
    }),
    (a.onclick = async () => {
      try {
        navigator.clipboard?.writeText
          ? await navigator.clipboard.writeText(c.value)
          : (c.select(), document.execCommand("copy")),
          (a.textContent = "コピーしました"),
          setTimeout(() => (a.textContent = "コピー"), 1500);
      } catch (e) {
        alert("コピーに失敗しました：" + e);
      }
    }),
    (p.onclick = () => i.remove()),
    s.appendChild(a),
    s.appendChild(p),
    i.appendChild(d),
    i.appendChild(c),
    i.appendChild(l),
    i.appendChild(s),
    document.body.appendChild(i);
})();
