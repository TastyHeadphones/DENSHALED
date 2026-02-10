const lineCatalog = {
  小田急線: {
    code: "ODAKYU LINE",
    color: "#84beff",
    destinations: ["新宿", "町田", "本厚木", "小田原"],
    stations: ["代々木上原", "下北沢", "登戸", "相模大野", "足柄"]
  },
  山手線: {
    code: "JR YAMANOTE",
    color: "#99f78f",
    destinations: ["渋谷", "池袋", "上野", "品川"],
    stations: ["原宿", "新宿", "高田馬場", "大塚", "秋葉原"]
  },
  京王線: {
    code: "KEIO LINE",
    color: "#ff9dd0",
    destinations: ["新宿", "橋本", "京王八王子", "高尾山口"],
    stations: ["笹塚", "明大前", "千歳烏山", "調布", "府中"]
  },
  東急東横線: {
    code: "TOKYU TOYOKO",
    color: "#ffd07d",
    destinations: ["渋谷", "横浜", "元町・中華街", "菊名"],
    stations: ["中目黒", "自由が丘", "武蔵小杉", "日吉", "綱島"]
  }
};

const stationEn = {
  新宿: "Shinjuku",
  町田: "Machida",
  本厚木: "Hon-Atsugi",
  小田原: "Odawara",
  代々木上原: "Yoyogi-Uehara",
  下北沢: "Shimokitazawa",
  登戸: "Noborito",
  相模大野: "Sagamiono",
  足柄: "Ashigara",
  渋谷: "Shibuya",
  池袋: "Ikebukuro",
  上野: "Ueno",
  品川: "Shinagawa",
  原宿: "Harajuku",
  高田馬場: "Takadanobaba",
  大塚: "Otsuka",
  秋葉原: "Akihabara",
  橋本: "Hashimoto",
  京王八王子: "Keio-Hachioji",
  高尾山口: "Takaosanguchi",
  笹塚: "Sasazuka",
  明大前: "Meidaimae",
  千歳烏山: "Chitose-Karasuyama",
  調布: "Chofu",
  府中: "Fuchu",
  横浜: "Yokohama",
  "元町・中華街": "Motomachi-Chukagai",
  菊名: "Kikuna",
  中目黒: "Nakameguro",
  自由が丘: "Jiyugaoka",
  武蔵小杉: "Musashi-Kosugi",
  日吉: "Hiyoshi",
  綱島: "Tsunashima"
};

const serviceEn = {
  各駅停車: "LOCAL",
  快速: "RAPID",
  急行: "EXPRESS",
  特急: "LIMITED EXPRESS"
};

const doorInfo = {
  right: {
    jp: "扉は右側です。",
    en: "Doors open on the right."
  },
  left: {
    jp: "扉は左側です。",
    en: "Doors open on the left."
  },
  both: {
    jp: "扉は両側です。",
    en: "Doors open on both sides."
  }
};

const lineSelect = document.getElementById("lineSelect");
const serviceSelect = document.getElementById("serviceSelect");
const destinationSelect = document.getElementById("destinationSelect");
const nextStationSelect = document.getElementById("nextStationSelect");
const doorSelect = document.getElementById("doorSelect");
const trainNumberInput = document.getElementById("trainNumberInput");
const customMessageInput = document.getElementById("customMessageInput");
const randomizeButton = document.getElementById("randomizeButton");

const ledBoard = document.getElementById("ledBoard");
const lineBadge = document.getElementById("lineBadge");
const trainNumberDisplay = document.getElementById("trainNumberDisplay");
const boardClock = document.getElementById("boardClock");
const destinationJP = document.getElementById("destinationJP");
const destinationEN = document.getElementById("destinationEN");
const serviceEN = document.getElementById("serviceEN");
const nextStationJP = document.getElementById("nextStationJP");
const nextStationEN = document.getElementById("nextStationEN");
const doorInfoJP = document.getElementById("doorInfoJP");
const doorInfoEN = document.getElementById("doorInfoEN");
const scrollText = document.getElementById("scrollText");

const defaultScrollMessages = [
  "まもなく次駅です。黄色い点字ブロックの内側でお待ちください。",
  "This train is for rapid boarding flow. Please move inside the car.",
  "優先席付近では携帯電話の電源をお切りください。",
  "本日はDENSHALEDをご覧いただきありがとうございます。"
];

let scrollIndex = 0;

function fillSelect(select, values) {
  select.innerHTML = "";
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
}

function toEnglish(name) {
  return stationEn[name] || name;
}

function renderClock() {
  boardClock.textContent = new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(new Date());
}

function getBaseScrollText() {
  const lineName = lineSelect.value;
  const service = serviceSelect.value;
  const destination = destinationSelect.value;
  const next = nextStationSelect.value;
  return `[${lineName}] ${service} ${destination}ゆき / Next ${toEnglish(next)}`;
}

function renderBoard() {
  const lineName = lineSelect.value;
  const line = lineCatalog[lineName];
  const service = serviceSelect.value;
  const destination = destinationSelect.value;
  const next = nextStationSelect.value;
  const door = doorSelect.value;
  const trainNo = trainNumberInput.value.trim() || "1275E";

  ledBoard.style.setProperty("--line-color", line.color);

  lineBadge.textContent = line.code;
  trainNumberDisplay.textContent = `列車番号 ${trainNo.toUpperCase()}`;
  destinationJP.textContent = `${service} ${destination} ゆき`;
  serviceEN.textContent = serviceEn[service];
  destinationEN.textContent = toEnglish(destination);
  nextStationJP.textContent = next;
  nextStationEN.textContent = toEnglish(next);
  doorInfoJP.textContent = doorInfo[door].jp;
  doorInfoEN.textContent = doorInfo[door].en;

  const custom = customMessageInput.value.trim();
  scrollText.textContent = custom || `${getBaseScrollText()} / ${defaultScrollMessages[scrollIndex]}`;
}

function syncRouteOptions() {
  const lineName = lineSelect.value;
  const line = lineCatalog[lineName];

  fillSelect(destinationSelect, line.destinations);
  fillSelect(nextStationSelect, line.stations);

  renderBoard();
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomizeBoard() {
  const lineNames = Object.keys(lineCatalog);
  const lineName = randomItem(lineNames);
  const line = lineCatalog[lineName];
  const services = Object.keys(serviceEn);
  const doorModes = Object.keys(doorInfo);

  lineSelect.value = lineName;
  fillSelect(destinationSelect, line.destinations);
  fillSelect(nextStationSelect, line.stations);

  serviceSelect.value = randomItem(services);
  destinationSelect.value = randomItem(line.destinations);
  nextStationSelect.value = randomItem(line.stations);
  doorSelect.value = randomItem(doorModes);
  trainNumberInput.value = `${Math.floor(1000 + Math.random() * 8999)}${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`;

  renderBoard();
}

function initializeLineSelect() {
  fillSelect(lineSelect, Object.keys(lineCatalog));
  lineSelect.value = "小田急線";
  syncRouteOptions();
}

setInterval(() => {
  renderClock();
}, 1000);

setInterval(() => {
  scrollIndex = (scrollIndex + 1) % defaultScrollMessages.length;
  if (!customMessageInput.value.trim()) {
    renderBoard();
  }
}, 5500);

[lineSelect, serviceSelect, destinationSelect, nextStationSelect, doorSelect, trainNumberInput, customMessageInput].forEach((element) => {
  element.addEventListener("input", renderBoard);
  element.addEventListener("change", renderBoard);
});

lineSelect.addEventListener("change", syncRouteOptions);
randomizeButton.addEventListener("click", randomizeBoard);

initializeLineSelect();
renderClock();
renderBoard();
