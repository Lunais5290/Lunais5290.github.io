function calculatecri() {
  const cri1 = Number(document.getElementById("cri1").value);
  const cri2 = Number(document.getElementById("cri2").value);
  const criunity = Number(document.getElementById("criunity").value);
  const crizone = Number(document.getElementById("crizone").value);

  const A = 1 + cri1 * 0.3;
  const B = 1 + cri2 * 0.3;
  const C = 1 + criunity / 100;
  const D = 1 + crizone / 100;

  const resultcri = 1 + A * B * C * D;
  const resultmag = resultcri / (A + 1);

  document.getElementById("outputcri").textContent = "CRI攻撃：" + resultcri.toFixed(2) + "倍";
  document.getElementById("outputmag").textContent = "特殊バフ倍率：" + resultmag.toFixed(2) + "倍";
}