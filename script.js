const tramLines = {
  sakura: {
    nameJP: "都電荒川線（東京さくらトラム）",
    nameEN: "Tokyo Sakura Tram",
    operator: "東京都交通局",
    color: "#168ddf",
    accent: "#d13a58",
    stations: [
      { code: "SA01", jp: "三ノ輪橋", en: "Minowabashi", transfers: ["H"] },
      { code: "SA03", jp: "荒川区役所前", en: "Arakawa-kuyakushomae", transfers: [] },
      { code: "SA07", jp: "熊野前", en: "Kumanomae", transfers: ["NT"] },
      { code: "SA10", jp: "宮ノ前", en: "Miyanomae", transfers: [] },
      { code: "SA13", jp: "王子駅前", en: "Oji-ekimae", transfers: ["JR", "N"] },
      { code: "SA16", jp: "庚申塚", en: "Koshinzuka", transfers: [] },
      { code: "SA19", jp: "大塚駅前", en: "Otsuka-ekimae", transfers: ["JR"] },
      { code: "SA23", jp: "東池袋四丁目", en: "Higashi-ikebukuro-yonchome", transfers: ["Y"] },
      { code: "SA30", jp: "早稲田", en: "Waseda", transfers: ["T"] }
    ]
  },
  hiroden: {
    nameJP: "広島電鉄本線",
    nameEN: "Hiroden Main Line",
    operator: "広島電鉄",
    color: "#00a870",
    accent: "#e74e37",
    stations: [
      { code: "HI01", jp: "広島駅", en: "Hiroshima Station", transfers: ["JR", "S"] },
      { code: "HI02", jp: "猿猴橋町", en: "Enkobashicho", transfers: [] },
      { code: "HI03", jp: "的場町", en: "Matobacho", transfers: ["5"] },
      { code: "HI04", jp: "稲荷町", en: "Inarimachi", transfers: [] },
      { code: "HI05", jp: "銀山町", en: "Kanayamacho", transfers: [] },
      { code: "HI06", jp: "八丁堀", en: "Hatchobori", transfers: ["A", "B"] },
      { code: "HI07", jp: "立町", en: "Tatemachi", transfers: [] },
      { code: "HI08", jp: "紙屋町東", en: "Kamiyacho-higashi", transfers: ["A", "B"] },
      { code: "HI09", jp: "原爆ドーム前", en: "Genbaku Dome-mae", transfers: ["BRT"] },
      { code: "HI10", jp: "広電西広島", en: "Hiroden Nishi-Hiroshima", transfers: ["JR"] }
    ]
  },
  lightline: {
    nameJP: "宇都宮ライトレール",
    nameEN: "Utsunomiya Light Line",
    operator: "宇都宮ライトレール",
    color: "#f5be22",
    accent: "#f08a00",
    stations: [
      { code: "UL01", jp: "宇都宮駅東口", en: "Utsunomiya East", transfers: ["JR"] },
      { code: "UL02", jp: "東宿郷", en: "Higashi-Shukugo", transfers: [] },
      { code: "UL03", jp: "駅東公園前", en: "Ekihigashi Park", transfers: [] },
      { code: "UL04", jp: "峰", en: "Mine", transfers: [] },
      { code: "UL05", jp: "宇都宮大学陽東キャンパス", en: "Yoto Campus", transfers: ["U"] },
      { code: "UL06", jp: "平石", en: "Hiraishi", transfers: ["Depot"] },
      { code: "UL07", jp: "飛山城跡", en: "Tobiyama Castle", transfers: [] },
      { code: "UL08", jp: "清原地区市民センター前", en: "Kiyohara Civic Center", transfers: [] },
      { code: "UL09", jp: "清陵高校前", en: "Seiryo HS", transfers: [] },
      { code: "UL10", jp: "芳賀台", en: "Hagadai", transfers: ["Ind"] },
      { code: "UL11", jp: "芳賀・高根沢工業団地", en: "Haga-Takanezawa", transfers: ["Tech"] }
    ]
  }
};

const serviceMap = {
  普通: { jp: "普通", en: "LOCAL" },
  快速: { jp: "快速", en: "RAPID" },
  臨時: { jp: "臨時", en: "SPECIAL" },
  回送: { jp: "回送", en: "OUT OF SERVICE" }
};

const doorMap = {
  right: { jp: "右側が開きます", en: "Doors open on the right" },
  left: { jp: "左側が開きます", en: "Doors open on the left" },
  both: { jp: "両側が開きます", en: "Doors open on both sides" }
};

const crowdMap = {
  low: "空席多め",
  mid: "標準",
  high: "混雑"
};

const pageCatalog = [
  { code: "A", label: "停車案内" },
  { code: "B", label: "路線図" },
  { code: "C", label: "運行情報" }
];

const ui = {
  tramDisplay: document.getElementById("tramDisplay"),
  lineSelect: document.getElementById("lineSelect"),
  serviceSelect: document.getElementById("serviceSelect"),
  currentStationSelect: document.getElementById("currentStationSelect"),
  destinationSelect: document.getElementById("destinationSelect"),
  doorSelect: document.getElementById("doorSelect"),
  crowdSelect: document.getElementById("crowdSelect"),
  speedRange: document.getElementById("speedRange"),
  delayInput: document.getElementById("delayInput"),
  displayModeSelect: document.getElementById("displayModeSelect"),
  pageSelect: document.getElementById("pageSelect"),
  trainNumberInput: document.getElementById("trainNumberInput"),
  customMessageInput: document.getElementById("customMessageInput"),
  randomizeButton: document.getElementById("randomizeButton"),
  nextPageButton: document.getElementById("nextPageButton"),
  serviceBadgeJP: document.getElementById("serviceBadgeJP"),
  serviceBadgeEN: document.getElementById("serviceBadgeEN"),
  destinationJP: document.getElementById("destinationJP"),
  destinationEN: document.getElementById("destinationEN"),
  lineNameEN: document.getElementById("lineNameEN"),
  trainNumberDisplay: document.getElementById("trainNumberDisplay"),
  clockDisplay: document.getElementById("clockDisplay"),
  nextStationJP: document.getElementById("nextStationJP"),
  nextStationEN: document.getElementById("nextStationEN"),
  nextStationCode: document.getElementById("nextStationCode"),
  currentStationJP: document.getElementById("currentStationJP"),
  currentStationEN: document.getElementById("currentStationEN"),
  currentStationCode: document.getElementById("currentStationCode"),
  doorInfoJP: document.getElementById("doorInfoJP"),
  doorInfoEN: document.getElementById("doorInfoEN"),
  speedValue: document.getElementById("speedValue"),
  crowdValue: document.getElementById("crowdValue"),
  delayValue: document.getElementById("delayValue"),
  operatorValue: document.getElementById("operatorValue"),
  directionJP: document.getElementById("directionJP"),
  directionEN: document.getElementById("directionEN"),
  routeProgress: document.getElementById("routeProgress"),
  routeStations: document.getElementById("routeStations"),
  noticeList: document.getElementById("noticeList"),
  pageChip: document.getElementById("pageChip"),
  tickerText: document.getElementById("tickerText")
};

let pageIndex = 0;
let pageTimer = null;
let tickerStep = 0;
let currentState = null;

function createOption(value, label) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  return option;
}

function formatClock() {
  ui.clockDisplay.textContent = new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(new Date());
}

function setupLineOptions() {
  ui.lineSelect.innerHTML = "";
  Object.entries(tramLines).forEach(([key, line]) => {
    ui.lineSelect.append(createOption(key, line.nameJP));
  });

  ui.lineSelect.value = "sakura";
}

function populateStationsForLine(preserveSelection = false) {
  const line = tramLines[ui.lineSelect.value];
  const oldCurrent = preserveSelection ? ui.currentStationSelect.value : "";
  const oldDestination = preserveSelection ? ui.destinationSelect.value : "";

  ui.currentStationSelect.innerHTML = "";
  ui.destinationSelect.innerHTML = "";

  line.stations.forEach((station) => {
    const label = `${station.code} ${station.jp}`;
    ui.currentStationSelect.append(createOption(station.code, label));
    ui.destinationSelect.append(createOption(station.code, label));
  });

  const hasCurrent = line.stations.some((station) => station.code === oldCurrent);
  const hasDestination = line.stations.some((station) => station.code === oldDestination);

  ui.currentStationSelect.value = hasCurrent ? oldCurrent : line.stations[0].code;
  ui.destinationSelect.value = hasDestination ? oldDestination : line.stations[line.stations.length - 1].code;

  if (ui.currentStationSelect.value === ui.destinationSelect.value && line.stations.length > 1) {
    ui.destinationSelect.value = line.stations[line.stations.length - 1].code;
  }
}

function stationIndexByCode(line, stationCode) {
  const index = line.stations.findIndex((station) => station.code === stationCode);
  return index >= 0 ? index : 0;
}

function buildState() {
  const line = tramLines[ui.lineSelect.value];
  const currentIndex = stationIndexByCode(line, ui.currentStationSelect.value);
  const destinationIndex = stationIndexByCode(line, ui.destinationSelect.value);
  const direction = destinationIndex >= currentIndex ? 1 : -1;
  const nextIndex = currentIndex === destinationIndex ? currentIndex : currentIndex + direction;
  const current = line.stations[currentIndex];
  const next = line.stations[nextIndex];
  const destination = line.stations[destinationIndex];
  const service = serviceMap[ui.serviceSelect.value];
  const door = doorMap[ui.doorSelect.value];
  const speed = Number(ui.speedRange.value) || 0;
  const delayMinutes = Math.max(0, Number(ui.delayInput.value) || 0);

  return {
    line,
    current,
    next,
    destination,
    currentIndex,
    nextIndex,
    destinationIndex,
    direction,
    service,
    door,
    speed,
    crowd: crowdMap[ui.crowdSelect.value],
    delayMinutes,
    trainNumber: (ui.trainNumberInput.value.trim().toUpperCase() || "A124").replace(/[^A-Z0-9-]/g, ""),
    customMessage: ui.customMessageInput.value.trim()
  };
}

function renderHeader(state) {
  ui.tramDisplay.style.setProperty("--line-color", state.line.color);
  ui.tramDisplay.style.setProperty("--line-accent", state.line.accent);

  ui.serviceBadgeJP.textContent = state.service.jp;
  ui.serviceBadgeEN.textContent = state.service.en;
  ui.destinationJP.textContent = `${state.destination.jp}`;
  ui.destinationEN.textContent = state.destination.en;
  ui.lineNameEN.textContent = state.line.nameEN;
  ui.trainNumberDisplay.textContent = `TRAM ${state.trainNumber}`;
}

function renderPanels(state) {
  ui.nextStationJP.textContent = state.next.jp;
  ui.nextStationEN.textContent = state.next.en;
  ui.nextStationCode.textContent = state.next.code;

  ui.currentStationJP.textContent = state.current.jp;
  ui.currentStationEN.textContent = state.current.en;
  ui.currentStationCode.textContent = state.current.code;

  ui.doorInfoJP.textContent = state.door.jp;
  ui.doorInfoEN.textContent = state.door.en;
  ui.speedValue.textContent = `${state.speed} km/h`;
  ui.crowdValue.textContent = state.crowd;
  ui.delayValue.textContent = state.delayMinutes > 0 ? `${state.delayMinutes}分遅れ` : "平常運転";
  ui.operatorValue.textContent = state.line.operator;

  ui.directionJP.textContent = `${state.destination.jp} 方面`;
  ui.directionEN.textContent = `bound for ${state.destination.en}`;
}

function stationClass(state, index) {
  const min = Math.min(state.currentIndex, state.destinationIndex);
  const max = Math.max(state.currentIndex, state.destinationIndex);
  const inside = index >= min && index <= max;

  if (!inside) {
    return "is-outside";
  }

  if (index === state.currentIndex) {
    return "is-current";
  }

  if (index === state.nextIndex && state.currentIndex !== state.destinationIndex) {
    return "is-next";
  }

  const isPassed = (state.direction === 1 && index < state.currentIndex) || (state.direction === -1 && index > state.currentIndex);

  return isPassed ? "is-passed" : "is-future";
}

function renderRouteStations(state) {
  ui.routeStations.innerHTML = "";
  ui.routeStations.style.setProperty("--station-count", state.line.stations.length);

  state.line.stations.forEach((station, index) => {
    const node = document.createElement("article");
    node.className = `route-station ${stationClass(state, index)}`;

    const transferBadges = station.transfers.length
      ? `<div class="transfer-badges">${station.transfers.map((transfer) => `<span>${transfer}</span>`).join("")}</div>`
      : '<div class="transfer-badges"></div>';

    node.innerHTML = `
      <p class="route-name-jp">${station.jp}</p>
      <p class="route-name-en">${station.en}</p>
      <div class="route-dot"></div>
      <div class="route-code">${station.code}</div>
      ${transferBadges}
    `;

    ui.routeStations.append(node);
  });

  const progress = state.line.stations.length > 1 ? (state.currentIndex / (state.line.stations.length - 1)) * 100 : 0;
  ui.routeProgress.style.width = `calc((100% - 3rem) * ${progress / 100})`;
}

function renderNotices(state) {
  const upcoming = [];
  let pointer = state.currentIndex;

  while (upcoming.length < 4) {
    pointer += state.direction;

    if (pointer < 0 || pointer >= state.line.stations.length) {
      break;
    }

    upcoming.push(state.line.stations[pointer]);

    if (pointer === state.destinationIndex) {
      break;
    }
  }

  const upcomingText =
    upcoming
      .map((station) => `${station.jp}${station.transfers.length ? ` [${station.transfers.join("/")}]` : ""}`)
      .join(" → ") || "案内対象の停車駅はありません";

  const messages = [
    `次駅: ${state.next.jp} (${state.next.en}) / ${state.door.jp}`,
    `この先の停車案内: ${upcomingText}`,
    `運行状況: ${state.delayMinutes > 0 ? `${state.delayMinutes}分程度の遅れで運行中` : "平常通り運転しています"}`,
    `乗務案内: ワンマン運転です。発車時はつり革・手すりをお持ちください。`
  ];

  ui.noticeList.innerHTML = "";
  messages.forEach((message) => {
    const li = document.createElement("li");
    li.textContent = message;
    ui.noticeList.append(li);
  });
}

function buildTickerMessages(state) {
  return [
    `${state.line.nameJP} ${state.service.jp} ${state.destination.jp}ゆきです。`,
    `Next stop is ${state.next.en}. ${state.door.en}.`,
    state.delayMinutes > 0
      ? `現在、${state.delayMinutes}分程度の遅れで運転しております。`
      : "現在、平常通り運転しております。",
    "駆け込み乗車はおやめください。黄色い点字ブロックの内側でお待ちください。"
  ];
}

function renderTicker(state) {
  const defaults = buildTickerMessages(state);
  const message = state.customMessage || defaults[(tickerStep + pageIndex) % defaults.length];

  ui.tickerText.textContent = message;
  ui.tickerText.classList.remove("animate");
  void ui.tickerText.offsetWidth;
  ui.tickerText.classList.add("animate");
}

function setPage(nextPage) {
  const total = pageCatalog.length;
  pageIndex = ((nextPage % total) + total) % total;

  ui.tramDisplay.dataset.page = String(pageIndex);
  ui.pageSelect.value = String(pageIndex);
  ui.pageChip.textContent = `PAGE ${pageCatalog[pageIndex].code} | ${pageCatalog[pageIndex].label}`;

  if (currentState) {
    renderTicker(currentState);
  }
}

function syncDisplayMode() {
  const auto = ui.displayModeSelect.value === "auto";
  ui.pageSelect.disabled = auto;

  if (auto && !pageTimer) {
    pageTimer = setInterval(() => {
      setPage(pageIndex + 1);
    }, 8500);
  }

  if (!auto && pageTimer) {
    clearInterval(pageTimer);
    pageTimer = null;
  }

  if (!auto) {
    setPage(Number(ui.pageSelect.value));
  }
}

function renderAll() {
  const state = buildState();
  currentState = state;

  renderHeader(state);
  renderPanels(state);
  renderRouteStations(state);
  renderNotices(state);
  renderTicker(state);
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomizeState() {
  const lineKey = randomItem(Object.keys(tramLines));
  ui.lineSelect.value = lineKey;
  populateStationsForLine(false);

  const stations = tramLines[lineKey].stations;
  const stationCodes = stations.map((station) => station.code);

  ui.currentStationSelect.value = randomItem(stationCodes);
  ui.destinationSelect.value = randomItem(stationCodes);

  if (ui.currentStationSelect.value === ui.destinationSelect.value && stationCodes.length > 1) {
    ui.destinationSelect.value = stationCodes[(stationCodes.indexOf(ui.currentStationSelect.value) + 1) % stationCodes.length];
  }

  ui.serviceSelect.value = randomItem(Object.keys(serviceMap));
  ui.doorSelect.value = randomItem(Object.keys(doorMap));
  ui.crowdSelect.value = randomItem(Object.keys(crowdMap));
  ui.speedRange.value = String(Math.floor(Math.random() * 65));
  ui.delayInput.value = String(Math.floor(Math.random() * 7));
  ui.trainNumberInput.value = `${String.fromCharCode(65 + Math.floor(Math.random() * 3))}${100 + Math.floor(Math.random() * 900)}`;
  ui.customMessageInput.value = "";

  renderAll();
}

function initialize() {
  setupLineOptions();
  populateStationsForLine(false);
  setPage(0);
  syncDisplayMode();
  formatClock();
  renderAll();
}

ui.lineSelect.addEventListener("change", () => {
  populateStationsForLine(true);
  renderAll();
});

[
  ui.serviceSelect,
  ui.currentStationSelect,
  ui.destinationSelect,
  ui.doorSelect,
  ui.crowdSelect,
  ui.speedRange,
  ui.delayInput,
  ui.trainNumberInput,
  ui.customMessageInput
].forEach((element) => {
  element.addEventListener("input", renderAll);
  element.addEventListener("change", renderAll);
});

ui.displayModeSelect.addEventListener("change", syncDisplayMode);
ui.pageSelect.addEventListener("change", () => setPage(Number(ui.pageSelect.value)));
ui.nextPageButton.addEventListener("click", () => setPage(pageIndex + 1));
ui.randomizeButton.addEventListener("click", randomizeState);

setInterval(formatClock, 1000);
setInterval(() => {
  tickerStep += 1;
  if (currentState) {
    renderTicker(currentState);
  }
}, 5200);

initialize();
