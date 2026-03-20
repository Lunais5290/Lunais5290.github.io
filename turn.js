function calculateturn() {
  const t = Number(document.getElementById("turn").value);
  const defence = Number(document.getElementById("defence").value);

  const A = 1 + (t - 1) * (t - 2) / 870;

  const result = Math.round(defence * A);

  document.getElementById("outputtrun").textContent = "ターン強化防御値：" + result;
}