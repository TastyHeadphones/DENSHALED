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

const phaseMap = {
  manual: "手動表示",
  cruise: "走行中",
  approach: "まもなく到着",
  arrived: "停車中"
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
  motionSelect: document.getElementById("motionSelect"),
  segmentDurationInput: document.getElementById("segmentDurationInput"),
  trainNumberInput: document.getElementById("trainNumberInput"),
  customMessageInput: document.getElementById("customMessageInput"),
  randomizeButton: document.getElementById("randomizeButton"),
  nextPageButton: document.getElementById("nextPageButton"),
  serviceBadgeJP: document.getElementById("serviceBadgeJP"),
  serviceBadgeEN: document.getElementById("serviceBadgeEN"),
  destinationJP: document.getElementById("destinationJP"),
  destinationEN: document.getElementById("destinationEN"),
  headRollTrack: document.getElementById("headRollTrack"),
  lineNameEN: document.getElementById("lineNameEN"),
  trainNumberDisplay: document.getElementById("trainNumberDisplay"),
  clockDisplay: document.getElementById("clockDisplay"),
  nextStationJP: document.getElementById("nextStationJP"),
  nextStationEN: document.getElementById("nextStationEN"),
  nextStationCode: document.getElementById("nextStationCode"),
  nextRollTrack: document.getElementById("nextRollTrack"),
  currentStationJP: document.getElementById("currentStationJP"),
  currentStationEN: document.getElementById("currentStationEN"),
  currentStationCode: document.getElementById("currentStationCode"),
  currentRollTrack: document.getElementById("currentRollTrack"),
  doorInfoJP: document.getElementById("doorInfoJP"),
  doorInfoEN: document.getElementById("doorInfoEN"),
  speedValue: document.getElementById("speedValue"),
  phaseValue: document.getElementById("phaseValue"),
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

const journey = {
  timer: null,
  lastTick: 0,
  segmentProgress: 0,
  dwellRemaining: 0,
  phase: "cruise",
  moving: true
};

const DWELL_SECONDS = 3.2;

let pageIndex = 0;
let pageTimer = null;
let tickerStep = 0;
let currentState = null;
let lastTickerMessage = "";
let lastSignature = {
  destination: "",
  current: "",
  next: ""
};

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

function buildBaseState() {
  const line = tramLines[ui.lineSelect.value];
  const currentIndex = stationIndexByCode(line, ui.currentStationSelect.value);
  const destinationIndex = stationIndexByCode(line, ui.destinationSelect.value);
  const direction = destinationIndex >= currentIndex ? 1 : -1;
  const nextIndex = currentIndex === destinationIndex ? currentIndex : currentIndex + direction;

  return {
    line,
    currentIndex,
    destinationIndex,
    direction,
    nextIndex,
    current: line.stations[currentIndex],
    next: line.stations[nextIndex],
    destination: line.stations[destinationIndex],
    service: serviceMap[ui.serviceSelect.value],
    door: doorMap[ui.doorSelect.value],
    speedSetting: Number(ui.speedRange.value) || 35,
    crowd: crowdMap[ui.crowdSelect.value],
    delayMinutes: Math.max(0, Number(ui.delayInput.value) || 0),
    trainNumber: (ui.trainNumberInput.value.trim().toUpperCase() || "A124").replace(/[^A-Z0-9-]/g, ""),
    customMessage: ui.customMessageInput.value.trim()
  };
}

function computeMotionSpeed(speedSetting, segmentProgress, phase) {
  const cruise = Math.max(18, speedSetting);

  if (phase === "arrived" || phase === "manual") {
    return 0;
  }

  if (phase === "approach") {
    const t = Math.max(0, Math.min(1, (segmentProgress - 0.74) / 0.26));
    return Math.max(4, Math.round(cruise * (1 - 0.9 * t)));
  }

  const accel = Math.min(1, segmentProgress / 0.35);
  const eased = 0.35 + 0.65 * (1 - Math.pow(1 - accel, 2));
  return Math.round(cruise * eased);
}

function buildState() {
  const base = buildBaseState();
  const motionEnabled = ui.motionSelect.value === "on";

  const state = {
    ...base,
    motionEnabled,
    phase: motionEnabled ? journey.phase : "manual",
    moving: motionEnabled ? journey.moving : false
  };

  if (motionEnabled && base.currentIndex !== base.destinationIndex && journey.dwellRemaining <= 0) {
    state.motionAbsoluteIndex = base.currentIndex + base.direction * journey.segmentProgress;
  } else {
    state.motionAbsoluteIndex = base.currentIndex;
  }

  state.visualSpeed = motionEnabled
    ? computeMotionSpeed(base.speedSetting, journey.segmentProgress, state.phase)
    : base.speedSetting;

  return state;
}

function fillRollTrack(element, text) {
  const unit = `${text}   ◆   `;
  element.textContent = unit.repeat(10);
}

function triggerRollAnimation(...elements) {
  elements.forEach((element) => {
    element.classList.remove("roll-enter");
    void element.offsetWidth;
    element.classList.add("roll-enter");
  });
}

function renderHeader(state) {
  ui.tramDisplay.style.setProperty("--line-color", state.line.color);
  ui.tramDisplay.style.setProperty("--line-accent", state.line.accent);

  ui.serviceBadgeJP.textContent = state.service.jp;
  ui.serviceBadgeEN.textContent = state.service.en;
  ui.destinationJP.textContent = state.destination.jp;
  ui.destinationEN.textContent = state.destination.en;
  ui.lineNameEN.textContent = state.line.nameEN;
  ui.trainNumberDisplay.textContent = `TRAM ${state.trainNumber}`;

  fillRollTrack(ui.headRollTrack, `${state.service.jp} ${state.destination.jp} / ${state.service.en} ${state.destination.en}`);

  const destinationSignature = `${state.service.jp}-${state.destination.code}`;

  if (destinationSignature !== lastSignature.destination) {
    triggerRollAnimation(ui.destinationJP, ui.destinationEN);
    lastSignature.destination = destinationSignature;
  }
}

function renderPanels(state) {
  ui.tramDisplay.dataset.travel = state.phase;
  ui.tramDisplay.dataset.moving = String(state.moving);

  ui.nextStationJP.textContent = state.next.jp;
  ui.nextStationEN.textContent = state.next.en;
  ui.nextStationCode.textContent = state.next.code;
  fillRollTrack(ui.nextRollTrack, `次は ${state.next.jp} / Next ${state.next.en}`);

  ui.currentStationJP.textContent = state.current.jp;
  ui.currentStationEN.textContent = state.current.en;
  ui.currentStationCode.textContent = state.current.code;
  fillRollTrack(ui.currentRollTrack, `ただいま ${state.current.jp} / Now ${state.current.en}`);

  ui.doorInfoJP.textContent = state.door.jp;
  ui.doorInfoEN.textContent = state.door.en;
  ui.speedValue.textContent = `${state.visualSpeed} km/h`;
  ui.phaseValue.textContent = phaseMap[state.phase] || "走行中";
  ui.crowdValue.textContent = state.crowd;
  ui.delayValue.textContent = state.delayMinutes > 0 ? `${state.delayMinutes}分遅れ` : "平常運転";
  ui.operatorValue.textContent = state.line.operator;

  ui.directionJP.textContent = `${state.destination.jp} 方面`;
  ui.directionEN.textContent = `bound for ${state.destination.en}`;

  if (state.current.code !== lastSignature.current) {
    triggerRollAnimation(ui.currentStationJP, ui.currentStationEN);
    lastSignature.current = state.current.code;
  }

  if (state.next.code !== lastSignature.next) {
    triggerRollAnimation(ui.nextStationJP, ui.nextStationEN);
    lastSignature.next = state.next.code;
  }
}

function stationClass(state, index) {
  const classes = [];
  const min = Math.min(state.currentIndex, state.destinationIndex);
  const max = Math.max(state.currentIndex, state.destinationIndex);
  const inside = index >= min && index <= max;

  if (!inside) {
    classes.push("is-outside");
    return classes.join(" ");
  }

  if (index === state.currentIndex) {
    classes.push("is-current");
  }

  if (index === state.nextIndex && state.currentIndex !== state.destinationIndex) {
    classes.push("is-next");

    if (state.phase === "approach") {
      classes.push("is-nearing");
    }
  }

  const passed = (state.direction === 1 && index < state.currentIndex) || (state.direction === -1 && index > state.currentIndex);

  if (passed) {
    classes.push("is-passed");
  }

  return classes.join(" ");
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

  const upper = state.line.stations.length - 1;
  const normalized = upper > 0 ? Math.max(0, Math.min(upper, state.motionAbsoluteIndex)) / upper : 0;
  ui.routeProgress.style.width = `calc((100% - 3rem) * ${normalized})`;
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

  const phaseMessage =
    state.phase === "approach"
      ? `まもなく ${state.next.jp} に到着します。`
      : state.phase === "arrived"
        ? `${state.current.jp} に停車中です。ドア付近の混雑にご注意ください。`
        : `${state.next.jp} に向けて走行中です。`;

  const messages = [
    `次駅: ${state.next.jp} (${state.next.en}) / ${state.door.jp}`,
    `この先の停車案内: ${upcomingText}`,
    `運行状況: ${state.delayMinutes > 0 ? `${state.delayMinutes}分程度の遅れで運行中` : "平常通り運転しています"}`,
    `案内: ${phaseMessage}`
  ];

  ui.noticeList.innerHTML = "";
  messages.forEach((message) => {
    const li = document.createElement("li");
    li.textContent = message;
    ui.noticeList.append(li);
  });
}

function buildTickerMessages(state) {
  const phaseLine =
    state.phase === "approach"
      ? `まもなく ${state.next.jp}、${state.door.jp}。`
      : state.phase === "arrived"
        ? `${state.current.jp}です。お降りの方は足元にご注意ください。`
        : `${state.line.nameJP} ${state.service.jp} ${state.destination.jp}ゆきです。`;

  return [
    phaseLine,
    `Next stop is ${state.next.en}. ${state.door.en}.`,
    state.delayMinutes > 0
      ? `現在、${state.delayMinutes}分程度の遅れで運転しております。`
      : "現在、平常通り運転しております。",
    "駆け込み乗車はおやめください。黄色い点字ブロックの内側でお待ちください。"
  ];
}

function renderTicker(state, force = false) {
  const defaults = buildTickerMessages(state);
  const message = state.customMessage || defaults[(tickerStep + pageIndex) % defaults.length];

  if (!force && message === lastTickerMessage) {
    return;
  }

  lastTickerMessage = message;
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
    renderTicker(currentState, true);
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

function renderAll(forceTicker = false) {
  const state = buildState();
  currentState = state;

  renderHeader(state);
  renderPanels(state);
  renderRouteStations(state);
  renderNotices(state);
  renderTicker(state, forceTicker);
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
  ui.segmentDurationInput.value = String(10 + Math.floor(Math.random() * 10));
  ui.trainNumberInput.value = `${String.fromCharCode(65 + Math.floor(Math.random() * 3))}${100 + Math.floor(Math.random() * 900)}`;
  ui.customMessageInput.value = "";

  resetJourneyProgress();
  renderAll(true);
}

function resetJourneyProgress() {
  journey.segmentProgress = 0;
  journey.dwellRemaining = 0;
  journey.phase = "cruise";
  journey.moving = true;
  journey.lastTick = performance.now();
}

function advanceCurrentStation(baseState) {
  if (baseState.currentIndex === baseState.destinationIndex) {
    return false;
  }

  const line = baseState.line;
  const nextIndex = baseState.currentIndex + baseState.direction;
  ui.currentStationSelect.value = line.stations[nextIndex].code;

  if (nextIndex === baseState.destinationIndex && line.stations.length > 1) {
    if (nextIndex === 0) {
      ui.destinationSelect.value = line.stations[line.stations.length - 1].code;
    }

    if (nextIndex === line.stations.length - 1) {
      ui.destinationSelect.value = line.stations[0].code;
    }
  }

  return true;
}

function tickJourney() {
  const motionEnabled = ui.motionSelect.value === "on";
  const now = performance.now();
  const delta = journey.lastTick ? (now - journey.lastTick) / 1000 : 0.12;
  journey.lastTick = now;

  if (!motionEnabled) {
    journey.phase = "manual";
    journey.moving = false;
    journey.segmentProgress = 0;
    journey.dwellRemaining = 0;
    renderAll();
    return;
  }

  const baseState = buildBaseState();

  if (baseState.currentIndex === baseState.destinationIndex) {
    journey.phase = "arrived";
    journey.moving = false;
    journey.segmentProgress = 0;
    renderAll();
    return;
  }

  if (journey.dwellRemaining > 0) {
    journey.dwellRemaining = Math.max(0, journey.dwellRemaining - delta);
    journey.phase = "arrived";
    journey.moving = false;

    if (journey.dwellRemaining === 0) {
      journey.phase = "cruise";
      journey.moving = true;
      journey.segmentProgress = 0;
    }

    renderAll();
    return;
  }

  const segmentSeconds = Math.max(6, Math.min(40, Number(ui.segmentDurationInput.value) || 14));
  journey.segmentProgress = Math.min(1, journey.segmentProgress + delta / segmentSeconds);
  journey.phase = journey.segmentProgress >= 0.74 ? "approach" : "cruise";
  journey.moving = true;

  if (journey.segmentProgress >= 1) {
    const moved = advanceCurrentStation(baseState);
    journey.segmentProgress = 0;
    journey.dwellRemaining = moved ? DWELL_SECONDS : 0;
    journey.phase = "arrived";
    journey.moving = false;
  }

  renderAll();
}

function startJourneyLoop() {
  if (journey.timer) {
    clearInterval(journey.timer);
  }

  journey.lastTick = performance.now();
  journey.timer = setInterval(tickJourney, 120);
}

function initialize() {
  setupLineOptions();
  populateStationsForLine(false);
  setPage(0);
  syncDisplayMode();
  resetJourneyProgress();
  formatClock();
  renderAll(true);
  startJourneyLoop();
}

ui.lineSelect.addEventListener("change", () => {
  populateStationsForLine(true);
  resetJourneyProgress();
  renderAll(true);
});

[ui.currentStationSelect, ui.destinationSelect].forEach((element) => {
  element.addEventListener("change", () => {
    resetJourneyProgress();
    renderAll(true);
  });
});

[
  ui.serviceSelect,
  ui.doorSelect,
  ui.crowdSelect,
  ui.speedRange,
  ui.delayInput,
  ui.trainNumberInput,
  ui.customMessageInput
].forEach((element) => {
  element.addEventListener("input", () => renderAll(false));
  element.addEventListener("change", () => renderAll(false));
});

ui.segmentDurationInput.addEventListener("change", resetJourneyProgress);
ui.motionSelect.addEventListener("change", () => {
  resetJourneyProgress();
  renderAll(true);
});

ui.displayModeSelect.addEventListener("change", syncDisplayMode);
ui.pageSelect.addEventListener("change", () => setPage(Number(ui.pageSelect.value)));
ui.nextPageButton.addEventListener("click", () => setPage(pageIndex + 1));
ui.randomizeButton.addEventListener("click", randomizeState);

setInterval(formatClock, 1000);
setInterval(() => {
  tickerStep += 1;

  if (currentState) {
    renderTicker(currentState, true);
  }
}, 5200);

initialize();
