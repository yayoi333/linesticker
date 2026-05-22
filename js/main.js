/* =========================================================
   AKIRU Portfolio — main.js
   ・ヘッダー挙動 / ハンバーガー / スクロールスパイ
   ・Intersection Observer によるフェードイン
   ・実績数値のカウントアップ
   ・ヒーローの軽量パララックス
   ・スキルのレベルドット描画
   ・作品モーダル（前後ナビ・キーボード対応）
   外部ライブラリ非依存（ネイティブAPIのみ）でリンク切れ・読込失敗を回避。
   ========================================================= */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 作品データ（モーダル表示用） ---------- */
  const WORKS = [
    {
      id: "mochimaru", img: "assets/works/mochimaru.svg", cat: "LINE STICKER",
      title: "もちまる の毎日",
      desc: "ふんわりやさしいしろくま「もちまる」。あいさつ・相づち・お礼など、毎日つい使いたくなる定番表現を40種そろえました。丸みのある線でやわらかな印象に。",
      role: "キャラクター設計・作画・申請まで一貫", tools: "Procreate / Photoshop", period: "約3週間"
    },
    {
      id: "mike", img: "assets/works/mike.svg", cat: "LINE STICKER",
      title: "みけねこ日和",
      desc: "気まぐれな三毛猫の関西弁スタンプ。ノリツッコミやおせっかいなど、会話が弾む“キャラの濃さ”が人気の理由。リアクション系を厚めに構成。",
      role: "キャラクター設計・セリフ監修・作画", tools: "Clip Studio / Illustrator", period: "約4週間"
    },
    {
      id: "pyoko", img: "assets/works/pyoko.svg", cat: "ANIMATION STICKER",
      title: "うさぎの ぴょこ",
      desc: "恋する乙女うさぎ「ぴょこ」。ぴょんと跳ねたりハートが飛んだり、24種すべてが動くアニメーションスタンプ。表情の機微にこだわりました。",
      role: "キャラクター設計・作画・アニメーション", tools: "Procreate / After Effects", period: "約5週間"
    },
    {
      id: "mame", img: "assets/works/mame.svg", cat: "LINE STICKER",
      title: "柴犬 まめ太郎",
      desc: "元気いっぱいの柴犬「まめ太郎」。敬語・ビジネス表現も網羅し、職場でも家族でも使える万能スタンプに。表情豊かなふきだし付き。",
      role: "キャラクター設計・作画・申請", tools: "Photoshop / Illustrator", period: "約3週間"
    },
    {
      id: "penta", img: "assets/works/penta.svg", cat: "LINE STICKER",
      title: "ぺんた と仲間たち",
      desc: "おっとり南極ペンギン「ぺんた」と愉快な仲間たち。驚き・喜び・うっかりなど、リアクションの幅広さが魅力の40種セット。",
      role: "キャラクター設計・作画", tools: "Clip Studio / Procreate", period: "約4週間"
    },
    {
      id: "ponta", img: "assets/works/ponta.svg", cat: "LINE STICKER",
      title: "ねむねむ ぽんた",
      desc: "いつも眠そうなパンダ「ぽんた」。ゆるっと脱力系の癒しスタンプ。お疲れさま・おやすみなど、夜に寄り添う表現を中心にデザイン。",
      role: "キャラクター設計・作画・申請", tools: "Procreate / Photoshop", period: "約3週間"
    }
  ];
  const indexById = Object.fromEntries(WORKS.map((w, i) => [w.id, i]));

  /* ---------- ヘッダー: スクロールで影 ---------- */
  const header = $("#siteHeader");
  const onScrollHeader = () => header.classList.toggle("scrolled", window.scrollY > 10);
  onScrollHeader();

  /* ---------- ハンバーガーメニュー ---------- */
  const hamburger = $("#hamburger");
  const gnav = $("#gnav");
  const closeMenu = () => {
    hamburger.classList.remove("open");
    gnav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "メニューを開く");
  };
  hamburger.addEventListener("click", () => {
    const open = gnav.classList.toggle("open");
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", String(open));
    hamburger.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  });
  // メニュー内リンクで閉じる
  $$(".gnav a").forEach((a) => a.addEventListener("click", closeMenu));

  /* ---------- スクロールスパイ（現在地ハイライト） ---------- */
  const sections = $$("main section[id]");
  const navLinks = $$(".nav-link");
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${id}`));
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- フェードイン（reveal） ---------- */
  // グリッドの子要素には出現ディレイを付与してリズムを出す
  $$(".works-grid, .skills-grid, .value-grid, .pricing-grid").forEach((grid) => {
    Array.from(grid.children).forEach((child, i) => {
      child.style.setProperty("--d", `${(i % 3) * 0.08}s`);
    });
  });
  const revealEls = $$(".reveal");
  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => revealObs.observe(el));
  }

  /* ---------- 実績数値カウントアップ ---------- */
  const counters = $$(".hero-stats .num");
  const runCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    if (prefersReduced) { el.textContent = target + suffix; return; }
    const dur = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const countObs = new IntersectionObserver(
    (entries, obs) => entries.forEach((e) => { if (e.isIntersecting) { runCount(e.target); obs.unobserve(e.target); } }),
    { threshold: 0.6 }
  );
  counters.forEach((c) => countObs.observe(c));

  /* ---------- スキルのレベルドット描画 ---------- */
  $$(".skill-level").forEach((el) => {
    const lv = parseInt(el.dataset.level, 10) || 0;
    el.innerHTML = "";
    for (let i = 0; i < 5; i++) {
      const dot = document.createElement("i");
      if (i < lv) dot.className = "on";
      el.appendChild(dot);
    }
  });

  /* ---------- ヒーローの軽量パララックス + フローティングUI ---------- */
  const heroVisual = $(".hero-visual");
  const blob1 = $(".hero-blob-1");
  const blob2 = $(".hero-blob-2");
  const floatingCta = $(".floating-cta");
  const toTop = $("#toTop");
  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      onScrollHeader();
      if (!prefersReduced) {
        if (heroVisual) heroVisual.style.transform = `translateY(${y * 0.12}px)`;
        if (blob1) blob1.style.transform = `translateY(${y * 0.2}px)`;
        if (blob2) blob2.style.transform = `translateY(${y * -0.12}px)`;
      }
      // フローティングCTA・トップへ戻る
      const show = y > 600;
      floatingCta.classList.toggle("show", show);
      toTop.classList.toggle("show", show);
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  });

  /* ---------- 作品モーダル ---------- */
  const modal = $("#workModal");
  const modalImg = $("#modalImg");
  const modalCat = $("#modalCat");
  const modalTitle = $("#modalTitle");
  const modalDesc = $("#modalDesc");
  const modalRole = $("#modalRole");
  const modalTools = $("#modalTools");
  const modalPeriod = $("#modalPeriod");
  const modalStore = $("#modalStore");
  let currentIndex = 0;
  let lastFocused = null;

  const renderModal = (i) => {
    currentIndex = (i + WORKS.length) % WORKS.length;
    const w = WORKS[currentIndex];
    modalImg.src = w.img;
    modalImg.alt = w.title;
    modalCat.textContent = w.cat;
    modalTitle.textContent = w.title;
    modalDesc.textContent = w.desc;
    modalRole.textContent = w.role;
    modalTools.textContent = w.tools;
    modalPeriod.textContent = w.period;
    modalStore.href = "https://store.line.me/";
  };

  const openModal = (id) => {
    renderModal(indexById[id] ?? 0);
    lastFocused = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-lock");
    $(".modal-close", modal).focus();
  };
  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-lock");
    if (lastFocused) lastFocused.focus();
  };

  // カード全体・詳細ボタンからオープン
  $$(".work-card").forEach((card) => {
    const id = card.dataset.work;
    card.addEventListener("click", () => openModal(id));
    // ボタン側はバブリングで親と二重発火しないように
    const btn = $(".work-detail-btn", card);
    if (btn) btn.addEventListener("click", (e) => { e.stopPropagation(); openModal(id); });
  });

  // 閉じる（×・オーバーレイ・data-close）
  $$("[data-close]", modal).forEach((el) => el.addEventListener("click", closeModal));
  // 前後ナビ
  $("#modalPrev").addEventListener("click", () => renderModal(currentIndex - 1));
  $("#modalNext").addEventListener("click", () => renderModal(currentIndex + 1));

  // キーボード操作
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") closeModal();
    else if (e.key === "ArrowLeft") renderModal(currentIndex - 1);
    else if (e.key === "ArrowRight") renderModal(currentIndex + 1);
  });
})();
