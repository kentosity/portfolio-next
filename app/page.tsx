import type { ReactNode } from "react";
import Image from "next/image";

type Highlight = {
  label: string;
  value: string;
};

type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

type Project = {
  title: string;
  tags: string[];
  oneLiner: string;
  metrics?: Highlight[];
  stack: string;
  role: string;
  category?: string;
  link?: string;
  cta?: string;
};

type SkillGroup = {
  title: string;
  items: string[];
};

const experiences: Experience[] = [
  {
    company: "Generosity Inc.",
    role: "フルスタックエンジニア",
    period: "2024年5月 - 2026年1月",
    location: "東京",
    summary:
      "急成長中のエクスペリエンスエージェンシーでイベント管理ソリューションを開発。信頼性とコスト最適化、開発スピードを重視。",
    highlights: [
      "WeCALL: アーキテクチャ刷新でインフラ費98.5%削減（$200k→$3k/年）",
      "WeNo: 数千同時アクセスのチケット発行を安定稼働",
      "全社の障害対応・アーキテクチャ判断をリード",
    ],
  },
  {
    company: "Introduction Inc.",
    role: "CTO / リードエンジニア",
    period: "2019年 - 2024年4月",
    location: "東京",
    summary:
      "5人スタートアップで技術全般をリード。エンジニアリングからデザイン、営業、PMまで一気通貫でプロダクトを成長させた。",
    highlights: [
      "SNAP: ブライダル向けB2B SaaSフォトブースを立ち上げ、継続収益を創出",
      "Ongy: 競合調査用Instagramストーリービューアーを開発",
      "役割横断で顧客開拓・企画・開発・運用を担当",
    ],
  },
];

const featuredProjects: Project[] = [
  {
    title: "WeCALL — イベント管理リアーキテクチャ",
    tags: ["Serverless", "Cost Opt", "AWS", "Nuxt", "DynamoDB"],
    oneLiner:
      "サーバーレスアーキテクチャへの移行により、インフラコストを年間$200kから$3kへ98.5%削減。開発速度の大幅な向上も実現。",
    cta: "ケーススタディを見る",
    link: "/projects/wecall",
    metrics: [
      { label: "コスト", value: "$200k → $3k / 年" },
      { label: "開発速度", value: "2週間 → 2-3日" },
      { label: "構成", value: "Lambda + DynamoDB" },
    ],
    stack: "Nuxt.js (TS), Lambda, DynamoDB, Cognito, CloudFront, Zod, Kinesis",
    role: "フロント再設計とモジュール設計、サーバーレス基盤構築を主導",
  },
  {
    title: "WeNo — 高負荷チケット発券",
    tags: ["High Load", "Queue", "LINE", "AWS", "BullMQ"],
    oneLiner:
      "1000req/sec超の同時アクセスに対応するLINEチケット販売システム。キューイング制御とオートスケーリングでゼロダウンタイムを実現。",
    cta: "詳細を相談する",
    link: "/projects/weno",
    metrics: [
      { label: "同時購入", value: "1000+ req/sec" },
      { label: "稼働", value: "ゼロダウンタイム" },
      { label: "制御", value: "BullMQ Queueing" },
    ],
    stack: "Vite + Vue, Next.js, BullMQ, PostgreSQL, Redis, ECS, CloudFront, LINE API",
    role: "全面リプレイスをリードし、レースコンディションを解消・オートスケール設計",
  },
  {
    title: "SNAP — ブライダル向けフォトブース (B2B SaaS)",
    tags: ["SaaS", "B2B", "Full-Stack", "BizDev"],
    oneLiner: "結婚式場向けサブスクリプション型フォトブースサービス。タブレット1台で完結し、安定的な継続収益を実現。",
    cta: "プロダクト概要を知る",
    link: "/projects/snap",
    metrics: [
      { label: "料金モデル", value: "最大 ¥300k/月" },
      { label: "回収", value: "約10式で損益分岐" },
      { label: "担当", value: "設計→販売→サポート" },
    ],
    stack: "React, Node.js, AWS, Salsa API",
    role: "事業オーナー兼エンジニアとして設計・開発・営業・オンボーディングを担当",
  },
  {
    title: "Ongy — Instagramストーリービューアー",
    tags: ["Scraping", "Analytics", "AWS", "Automation"],
    oneLiner:
      "代理店向け競合調査プラットフォーム。Instagramストーリーの自動アーカイブと分析により、マーケティング戦略立案を支援。",
    cta: "UIデモを相談",
    link: "/projects/ongy",
    metrics: [
      { label: "用途", value: "競合調査・事例収集" },
      { label: "体験", value: "アニメーション付きSPA" },
      { label: "技術", value: "Puppeteer + AWS" },
    ],
    stack: "React, Node.js, Instagram Graph API, AWS, Puppeteer",
    role: "デザインからフロント・バック・デプロイまで単独開発",
  },
  {
    title: "Lulu — LINE家計簿ボット",
    tags: ["LINE", "Serverless", "GAS", "Personal"],
    oneLiner:
      "LINE MessagingとGoogle Sheetsを活用した個人向け家計簿アプリケーション。インフラコストゼロで継続的な利用が可能。",
    cta: "仕組みを聞く",
    link: "/projects/lulu",
    metrics: [
      { label: "コスト", value: "¥0" },
      { label: "継続", value: "Chat-based Logging" },
      { label: "機能", value: "カレンダー表示" },
    ],
    stack: "LINE Messaging API, LIFF, Google Apps Script, Sheets, JavaScript",
    role: "チャット体験設計・バックエンド・データ設計を単独で担当",
  },
  {
    title: "meiso. — マインドフルネス企業サイト",
    tags: ["Design", "Branding", "Web Dev"],
    oneLiner: "マインドフルネス事業のブランドアイデンティティを視覚化したコーポレートサイト。カスタムイラストレーションにより独自性を表現。",
    cta: "デザインプロセスを見る",
    link: "/projects/meiso",
    metrics: [
      { label: "トーン", value: "落ち着き・親しみ" },
      { label: "範囲", value: "Design to Deploy" },
      { label: "特徴", value: "Custom Illustrations" },
    ],
    stack: "HTML, CSS, JavaScript, custom illustrations",
    role: "デザイン・イラスト制作・フロント実装を一貫担当",
  },
];

const projectGrid: Project[] = [
  { title: "WeCALL", tags: ["Serverless", "AWS"], oneLiner: "インフラコスト98.5%削減を実現したサーバーレスイベント基盤", stack: "Nuxt, Lambda, DynamoDB", role: "アーキ設計", category: "Featured", link: "/projects/wecall", cta: "詳しく" },
  { title: "WeNo", tags: ["High Load", "LINE"], oneLiner: "1000+req/secの高負荷に対応するチケット発券システム", stack: "Vue, Next.js, BullMQ", role: "リードエンジニア", category: "Featured", link: "/projects/weno", cta: "詳しく" },
  { title: "WeFit", tags: ["EventTech", "LINE"], oneLiner: "7000人規模のイベントに対応するLINE連携試着予約システム", stack: "NestJS, Vue, AWS, DDD", role: "PM / Full-Stack", link: "/projects/wefit", cta: "聞いてみる" },
  { title: "WeCart", tags: ["Inventory", "Real-time"], oneLiner: "Socket.ioによるリアルタイム在庫・注文管理システム", stack: "Vue, NestJS, Socket.io", role: "フルスタック", link: "/projects/wecart", cta: "聞いてみる" },
  { title: "SNAP", tags: ["SaaS", "B2B"], oneLiner: "結婚式場向けサブスクリプション型フォトブースSaaS", stack: "React, AWS", role: "オーナー/エンジニア", link: "/projects/snap", cta: "概要" },
  { title: "Ongy", tags: ["Scraping", "Analytics"], oneLiner: "代理店向けInstagramストーリー競合調査プラットフォーム", stack: "React, Puppeteer", role: "単独開発", link: "/projects/ongy" },
  { title: "Inuinugram", tags: ["Growth", "Automation"], oneLiner: "自動化とグロースハックにより3万フォロワーを獲得し売却に成功した犬特化型メディア", stack: "Python, Puppeteer", role: "Growth Engineer", link: "/projects/inuinugram" },
  { title: "Lulu", tags: ["LINE", "Serverless"], oneLiner: "Google Apps Scriptを活用したコストゼロのLINE家計簿アプリケーション", stack: "GAS, LIFF", role: "単独開発", link: "/projects/lulu" },
  { title: "iPLUSi", tags: ["Web", "WordPress"], oneLiner: "モダンなWordPress構成による建築事務所ポートフォリオサイト", stack: "WordPress (Sage), PHP", role: "Full-Stack", link: "/projects/iplusi" },
  { title: "INTD", tags: ["Corporate", "CMS"], oneLiner: "カスタムWordPressテーマによるコーポレートサイトリニューアル", stack: "WordPress, PHP, Figma", role: "Lead", link: "/projects/intd" },
  { title: "meiso.", tags: ["Design", "Branding"], oneLiner: "ブランドアイデンティティを体現するマインドフルネス企業コーポレートサイト", stack: "HTML, CSS, JS", role: "デザイナー/開発", link: "/projects/meiso" },
  { title: "Lounge Attendance", tags: ["B2B", "GAS"], oneLiner: "QRコードとGoogle Apps Scriptによるコスト効率的な来訪管理システム", stack: "GAS, Sheets, QR", role: "Single Dev", link: "/projects/lounge-attendance" },
  { title: "Life in Weeks", tags: ["Personal", "Visualization"], oneLiner: "人生を週単位グリッドでビジュアライズする時間管理ツール", stack: "Vue, Nuxt", role: "Solo Dev", link: "/projects/life-in-weeks" },
  { title: "Sheer", tags: ["Media", "Management"], oneLiner: "若年層女性をターゲットとしたInstagramメディアの運営管理", stack: "Instagram, Figma", role: "Team Manager", link: "/projects/sheer" },
  { title: "Miss Circle", tags: ["Scraping", "Automation"], oneLiner: "コンテスト参加者向けSNSエンゲージメント分析ツール", stack: "Vue, Node, Puppeteer", role: "Full-Stack", link: "/projects/miss-circle" },
  { title: "FACT", tags: ["Sales", "Reputation"], oneLiner: "企業向けレピュテーション管理・分析SaaSプラットフォーム", stack: "Sales, Marketing", role: "Sales & Marketing Lead", link: "/projects/fact" },
  { title: "Book Price", tags: ["Tooling", "Resale"], oneLiner: "メルカリ市場データを活用した書籍価格分析ツール", stack: "Vue, GAS, API", role: "Solo Dev", link: "/projects/book-price" },
  { title: "Monoton", tags: ["BizDev", "Retail"], oneLiner: "セルフ写真スタジオ事業の創業から運営までを担当", stack: "Business Dev, Ops", role: "Founder", link: "/projects/monoton" },
  { title: "ACE", tags: ["PoC", "Affiliate"], oneLiner: "複数ASPを統合したアフィリエイト成果管理プラットフォーム", stack: "RPA, JS, BizDev", role: "Product Owner", link: "/projects/ace" },
  { title: "WAISEC", tags: ["Event", "Leadership"], oneLiner: "国際高校生シンポジウムのWebサイト制作および運営統括", stack: "HTML/CSS, Management", role: "Committee Lead", link: "/projects/waisec" },
  { title: "Hana", tags: ["Presentation", "Global"], oneLiner: "国際シンポジウムにおける英語プレゼンテーションとビジュアルデザイン", stack: "Presentation, Design", role: "Presenter", link: "/projects/hana" },
];

const skills: SkillGroup[] = [
  { title: "フロントエンド", items: ["React", "Next.js", "Vue", "Nuxt", "TypeScript", "Tailwind", "Animations"] },
  { title: "バックエンド・API", items: ["Node.js", "NestJS", "Express", "REST", "GraphQL", "Webhooks", "OAuth"] },
  { title: "データ・インフラ", items: ["PostgreSQL", "MySQL", "Redis", "DynamoDB", "MongoDB", "Firebase"] },
  { title: "クラウド・DevOps", items: ["AWS Lambda", "ECS (Fargate)", "CloudFront", "S3", "Docker", "CI/CD"] },
  { title: "デザイン・プロダクト", items: ["Figma", "UI/UX", "Design Systems", "Illustration", "Product Strategy"] },
  { title: "ツール・手法", items: ["GitHub", "Agile", "Zod", "BullMQ", "Google Apps Script"] },
];

const emails = ["kento.iizuka@icloud.com"];

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-accent/10 to-pink-200/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent border border-accent/30">
      {children}
    </span>
  );
}

function Tag({ label }: { label: string }) {
  const colors = [
    "from-blue-50 to-blue-100 text-blue-700 border-blue-200",
    "from-purple-50 to-purple-100 text-purple-700 border-purple-200",
    "from-pink-50 to-pink-100 text-pink-700 border-pink-200",
    "from-cyan-50 to-cyan-100 text-cyan-700 border-cyan-200",
    "from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-200",
  ];
  const color = colors[label.charCodeAt(0) % colors.length];
  return (
    <span className={`rounded-full border bg-gradient-to-r px-3 py-1 text-xs font-medium transition hover:scale-110 ${color}`}>
      {label}
    </span>
  );
}

function SectionHeader({ title, eyebrow, description }: { title: string; eyebrow?: string; description?: string }) {
  return (
    <div className="flex flex-col gap-3">
      {eyebrow ? <Badge>✨ {eyebrow}</Badge> : null}
      <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 bg-clip-text text-transparent sm:text-5xl">{title}</h2>
      {description ? <p className="text-base leading-relaxed text-slate-700">{description}</p> : null}
    </div>
  );
}

function ExperienceCard({ item }: { item: Experience }) {
  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-blue-50/30 to-slate-50 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition duration-300 hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] hover:-translate-y-1">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/0 to-purple-400/0 opacity-0 group-hover:opacity-5 transition duration-300" />
      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-widest font-semibold text-blue-600">{item.company}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{item.role}</h3>
        </div>
        <div className="text-right text-sm text-slate-600 font-medium">
          <p className="font-semibold text-slate-700">{item.period}</p>
          <p>{item.location}</p>
        </div>
      </div>
      <p className="mt-4 text-slate-700 font-medium leading-relaxed">{item.summary}</p>
      <ul className="mt-4 space-y-3 text-sm text-slate-700">
        {item.highlights.map((hl) => (
          <li key={hl} className="flex items-start gap-3 pl-1">
            <span className="mt-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0"></span>
            <span className="leading-snug">{hl}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeaturedProjectCard({ project }: { project: Project }) {
  // Map project titles to file slugs
  const projectSlugs: { [key: string]: string } = {
    "WeCALL — イベント管理リアーキテクチャ": "wecall",
    "WeNo — 高負荷チケット発券": "weno",
    "SNAP — ブライダル向けフォトブース (B2B SaaS)": "snap",
    "Ongy — Instagramストーリービューアー": "ongy",
    "Lulu — LINE家計簿ボット": "lulu",
    "meiso. — マインドフルネス企業サイト": "meiso",
  };
  const projectSlug = projectSlugs[project.title] || project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const href = project.link ?? `/projects/${projectSlug}`;
  const cta = project.cta ?? "詳しく話す";
  return (
    <a
      href={href}
      className="group relative block overflow-hidden rounded-2xl border border-border bg-linear-to-br from-white via-slate-50 to-slate-100 p-0.5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-accent"
    >
      <div className="relative h-full rounded-[18px] bg-card p-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>📋 Case Study</Badge>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
        <h3 className="mt-4 text-3xl font-semibold text-slate-900">{project.title}</h3>
        <p className="mt-2 text-slate-700">{project.oneLiner}</p>
        {project.metrics ? (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-border bg-slate-50 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">{metric.label}</p>
                <p className="text-sm font-bold text-slate-900">{metric.value}</p>
              </div>
            ))}
          </div>
        ) : null}
        <div className="mt-4 space-y-1 text-sm text-slate-700">
          <p><span className="text-slate-500">Stack:</span> {project.stack}</p>
          <p><span className="text-slate-500">担当:</span> {project.role}</p>
        </div>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          {cta}
          <span aria-hidden>→</span>
        </div>
      </div>
    </a>
  );
}

function ProjectGridCard({ project }: { project: Project }) {
  const hasLink = Boolean(project.link);
  const Container: any = hasLink ? 'a' : 'div';
  const containerProps = hasLink ? { href: project.link } : {};
  return (
    <Container
      {...containerProps}
      className="flex flex-col gap-3 rounded-xl border border-border bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-accent"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-lg font-semibold text-slate-900">{project.title}</h4>
          <p className="text-sm text-slate-700">{project.oneLiner}</p>
        </div>
        <span className="text-[10px] uppercase tracking-wide text-slate-500">{project.category ?? "Project"}</span>
        {!hasLink ? <Badge>Coming Soon</Badge> : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
      <p className="text-xs text-slate-500">Stack: {project.stack}</p>
      <p className="text-xs text-slate-500">担当: {project.role}</p>
      {hasLink ? <span className="text-sm font-semibold text-accent">{project.cta ?? "詳細・相談"} →</span> : null}
    </Container>
  );
}

function SkillCard({ group }: { group: SkillGroup }) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-xl border border-border bg-white p-4">
      <p className="text-sm uppercase tracking-wide text-accent">{group.title}</p>
      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <Tag key={item} label={item} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative isolate min-h-screen w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.15),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(251,113,133,0.12),transparent_30%)]" />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-24 pt-12 sm:px-6 sm:pt-20">
        <section className="grid items-center gap-12 rounded-3xl border border-border bg-linear-to-br from-white via-slate-50 to-slate-100 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8 lg:grid-cols-2" id="home">
          <div className="flex flex-col items-center gap-2 order-2 lg:order-1">
            <div className="relative w-full max-w-60 lg:max-w-xs">
              <div className="absolute -left-8 -top-8 h-48 w-48 rounded-full bg-accent/12 blur-3xl" />
              <div className="absolute -bottom-8 -right-6 h-40 w-40 rounded-full bg-accent-2/12 blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-[0_20px_60px_rgba(37,99,235,0.15)] mb-2">
                <Image
                  src="/profile.jpg"
                  alt="飯塚健杜"
                  width={320}
                  height={400}
                  className="object-cover"
                  priority
                />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 text-center">飯塚健杜</h2>
              <p className="text-sm text-slate-600 text-center">Full-Stack Engineer</p>
            </div>
            <div className="w-full max-w-xs rounded-2xl border border-border bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Snapshot</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-600">開発歴</span>
                  <strong className="font-bold text-slate-900">6 年</strong>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-600">得意スタック</span>
                  <strong className="font-bold text-slate-900 text-right">React / Next / AWS</strong>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-600">専門領域</span>
                  <strong className="font-bold text-slate-900 text-right">Full-Stack / SaaS</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 lg:order-1">
            <div className="space-y-2">
              <Badge>Full-Stack Engineer ・ Product Developer</Badge>
              <h1 className="text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
                技術で、<br className="hidden sm:block" />プロダクトを<br className="hidden sm:block" />前に進める。
              </h1>
            </div>
            <p className="text-lg leading-relaxed text-slate-700 max-w-md">
              スタートアップの成長を支えるフルスタックエンジニア。
              React/Next から AWS まで、実装と改善のサイクルを高速で回します。
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(37,99,235,0.3)]"
              >
                プロジェクトを見る
                <span aria-hidden>→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-accent hover:text-accent"
              >
                気軽に相談する
              </a>
              <a
                href="https://github.com/kentosity"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-accent hover:underline"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="flex flex-col gap-8">
          <SectionHeader
            eyebrow="プロフィール"
            title="デザイン出身のセルフスタートエンジニア"
            description="東京拠点。5人スタートアップのインターンからCTOを経て、Generosityでアーキテクチャをリード。曖昧さの中で素早く形にし、使われるプロダクトに仕上げます。"
          />
          <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
            <div className="space-y-4 rounded-2xl border border-border bg-white p-6">
              <p className="text-slate-700">直近で
                自分のデザインを形にしたくてコードを学び、気づけばフロントからAPI、インフラまで一気通貫で担うように。コストを抑えつつ拡張しやすい構成をつくるのが得意です。
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "React/NextからAWSまでをカバーするフルスタック",
                  "デザイン→実装→検証まで回すプロダクト思考",
                  "負荷・障害時のボトルネック解消と再発防止策の設計",
                  "小さく速く出し、学びながら磨くスタートアップ流",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-xl border border-border bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3 rounded-2xl border border-border bg-white p-6">
              <p className="text-sm uppercase tracking-wide text-slate-500">Timeline</p>
              <div className="space-y-3 text-sm text-slate-700">
                {["2019 → インターン開始 (Introduction)", "2020 → Lulu / Ongy / meiso を開発", "2021 → SNAP を開発", "2024 → Generosityへジョイン", "2024-2025 → WeCALL再構築・WeNo開発をリード"].map((line) => (
                  <div key={line} className="flex items-center gap-3 rounded-xl border border-border bg-slate-50 px-4 py-3">
                    <span className="h-2 w-2 rounded-full bg-accent"></span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="flex flex-col gap-8">
          <SectionHeader
            eyebrow="職務経歴"
            title="アーキテクチャとスピードで成果を出す"
            description="ケーススタディに展開可能な主要トピックを抜粋。"
          />
          <div className="grid gap-6">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.company} item={exp} />
            ))}
          </div>
        </section>

        <section id="projects" className="flex flex-col gap-10">
          <SectionHeader
            eyebrow="プロジェクト"
            title="注力した6つのケーススタディ"
            description="アーキテクチャの判断、数値インパクト、エンドツーエンドの推進力を示す事例。"
          />
          <div className="grid gap-8 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <FeaturedProjectCard key={project.title} project={project} />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <SectionHeader
              title="その他のプロジェクト"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(() => {
              const featuredTitleSet = new Set(featuredProjects.map((p) => p.title.split(" —")[0]));
              const filtered = projectGrid.filter((p) => !featuredTitleSet.has(p.title));
              return filtered;
            })().map((project) => (
              <ProjectGridCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section id="skills" className="flex flex-col gap-8">
          <SectionHeader
            eyebrow="スキル"
            title="フロント・バック・クラウドを横断"
            description="デザインの感性と本番運用を見据えたエンジニアリング。"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <SkillCard key={group.title} group={group} />
            ))}
          </div>
        </section>

        <section id="contact" className="flex flex-col gap-6 rounded-3xl border border-border bg-linear-to-br from-white via-slate-50 to-slate-100 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
          <SectionHeader
            eyebrow="連絡先"
            title="一緒に面白いものをつくりませんか"
            description="新しい機会、協業、技術的に骨のある課題の相談を歓迎します。"
          />
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wide text-slate-500">Email</p>
              {emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="block rounded-xl border border-border bg-white px-4 py-3 text-slate-900 transition hover:border-accent hover:text-accent"
                >
                  {email}
                </a>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wide text-slate-500">Social</p>
              <div className="grid gap-2 text-slate-700">
                <a className="transition hover:text-accent hover:underline" href="https://github.com/kentosity" target="_blank" rel="noreferrer">
                  GitHub (new) ↗
                </a>
                <a className="transition hover:text-accent hover:underline" href="https://github.com/kentozuka" target="_blank" rel="noreferrer">
                  GitHub (old) ↗
                </a>
                <a className="transition hover:text-accent hover:underline" href="https://www.linkedin.com/in/kento-iizuka-a79289273/" target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
                <a className="transition hover:text-accent hover:underline" href="https://www.wantedly.com/id/kentoiizuka" target="_blank" rel="noreferrer">
                  Wantedly ↗
                </a>
                <a className="transition hover:text-accent hover:underline" href="https://lapras.com/public/RVEPJY7" target="_blank" rel="noreferrer">
                  Lapras ↗
                </a>
              </div>
            </div>
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="text-sm uppercase tracking-wide text-slate-400">Downloads</p>
              <p className="text-slate-600">履歴書・職務経歴書は準備中です。詳細は<a href="mailto:kento.iizuka@icloud.com" className="font-semibold text-accent hover:underline">メール</a>でお気軽にお問い合わせください。</p>
              <div className="flex flex-wrap gap-2 opacity-50">
                <Tag label="英語レジュメ" />
                <Tag label="日本語履歴書" />
                <Tag label="職務経歴書" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
