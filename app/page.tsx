import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "飯塚健杜 | フリーランス フルスタックエンジニア",
  description:
    "フリーランス フルスタックエンジニア 飯塚健杜。React / Next.js / AWS を活用したWebアプリ開発・技術コンサルティング・MVP開発を提供しています。",
  keywords: [
    "フリーランスエンジニア",
    "フルスタックエンジニア",
    "Web開発",
    "システム開発",
    "Next.js",
    "React",
    "AWS",
    "業務委託",
    "飯塚健杜",
  ],
};

const services = [
  {
    id: "dev",
    label: "DEVELOPMENT",
    title: "Web・アプリ開発",
    description:
      "要件定義から設計・実装・リリースまで一気通貫で対応。React / Next.js によるフロントエンドから AWS を活用したインフラまで、プロダクト全体を担います。",
    price: "¥400,000〜",
    unit: "/ 月",
    items: [
      "要件定義・技術選定",
      "フロントエンド開発（React / Next.js / Vue）",
      "バックエンド API 開発（Node.js / NestJS）",
      "クラウドインフラ構築（AWS）",
      "週次進捗報告・Slack 連携",
    ],
  },
  {
    id: "consulting",
    label: "CONSULTING",
    title: "技術コンサルティング",
    description:
      "アーキテクチャレビュー・技術選定・チームの技術課題解決をサポート。スポット相談から継続的な技術顧問まで柔軟に対応します。",
    price: "¥50,000〜",
    unit: "/ 時間",
    items: [
      "アーキテクチャレビュー・改善提案",
      "技術選定・評価レポート",
      "コードレビュー",
      "パフォーマンス改善",
      "障害対応・根本原因分析",
    ],
  },
  {
    id: "mvp",
    label: "MVP BUILD",
    title: "MVP・PoC 開発",
    description:
      "アイデアを素早く形に。スタートアップの MVP 開発や新機能の PoC 開発を、最短ルートで実現します。固定費用でスコープを明確に。",
    price: "¥500,000〜",
    unit: "/ プロジェクト",
    items: [
      "要件整理・技術方針策定",
      "プロトタイプ〜 MVP 実装",
      "本番環境デプロイ",
      "ソースコード・ドキュメント納品",
      "リリース後サポート（1 ヶ月）",
    ],
  },
];

const processSteps = [
  {
    step: "01",
    title: "ヒアリング",
    desc: "課題・目標・予算・スケジュールをオンラインでお聞きします。30〜60 分のミーティングをご用意ください。",
  },
  {
    step: "02",
    title: "提案・見積",
    desc: "技術方針、開発範囲、費用感をご提案します。通常 3 営業日以内にご回答します。",
  },
  {
    step: "03",
    title: "契約・開始",
    desc: "業務委託契約を締結後、開発を開始します。NDA 対応も可能です。",
  },
  {
    step: "04",
    title: "開発・定期報告",
    desc: "週次で進捗を報告します。Slack・Notion・GitHub 等のツールに柔軟に対応します。",
  },
  {
    step: "05",
    title: "リリース・引き渡し",
    desc: "本番環境へのデプロイ、ドキュメント整備、必要に応じた保守サポートを行います。",
  },
];

const results = [
  { value: "98.5%", label: "インフラコスト削減率", sub: "年間 $200k → $3k" },
  { value: "1,000+", label: "req/sec 処理", sub: "ゼロダウンタイム達成" },
  { value: "6年+", label: "開発経験", sub: "スタートアップ〜上場企業" },
  { value: "20+", label: "プロジェクト実績", sub: "設計〜リリースまで" },
];

const caseStudies = [
  {
    tag: "イベントテック",
    title: "イベント管理基盤 リアーキテクチャ",
    desc: "サーバーレスへの移行で年間インフラコストを $200k から $3k へ 98.5% 削減。開発サイクルも 2 週間から 2〜3 日に短縮。",
    stack: "Nuxt.js · Lambda · DynamoDB · CloudFront",
    link: "/portfolio/projects/wecall",
  },
  {
    tag: "高負荷システム",
    title: "高負荷チケット発券システム",
    desc: "1,000 req/sec 超の同時アクセスに対応するチケット販売基盤を構築。BullMQ キューイングでゼロダウンタイムを実現。",
    stack: "Vue · Next.js · BullMQ · Redis · ECS",
    link: "/portfolio/projects/weno",
  },
  {
    tag: "B2B SaaS",
    title: "SNAP — ブライダル向けフォトブース",
    desc: "結婚式場向けサブスクリプション型フォトブース SaaS を設計・開発・営業まで一人で担当。最大 ¥300k/月の継続収益を創出。",
    stack: "React · Node.js · AWS",
    link: "/portfolio/projects/snap",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#0a0a14", minHeight: "100vh" }}
        id="home"
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute"
          style={{
            top: "-20%",
            left: "60%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
            transform: "translateX(-50%)",
          }}
        />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-24 pt-20 sm:px-6 sm:pt-28 lg:flex-row lg:items-center lg:gap-24">
          {/* Text */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
              style={{ borderColor: "rgba(249,115,22,0.3)", backgroundColor: "rgba(249,115,22,0.07)" }}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#f97316" }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#f97316" }}>
                フリーランス · フルスタックエンジニア
              </span>
            </div>

            <h1
              className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
              style={{ color: "#f8f8f8" }}
            >
              技術で、<br />
              事業を<br />
              <span style={{ color: "#f97316" }}>前に進める。</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              React / Next.js から AWS まで、フロントエンド・バックエンド・インフラを一気通貫で担うフリーランスエンジニアです。
              スタートアップの開発支援から技術コンサルティング・MVP 開発まで対応します。
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-semibold transition"
                style={{ backgroundColor: "#f97316", color: "#fff" }}
              >
                サービスを見る
                <span aria-hidden>↓</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-base font-semibold transition"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}
              >
                無料相談する
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:w-80 lg:flex-shrink-0 lg:grid-cols-1">
            {[
              { value: "6年+", label: "開発経験" },
              { value: "20+", label: "プロジェクト実績" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-5"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-3xl font-bold" style={{ color: "#f97316" }}>{stat.value}</p>
                <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
          style={{ background: "linear-gradient(to bottom, transparent, #0a0a14)" }}
        />
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-24 sm:py-32" style={{ backgroundColor: "#faf9f6" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-16 flex flex-col gap-3">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#f97316" }}>
              SERVICE / サービス
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              提供できること
            </h2>
            <p className="mt-2 max-w-2xl text-lg leading-relaxed text-slate-600">
              開発から相談・コンサルティングまで、事業フェーズに合わせた支援を提供します。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                style={{ border: "1px solid #e8e5e0" }}
              >
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#f97316" }}>
                  {svc.label}
                </p>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{svc.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{svc.description}</p>
                </div>
                <div className="mt-auto pt-4" style={{ borderTop: "1px solid #f0ede8" }}>
                  <p className="text-xs text-slate-400 mb-1">料金目安</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {svc.price}
                    <span className="text-sm font-medium text-slate-400 ml-1">{svc.unit}</span>
                  </p>
                </div>
                <ul className="space-y-2.5">
                  {svc.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="mt-0.5 flex-shrink-0 font-bold" style={{ color: "#f97316" }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            ※ 上記はあくまで目安です。規模・内容により変動します。まずはお気軽にご相談ください。
          </p>
        </div>
      </section>

      {/* ── Process ── */}
      <section
        id="process"
        className="py-24 sm:py-32"
        style={{ backgroundColor: "#0a0a14" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-16 flex flex-col gap-3">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#f97316" }}>
              PROCESS / 進め方
            </p>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "#f8f8f8" }}>
              依頼から納品まで
            </h2>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
              style={{ backgroundColor: "rgba(249,115,22,0.2)" }}
            />

            <div className="flex flex-col gap-0">
              {processSteps.map((step, i) => (
                <div
                  key={step.step}
                  className="relative flex gap-8 sm:gap-12"
                  style={{ paddingBottom: i < processSteps.length - 1 ? "2.5rem" : 0 }}
                >
                  {/* Step number */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold"
                      style={{ backgroundColor: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.4)", color: "#f97316" }}
                    >
                      {step.step}
                    </div>
                  </div>

                  <div className="pb-2 pt-2">
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#f8f8f8" }}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section id="results" className="py-24 sm:py-32" style={{ backgroundColor: "#faf9f6" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-16 flex flex-col gap-3">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#f97316" }}>
              RESULTS / 実績
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              数字で見る成果
            </h2>
          </div>

          {/* Metrics */}
          <div className="mb-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {results.map((r) => (
              <div
                key={r.label}
                className="rounded-2xl bg-white p-6 text-center shadow-sm"
                style={{ border: "1px solid #e8e5e0" }}
              >
                <p className="text-4xl font-bold" style={{ color: "#0a0a14" }}>{r.value}</p>
                <p className="mt-1 text-sm font-semibold text-slate-700">{r.label}</p>
                <p className="mt-1 text-xs text-slate-400">{r.sub}</p>
              </div>
            ))}
          </div>

          {/* Case studies */}
          <div className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((c) => (
              <a
                key={c.title}
                href={c.link}
                className="group flex flex-col gap-4 rounded-2xl bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
                style={{ border: "1px solid #e8e5e0" }}
              >
                <span
                  className="self-start rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: "rgba(249,115,22,0.1)", color: "#ea580c" }}
                >
                  {c.tag}
                </span>
                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-orange-600 transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 flex-1">{c.desc}</p>
                <p className="text-xs text-slate-400">{c.stack}</p>
                <span className="text-sm font-semibold" style={{ color: "#f97316" }}>
                  詳細を見る →
                </span>
              </a>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
              style={{ borderColor: "#d4d1cc" }}
            >
              すべての実績を見る
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section
        id="about"
        className="py-24 sm:py-32"
        style={{ backgroundColor: "#0a0a14" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:items-center">
            <div className="space-y-6">
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#f97316" }}>
                ABOUT / について
              </p>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "#f8f8f8" }}>
                飯塚健杜
              </h2>
              <p className="text-base font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
                Kento Iizuka — Freelance Full-Stack Engineer
              </p>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                デザインを形にしたくてコードを学び、気づけばフロントからAPI、インフラまで一気通貫で担うように。
                5人スタートアップのインターンから CTO を経て、エンタープライズ向けのイベント管理基盤の再設計・高負荷システムの構築をリード。
              </p>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                現在はフリーランスとして、スタートアップや中小企業の開発支援・コンサルティングを行っています。
                技術選定からリリースまで、プロダクトの成長に伴走します。
              </p>

              <div className="grid grid-cols-2 gap-3 pt-4">
                {[
                  "React / Next.js / Vue",
                  "Node.js / NestJS",
                  "AWS（Lambda・ECS・CloudFront）",
                  "PostgreSQL / Redis / DynamoDB",
                  "Figma / UI 設計",
                  "アーキテクチャ設計",
                ].map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#f97316" }} />
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div
                className="overflow-hidden rounded-2xl"
                style={{ border: "2px solid rgba(249,115,22,0.25)" }}
              >
                <Image
                  src="/profile.jpg"
                  alt="飯塚健杜"
                  width={360}
                  height={450}
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex gap-3">
                {[
                  { label: "GitHub", href: "https://github.com/kentosity" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/kento-iizuka-a79289273/" },
                  { label: "Lapras", href: "https://lapras.com/public/RVEPJY7" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg px-4 py-2 text-xs font-semibold transition"
                    style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 sm:py-32" style={{ backgroundColor: "#faf9f6" }}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="mb-4 text-xs font-bold tracking-widest uppercase" style={{ color: "#f97316" }}>
            CONTACT / お問い合わせ
          </p>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            お仕事の相談、<br className="sm:hidden" />大歓迎です
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-slate-600">
            開発のご依頼、技術相談、お見積もりなど、お気軽にメールください。
            <br />
            通常 1〜2 営業日以内にご返信します。
          </p>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-3 rounded-xl px-8 py-4 text-lg font-bold text-white transition"
              style={{ backgroundColor: "#0a0a14" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              お問い合わせ
            </a>
            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-xl border-2 px-8 py-4 text-base font-semibold transition hover:border-slate-400"
              style={{ borderColor: "#d4d1cc", color: "#0a0a14" }}
            >
              ポートフォリオを見る →
            </a>
          </div>

          <div
            className="mt-16 rounded-2xl p-8"
            style={{ backgroundColor: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.2)" }}
          >
            <p className="text-sm font-semibold text-slate-700 mb-1">屋号・事業者名</p>
            <p className="text-xl font-bold text-slate-900">iplusi（個人事業主）</p>
            <p className="mt-3 text-sm text-slate-600">
              フリーランスエンジニアとして Web・アプリ開発、技術コンサルティング、MVP 開発を提供しています。<br />
              業務委託契約・準委任契約・請負契約に対応。NDA 締結可。
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-8"
        style={{ backgroundColor: "#0a0a14", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © 2025 飯塚健杜. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { label: "ポートフォリオ", href: "/portfolio" },
              { label: "GitHub", href: "https://github.com/kentosity" },
              { label: "お問い合わせ", href: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs transition"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
