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
      "インフラコストを98.5%削減($200k→$3k/年)し、開発期間を劇的に短縮したサーバーレスイベント基盤。",
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
      "数千人が一斉に購入するLINEチケット販売を、並行制御とAWS最適化で安定稼働。",
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
    oneLiner: "結婚式場向け、タブレット一つで完結するサブスク型フォトブースソリューション。",
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
      "Instagramストーリーを自動アーカイブ・分析する、代理店向け競合調査プラットフォーム。",
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
      "LINEとGoogle Sheetsだけで完結する、完全無料の個人家計簿チャットボット。",
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
    oneLiner: "マインドフルネス事業のブランドを体現する、穏やかで親しみやすいコーポレートサイト。",
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
  { title: "WeCALL", tags: ["Serverless", "AWS"], oneLiner: "コスト98.5%減のイベント基盤。", stack: "Nuxt, Lambda, DynamoDB", role: "アーキ設計", category: "Featured", link: "/projects/wecall", cta: "詳しく" },
  { title: "WeNo", tags: ["High Load", "LINE"], oneLiner: "高負荷対応のチケット発券システム。", stack: "Vue, Next.js, BullMQ", role: "リードエンジニア", category: "Featured", link: "/projects/weno", cta: "詳しく" },
  { title: "WeFit", tags: ["EventTech", "LINE"], oneLiner: "LINE連携の試着予約システム。7000人を無停止対応。", stack: "NestJS, Vue, AWS, DDD", role: "PM / Full-Stack", link: "/projects/wefit", cta: "聞いてみる" },
  { title: "WeCart", tags: ["Inventory", "Real-time"], oneLiner: "イベント在庫・注文管理。Socket.ioでリアルタイム同期。", stack: "Vue, NestJS, Socket.io", role: "フルスタック", link: "/projects/wecart", cta: "聞いてみる" },
  { title: "SNAP", tags: ["SaaS", "B2B"], oneLiner: "継続収益型フォトブース。", stack: "React, AWS", role: "オーナー/エンジニア", link: "/projects/snap", cta: "概要" },
  { title: "Ongy", tags: ["Scraping", "Analytics"], oneLiner: "Instagramストーリー調査ツール。", stack: "React, Puppeteer", role: "単独開発", link: "/projects/ongy" },
  { title: "Inuinugram", tags: ["Growth", "Automation"], oneLiner: "犬特化メディア。自動化で3万フォロワー達成し売却。", stack: "Python, Puppeteer", role: "Growth Engineer", link: "/projects/inuinugram" },
  { title: "Lulu", tags: ["LINE", "Serverless"], oneLiner: "無料のLINE家計簿ボット。", stack: "GAS, LIFF", role: "単独開発", link: "/projects/lulu" },
  { title: "iPLUSi", tags: ["Web", "WordPress"], oneLiner: "建築事務所のポートフォリオ。モダンWP構成。", stack: "WordPress (Sage), PHP", role: "Full-Stack", link: "/projects/iplusi" },
  { title: "INTD", tags: ["Corporate", "CMS"], oneLiner: "Introduction社HP刷新。カスタムWPテーマ。", stack: "WordPress, PHP, Figma", role: "Lead", link: "/projects/intd" },
  { title: "meiso.", tags: ["Design", "Branding"], oneLiner: "マインドフルネス企業サイト。", stack: "HTML, CSS, JS", role: "デザイナー/開発", link: "/projects/meiso" },
  { title: "Lounge Attendance", tags: ["B2B", "GAS"], oneLiner: "QRコード・GASのみで構築した来訪管理。", stack: "GAS, Sheets, QR", role: "Single Dev", link: "/projects/lounge-attendance" },
  { title: "Life in Weeks", tags: ["Personal", "Visualization"], oneLiner: "人生を週単位グリッドで可視化。", stack: "Vue, Nuxt", role: "Solo Dev", link: "/projects/life-in-weeks" },
  { title: "Sheer", tags: ["Media", "Management"], oneLiner: "若年層女性向けInstagramメディア運営。", stack: "Instagram, Figma", role: "Team Manager", link: "/projects/sheer" },
  { title: "Miss Circle", tags: ["Scraping", "Automation"], oneLiner: "コンテスト参加者向けSNSフォロワー追跡。", stack: "Vue, Node, Puppeteer", role: "Full-Stack", link: "/projects/miss-circle" },
  { title: "FACT", tags: ["Sales", "Reputation"], oneLiner: "企業向けレピュテーション管理SaaS。", stack: "Sales, Marketing", role: "Sales & Marketing Lead", link: "/projects/fact" },
  { title: "Book Price", tags: ["Tooling", "Resale"], oneLiner: "メルカリ相場を即時分析する価格リサーチツール。", stack: "Vue, GAS, API", role: "Solo Dev", link: "/projects/book-price" },
  { title: "Monoton", tags: ["BizDev", "Retail"], oneLiner: "セルフ写真スタジオ事業の立ち上げ・運営。", stack: "Business Dev, Ops", role: "Founder", link: "/projects/monoton" },
  { title: "ACE", tags: ["PoC", "Affiliate"], oneLiner: "ASP成果横断アフィリエイトプラットフォーム。", stack: "RPA, JS, BizDev", role: "Product Owner", link: "/projects/ace" },
  { title: "WAISEC", tags: ["Event", "Leadership"], oneLiner: "国際高校生シンポジウムWeb制作・運営リード。", stack: "HTML/CSS, Management", role: "Committee Lead", link: "/projects/waisec" },
  { title: "Hana", tags: ["Presentation", "Global"], oneLiner: "国際シンポジウムでの英語プレゼンとスライドデザイン。", stack: "Presentation, Design", role: "Presenter", link: "/projects/hana" },
];

const skills: SkillGroup[] = [
  { title: "フロントエンド", items: ["React", "Next.js", "Vue", "Nuxt", "TypeScript", "Tailwind", "Animations"] },
  { title: "バックエンド・API", items: ["Node.js", "NestJS", "Express", "REST", "GraphQL", "Webhooks", "OAuth"] },
  { title: "データ・インフラ", items: ["PostgreSQL", "MySQL", "Redis", "DynamoDB", "MongoDB", "Firebase"] },
  { title: "クラウド・DevOps", items: ["AWS Lambda", "ECS (Fargate)", "CloudFront", "S3", "Docker", "CI/CD"] },
  { title: "デザイン・プロダクト", items: ["Figma", "UI/UX", "Design Systems", "Illustration", "Product Strategy"] },
  { title: "ツール・手法", items: ["GitHub", "Agile", "Zod", "BullMQ", "Google Apps Script"] },
];

const navLinks = [
  { href: "#about", label: "プロフィール" },
  { href: "#experience", label: "職務経歴" },
  { href: "#projects", label: "プロジェクト" },
  { href: "#skills", label: "スキル" },
  { href: "#contact", label: "連絡先" },
];

const emails = ["kento.iizuka@icloud.com"];

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-400/15 to-purple-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700 border border-blue-200/50">
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
    <span className={`rounded-full border bg-gradient-to-r px-3 py-1 text-xs font-medium transition hover:scale-110 hover:shadow-md ${color}`}>
      {label}
    </span>
  );
}

function SectionHeader({ title, eyebrow, description }: { title: string; eyebrow?: string; description?: string }) {
  return (
    <div className="flex flex-col gap-4">
      {eyebrow ? <Badge>✨ {eyebrow}</Badge> : null}
      <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-blue-600 to-purple-600 bg-clip-text text-transparent sm:text-5xl leading-tight">{title}</h2>
      {description ? <p className="max-w-3xl text-lg leading-relaxed text-slate-700 font-medium">{description}</p> : null}
    </div>
  );
}

function ExperienceCard({ item }: { item: Experience }) {
  return (
    <div className="group relative rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white via-blue-50/50 to-slate-50 p-7 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition duration-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] hover:-translate-y-1 hover:border-blue-300">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/0 to-purple-400/0 opacity-0 group-hover:opacity-5 transition duration-300" />
      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-widest font-bold text-blue-600">{item.company}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{item.role}</h3>
        </div>
        <div className="text-right text-sm text-slate-600 font-semibold">
          <p className="text-slate-900">{item.period}</p>
          <p>{item.location}</p>
        </div>
      </div>
      <p className="mt-5 text-slate-700 font-medium leading-relaxed text-lg">{item.summary}</p>
      <ul className="mt-5 space-y-3 text-sm text-slate-700">
        {item.highlights.map((hl) => (
          <li key={hl} className="flex items-start gap-3 pl-1">
            <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0"></span>
            <span className="leading-snug font-medium">{hl}</span>
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
  const gradients = [
    "from-blue-400/20 to-cyan-400/20",
    "from-purple-400/20 to-pink-400/20",
    "from-orange-400/20 to-red-400/20",
    "from-emerald-400/20 to-teal-400/20",
    "from-indigo-400/20 to-blue-400/20",
    "from-pink-400/20 to-rose-400/20",
  ];
  const gradient = gradients[project.title.charCodeAt(0) % gradients.length];
  return (
    <a
      href={href}
      className="group relative block overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.1)] transition-all duration-300 hover:shadow-[0_28px_60px_rgba(59,130,246,0.2)] hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-blue-400/50"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition duration-300`} />
      <div className="relative h-full p-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>📋 Case Study</Badge>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
        <h3 className="mt-6 text-3xl font-bold text-slate-900 leading-tight">{project.title}</h3>
        <p className="mt-3 text-lg leading-relaxed text-slate-700 font-medium">{project.oneLiner}</p>
        {project.metrics ? (
          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 px-4 py-4 hover:border-blue-300 hover:shadow-md transition">
                <p className="text-xs uppercase tracking-widest font-bold text-blue-600">{metric.label}</p>
                <p className="text-base font-bold text-slate-900 mt-2">{metric.value}</p>
              </div>
            ))}
          </div>
        ) : null}
        <div className="mt-7 space-y-2 text-sm text-slate-700 font-medium">
          <p><span className="font-bold text-slate-900">Stack:</span> <span className="text-slate-600">{project.stack}</span></p>
          <p><span className="font-bold text-slate-900">担当:</span> <span className="text-slate-600">{project.role}</span></p>
        </div>
        <div className="mt-8 inline-flex items-center gap-2 text-base font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text group-hover:gap-3 transition">
          {cta}
          <span aria-hidden className="group-hover:translate-x-1 transition">→</span>
        </div>
      </div>
    </a>
  );
}

function ProjectGridCard({ project }: { project: Project }) {
  const hasLink = Boolean(project.link);
  const Container: any = hasLink ? 'a' : 'div';
  const containerProps = hasLink ? { href: project.link } : {};
  const emojis = ['🚀', '💡', '🎨', '🔥', '✨', '🎭', '📊', '⭐'];
  const emoji = emojis[project.title.charCodeAt(0) % emojis.length];
  return (
    <Container
      {...containerProps}
      className="flex flex-col gap-4 rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.15)] hover:-translate-y-1 hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-400/50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{emoji}</span>
            <h4 className="text-lg font-bold text-slate-900">{project.title}</h4>
          </div>
          <p className="text-sm text-slate-700 mt-3 leading-snug">{project.oneLiner}</p>
        </div>
        <span className="text-xs uppercase tracking-widest font-bold text-blue-600 flex-shrink-0">{project.category ?? "Project"}</span>
        {!hasLink ? <Badge>🚧 Soon</Badge> : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
      <div className="pt-3 space-y-1 border-t-2 border-slate-200">
        <p className="text-xs font-bold text-slate-900">Stack: <span className="font-normal text-slate-600">{project.stack}</span></p>
        <p className="text-xs font-bold text-slate-900">担当: <span className="font-normal text-slate-600">{project.role}</span></p>
      </div>
      {hasLink ? <span className="text-sm font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">{project.cta ?? "詳細・相談"} →</span> : null}
    </Container>
  );
}

function SkillCard({ group }: { group: SkillGroup }) {
  const icons = ['🎨', '⚙️', '💾', '☁️', '🎯', '🛠️'];
  const icon = icons[group.title.charCodeAt(0) % icons.length];
  return (
    <div className="flex h-full flex-col gap-4 rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_8px_20px_rgba(15,23,42,0.06)] transition duration-300 hover:shadow-[0_12px_30px_rgba(59,130,246,0.12)] hover:-translate-y-1 hover:border-blue-300">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <p className="text-sm uppercase tracking-widest font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">{group.title}</p>
      </div>
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
    <div className="relative isolate min-h-screen w-full overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.15),transparent_35%),radial-gradient(circle_at_100%_100%,rgba(34,197,94,0.12),transparent_40%)]" />
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3 text-sm font-bold text-slate-900">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold text-lg">KI</span>
            <span className="text-lg">飯塚健杜</span>
          </div>
          <nav className="hidden items-center gap-2 text-sm text-slate-700 sm:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="rounded-full px-4 py-2 font-medium transition hover:bg-blue-50 hover:text-blue-600 hover:-translate-y-0.5">
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="rounded-full border-2 border-slate-300 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2.5 text-sm font-bold text-white transition hover:shadow-lg hover:-translate-y-0.5"
          >
            Resume
          </a>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-28 px-4 pb-24 pt-12 sm:px-6 sm:pt-24">
        <section className="grid items-center gap-12 rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 p-8 shadow-[0_24px_60px_rgba(59,130,246,0.12)] sm:p-12 lg:grid-cols-2" id="home">
          <div className="flex flex-col items-center gap-6 lg:order-2">
            <div className="relative w-full max-w-60 lg:max-w-xs">
              <div className="absolute -left-8 -top-8 h-48 w-48 rounded-full bg-blue-400/15 blur-3xl" />
              <div className="absolute -bottom-8 -right-6 h-40 w-40 rounded-full bg-purple-400/15 blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-[0_20px_60px_rgba(59,130,246,0.15)]">
                <Image
                  src="/profile.jpg"
                  alt="飯塚健杜"
                  width={320}
                  height={400}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="w-full max-w-xs rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-600">📊 Snapshot</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200">
                  <span className="text-slate-600 font-medium">開発歴</span>
                  <strong className="font-bold text-slate-900">6 年</strong>
                </div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200">
                  <span className="text-slate-600 font-medium">得意スタック</span>
                  <strong className="font-bold text-slate-900 text-right">React / Next / AWS</strong>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-600 font-medium">最大成果</span>
                  <strong className="font-bold text-slate-900 text-right">98.5% コスト削減</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 lg:order-1">
            <div className="space-y-4">
              <Badge>🚀 Full-Stack Engineer ・ Product Developer</Badge>
              <h1 className="text-5xl font-black leading-tight text-slate-900 sm:text-6xl bg-gradient-to-r from-slate-900 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                アイデアから<br className="hidden sm:block" />プロダクトへ。<br className="hidden sm:block" />早く、ちゃんと。
              </h1>
            </div>
            <p className="text-xl leading-relaxed text-slate-700 max-w-lg font-medium">
              デザイン思考でスタートアップを支えるエンジニア。
              React/Next から AWS まで、コスト効率と開発速度を両立します。
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-[0_12px_32px_rgba(59,130,246,0.4)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(59,130,246,0.35)]"
              >
                📂 プロジェクトを見る
                <span aria-hidden>→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-slate-300 bg-white px-8 py-4 text-base font-bold text-slate-900 transition hover:border-blue-400 hover:bg-blue-50 hover:-translate-y-1"
              >
                💬 気軽に相談する
              </a>
              <a
                href="https://github.com/kentosity"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-base font-bold text-slate-700 transition hover:text-blue-600 hover:underline"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="flex flex-col gap-10">
          <SectionHeader
            eyebrow="プロフィール"
            title="デザイン出身のセルフスタートエンジニア"
            description="東京拠点。5人スタートアップのインターンからCTOを経て、Generosityでアーキテクチャをリード。曖昧さの中で素早く形にし、使われるプロダクトに仕上げます。"
          />
          <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
            <div className="space-y-5 rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-blue-50/50 p-8">
              <p className="text-lg text-slate-700 font-medium leading-relaxed">直近で
                自分のデザインを形にしたくてコードを学び、気づけばフロントからAPI、インフラまで一気通貫で担うように。コストを抑えつつ拡張しやすい構成をつくるのが得意です。
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: '🎨', text: "React/NextからAWSまでをカバーするフルスタック" },
                  { icon: '⚡', text: "デザイン→実装→検証まで回すプロダクト思考" },
                  { icon: '🔧', text: "負荷・障害時のボトルネック解消と再発防止策の設計" },
                  { icon: '🚀', text: "小さく速く出し、学びながら磨くスタートアップ流" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 shadow-sm hover:border-blue-200 hover:shadow-md transition">
                    <span className="text-lg mt-0.5">{item.icon}</span>
                    <span className="font-medium leading-snug">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-purple-50/50 p-8">
              <p className="text-sm uppercase tracking-widest font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">📅 Timeline</p>
              <div className="space-y-3 text-sm text-slate-700">
                {["2019 → インターン開始 (Introduction)", "2020 → Lulu / Ongy / meiso を開発", "2021 → SNAP を開発", "2024 → Generosityへジョイン", "2024-2025 → WeCALL再構築・WeNo開発をリード"].map((line) => (
                  <div key={line} className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 shadow-sm hover:border-purple-200 transition font-medium">
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0"></span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="flex flex-col gap-10">
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

        <section id="projects" className="flex flex-col gap-12">
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

          <div className="mt-8 flex items-center justify-between">
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

        <section id="skills" className="flex flex-col gap-10">
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

        <section id="contact" className="flex flex-col gap-8 rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 p-10 shadow-[0_24px_60px_rgba(59,130,246,0.15)]">
          <SectionHeader
            eyebrow="連絡先"
            title="🚀 一緒に面白いものをつくりませんか"
            description="新しい機会、協業、技術的に骨のある課題の相談を歓迎します。"
          />
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-widest font-bold text-blue-600">📧 Email</p>
              {emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="block rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-slate-900 font-semibold transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                >
                  {email}
                </a>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-widest font-bold text-purple-600">🌍 Social</p>
              <div className="grid gap-2 text-slate-700 font-medium">
                <a className="transition hover:text-blue-600 hover:underline" href="https://github.com/kentosity" target="_blank" rel="noreferrer">
                  GitHub (new) ↗
                </a>
                <a className="transition hover:text-blue-600 hover:underline" href="https://github.com/kentozuka" target="_blank" rel="noreferrer">
                  GitHub (old) ↗
                </a>
                <a className="transition hover:text-blue-600 hover:underline" href="https://www.linkedin.com/in/kento-iizuka-a79289273/" target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
                <a className="transition hover:text-blue-600 hover:underline" href="https://www.wantedly.com/id/kentoiizuka" target="_blank" rel="noreferrer">
                  Wantedly ↗
                </a>
                <a className="transition hover:text-blue-600 hover:underline" href="https://lapras.com/public/RVEPJY7" target="_blank" rel="noreferrer">
                  Lapras ↗
                </a>
              </div>
            </div>
            <div className="space-y-3 rounded-2xl border-2 border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-sm">
              <p className="text-sm uppercase tracking-widest font-bold text-emerald-600">💾 Downloads</p>
              <p className="text-slate-700 font-medium">PDFリンクはアップロード後に差し替え予定です。</p>
              <div className="flex flex-wrap gap-2">
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
