import type { SiteContent } from "./model";

export const siteContent: SiteContent = {
  "source": {
    "repository": "kentosity/resume",
    "revision": "cd52952d4b0938289bd505e5606387d8d2451f51",
    "reviewedOn": "2026-11-19",
    "amendments": {
      "file": "app/content/approved-career-updates.json",
      "reviewedOn": "2026-11-27"
    }
  },
  "identity": {
    "name": {
      "en": "Kento Iizuka",
      "ja": "飯塚健杜"
    },
    "location": {
      "en": "Tokyo, Japan",
      "ja": "東京、日本"
    },
    "role": {
      "en": "AI Engineer",
      "ja": "AIエンジニア"
    },
    "email": "kento.iizuka@icloud.com",
    "origin": "https://kento-iizuka-portfolio.vercel.app"
  },
  "links": [
    {
      "label": "GitHub",
      "url": "https://github.com/kentosity"
    },
    {
      "label": "LinkedIn",
      "url": "https://www.linkedin.com/in/kento-iizuka"
    },
    {
      "label": "Wantedly",
      "url": "https://www.wantedly.com/id/kentoiizuka"
    },
    {
      "label": "LAPRAS",
      "url": "https://lapras.com/public/RVEPJY7"
    }
  ],
  "introduction": {
    "en": "I’m an AI Engineer building web products, data pipelines and tools for AI-assisted workflows.",
    "ja": "AIエンジニアとして、Webプロダクト、データ連携、業務を支えるAIツールを開発しています。"
  },
  "about": {
    "en": [
      "I build web products, data pipelines and tools that make business workflows easier to run. My work spans problem discovery, interface design, full-stack development and operations.",
      "Since February 2026, I have worked as an AI Engineer at FalconeX. For a hair salon chain client, I develop POS data integration, reporting applications and Windows report automation. For a retail client, I prepare security-product evaluations and AI/data advisory materials. I use AI-assisted development while keeping validation and failure handling explicit.",
      "From February to August 2026, I worked as a contract Full Stack Software Engineer for ZenCard on EpicPull, its online trading-card pack service. I developed authentication, payments, USDC wallet and card-buyback workflows, storefront features for the US and Hong Kong markets, and support for a staged Laravel-to-Next.js migration. The engagement ended when ZenCard shut down.",
      "At Generosity (May 2024–January 2026), I worked on LINE-connected reservation, ticketing and order-management systems. Reworking an event platform with AWS Lambda and DynamoDB lowered annual infrastructure cost.",
      "I served as full-time CTO at Introduction from April 2020 to April 2024. I built SNAP’s event administration, guest albums and venue displays there, alongside product design and customer-facing work.",
      "My core stack includes TypeScript, React/Next.js, Vue/Nuxt, Node.js/NestJS and AWS, with recent work in Python, BigQuery and Google Cloud. I also build personal developer tools, including local speech and macOS playback tooling for my own development setup.",
      "I welcome conversations about engineering roles and client projects in web products, data integration and AI-assisted business automation. I enjoy understanding the workflow, building the solution and improving it with the people using it."
    ],
    "ja": [
      "FalconeXのAIエンジニアです。Webプロダクト、データ連携、業務自動化を中心に、課題整理、UI設計、フルスタック開発、運用改善に取り組んでいます。",
      "2026年2月からFalconeXに勤務しています。美容室チェーン向けにPOSデータの分析基盤への連携、レポートアプリ、Windows上の帳票取得の自動化を開発。小売業のクライアント向けには、セキュリティ製品の比較検討やAI・データ活用の説明資料を作成しています。AI支援開発を活用しながら、入力の検証や失敗時の処理も設計しています。",
      "2026年2月から8月まで、株式会社ZenCardの業務委託として「エピックプル」を開発しました。認証、決済、USDCを扱うウォレット、カード買取機能に加え、米国・香港向けの利用者向け画面と、LaravelからNext.jsへの段階的な移行を担当しました。会社の閉鎖に伴い、契約を終了しました。",
      "Generosityには2024年5月から2026年1月まで在籍し、LINE連携の予約・整理券・注文管理システムを開発しました。イベント基盤をAWS LambdaとDynamoDBの構成へ再設計し、年間インフラ費を削減しました。",
      "Introductionでは、2020年4月から2024年4月まで正社員のCTOを担当しました。SNAPのイベント管理、ゲスト向けアルバム、会場表示を開発し、プロダクトデザインや顧客対応にも携わりました。",
      "主な技術はTypeScript、React / Next.js、Vue / Nuxt、Node.js / NestJS、AWS。最近はPython、BigQuery、Google Cloudを使った開発や、個人環境に導入するローカル音声合成・macOS再生ツールにも取り組んでいます。",
      "エンジニア採用のお話と、Web開発・データ連携・AIを活用した業務改善のご相談をお待ちしています。使う人の業務を理解し、必要な仕組みをつくり、運用しながら改善する仕事に関心があります。"
    ]
  },
  "experience": [
    {
      "id": "falconex",
      "company": {
        "en": "FalconeX",
        "ja": "FalconeX"
      },
      "title": {
        "en": "AI Engineer",
        "ja": "AIエンジニア"
      },
      "period": {
        "en": "February 2026 – Present",
        "ja": "2026年2月 – 現在"
      },
      "summary": {
        "en": "Develop software and automation for client workflows as an employee at FalconeX.",
        "ja": "FalconeXの社員として、クライアントの業務に合わせたソフトウェアと自動化を開発。"
      },
      "bullets": {
        "en": [
          "Develop POS-to-BigQuery data integration for a hair salon chain client, separating extraction, loading and orchestration and supporting full and date-window imports.",
          "Build reporting calculations and a React dashboard with explicit validation of missing or duplicate inputs; develop Python automation for scheduled Windows POS report exports and failure handling.",
          "Prepare security-product comparisons, technical explanations and AI/data advisory materials for a retail client.",
          "Work across requirements, design, implementation and maintenance, using agent-assisted development where appropriate."
        ],
        "ja": [
          "美容室チェーン向けにPOSデータをBigQueryへ連携する仕組みを開発。抽出・取り込み・実行管理を分離し、全件・期間指定の取り込みに対応。",
          "集計処理とReactのダッシュボードを開発し、入力の欠落や重複を検証。PythonによるWindows POSの定期帳票出力と失敗時の処理も実装。",
          "小売業のクライアント向けに、セキュリティ製品の比較、技術説明、AI・データ活用の検討資料を作成。",
          "要件整理、設計、実装、保守に取り組み、必要に応じてAI支援開発を活用。"
        ]
      }
    },
    {
      "id": "zencard",
      "company": {
        "en": "ZenCard",
        "ja": "株式会社ZenCard"
      },
      "title": {
        "en": "Full Stack Software Engineer (Contract)",
        "ja": "フルスタックエンジニア（業務委託）"
      },
      "period": {
        "en": "February 2026 – August 2026",
        "ja": "2026年2月 – 2026年8月"
      },
      "summary": {
        "en": "Developed EpicPull, ZenCard’s online trading-card pack service, as a contractor. The engagement ended when the company shut down.",
        "ja": "株式会社ZenCardの業務委託として、オンラインのトレーディングカードパックサービス「エピックプル」を開発。会社の閉鎖に伴い、契約を終了しました。"
      },
      "bullets": {
        "en": [
          "Developed authentication, payment, wallet and card-buyback workflows with Privy, Solana/USDC, Coinflow checkout and webhooks, and Laravel APIs.",
          "Built Next.js/React storefront features and shared TypeScript UI foundations for the US and Hong Kong markets.",
          "Implemented staged frontend routing, mobile API compatibility and backend-availability handling for the Laravel-to-Next.js migration.",
          "The contract ran from February to August 2026 and ended when ZenCard shut down."
        ],
        "ja": [
          "Privy認証、Solana上のUSDCを扱う入出金・決済処理、Coinflowの決済・通知処理、Laravelの各種APIを使い、認証・決済・ウォレット・カード買取機能を開発。",
          "米国・香港向けに、Next.jsとReactによる利用者向け画面と、TypeScriptを用いた共通の画面部品を開発。",
          "LaravelからNext.jsへの移行に向け、段階的な画面の切り替え、モバイル向けAPIとの互換性維持、障害時の案内表示を実装。",
          "2026年2月から8月まで業務委託として参画し、会社の閉鎖に伴い契約を終了。"
        ]
      }
    },
    {
      "id": "generosity",
      "company": {
        "en": "Generosity Inc.",
        "ja": "Generosity Inc."
      },
      "title": {
        "en": "Full-Stack Engineer",
        "ja": "フルスタックエンジニア"
      },
      "period": {
        "en": "May 2024 – January 2026",
        "ja": "2024年5月 – 2026年1月"
      },
      "summary": {
        "en": "Developed LINE-connected event platforms, with work across frontend, APIs, cloud infrastructure and operational reliability.",
        "ja": "LINEと連携するイベント基盤を開発。フロントエンド、API、クラウド基盤、運用時の課題に取り組む。"
      },
      "bullets": {
        "en": [
          "Reworked an event reservation platform toward modular features and a serverless AWS Lambda / DynamoDB architecture, lowering annual infrastructure cost.",
          "Rebuilt ticketing flows and introduced BullMQ queueing to address concurrent ticket issuance.",
          "Developed LINE-connected reservation and order-management features, including staff workflows and real-time updates."
        ],
        "ja": [
          "イベント予約基盤の機能を分離し、AWS Lambda / DynamoDBによるサーバーレス構成への再設計を担当。年間インフラ費を削減。",
          "チケット発券処理を再構築し、同時発券の競合に対応するBullMQのキュー制御を導入。",
          "LINEと連携する予約・注文管理や、スタッフ向けの操作画面とリアルタイム更新を開発。"
        ]
      }
    },
    {
      "id": "introduction",
      "company": {
        "en": "Introduction Inc.",
        "ja": "Introduction Inc."
      },
      "title": {
        "en": "Full-time CTO",
        "ja": "正社員・CTO"
      },
      "period": {
        "en": "April 2020 – April 2024",
        "ja": "2020年4月 – 2024年4月"
      },
      "summary": {
        "en": "Served as full-time CTO from April 2020 to April 2024, working across engineering, product design and customer-facing tasks. Built SNAP at Introduction.",
        "ja": "2020年4月から2024年4月まで正社員のCTOを担当。開発、プロダクトデザイン、顧客対応に取り組み、IntroductionでSNAPを開発しました。"
      },
      "bullets": {
        "en": [
          "Developed event administration, guest albums and venue displays for SNAP, a wedding photobooth project, alongside product design and customer-facing work.",
          "Designed and developed Ongy, an Instagram story-viewing tool, across frontend, backend and interface design.",
          "Delivered web and CMS projects, combining Figma design work with frontend implementation."
        ],
        "ja": [
          "結婚式場向けフォトブース「SNAP」のイベント管理、ゲスト向けアルバム、会場表示を開発。デザインや顧客対応にも携わる。",
          "Instagramストーリー閲覧ツール「Ongy」をデザイン、フロントエンド、バックエンドまで開発。",
          "Figmaでのデザインと実装を組み合わせ、WebサイトやCMSの制作に取り組む。"
        ]
      }
    }
  ],
  "skills": [
    {
      "title": {
        "en": "Core engineering",
        "ja": "フルスタック開発"
      },
      "items": {
        "en": [
          "TypeScript",
          "JavaScript",
          "React",
          "Next.js",
          "Vue.js",
          "Nuxt.js",
          "Node.js",
          "NestJS"
        ],
        "ja": [
          "TypeScript",
          "JavaScript",
          "React",
          "Next.js",
          "Vue.js",
          "Nuxt.js",
          "Node.js",
          "NestJS"
        ]
      }
    },
    {
      "title": {
        "en": "Cloud and data",
        "ja": "クラウド・データ基盤"
      },
      "items": {
        "en": [
          "AWS",
          "AWS Lambda",
          "Amazon ECS",
          "Amazon DynamoDB",
          "PostgreSQL",
          "Redis",
          "Python",
          "BigQuery",
          "Google Cloud",
          "Docker",
          "Infrastructure as Code"
        ],
        "ja": [
          "AWS",
          "AWS Lambda",
          "Amazon ECS",
          "Amazon DynamoDB",
          "PostgreSQL",
          "Redis",
          "Python",
          "BigQuery",
          "Google Cloud",
          "Docker",
          "コードによるインフラ管理"
        ]
      }
    },
    {
      "title": {
        "en": "Automation and integration",
        "ja": "自動化・システム連携"
      },
      "items": {
        "en": [
          "Workflow Automation",
          "API Integration",
          "LINE Messaging API",
          "BullMQ",
          "CI/CD",
          "AI-assisted Development"
        ],
        "ja": [
          "業務自動化",
          "API連携",
          "LINE Messaging API",
          "BullMQ",
          "CI/CD",
          "AI支援開発"
        ]
      }
    },
    {
      "title": {
        "en": "Product and leadership",
        "ja": "プロダクト・事業運営"
      },
      "items": {
        "en": [
          "Software Architecture",
          "Full-Stack Development",
          "Product Development",
          "Technical Leadership",
          "Figma",
          "UI/UX Design",
          "B2B Sales",
          "Client Discovery"
        ],
        "ja": [
          "ソフトウェア設計",
          "フルスタック開発",
          "プロダクト開発",
          "技術面でのチーム支援",
          "Figma",
          "UI・UX設計",
          "法人営業",
          "顧客の課題整理"
        ]
      }
    }
  ],
  "education": [
    {
      "school": {
        "en": "Waseda University",
        "ja": "早稲田大学"
      },
      "description": {
        "en": "School of International Liberal Studies (SILS) — Bachelor of Arts in International Liberal Studies; graduated March 2023",
        "ja": "国際教養学部（SILS）— 学士（国際教養学）、2023年3月卒業"
      }
    }
  ],
  "todos": {
    "hiring": {
      "id": "hiring-preferences",
      "text": {
        "en": "Confirm hiring focus, location/remote arrangements, relocation/travel preferences and public availability wording.",
        "ja": "採用で希望する分野、勤務地・リモート条件、転居・出張の希望、公開する稼働状況を確認してください。"
      }
    },
    "languages": {
      "id": "working-languages",
      "text": {
        "en": "Confirm the public wording of working-language proficiency.",
        "ja": "業務で使う言語と習熟度の公開表現を確認してください。"
      }
    },
    "identity": {
      "id": "public-identity",
      "text": {
        "en": "Confirm this name presentation, public contact email and professional links.",
        "ja": "氏名の表記、公開する連絡先メールアドレス、仕事用リンクを確認してください。"
      }
    },
    "domain": {
      "id": "production-domain",
      "text": {
        "en": "Confirm the final production domain; metadata currently uses the existing portfolio origin.",
        "ja": "最終的な公開ドメインを確認してください。メタデータには既存のポートフォリオURLを使用しています。"
      }
    },
    "engagement": {
      "id": "client-engagement",
      "text": {
        "en": "Confirm the contracting party, work offered, actual availability, engagement sequence, deliverables and any pricing or response-time wording.",
        "ja": "契約主体、提供できる業務、稼働状況、進め方、成果物、料金や返信時期の表現を確認してください。"
      }
    },
    "portrait": {
      "id": "portrait-and-interests",
      "text": {
        "en": "Supply an approved portrait/name treatment, a personal story about organizing systems and any interests or sketches to share.",
        "ja": "掲載する写真・氏名の見せ方、仕組みを整理することにまつわるエピソード、公開したい関心やスケッチを用意してください。"
      }
    },
    "resume-en": {
      "id": "resume-pdf-en",
      "text": {
        "en": "Review a new public-safe English PDF export from the canonical profile, including contact details and project links.",
        "ja": "正本プロフィールから英語PDFを作成し、連絡先と公開可能なプロジェクトリンクを確認してください。"
      }
    },
    "resume-ja": {
      "id": "resume-pdf-ja",
      "text": {
        "en": "Review a new public-safe Japanese PDF export from the canonical profile, including contact details and project links.",
        "ja": "正本プロフィールから日本語PDFを作成し、連絡先と公開可能なプロジェクトリンクを確認してください。"
      }
    }
  },
  "projects": [
    {
      "id": "salon-data-platform",
      "slug": "salon-data-platform",
      "legacySlugs": [],
      "title": {
        "en": "Data integration and reporting for a hair salon chain client",
        "ja": "美容室チェーン向けデータ連携・レポート基盤"
      },
      "summary": {
        "en": "A data pipeline connects salon POS exports to validated reports and a dashboard.",
        "ja": "美容室のPOS帳票を取り込み、検証付きの集計とダッシュボードにつなぐ仕組みです。"
      },
      "description": {
        "en": "To connect a hair salon chain client’s POS data with analytical reporting, built TypeScript/Python ingestion into BigQuery, reporting calculations and a React/Fastify dashboard through FalconeX. The workflow supports full and date-window imports, Parquet staging and scheduled Windows report exports with failure handling. Report calculations flag missing or duplicate inputs.",
        "ja": "美容室チェーンのPOSデータを集計・分析につなぐため、FalconeXでTypeScript／PythonによるBigQueryへの取り込み、集計処理、React／Fastifyのダッシュボードを開発。全件・期間指定の取り込み、Parquet形式での受け渡し、Windows POSの定期帳票出力と失敗時の処理に対応しました。集計では入力の欠落・重複を検出します。"
      },
      "association": {
        "en": "FalconeX — hair salon chain client engagement",
        "ja": "FalconeX — 美容室チェーンへの支援"
      },
      "contribution": {
        "en": "Data integration, reporting application and automation development",
        "ja": "データ連携・アプリ開発・自動化"
      },
      "area": "data-systems",
      "collectionOrder": 2,
      "homeOrder": 3,
      "stage": {
        "en": "Client development through FalconeX",
        "ja": "FalconeXでのクライアント向け開発"
      },
      "problem": {
        "en": "A salon chain needed to connect POS exports to analytical reporting, including complete and date-window imports and checks for missing or duplicate inputs.",
        "ja": "美容室チェーンのPOSデータを分析につなぐため、全件・期間指定の取り込みと、入力の欠落・重複の検証が必要でした。"
      },
      "workflow": {
        "en": [
          "Windows POS export",
          "Parquet staging → BigQuery",
          "Validated report + dashboard"
        ],
        "ja": [
          "Windows POSから帳票出力",
          "Parquet → BigQuery",
          "検証付き集計・画面表示"
        ]
      },
      "decisions": {
        "en": [
          "Extraction, loading and orchestration have separate responsibilities. Full and date-window imports share a workflow with Parquet staging and BigQuery loading.",
          "Reporting calculations check for missing or duplicate inputs. Scheduled Windows exports include failure handling, while the React/Fastify application presents the reporting workflow."
        ],
        "ja": [
          "抽出・取り込み・実行管理の役割を分けています。全件と期間指定の取り込みは、Parquet形式での受け渡しとBigQueryへの読み込みを使います。",
          "集計処理で入力の欠落・重複を検証します。Windows上の定期出力には失敗時の処理を組み込み、React／Fastifyでレポートを表示するアプリを開発しました。"
        ]
      },
      "results": {
        "en": "The developed capabilities include full and date-window ingestion, Parquet staging, validated reporting, a React/Fastify dashboard and scheduled Windows exports with failure handling. The work is attributed to Kento through FalconeX for an anonymous salon-chain client.",
        "ja": "全件・期間指定の取り込み、Parquetでの受け渡し、検証付きの集計、React／Fastifyの画面、失敗時の処理を含むWindowsの定期出力を開発しました。FalconeXで、美容室チェーン向けに担当した業務です。"
      },
      "related": [
        "event-platform",
        "event-ticketing"
      ],
      "stack": [
        {
          "name": "TypeScript",
          "responsibility": {
            "en": "Application logic and contracts",
            "ja": "アプリの処理・データの型"
          }
        },
        {
          "name": "Python",
          "responsibility": {
            "en": "Scheduled Windows POS report exports",
            "ja": "Windows POSの定期帳票出力"
          }
        },
        {
          "name": "React",
          "responsibility": {
            "en": "Application interface",
            "ja": "アプリの画面"
          }
        },
        {
          "name": "Fastify",
          "responsibility": {
            "en": "Reporting API",
            "ja": "レポート用API"
          }
        },
        {
          "name": "BigQuery",
          "responsibility": {
            "en": "Analytical data and calculations",
            "ja": "分析データの保存・集計"
          }
        },
        {
          "name": "Google Cloud Storage",
          "responsibility": {
            "en": "Ingestion staging storage",
            "ja": "取り込み用の一時保存"
          }
        },
        {
          "name": "Parquet",
          "responsibility": {
            "en": "Staged data exchange",
            "ja": "データの受け渡し形式"
          }
        }
      ],
      "todos": {
        "context": {
          "id": "salon-data-platform-context",
          "text": {
            "en": "Confirm the project period, collaborators' responsibilities and one concrete problem or failure to explain.",
            "ja": "プロジェクトの期間、協力者の担当範囲、説明できる具体的な問題か失敗例を確認してください。"
          }
        },
        "decisions": {
          "id": "salon-data-platform-decisions",
          "text": {
            "en": "Add two personal decisions with constraints, alternatives considered and the consequences of the choice.",
            "ja": "本人が判断した2点について、制約、検討した選択肢、選択によって起きたことを追記してください。"
          }
        },
        "artifacts": {
          "id": "salon-data-platform-artifacts",
          "text": {
            "en": "Supply approved screenshots or synthetic examples, a recording, public artifact/code links and required credits.",
            "ja": "掲載許可のある画面か合成データの例、録画、公開できる成果物・コードのリンク、必要なクレジットを用意してください。"
          }
        },
        "evidence": {
          "id": "salon-data-platform-evidence",
          "text": {
            "en": "Supply attributable measurements, current use/release records and any permitted collaborator quote; include period, scope and method.",
            "ja": "測定の期間・対象・方法、現在の利用・公開状況、掲載許可のある協力者のコメントを用意してください。"
          }
        },
        "reflection": {
          "id": "salon-data-platform-reflection",
          "text": {
            "en": "Choose the next improvement and explain how to assess it.",
            "ja": "次に改善する点と、その効果を確かめる方法を選んでください。"
          }
        }
      }
    },
    {
      "id": "local-speech",
      "slug": "local-speech",
      "legacySlugs": [],
      "title": {
        "en": "Local AI speech and macOS playback",
        "ja": "ローカルAI音声合成・macOS再生ツール"
      },
      "summary": {
        "en": "A personal speech tool streams AI-agent responses with synchronized captions.",
        "ja": "AIエージェントの応答を音声で再生し、字幕を同期する個人用ツールです。"
      },
      "description": {
        "en": "Built personal tools for listening to AI-agent responses, using existing Herdr and MLX/Kokoro speech models. With AI assistance, developed a Python streaming speech service and a Swift macOS player with word-timed captions, cancellation and playback handover.",
        "ja": "AIエージェントの応答を音声で聞くため、既存のHerdrとMLX／Kokoro音声モデルを利用した個人用ツールをAI支援で開発。Pythonのストリーミング音声合成とSwiftのmacOSプレーヤーを組み合わせ、単語に同期する字幕、キャンセル、再生の引き継ぎを実装しました。"
      },
      "association": {
        "en": "Independent project",
        "ja": "個人の開発プロジェクト"
      },
      "contribution": {
        "en": "Owner-directed, AI-assisted speech and macOS tool development",
        "ja": "AI支援によるツール開発"
      },
      "area": "ai-tools",
      "collectionOrder": 1,
      "homeOrder": 1,
      "stage": {
        "en": "Documented personal installations",
        "ja": "個人環境への導入を確認"
      },
      "problem": {
        "en": "Listening to an agent response needs coordinated speech, captions and playback controls. A new response also needs a clear way to take over playback.",
        "ja": "エージェントの応答を聞くには、音声・字幕・再生操作を連携させる必要があります。次の応答へ再生を引き継ぐ操作も必要です。"
      },
      "workflow": {
        "en": [
          "Agent response",
          "Python speech stream",
          "macOS audio + captions"
        ],
        "ja": [
          "エージェントの応答",
          "Pythonで音声を生成",
          "macOSで音声・字幕を再生"
        ]
      },
      "decisions": {
        "en": [
          "The Python service handles streaming synthesis, while the Swift player handles playback and word-timed captions. This gives speech generation and the listening interface separate responsibilities.",
          "Cancellation and playback handover are explicit parts of the player. Existing Herdr and MLX/Kokoro components supply the underlying speech capabilities; the project integrates them into a personal workflow with AI assistance."
        ],
        "ja": [
          "Pythonのサービスが音声を生成し、Swiftのプレーヤーが再生と単語ごとの字幕表示を担当します。音声生成と操作画面の役割を分けた構成です。",
          "プレーヤーにキャンセルと再生の引き継ぎを実装しました。音声の基盤には既存のHerdrとMLX／Kokoroを利用し、AI支援で個人の作業環境へ組み込んでいます。"
        ]
      },
      "results": {
        "en": "The reviewed record supports personal installations, streaming speech, synchronized captions, cancellation and playback handover.",
        "ja": "確認済みの範囲は、個人環境への導入、音声のストリーミング、字幕の同期、キャンセル、再生の引き継ぎです。"
      },
      "related": [
        "subsidy-search-pilot",
        "agent-coordination"
      ],
      "stack": [
        {
          "name": "Python",
          "responsibility": {
            "en": "Streaming speech synthesis",
            "ja": "音声のストリーミング生成"
          }
        },
        {
          "name": "Swift",
          "responsibility": {
            "en": "Native player implementation",
            "ja": "ネイティブプレーヤーの実装"
          }
        },
        {
          "name": "SwiftUI",
          "responsibility": {
            "en": "Player interface",
            "ja": "プレーヤーの画面"
          }
        },
        {
          "name": "AppKit",
          "responsibility": {
            "en": "macOS integration",
            "ja": "macOSとの連携"
          }
        },
        {
          "name": "AVFoundation",
          "responsibility": {
            "en": "Audio playback",
            "ja": "音声の再生"
          }
        },
        {
          "name": "MLX",
          "responsibility": {
            "en": "Local model execution",
            "ja": "ローカルモデルの実行"
          }
        },
        {
          "name": "Kokoro",
          "responsibility": {
            "en": "Speech model",
            "ja": "音声モデル"
          }
        }
      ],
      "todos": {
        "context": {
          "id": "local-speech-context",
          "text": {
            "en": "Confirm the project period, collaborators' responsibilities and one concrete problem or failure to explain.",
            "ja": "プロジェクトの期間、協力者の担当範囲、説明できる具体的な問題か失敗例を確認してください。"
          }
        },
        "decisions": {
          "id": "local-speech-decisions",
          "text": {
            "en": "Add two personal decisions with constraints, alternatives considered and the consequences of the choice.",
            "ja": "本人が判断した2点について、制約、検討した選択肢、選択によって起きたことを追記してください。"
          }
        },
        "artifacts": {
          "id": "local-speech-artifacts",
          "text": {
            "en": "Supply approved screenshots or synthetic examples, a recording, public artifact/code links and required credits.",
            "ja": "掲載許可のある画面か合成データの例、録画、公開できる成果物・コードのリンク、必要なクレジットを用意してください。"
          }
        },
        "evidence": {
          "id": "local-speech-evidence",
          "text": {
            "en": "Supply attributable measurements, current use/release records and any permitted collaborator quote; include period, scope and method.",
            "ja": "測定の期間・対象・方法、現在の利用・公開状況、掲載許可のある協力者のコメントを用意してください。"
          }
        },
        "reflection": {
          "id": "local-speech-reflection",
          "text": {
            "en": "Choose the next improvement and explain how to assess it.",
            "ja": "次に改善する点と、その効果を確かめる方法を選んでください。"
          }
        }
      }
    },
    {
      "id": "wecall",
      "slug": "event-platform",
      "legacySlugs": [
        "wecall"
      ],
      "title": {
        "en": "Event-platform rearchitecture",
        "ja": "イベント管理基盤の再設計"
      },
      "summary": {
        "en": "A modular event platform handles LINE-connected reservations and check-in at lower infrastructure cost.",
        "ja": "LINE連携の予約とチェックインを、再利用しやすい構成で処理するイベント基盤です。"
      },
      "description": {
        "en": "Rearchitected a LINE-connected reservation platform to make event configurations reusable and reduce infrastructure cost. Built modular reservation and check-in features with Nuxt, TypeScript, AWS Lambda and DynamoDB, alongside shared validation and an analytics pipeline.",
        "ja": "イベントごとに再利用できる構成とインフラ費の削減を目指し、LINE連携の予約基盤を再設計。Nuxt、TypeScript、AWS Lambda、DynamoDBで予約・チェックイン機能を分離し、共通バリデーションと分析用データ連携を整備しました。"
      },
      "association": {
        "en": "Generosity Inc.",
        "ja": "Generosity Inc."
      },
      "contribution": {
        "en": "Architecture and full-stack engineering",
        "ja": "アーキテクチャ設計・フルスタック開発"
      },
      "area": "data-systems",
      "collectionOrder": 1,
      "homeOrder": 2,
      "stage": {
        "en": "Professional work at Generosity",
        "ja": "Generosityでの業務開発"
      },
      "problem": {
        "en": "Event configurations needed reusable reservation and check-in features, alongside a reduction in infrastructure cost.",
        "ja": "イベントごとに再利用できる予約・チェックイン機能と、インフラ費の削減が必要でした。"
      },
      "workflow": {
        "en": [
          "LINE reservation",
          "Lambda + shared validation",
          "DynamoDB + analytics"
        ],
        "ja": [
          "LINEから予約",
          "Lambda・共通検証",
          "DynamoDB・分析連携"
        ]
      },
      "decisions": {
        "en": [
          "Reservation and check-in became modular features. Reusable event configuration and shared validation give repeated event work a common structure.",
          "The rearchitecture uses AWS Lambda and DynamoDB, with Nuxt and TypeScript for the application. An analytics pipeline connects operational data to analysis."
        ],
        "ja": [
          "予約とチェックインを機能ごとに分離しました。イベント設定とバリデーションを共通化し、繰り返し使う業務に共通の構成を与えています。",
          "AWS LambdaとDynamoDBを使う構成へ再設計し、アプリにはNuxtとTypeScriptを利用しました。分析用のデータ連携も整備しています。"
        ]
      },
      "results": {
        "en": "The reworked platform lowered annual infrastructure cost while making reservation and check-in features reusable across events.",
        "ja": "再設計した基盤により、年間インフラ費を削減し、予約とチェックインの機能をイベント間で再利用できるようにしました。"
      },
      "related": [
        "event-ticketing",
        "salon-data-platform"
      ],
      "stack": [
        {
          "name": "Nuxt.js",
          "responsibility": {
            "en": "Reservation interface",
            "ja": "予約画面"
          }
        },
        {
          "name": "TypeScript",
          "responsibility": {
            "en": "Application logic and contracts",
            "ja": "アプリの処理・データの型"
          }
        },
        {
          "name": "AWS Lambda",
          "responsibility": {
            "en": "Serverless application processing",
            "ja": "サーバーレスの処理"
          }
        },
        {
          "name": "DynamoDB",
          "responsibility": {
            "en": "Event data storage",
            "ja": "イベントデータの保存"
          }
        },
        {
          "name": "Zod",
          "responsibility": {
            "en": "Shared input validation",
            "ja": "共通の入力検証"
          }
        },
        {
          "name": "CloudFront",
          "responsibility": {
            "en": "Content delivery",
            "ja": "コンテンツ配信"
          }
        }
      ],
      "todos": {
        "context": {
          "id": "event-platform-context",
          "text": {
            "en": "Confirm the project period, collaborators' responsibilities and one concrete problem or failure to explain.",
            "ja": "プロジェクトの期間、協力者の担当範囲、説明できる具体的な問題か失敗例を確認してください。"
          }
        },
        "decisions": {
          "id": "event-platform-decisions",
          "text": {
            "en": "Add two personal decisions with constraints, alternatives considered and the consequences of the choice.",
            "ja": "本人が判断した2点について、制約、検討した選択肢、選択によって起きたことを追記してください。"
          }
        },
        "artifacts": {
          "id": "event-platform-artifacts",
          "text": {
            "en": "Supply approved screenshots or synthetic examples, a recording, public artifact/code links and required credits.",
            "ja": "掲載許可のある画面か合成データの例、録画、公開できる成果物・コードのリンク、必要なクレジットを用意してください。"
          }
        },
        "evidence": {
          "id": "event-platform-evidence",
          "text": {
            "en": "Document the annual cost baseline/comparison periods, included services and measurement method for the confirmed approximate headline.",
            "ja": "確認済みの概算値について、比較する年度、対象サービス、集計方法を用意してください。"
          }
        },
        "reflection": {
          "id": "event-platform-reflection",
          "text": {
            "en": "Choose the next improvement and explain how to assess it.",
            "ja": "次に改善する点と、その効果を確かめる方法を選んでください。"
          }
        }
      }
    },
    {
      "id": "subsidy-search-pilot",
      "slug": "subsidy-search-pilot",
      "legacySlugs": [],
      "title": {
        "en": "AI subsidy-search assistant prototype",
        "ja": "補助金検索AIアシスタントのプロトタイプ"
      },
      "summary": {
        "en": "A local prototype turns funding needs into search conditions and source-linked subsidy candidates.",
        "ja": "資金ニーズから検索条件を整理し、出典付きの補助金候補を返すローカルプロトタイプです。"
      },
      "description": {
        "en": "Built a local AI prototype that turns a business’s funding needs into subsidy-search conditions and source-linked candidate explanations. A TypeScript/React workspace connects a language-model conversation layer to a queued Playwright search worker. Server checks validate conditions, candidate IDs and source excerpts.",
        "ja": "事業者の資金ニーズから補助金の検索条件を整理し、候補と出典を示すローカルAIプロトタイプを開発。TypeScript／Reactの画面、言語モデルとの対話処理、Playwrightの検索キューを接続しました。サーバー側で検索条件、候補ID、出典の抜粋を検証。"
      },
      "association": {
        "en": "Independent project",
        "ja": "個人の開発プロジェクト"
      },
      "contribution": {
        "en": "AI search prototype and application development",
        "ja": "プロトタイプ開発"
      },
      "area": "ai-tools",
      "collectionOrder": 2,
      "homeOrder": 4,
      "stage": {
        "en": "Local prototype",
        "ja": "ローカルプロトタイプ"
      },
      "problem": {
        "en": "A funding conversation needs to become concrete search conditions, then a set of candidates a reader can check against source material.",
        "ja": "資金調達の相談を具体的な検索条件に変え、元の情報と照合できる候補を提示する必要があります。"
      },
      "workflow": {
        "en": [
          "Funding needs",
          "Validated conditions + queued search",
          "Source-linked candidates"
        ],
        "ja": [
          "資金ニーズ",
          "条件検証・検索キュー",
          "出典付きの候補"
        ]
      },
      "decisions": {
        "en": [
          "The TypeScript/React workspace connects the conversation layer to a queued Playwright worker. Search execution has its own processing path, separate from the conversation interface.",
          "Server checks validate search conditions, candidate IDs and source excerpts. These checks give the conversation and search components an explicit data boundary."
        ],
        "ja": [
          "TypeScript／Reactの画面から対話処理とPlaywrightの検索ワーカーを接続しています。検索の実行はキューを通り、対話画面とは別の処理経路を持ちます。",
          "サーバー側で検索条件、候補ID、出典の抜粋を検証します。対話と検索の間で受け渡すデータに、明確な検証の境界を設けています。"
        ]
      },
      "results": {
        "en": "The implemented workflow connects a language-model conversation to queued search and source-linked explanations with server-side validation. The reviewed stage is a local prototype.",
        "ja": "言語モデルとの対話、検索キュー、出典を示す説明を接続し、サーバー側でデータを検証する処理を実装しました。確認済みの段階はローカルプロトタイプです。"
      },
      "related": [
        "agent-coordination",
        "local-speech"
      ],
      "stack": [
        {
          "name": "TypeScript",
          "responsibility": {
            "en": "Application logic and contracts",
            "ja": "アプリの処理・データの型"
          }
        },
        {
          "name": "Node.js",
          "responsibility": {
            "en": "Application runtime",
            "ja": "アプリの実行環境"
          }
        },
        {
          "name": "React",
          "responsibility": {
            "en": "Application interface",
            "ja": "アプリの画面"
          }
        },
        {
          "name": "Playwright",
          "responsibility": {
            "en": "Queued browser search",
            "ja": "検索キューのブラウザー操作"
          }
        }
      ],
      "todos": {
        "context": {
          "id": "subsidy-search-pilot-context",
          "text": {
            "en": "Confirm the project period, collaborators' responsibilities and one concrete problem or failure to explain.",
            "ja": "プロジェクトの期間、協力者の担当範囲、説明できる具体的な問題か失敗例を確認してください。"
          }
        },
        "decisions": {
          "id": "subsidy-search-pilot-decisions",
          "text": {
            "en": "Add two personal decisions with constraints, alternatives considered and the consequences of the choice.",
            "ja": "本人が判断した2点について、制約、検討した選択肢、選択によって起きたことを追記してください。"
          }
        },
        "artifacts": {
          "id": "subsidy-search-pilot-artifacts",
          "text": {
            "en": "Supply approved screenshots or synthetic examples, a recording, public artifact/code links and required credits. Confirm ownership and publication rights before sharing code or recordings.",
            "ja": "掲載許可のある画面か合成データの例、録画、公開できる成果物・コードのリンク、必要なクレジットを用意してください。 コードや録画の掲載前に、所有権と公開権限を確認してください。"
          }
        },
        "evidence": {
          "id": "subsidy-search-pilot-evidence",
          "text": {
            "en": "Supply a versioned evaluation set, baseline, model/configuration/date, scoring method, aggregate outcomes, failures, cost and latency.",
            "ja": "版を固定した評価セット、ベースライン、モデル・設定・日付、採点方法、集計結果、失敗例、費用、遅延を用意してください。"
          }
        },
        "reflection": {
          "id": "subsidy-search-pilot-reflection",
          "text": {
            "en": "Choose the next improvement and explain how to assess it.",
            "ja": "次に改善する点と、その効果を確かめる方法を選んでください。"
          }
        }
      }
    },
    {
      "id": "agent-coordination",
      "slug": "agent-coordination",
      "legacySlugs": [],
      "title": {
        "en": "Durable AI-agent coordination",
        "ja": "AIエージェントのタスク・引き継ぎ管理"
      },
      "summary": {
        "en": "A local service retains agent tasks, decisions and handovers across coordinator changes.",
        "ja": "担当が変わっても、エージェントのタスク・判断・引き継ぎを保持するローカルサービスです。"
      },
      "description": {
        "en": "Built a local Go/SQLite service and CLI to retain AI-agent tasks, decisions and handovers across coordinator changes. Transactional writes, request receipts and version checks protect task state. During restart recovery, dispatches with uncertain outcomes wait for reconciliation.",
        "ja": "AIエージェントの担当やセッションが変わっても、タスク・判断・引き継ぎを保持するGo／SQLiteのローカルサービスとCLIを開発。トランザクション、要求の重複処理、バージョン検証で状態を管理します。再起動時に実行結果が不明な処理は、状態を確認するまで保留します。"
      },
      "association": {
        "en": "Independent project",
        "ja": "個人の開発プロジェクト"
      },
      "contribution": {
        "en": "Coordination service and CLI development",
        "ja": "開発"
      },
      "area": "ai-tools",
      "collectionOrder": 3,
      "homeOrder": null,
      "stage": {
        "en": "Local qualification",
        "ja": "ローカル環境での検証段階"
      },
      "problem": {
        "en": "Task state needs to survive coordinator changes and restarts, including dispatches whose outcome is uncertain.",
        "ja": "担当の変更や再起動をまたいでタスクの状態を保持し、実行結果が不明な処理を扱う必要があります。"
      },
      "workflow": {
        "en": [
          "Task / handover",
          "Transactional state + receipts",
          "Restart reconciliation"
        ],
        "ja": [
          "タスク・引き継ぎ",
          "状態の保存・要求の記録",
          "再起動後の状態確認"
        ]
      },
      "decisions": {
        "en": [
          "Transactional writes, request receipts and version checks protect stored task state. Dispatches with uncertain outcomes wait for reconciliation after restart."
        ],
        "ja": [
          "トランザクション、要求の記録、バージョン検証で状態を管理します。再起動時に結果が不明な処理は、状態を確認するまで保留します。"
        ]
      },
      "results": {
        "en": "The reviewed local implementation retains tasks and handovers and includes restart recovery for uncertain dispatches.",
        "ja": "確認したローカル実装は、タスクと引き継ぎの保存、結果が不明な処理の再起動後の復旧に対応しています。"
      },
      "related": [
        "subsidy-search-pilot",
        "markdown-sharing"
      ],
      "stack": [
        {
          "name": "Go",
          "responsibility": {
            "en": "Coordination service and CLI",
            "ja": "状態管理サービス・CLI"
          }
        },
        {
          "name": "SQLite",
          "responsibility": {
            "en": "Transactional task storage",
            "ja": "タスクの保存・トランザクション"
          }
        },
        {
          "name": "HTTP/JSON",
          "responsibility": {
            "en": "Service API",
            "ja": "サービスのAPI"
          }
        },
        {
          "name": "Unix sockets",
          "responsibility": {
            "en": "Local communication",
            "ja": "ローカルの通信"
          }
        }
      ],
      "todos": {
        "context": {
          "id": "agent-coordination-context",
          "text": {
            "en": "Confirm the project period, collaborators' responsibilities and one concrete problem or failure to explain.",
            "ja": "プロジェクトの期間、協力者の担当範囲、説明できる具体的な問題か失敗例を確認してください。"
          }
        },
        "decisions": {
          "id": "agent-coordination-decisions",
          "text": {
            "en": "Add two personal decisions with constraints, alternatives considered and the consequences of the choice.",
            "ja": "本人が判断した2点について、制約、検討した選択肢、選択によって起きたことを追記してください。"
          }
        },
        "artifacts": {
          "id": "agent-coordination-artifacts",
          "text": {
            "en": "Supply approved screenshots or synthetic examples, a recording, public artifact/code links and required credits.",
            "ja": "掲載許可のある画面か合成データの例、録画、公開できる成果物・コードのリンク、必要なクレジットを用意してください。"
          }
        },
        "evidence": {
          "id": "agent-coordination-evidence",
          "text": {
            "en": "Supply attributable measurements, current use/release records and any permitted collaborator quote; include period, scope and method.",
            "ja": "測定の期間・対象・方法、現在の利用・公開状況、掲載許可のある協力者のコメントを用意してください。"
          }
        },
        "reflection": {
          "id": "agent-coordination-reflection",
          "text": {
            "en": "Choose the next improvement and explain how to assess it.",
            "ja": "次に改善する点と、その効果を確かめる方法を選んでください。"
          }
        }
      }
    },
    {
      "id": "weno",
      "slug": "event-ticketing",
      "legacySlugs": [
        "weno"
      ],
      "title": {
        "en": "LINE-connected ticketing",
        "ja": "LINE連携チケット発券"
      },
      "summary": {
        "en": "A queued ticketing system separates incoming requests from issuance and LINE notifications.",
        "ja": "発券要求の受付と処理を分け、LINE通知につなぐチケットシステムです。"
      },
      "description": {
        "en": "Rebuilt event ticketing flows to handle competing requests at ticket-release time. Developed Vue interfaces and a NestJS backend with BullMQ/Redis queues, Prisma/MySQL persistence and LINE notifications. Ticket issuance uses separate producer and worker paths.",
        "ja": "チケット公開時に集中する発券要求に対応するため、イベント向けの発券処理を再構築。Vueの画面とNestJSのバックエンドを開発し、BullMQ／Redisのキュー、Prisma／MySQLでの保存、LINE通知を組み合わせました。発券要求の受付とワーカー処理を分離しています。"
      },
      "association": {
        "en": "Generosity Inc.",
        "ja": "Generosity Inc."
      },
      "contribution": {
        "en": "Full-stack engineering",
        "ja": "フルスタック開発"
      },
      "area": "data-systems",
      "collectionOrder": 3,
      "homeOrder": null,
      "stage": {
        "en": "Professional work at Generosity",
        "ja": "Generosityでの業務開発"
      },
      "problem": {
        "en": "Ticket-release time creates competing issuance requests that need coordinated processing and stored ticket state.",
        "ja": "チケット公開時に集中する発券要求を処理し、チケットの状態を保存する必要がありました。"
      },
      "workflow": {
        "en": [
          "Ticket request",
          "BullMQ / Redis worker",
          "MySQL state + LINE notification"
        ],
        "ja": [
          "発券要求",
          "BullMQ・Redisのワーカー",
          "MySQLへ保存・LINE通知"
        ]
      },
      "decisions": {
        "en": [
          "Producer and worker paths separate request acceptance from ticket issuance. BullMQ/Redis queues connect them, and Prisma/MySQL retain ticket state."
        ],
        "ja": [
          "要求を受け付ける処理と発券ワーカーを分離しました。BullMQ／Redisのキューで接続し、Prisma／MySQLでチケットの状態を保存します。"
        ]
      },
      "results": {
        "en": "The implementation includes Vue interfaces, a NestJS backend, queued issuance, persistent ticket state and LINE notifications.",
        "ja": "Vueの画面、NestJSのバックエンド、発券キュー、チケット状態の保存、LINE通知を実装しました。"
      },
      "related": [
        "event-platform",
        "agent-coordination"
      ],
      "stack": [
        {
          "name": "TypeScript",
          "responsibility": {
            "en": "Application logic and contracts",
            "ja": "アプリの処理・データの型"
          }
        },
        {
          "name": "Vue.js",
          "responsibility": {
            "en": "Ticketing interface",
            "ja": "チケットの画面"
          }
        },
        {
          "name": "NestJS",
          "responsibility": {
            "en": "Ticketing backend",
            "ja": "発券のバックエンド"
          }
        },
        {
          "name": "BullMQ",
          "responsibility": {
            "en": "Issuance queue",
            "ja": "発券キュー"
          }
        },
        {
          "name": "Redis",
          "responsibility": {
            "en": "Queue storage",
            "ja": "キューの保存"
          }
        },
        {
          "name": "Prisma",
          "responsibility": {
            "en": "Ticket persistence access",
            "ja": "チケット保存のデータアクセス"
          }
        },
        {
          "name": "MySQL",
          "responsibility": {
            "en": "Ticket state storage",
            "ja": "チケット状態の保存"
          }
        }
      ],
      "todos": {
        "context": {
          "id": "event-ticketing-context",
          "text": {
            "en": "Confirm the project period, collaborators' responsibilities and one concrete problem or failure to explain.",
            "ja": "プロジェクトの期間、協力者の担当範囲、説明できる具体的な問題か失敗例を確認してください。"
          }
        },
        "decisions": {
          "id": "event-ticketing-decisions",
          "text": {
            "en": "Add two personal decisions with constraints, alternatives considered and the consequences of the choice.",
            "ja": "本人が判断した2点について、制約、検討した選択肢、選択によって起きたことを追記してください。"
          }
        },
        "artifacts": {
          "id": "event-ticketing-artifacts",
          "text": {
            "en": "Supply approved screenshots or synthetic examples, a recording, public artifact/code links and required credits.",
            "ja": "掲載許可のある画面か合成データの例、録画、公開できる成果物・コードのリンク、必要なクレジットを用意してください。"
          }
        },
        "evidence": {
          "id": "event-ticketing-evidence",
          "text": {
            "en": "Supply attributable measurements, current use/release records and any permitted collaborator quote; include period, scope and method.",
            "ja": "測定の期間・対象・方法、現在の利用・公開状況、掲載許可のある協力者のコメントを用意してください。"
          }
        },
        "reflection": {
          "id": "event-ticketing-reflection",
          "text": {
            "en": "Choose the next improvement and explain how to assess it.",
            "ja": "次に改善する点と、その効果を確かめる方法を選んでください。"
          }
        }
      }
    },
    {
      "id": "snap",
      "slug": "snap-photobooth",
      "legacySlugs": [
        "snap"
      ],
      "title": {
        "en": "SNAP — wedding photobooth product",
        "ja": "SNAP — 結婚式場向けフォトブース"
      },
      "summary": {
        "en": "Connected photobooth applications let venue staff manage events and guests view photos.",
        "ja": "式場スタッフのイベント管理と、ゲストの写真閲覧をつなぐフォトブース用アプリです。"
      },
      "description": {
        "en": "Developed connected applications for venue staff and wedding guests to manage photobooth events and view captured photos at Introduction. Built event settings, guest albums and venue displays with Next.js, TypeScript, Firebase and the Salsa API.",
        "ja": "Introductionで、式場スタッフのイベント管理とゲストの写真閲覧をつなぐフォトブース用アプリを開発。Next.js、TypeScript、Firebase、Salsa APIでイベント設定、ゲスト向けアルバム、会場表示を実装しました。"
      },
      "association": {
        "en": "Introduction Inc.",
        "ja": "Introduction Inc."
      },
      "contribution": {
        "en": "Application development and interface design",
        "ja": "アプリ開発・UI設計"
      },
      "area": "products-websites",
      "collectionOrder": 1,
      "homeOrder": null,
      "stage": {
        "en": "Product development at Introduction",
        "ja": "Introductionでのプロダクト開発"
      },
      "problem": {
        "en": "Venue staff and wedding guests need different interfaces connected to the same photobooth event and captured photos.",
        "ja": "式場スタッフと結婚式のゲストが、同じイベントと撮影写真をそれぞれの画面で扱う必要がありました。"
      },
      "workflow": {
        "en": [
          "Staff event settings",
          "Firebase + Salsa API",
          "Guest album + venue display"
        ],
        "ja": [
          "スタッフのイベント設定",
          "Firebase・Salsa API",
          "ゲストのアルバム・会場表示"
        ]
      },
      "decisions": {
        "en": [
          "Event settings, guest albums and venue displays form connected applications. Next.js and Firebase connect these interfaces with the Salsa API."
        ],
        "ja": [
          "イベント設定、ゲスト向けアルバム、会場表示を連携するアプリとして実装しました。Next.jsとFirebaseを使い、Salsa APIと接続しています。"
        ]
      },
      "results": {
        "en": "The reviewed work supports event administration, guest albums and venue displays at Introduction.",
        "ja": "Introductionでの開発として、イベント管理、ゲスト向けアルバム、会場表示を確認しています。"
      },
      "related": [
        "ongy-viewer",
        "architecture-portfolio"
      ],
      "stack": [
        {
          "name": "TypeScript",
          "responsibility": {
            "en": "Application logic and contracts",
            "ja": "アプリの処理・データの型"
          }
        },
        {
          "name": "React",
          "responsibility": {
            "en": "Application interface",
            "ja": "アプリの画面"
          }
        },
        {
          "name": "Next.js",
          "responsibility": {
            "en": "Connected web applications",
            "ja": "連携するWebアプリ"
          }
        },
        {
          "name": "Firebase",
          "responsibility": {
            "en": "Application data services",
            "ja": "アプリのデータ管理"
          }
        },
        {
          "name": "Mantine",
          "responsibility": {
            "en": "Interface components",
            "ja": "画面の部品"
          }
        },
        {
          "name": "Salsa API",
          "responsibility": {
            "en": "Photobooth integration",
            "ja": "フォトブースとの連携"
          }
        }
      ],
      "todos": {
        "context": {
          "id": "snap-photobooth-context",
          "text": {
            "en": "Confirm the project period, collaborators' responsibilities and one concrete problem or failure to explain.",
            "ja": "プロジェクトの期間、協力者の担当範囲、説明できる具体的な問題か失敗例を確認してください。"
          }
        },
        "decisions": {
          "id": "snap-photobooth-decisions",
          "text": {
            "en": "Add two personal decisions with constraints, alternatives considered and the consequences of the choice.",
            "ja": "本人が判断した2点について、制約、検討した選択肢、選択によって起きたことを追記してください。"
          }
        },
        "artifacts": {
          "id": "snap-photobooth-artifacts",
          "text": {
            "en": "Supply approved screenshots or synthetic examples, a recording, public artifact/code links and required credits.",
            "ja": "掲載許可のある画面か合成データの例、録画、公開できる成果物・コードのリンク、必要なクレジットを用意してください。"
          }
        },
        "evidence": {
          "id": "snap-photobooth-evidence",
          "text": {
            "en": "Supply attributable measurements, current use/release records and any permitted collaborator quote; include period, scope and method.",
            "ja": "測定の期間・対象・方法、現在の利用・公開状況、掲載許可のある協力者のコメントを用意してください。"
          }
        },
        "reflection": {
          "id": "snap-photobooth-reflection",
          "text": {
            "en": "Choose the next improvement and explain how to assess it.",
            "ja": "次に改善する点と、その効果を確かめる方法を選んでください。"
          }
        }
      }
    },
    {
      "id": "iplusi",
      "slug": "architecture-portfolio",
      "legacySlugs": [
        "iplusi"
      ],
      "title": {
        "en": "i+i — architecture portfolio website",
        "ja": "i+i — 建築事務所ポートフォリオ"
      },
      "summary": {
        "en": "An architecture website pairs project presentation with custom editorial blocks.",
        "ja": "建築事例の紹介と、専用ブロックによる継続的な更新を両立するサイトです。"
      },
      "description": {
        "en": "Developed a WordPress/Sage theme for an architecture portfolio, combining project presentation with an editor workflow for ongoing updates. Built custom blocks with PHP/Blade and JavaScript, plus an open-house listing that falls back to recent events when none are upcoming. Added inquiry-form focus handling and a pausable hero carousel that respects reduced-motion settings.",
        "ja": "建築事例の紹介と継続的な更新を両立するため、WordPress／Sageのテーマを開発。PHP／BladeとJavaScriptで編集用のカスタムブロックを実装しました。見学会は開催予定がない場合に直近の事例を表示。問い合わせ時のフォーカス移動や、動きを減らす設定に対応した一時停止可能なヒーロー表示も整備しました。"
      },
      "association": {
        "en": "Independent project",
        "ja": "個人開発"
      },
      "contribution": {
        "en": "Web design and development",
        "ja": "Webデザイン・開発"
      },
      "area": "products-websites",
      "collectionOrder": 2,
      "homeOrder": null,
      "stage": {
        "en": "Website theme development",
        "ja": "Webサイトのテーマ開発"
      },
      "problem": {
        "en": "An architecture portfolio needs expressive project pages that editors can keep up to date, including open-house listings and inquiries.",
        "ja": "建築事例を伝えるページを継続して更新し、見学会の案内と問い合わせにつなぐ必要がありました。"
      },
      "workflow": {
        "en": [
          "Editorial blocks",
          "WordPress / Sage theme",
          "Projects + inquiries"
        ],
        "ja": [
          "編集用ブロック",
          "WordPress・Sageテーマ",
          "事例紹介・問い合わせ"
        ]
      },
      "decisions": {
        "en": [
          "Custom PHP/Blade blocks support the editorial workflow. The open-house listing falls back to recent events, and a pausable hero respects reduced-motion settings."
        ],
        "ja": [
          "PHP／Bladeのカスタムブロックで編集を支えます。見学会の予定がない場合は直近の事例を表示し、ヒーロー表示は一時停止と動きを減らす設定に対応します。"
        ]
      },
      "results": {
        "en": "The theme implements project pages, editorial blocks, event-list fallback and inquiry focus handling.",
        "ja": "事例ページ、編集用ブロック、見学会表示の切り替え、問い合わせ時のフォーカス移動を実装しました。"
      },
      "related": [
        "falconex-site",
        "snap-photobooth"
      ],
      "stack": [
        {
          "name": "WordPress",
          "responsibility": {
            "en": "Content management",
            "ja": "コンテンツ管理"
          }
        },
        {
          "name": "Sage",
          "responsibility": {
            "en": "Theme structure",
            "ja": "テーマの構成"
          }
        },
        {
          "name": "PHP",
          "responsibility": {
            "en": "Theme and page processing",
            "ja": "テーマ・ページの処理"
          }
        },
        {
          "name": "Blade",
          "responsibility": {
            "en": "Editorial templates",
            "ja": "編集用テンプレート"
          }
        },
        {
          "name": "JavaScript",
          "responsibility": {
            "en": "Browser interactions and validation",
            "ja": "画面の操作・入力検証"
          }
        },
        {
          "name": "Tailwind CSS",
          "responsibility": {
            "en": "Interface styling",
            "ja": "画面のスタイル"
          }
        },
        {
          "name": "Vite",
          "responsibility": {
            "en": "Frontend asset build",
            "ja": "フロントエンドのビルド"
          }
        }
      ],
      "todos": {
        "context": {
          "id": "architecture-portfolio-context",
          "text": {
            "en": "Confirm the project period, collaborators' responsibilities and one concrete problem or failure to explain.",
            "ja": "プロジェクトの期間、協力者の担当範囲、説明できる具体的な問題か失敗例を確認してください。"
          }
        },
        "decisions": {
          "id": "architecture-portfolio-decisions",
          "text": {
            "en": "Add two personal decisions with constraints, alternatives considered and the consequences of the choice.",
            "ja": "本人が判断した2点について、制約、検討した選択肢、選択によって起きたことを追記してください。"
          }
        },
        "artifacts": {
          "id": "architecture-portfolio-artifacts",
          "text": {
            "en": "Supply approved screenshots or synthetic examples, a recording, public artifact/code links and required credits.",
            "ja": "掲載許可のある画面か合成データの例、録画、公開できる成果物・コードのリンク、必要なクレジットを用意してください。"
          }
        },
        "evidence": {
          "id": "architecture-portfolio-evidence",
          "text": {
            "en": "Supply attributable measurements, current use/release records and any permitted collaborator quote; include period, scope and method.",
            "ja": "測定の期間・対象・方法、現在の利用・公開状況、掲載許可のある協力者のコメントを用意してください。"
          }
        },
        "reflection": {
          "id": "architecture-portfolio-reflection",
          "text": {
            "en": "Choose the next improvement and explain how to assess it.",
            "ja": "次に改善する点と、その効果を確かめる方法を選んでください。"
          }
        }
      }
    },
    {
      "id": "falconex-site",
      "slug": "falconex-site",
      "legacySlugs": [],
      "title": {
        "en": "FalconeX corporate website",
        "ja": "FalconeXコーポレートサイト"
      },
      "summary": {
        "en": "A corporate website turns Markdown content into validated company pages and inquiry forms.",
        "ja": "Markdownの内容から会社ページを生成し、ページ情報と問い合わせ入力を検証するサイトです。"
      },
      "description": {
        "en": "Built a custom WordPress/PHP theme so company pages and inquiry interactions could share a maintainable content structure. Implemented Markdown-driven pages, metadata validation and JavaScript form errors with focus handling. The theme rejects invalid or duplicate page metadata and guides users to inquiry fields that need correction.",
        "ja": "会社情報の更新と問い合わせ対応を共通の構成で管理するため、WordPress／PHPの独自テーマを開発。Markdownからのページ生成、メタデータ検証、JavaScriptによるフォームエラー表示とフォーカス移動を実装しました。不正・重複するページ情報を検出し、問い合わせ時には修正が必要な入力項目へ案内します。"
      },
      "association": {
        "en": "FalconeX",
        "ja": "FalconeX"
      },
      "contribution": {
        "en": "Website development and maintenance",
        "ja": "Webサイト開発・保守"
      },
      "area": "products-websites",
      "collectionOrder": 3,
      "homeOrder": null,
      "stage": {
        "en": "Website development at FalconeX",
        "ja": "FalconeXでのWebサイト開発"
      },
      "problem": {
        "en": "Company pages and inquiry interactions need a maintainable shared content structure and clear validation.",
        "ja": "会社情報と問い合わせを共通の構成で管理し、入力やページ情報を検証する必要がありました。"
      },
      "workflow": {
        "en": [
          "Markdown content",
          "Metadata validation + PHP theme",
          "Company pages + inquiries"
        ],
        "ja": [
          "Markdownの内容",
          "メタデータ検証・PHPテーマ",
          "会社ページ・問い合わせ"
        ]
      },
      "decisions": {
        "en": [
          "The theme validates invalid or duplicate metadata before page generation. JavaScript form errors move focus to inquiry fields that need correction."
        ],
        "ja": [
          "ページ生成時に不正・重複するメタデータを検出します。問い合わせフォームはJavaScriptでエラーを表示し、修正が必要な項目へフォーカスを移します。"
        ]
      },
      "results": {
        "en": "The custom WordPress/PHP theme supports Markdown-driven pages, metadata validation and inquiry-field guidance.",
        "ja": "WordPress／PHPの独自テーマに、Markdownからのページ生成、メタデータ検証、問い合わせの入力案内を実装しました。"
      },
      "related": [
        "architecture-portfolio",
        "markdown-sharing"
      ],
      "stack": [
        {
          "name": "WordPress",
          "responsibility": {
            "en": "Content management",
            "ja": "コンテンツ管理"
          }
        },
        {
          "name": "PHP",
          "responsibility": {
            "en": "Theme and page processing",
            "ja": "テーマ・ページの処理"
          }
        },
        {
          "name": "JavaScript",
          "responsibility": {
            "en": "Browser interactions and validation",
            "ja": "画面の操作・入力検証"
          }
        },
        {
          "name": "Markdown",
          "responsibility": {
            "en": "Page content",
            "ja": "ページの内容"
          }
        }
      ],
      "todos": {
        "context": {
          "id": "falconex-site-context",
          "text": {
            "en": "Confirm the project period, collaborators' responsibilities and one concrete problem or failure to explain.",
            "ja": "プロジェクトの期間、協力者の担当範囲、説明できる具体的な問題か失敗例を確認してください。"
          }
        },
        "decisions": {
          "id": "falconex-site-decisions",
          "text": {
            "en": "Add two personal decisions with constraints, alternatives considered and the consequences of the choice.",
            "ja": "本人が判断した2点について、制約、検討した選択肢、選択によって起きたことを追記してください。"
          }
        },
        "artifacts": {
          "id": "falconex-site-artifacts",
          "text": {
            "en": "Supply approved screenshots or synthetic examples, a recording, public artifact/code links and required credits.",
            "ja": "掲載許可のある画面か合成データの例、録画、公開できる成果物・コードのリンク、必要なクレジットを用意してください。"
          }
        },
        "evidence": {
          "id": "falconex-site-evidence",
          "text": {
            "en": "Supply attributable measurements, current use/release records and any permitted collaborator quote; include period, scope and method.",
            "ja": "測定の期間・対象・方法、現在の利用・公開状況、掲載許可のある協力者のコメントを用意してください。"
          }
        },
        "reflection": {
          "id": "falconex-site-reflection",
          "text": {
            "en": "Choose the next improvement and explain how to assess it.",
            "ja": "次に改善する点と、その効果を確かめる方法を選んでください。"
          }
        }
      }
    },
    {
      "id": "markdown-sharing",
      "slug": "markdown-sharing",
      "legacySlugs": [],
      "title": {
        "en": "Expiring Markdown sharing tool",
        "ja": "有効期限付きMarkdown共有ツール"
      },
      "summary": {
        "en": "A Markdown application shares rendered documents through expiring links.",
        "ja": "Markdown文書を、有効期限付きの閲覧リンクで共有するアプリです。"
      },
      "description": {
        "en": "Built a Cloudflare Workers/Hono application for sharing rendered Markdown through expiring links. R2 stores documents and D1 tracks publication metadata; the implementation enforces size and rate limits, detects duplicates and rejects expired shares.",
        "ja": "Markdownを有効期限付きの閲覧リンクで共有するCloudflare Workers／Honoアプリを開発。R2に文書を保存し、D1で公開メタデータを管理します。サイズ・リクエスト数の制限、重複検出、期限切れリンクの拒否を実装しました。"
      },
      "association": {
        "en": "Independent project",
        "ja": "個人の開発プロジェクト"
      },
      "contribution": {
        "en": "Markdown sharing application development",
        "ja": "Webアプリ開発"
      },
      "area": "ai-tools",
      "collectionOrder": 4,
      "homeOrder": null,
      "stage": {
        "en": "Source implementation reviewed",
        "ja": "ソース実装を確認"
      },
      "problem": {
        "en": "Sharing a rendered document needs storage, publication metadata and an expiry boundary.",
        "ja": "文書の共有には、本文の保存、公開情報の管理、有効期限の制御が必要です。"
      },
      "workflow": {
        "en": [
          "Markdown",
          "R2 document + D1 metadata",
          "Expiring share link"
        ],
        "ja": [
          "Markdown文書",
          "R2に本文・D1に公開情報",
          "有効期限付きリンク"
        ]
      },
      "decisions": {
        "en": [
          "R2 stores documents and D1 stores publication metadata. Size limits, rate limits, duplicate detection and expiry checks govern the sharing boundary."
        ],
        "ja": [
          "R2に文書、D1に公開メタデータを保存します。サイズ・リクエスト数の制限、重複検出、有効期限の検証で共有を制御します。"
        ]
      },
      "results": {
        "en": "The reviewed source implements document rendering, expiring links and limits on publication requests.",
        "ja": "確認したソースには、文書の表示、有効期限付きリンク、公開リクエストの制限が実装されています。"
      },
      "related": [
        "agent-coordination",
        "falconex-site"
      ],
      "stack": [
        {
          "name": "TypeScript",
          "responsibility": {
            "en": "Application logic and contracts",
            "ja": "アプリの処理・データの型"
          }
        },
        {
          "name": "Cloudflare Workers",
          "responsibility": {
            "en": "Sharing application runtime",
            "ja": "共有アプリの実行環境"
          }
        },
        {
          "name": "Hono",
          "responsibility": {
            "en": "Sharing request handling",
            "ja": "共有リクエストの処理"
          }
        },
        {
          "name": "R2",
          "responsibility": {
            "en": "Document storage",
            "ja": "文書の保存"
          }
        },
        {
          "name": "D1",
          "responsibility": {
            "en": "Publication metadata",
            "ja": "公開メタデータ"
          }
        },
        {
          "name": "markdown-it",
          "responsibility": {
            "en": "Markdown rendering",
            "ja": "Markdownの表示"
          }
        }
      ],
      "todos": {
        "context": {
          "id": "markdown-sharing-context",
          "text": {
            "en": "Confirm the project period, collaborators' responsibilities and one concrete problem or failure to explain.",
            "ja": "プロジェクトの期間、協力者の担当範囲、説明できる具体的な問題か失敗例を確認してください。"
          }
        },
        "decisions": {
          "id": "markdown-sharing-decisions",
          "text": {
            "en": "Add two personal decisions with constraints, alternatives considered and the consequences of the choice.",
            "ja": "本人が判断した2点について、制約、検討した選択肢、選択によって起きたことを追記してください。"
          }
        },
        "artifacts": {
          "id": "markdown-sharing-artifacts",
          "text": {
            "en": "Supply approved screenshots or synthetic examples, a recording, public artifact/code links and required credits.",
            "ja": "掲載許可のある画面か合成データの例、録画、公開できる成果物・コードのリンク、必要なクレジットを用意してください。"
          }
        },
        "evidence": {
          "id": "markdown-sharing-evidence",
          "text": {
            "en": "Supply attributable measurements, current use/release records and any permitted collaborator quote; include period, scope and method. Verify that the deployed application matches the reviewed source.",
            "ja": "測定の期間・対象・方法、現在の利用・公開状況、掲載許可のある協力者のコメントを用意してください。 公開環境と確認したソースの機能が一致するか検証してください。"
          }
        },
        "reflection": {
          "id": "markdown-sharing-reflection",
          "text": {
            "en": "Choose the next improvement and explain how to assess it.",
            "ja": "次に改善する点と、その効果を確かめる方法を選んでください。"
          }
        }
      }
    },
    {
      "id": "ongy",
      "slug": "ongy-viewer",
      "legacySlugs": [
        "ongy"
      ],
      "title": {
        "en": "Ongy — Instagram research prototype",
        "ja": "Ongy — Instagram調査用プロトタイプ"
      },
      "summary": {
        "en": "A research prototype lets businesses browse and organize Instagram stories.",
        "ja": "企業の調査業務でInstagramストーリーを閲覧・整理するプロトタイプです。"
      },
      "description": {
        "en": "Designed and developed an Instagram story-viewing prototype for business research at Introduction, covering the interface, frontend, backend and AWS deployment. The prototype supports browsing and organizing stories.",
        "ja": "Introductionで、企業の調査業務に向けたInstagramストーリー閲覧プロトタイプを開発。UIデザイン、フロントエンド、バックエンド、AWSへのデプロイまで担当しました。ストーリーの閲覧・整理に対応しています。"
      },
      "association": {
        "en": "Introduction Inc.",
        "ja": "Introduction Inc."
      },
      "contribution": {
        "en": "Design and full-stack development",
        "ja": "デザイン・フルスタック開発"
      },
      "area": "products-websites",
      "collectionOrder": 4,
      "homeOrder": null,
      "stage": {
        "en": "Research prototype at Introduction",
        "ja": "Introductionでの調査用プロトタイプ"
      },
      "problem": {
        "en": "Business research needed an interface for browsing and organizing Instagram stories.",
        "ja": "企業の調査業務で、Instagramストーリーを閲覧・整理する画面が必要でした。"
      },
      "workflow": {
        "en": [
          "Research task",
          "Story browsing + organization",
          "AWS deployment"
        ],
        "ja": [
          "調査の目的",
          "ストーリーの閲覧・整理",
          "AWSへデプロイ"
        ]
      },
      "decisions": {
        "en": [
          "The work spans interface design, frontend, backend and AWS deployment. The current reviewed public stack record identifies AWS."
        ],
        "ja": [
          "UI設計からフロントエンド、バックエンド、AWSへのデプロイまで担当しました。現時点で確認した公開用の技術情報はAWSです。"
        ]
      },
      "results": {
        "en": "The prototype implements story browsing and organization. Kento designed and developed the interface, frontend and backend at Introduction.",
        "ja": "ストーリーの閲覧と整理を実装したプロトタイプです。Introductionで、画面のデザインとフロントエンド・バックエンドの開発を担当しました。"
      },
      "related": [
        "snap-photobooth",
        "architecture-portfolio"
      ],
      "stack": [
        {
          "name": "AWS",
          "responsibility": {
            "en": "Prototype deployment",
            "ja": "プロトタイプのデプロイ"
          }
        }
      ],
      "todos": {
        "context": {
          "id": "ongy-viewer-context",
          "text": {
            "en": "Confirm the project period, collaborators' responsibilities and one concrete problem or failure to explain.",
            "ja": "プロジェクトの期間、協力者の担当範囲、説明できる具体的な問題か失敗例を確認してください。"
          }
        },
        "decisions": {
          "id": "ongy-viewer-decisions",
          "text": {
            "en": "Add two personal decisions with constraints, alternatives considered and the consequences of the choice.",
            "ja": "本人が判断した2点について、制約、検討した選択肢、選択によって起きたことを追記してください。"
          }
        },
        "artifacts": {
          "id": "ongy-viewer-artifacts",
          "text": {
            "en": "Supply approved screenshots or synthetic examples, a recording, public artifact/code links and required credits.",
            "ja": "掲載許可のある画面か合成データの例、録画、公開できる成果物・コードのリンク、必要なクレジットを用意してください。"
          }
        },
        "evidence": {
          "id": "ongy-viewer-evidence",
          "text": {
            "en": "Supply attributable measurements, current use/release records and any permitted collaborator quote; include period, scope and method. Supply an authoritative original stack record.",
            "ja": "測定の期間・対象・方法、現在の利用・公開状況、掲載許可のある協力者のコメントを用意してください。 当時の技術構成が分かる一次資料も用意してください。"
          }
        },
        "reflection": {
          "id": "ongy-viewer-reflection",
          "text": {
            "en": "Choose the next improvement and explain how to assess it.",
            "ja": "次に改善する点と、その効果を確かめる方法を選んでください。"
          }
        }
      }
    },
    {
      "id": "epicpull",
      "slug": "epicpull",
      "legacySlugs": [],
      "title": {
        "en": "EpicPull",
        "ja": "エピックプル"
      },
      "summary": {
        "en": "Connected account, payment, wallet and card-buyback workflows for ZenCard’s online trading-card pack service.",
        "ja": "株式会社ZenCardのトレーディングカードパックサービスで、認証・決済・ウォレット・カード買取をつなぐ機能を開発しました。"
      },
      "description": {
        "en": "Developed authentication, payment, wallet and card-buyback workflows for EpicPull, an online trading-card pack platform. Implemented Privy authentication, Solana/USDC wallet flows, Coinflow checkout/webhook handling and Laravel APIs. Built Next.js/React storefront features and shared TypeScript UI foundations for the US and Hong Kong markets. Implemented staged frontend routing, mobile API compatibility and backend-availability handling for the Laravel-to-Next.js migration.",
        "ja": "オンラインのトレーディングカードパックサービス「エピックプル」で、認証・決済・ウォレット・カード買取機能を開発。Privy認証、Solana上のUSDCを扱う入出金・決済処理、Coinflowの決済・通知処理、Laravelの各種APIを実装。米国・香港向けに、Next.jsとReactによる利用者向け画面と、TypeScriptを用いた共通の画面部品を開発。LaravelからNext.jsへの移行に向け、段階的な画面の切り替え、モバイル向けAPIとの互換性維持、障害時の案内表示を実装。"
      },
      "association": {
        "en": "Built for ZenCard as a contractor, February–August 2026.",
        "ja": "株式会社ZenCardの業務委託として開発。2026年2月〜8月。"
      },
      "contribution": {
        "en": "Full Stack Software Engineer (Contract)",
        "ja": "フルスタックエンジニア（業務委託）"
      },
      "area": "products-websites",
      "collectionOrder": 0,
      "homeOrder": null,
      "stage": {
        "en": "The engagement ended when ZenCard shut down.",
        "ja": "会社の閉鎖に伴い、業務委託を終了。"
      },
      "problem": {
        "en": "Card purchases and buybacks needed connected account, payment and wallet flows while the storefront moved from Laravel to Next.js. The migration also needed to preserve compatibility with mobile APIs and handle backend availability.",
        "ja": "カードの購入と買取に、認証・決済・ウォレットをつなぐ必要がありました。LaravelからNext.jsへの移行では、モバイル向けAPIとの互換性を維持し、バックエンドの稼働状況に応じた案内も必要でした。"
      },
      "workflow": {
        "en": [
          "Account and wallet",
          "Checkout and card buyback",
          "APIs and storefront"
        ],
        "ja": [
          "認証とウォレット",
          "決済とカード買取",
          "業務APIと利用者向け画面"
        ]
      },
      "decisions": {
        "en": [
          "Privy authentication and Solana/USDC wallet flows connect account access to wallet deposits, withdrawals and payments.",
          "Coinflow checkout and webhook handling connect payment notifications to Laravel APIs and the card-buyback workflow.",
          "Staged frontend routing supports the Laravel-to-Next.js migration. Mobile API compatibility and backend-availability handling keep the migration behavior explicit."
        ],
        "ja": [
          "Privyによる認証とSolana上のUSDCを扱う処理を実装し、利用者の認証からウォレットへの入出金・決済につなぎました。",
          "Coinflowの決済と通知処理、Laravelの各種APIを実装し、決済・カード買取機能を開発しました。",
          "LaravelからNext.jsへ段階的に画面を切り替える仕組みを実装しました。モバイル向けAPIとの互換性を維持し、バックエンドが利用できない場合の案内も用意しました。"
        ]
      },
      "results": {
        "en": "Implemented authentication, checkout, USDC wallet and card-buyback workflows, Next.js/React storefront features for the US and Hong Kong markets, and compatibility support for a staged migration.",
        "ja": "認証、決済、USDCを扱うウォレット、カード買取機能を実装しました。米国・香港向けの利用者向け画面と共通の画面部品を開発し、段階的な移行で必要な互換性維持や障害時の案内にも対応しました。"
      },
      "stack": [
        {
          "name": "Privy",
          "responsibility": {
            "en": "Authenticates users.",
            "ja": "利用者の認証を処理します。"
          }
        },
        {
          "name": "Solana / USDC",
          "responsibility": {
            "en": "Supports wallet deposits, withdrawals and payments.",
            "ja": "ウォレットへの入出金と決済を処理します。"
          }
        },
        {
          "name": "Coinflow",
          "responsibility": {
            "en": "Handles checkout and payment webhooks.",
            "ja": "決済と決済結果の通知を処理します。"
          }
        },
        {
          "name": "Laravel",
          "responsibility": {
            "en": "Provides APIs for the service workflows.",
            "ja": "サービスの各機能をAPIとして提供します。"
          }
        },
        {
          "name": "Next.js",
          "responsibility": {
            "en": "Provides storefront features and staged frontend routing.",
            "ja": "利用者向け画面と段階的な画面の切り替えを実装します。"
          }
        },
        {
          "name": "React",
          "responsibility": {
            "en": "Builds the storefront interface.",
            "ja": "利用者向け画面を構成します。"
          }
        },
        {
          "name": "TypeScript",
          "responsibility": {
            "en": "Provides shared UI foundations for the US and Hong Kong markets.",
            "ja": "米国・香港向けの共通の画面部品を実装します。"
          }
        }
      ],
      "related": [
        "event-platform",
        "snap-photobooth"
      ],
      "todos": {
        "context": {
          "id": "epicpull-context",
          "text": {
            "en": "Describe the team responsibilities and one concrete account, payment or migration problem to explain.",
            "ja": "チーム内の担当範囲と、認証・決済・移行で直面した具体的な課題を追記してください。"
          }
        },
        "decisions": {
          "id": "epicpull-decisions",
          "text": {
            "en": "Explain the constraints and alternatives behind the staged migration and mobile compatibility work.",
            "ja": "段階的な移行やモバイル向けの互換性維持について、制約と検討した選択肢を追記してください。"
          }
        },
        "artifacts": {
          "id": "epicpull-artifacts",
          "text": {
            "en": "Supply approved screenshots, a recording or synthetic workflow examples, with any required credits.",
            "ja": "掲載許可のある画面、録画、合成データによる処理例と、必要なクレジットを用意してください。"
          }
        },
        "evidence": {
          "id": "epicpull-evidence",
          "text": {
            "en": "Supply attributable release records or measurements for the implemented workflows, including scope and period.",
            "ja": "実装した機能について、対象と期間が分かる公開・利用の記録や測定結果を用意してください。"
          }
        },
        "reflection": {
          "id": "epicpull-reflection",
          "text": {
            "en": "Describe the next improvement and how to assess it.",
            "ja": "次に改善する点と、その効果を確かめる方法を追記してください。"
          }
        }
      }
    }
  ]
};
