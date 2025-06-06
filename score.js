// score.js
const A = [
  0, 1, 11, 98, 722, 6811, 10895, 38800, 103626, 176435, 481072, 1762331, 2736570,
  4567544, 7249845, 10072158, 13227454, 18213372, 21708157, 27928862, 33003521,
  38884968, 44555389, 50010134, 56097098, 61939420, 68735305, 74804437, 80075097,
  88335010, 97188304, 108865098, 124235134, 139022022, 153141713, 172811822,
  190890054, 200312795, 216014469, 237070344, 253638253, 283156154, 305326650,
  355174198, 1000000000
];

const B = [
  0, 0, 1, 18, 138, 1306, 2088, 7430, 19788, 33584, 90368, 314035, 469769,
  734958, 1072189, 1377288, 1673153, 2069262, 2307829, 2674151, 2930773,
  3192243, 3415433, 3608553, 3803519, 3973632, 4153944, 4301402, 4420489,
  4592617, 4760255, 4959128, 5189494, 5383979, 5549496, 5753230, 5917812,
  5996301, 6117425, 6263291, 6366558, 6529346, 6636384, 6838469, 7500000
];

function cal(x) {
  const n = A.length;
  let h = [], a = [], l = [], mu = [], z = [], b = [], c = [], d = [];

  for (let i = 0; i < n - 1; i++) h[i] = A[i + 1] - A[i];
  for (let i = 1; i < n - 1; i++)
    a[i] = (3 / h[i]) * (B[i + 1] - B[i]) - (3 / h[i - 1]) * (B[i] - B[i - 1]);

  l[0] = 1; mu[0] = 0; z[0] = 0;
  for (let i = 1; i < n - 1; i++) {
    l[i] = 2 * (A[i + 1] - A[i - 1]) - h[i - 1] * mu[i - 1];
    mu[i] = h[i] / l[i];
    z[i] = (a[i] - h[i - 1] * z[i - 1]) / l[i];
  }
  l[n - 1] = 1; z[n - 1] = 0; c[n - 1] = 0;

  for (let j = n - 2; j >= 0; j--) {
    c[j] = z[j] - mu[j] * c[j + 1];
    b[j] = (B[j + 1] - B[j]) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3;
    d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
  }

  let i = n - 2;
  for (let j = 0; j < n - 1; j++) {
    if (x >= A[j] && x <= A[j + 1]) {
      i = j;
      break;
    }
  }

  let dx = x - A[i];
  return B[i] + b[i] * dx + c[i] * dx * dx + d[i] * dx * dx * dx;
}

function calculateAll() {
  const mode = document.getElementById("mode").value;
  let total = 0;
  for (let i = 1; i <= 5; i++) {
    const rawInput = parseFloat(document.getElementById(`area${i}`).value);
    if (isNaN(rawInput)) continue;

    const input = (mode === "simple") ? rawInput * 10000 : rawInput;
    const base = cal(input);
    const offset = (i === 5) ? 32500000 : 27500000;
    const score = Math.round(base + offset);

    document.getElementById(`out${i}`).innerText = `→ ${score.toLocaleString()}`;
    total += score;
  }
  document.getElementById("totalOutput").innerText = `合計スコア：${total.toLocaleString()}`;
}
