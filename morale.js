function calculatemorale() {
  const mode = document.getElementById("mode").value;
  const morale = Number(document.getElementById("morale").value);
  const time = Number(document.getElementById("time").value);

  const outputlaps = document.getElementById("outputlaps");
  const outputtime = document.getElementById("outputtime");

  if (!Number.isInteger(morale) || morale < 1 || 75 <morale) {
    alert("開始やる気値に1~75を入力してください");
    return;
  }

  if (!Number.isFinite(time) || time < 1) {
    alert("周回時間は1秒以上を入力してください");
    return;
  }

  if ((mode === "terakoya" && time >= 180) || (mode === "normal" && time >= 360)) {
    outputlaps.textContent = "周回可能数：無限";
    outputtime.textContent = "周回可能時間：無限";
    return;
  }

  let currentmorale = morale;
  let totaltime = 0;
  let laps = 0;

  if (currentmorale > 75) {
    currentmorale = 75;
  }

  while (currentmorale > 0) {
    totaltime += time;
    laps++;
    currentmorale--;

    if (mode === "terakoya") {
      currentmorale += Math.floor(totaltime / 360) * 2;
    } else {
      currentmorale += Math.floor(totaltime / 360);
    }

    if (mode === "terakoya") {
      currentmorale -= Math.floor((totaltime - time) / 360) * 2;
    } else {
      currentmorale -= Math.floor((totaltime - time) / 360);
    }
  }

  let timetext = "";
  const h = Math.floor(totaltime / 3600);
  const m = Math.floor((totaltime % 3600) / 60);
  const s = totaltime % 60;

  if (h > 0) {
    timetext += `${h}時間`;
  }
  if (h > 0 || m > 0) {
    timetext += `${m}分`;
  }
  timetext += `${s}秒`;

  outputlaps.textContent = `周回可能数：約${laps}周`;
  outputtime.textContent = `周回可能時間：約${timetext}`;
}
