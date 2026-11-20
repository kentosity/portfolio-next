#!/usr/bin/env python3
"""Project explicitly allowed public profile fields into the site's typed data file."""
import argparse
import json
import subprocess
from pathlib import Path


def bilingual(en, ja):
    return {"en": en, "ja": ja}


def todo(identifier, en, ja):
    return {"id": identifier, "text": bilingual(en, ja)}


PROJECTS = {
    "local-speech": {
        "area": "ai-tools", "order": 1, "home": 1,
        "summary": bilingual("A personal speech tool streams AI-agent responses with synchronized captions.", "AIエージェントの応答を音声で再生し、字幕を同期する個人用ツールです。"),
        "stage": bilingual("Documented personal installations", "個人環境への導入を確認"),
        "problem": bilingual("Listening to an agent response needs coordinated speech, captions and playback controls. A new response also needs a clear way to take over playback.", "エージェントの応答を聞くには、音声・字幕・再生操作を連携させる必要があります。次の応答へ再生を引き継ぐ操作も必要です。"),
        "workflow": bilingual(["Agent response", "Python speech stream", "macOS audio + captions"], ["エージェントの応答", "Pythonで音声を生成", "macOSで音声・字幕を再生"]),
        "decisions": bilingual([
            "The Python service handles streaming synthesis, while the Swift player handles playback and word-timed captions. This gives speech generation and the listening interface separate responsibilities.",
            "Cancellation and playback handover are explicit parts of the player. Existing Herdr and MLX/Kokoro components supply the underlying speech capabilities; the project integrates them into a personal workflow with AI assistance.",
        ], [
            "Pythonのサービスが音声を生成し、Swiftのプレーヤーが再生と単語ごとの字幕表示を担当します。音声生成と操作画面の役割を分けた構成です。",
            "プレーヤーにキャンセルと再生の引き継ぎを実装しました。音声の基盤には既存のHerdrとMLX／Kokoroを利用し、AI支援で個人の作業環境へ組み込んでいます。",
        ]),
        "results": bilingual("The reviewed record supports personal installations, streaming speech, synchronized captions, cancellation and playback handover.", "確認済みの範囲は、個人環境への導入、音声のストリーミング、字幕の同期、キャンセル、再生の引き継ぎです。"),
        "related": ["subsidy-search-pilot", "agent-coordination"],
    },
    "subsidy-search-pilot": {
        "area": "ai-tools", "order": 2, "home": 4,
        "summary": bilingual("A local prototype turns funding needs into search conditions and source-linked subsidy candidates.", "資金ニーズから検索条件を整理し、出典付きの補助金候補を返すローカルプロトタイプです。"),
        "stage": bilingual("Local prototype", "ローカルプロトタイプ"),
        "problem": bilingual("A funding conversation needs to become concrete search conditions, then a set of candidates a reader can check against source material.", "資金調達の相談を具体的な検索条件に変え、元の情報と照合できる候補を提示する必要があります。"),
        "workflow": bilingual(["Funding needs", "Validated conditions + queued search", "Source-linked candidates"], ["資金ニーズ", "条件検証・検索キュー", "出典付きの候補"]),
        "decisions": bilingual([
            "The TypeScript/React workspace connects the conversation layer to a queued Playwright worker. Search execution has its own processing path, separate from the conversation interface.",
            "Server checks validate search conditions, candidate IDs and source excerpts. These checks give the conversation and search components an explicit data boundary.",
        ], [
            "TypeScript／Reactの画面から対話処理とPlaywrightの検索ワーカーを接続しています。検索の実行はキューを通り、対話画面とは別の処理経路を持ちます。",
            "サーバー側で検索条件、候補ID、出典の抜粋を検証します。対話と検索の間で受け渡すデータに、明確な検証の境界を設けています。",
        ]),
        "results": bilingual("The implemented workflow connects a language-model conversation to queued search and source-linked explanations with server-side validation. The reviewed stage is a local prototype.", "言語モデルとの対話、検索キュー、出典を示す説明を接続し、サーバー側でデータを検証する処理を実装しました。確認済みの段階はローカルプロトタイプです。"),
        "related": ["agent-coordination", "local-speech"],
    },
    "agent-coordination": {
        "area": "ai-tools", "order": 3,
        "summary": bilingual("A local service retains agent tasks, decisions and handovers across coordinator changes.", "担当が変わっても、エージェントのタスク・判断・引き継ぎを保持するローカルサービスです。"),
        "stage": bilingual("Local qualification", "ローカル環境での検証段階"),
        "problem": bilingual("Task state needs to survive coordinator changes and restarts, including dispatches whose outcome is uncertain.", "担当の変更や再起動をまたいでタスクの状態を保持し、実行結果が不明な処理を扱う必要があります。"),
        "workflow": bilingual(["Task / handover", "Transactional state + receipts", "Restart reconciliation"], ["タスク・引き継ぎ", "状態の保存・要求の記録", "再起動後の状態確認"]),
        "decisions": bilingual(["Transactional writes, request receipts and version checks protect stored task state. Dispatches with uncertain outcomes wait for reconciliation after restart."], ["トランザクション、要求の記録、バージョン検証で状態を管理します。再起動時に結果が不明な処理は、状態を確認するまで保留します。"]),
        "results": bilingual("The reviewed local implementation retains tasks and handovers and includes restart recovery for uncertain dispatches.", "確認したローカル実装は、タスクと引き継ぎの保存、結果が不明な処理の再起動後の復旧に対応しています。"),
        "related": ["subsidy-search-pilot", "markdown-sharing"],
    },
    "markdown-sharing": {
        "area": "ai-tools", "order": 4,
        "summary": bilingual("A Markdown application shares rendered documents through expiring links.", "Markdown文書を、有効期限付きの閲覧リンクで共有するアプリです。"),
        "stage": bilingual("Source implementation reviewed", "ソース実装を確認"),
        "problem": bilingual("Sharing a rendered document needs storage, publication metadata and an expiry boundary.", "文書の共有には、本文の保存、公開情報の管理、有効期限の制御が必要です。"),
        "workflow": bilingual(["Markdown", "R2 document + D1 metadata", "Expiring share link"], ["Markdown文書", "R2に本文・D1に公開情報", "有効期限付きリンク"]),
        "decisions": bilingual(["R2 stores documents and D1 stores publication metadata. Size limits, rate limits, duplicate detection and expiry checks govern the sharing boundary."], ["R2に文書、D1に公開メタデータを保存します。サイズ・リクエスト数の制限、重複検出、有効期限の検証で共有を制御します。"]),
        "results": bilingual("The reviewed source implements document rendering, expiring links and limits on publication requests.", "確認したソースには、文書の表示、有効期限付きリンク、公開リクエストの制限が実装されています。"),
        "related": ["agent-coordination", "falconex-site"],
    },
    "event-platform": {
        "area": "data-systems", "order": 1, "home": 2,
        "summary": bilingual("A modular event platform handles LINE-connected reservations and check-in at lower infrastructure cost.", "LINE連携の予約とチェックインを、再利用しやすい構成で処理するイベント基盤です。"),
        "stage": bilingual("Professional work at Generosity", "Generosityでの業務開発"),
        "problem": bilingual("Event configurations needed reusable reservation and check-in features, alongside a reduction in infrastructure cost.", "イベントごとに再利用できる予約・チェックイン機能と、インフラ費の削減が必要でした。"),
        "workflow": bilingual(["LINE reservation", "Lambda + shared validation", "DynamoDB + analytics"], ["LINEから予約", "Lambda・共通検証", "DynamoDB・分析連携"]),
        "decisions": bilingual([
            "Reservation and check-in became modular features. Reusable event configuration and shared validation give repeated event work a common structure.",
            "The rearchitecture uses AWS Lambda and DynamoDB, with Nuxt and TypeScript for the application. An analytics pipeline connects operational data to analysis.",
        ], [
            "予約とチェックインを機能ごとに分離しました。イベント設定とバリデーションを共通化し、繰り返し使う業務に共通の構成を与えています。",
            "AWS LambdaとDynamoDBを使う構成へ再設計し、アプリにはNuxtとTypeScriptを利用しました。分析用のデータ連携も整備しています。",
        ]),
        "results": bilingual("Annual event-platform infrastructure cost fell from about $200,000 to about $10,000, approximately 95%. This is the owner-confirmed approximate annual infrastructure-cost comparison for the Generosity platform.", "イベント基盤の年間インフラ費を約20万ドルから約1万ドルへ、約95%削減しました。Generosityの基盤について本人が確認した、年間インフラ費の概算比較です。"),
        "related": ["event-ticketing", "salon-data-platform"],
    },
    "salon-data-platform": {
        "area": "data-systems", "order": 2, "home": 3,
        "summary": bilingual("A data pipeline connects salon POS exports to validated reports and a dashboard.", "美容室のPOS帳票を取り込み、検証付きの集計とダッシュボードにつなぐ仕組みです。"),
        "stage": bilingual("Client development through FalconeX", "FalconeXでのクライアント向け開発"),
        "problem": bilingual("A salon chain needed to connect POS exports to analytical reporting, including complete and date-window imports and checks for missing or duplicate inputs.", "美容室チェーンのPOSデータを分析につなぐため、全件・期間指定の取り込みと、入力の欠落・重複の検証が必要でした。"),
        "workflow": bilingual(["Windows POS export", "Parquet staging → BigQuery", "Validated report + dashboard"], ["Windows POSから帳票出力", "Parquet → BigQuery", "検証付き集計・画面表示"]),
        "decisions": bilingual([
            "Extraction, loading and orchestration have separate responsibilities. Full and date-window imports share a workflow with Parquet staging and BigQuery loading.",
            "Reporting calculations check for missing or duplicate inputs. Scheduled Windows exports include failure handling, while the React/Fastify application presents the reporting workflow.",
        ], [
            "抽出・取り込み・実行管理の役割を分けています。全件と期間指定の取り込みは、Parquet形式での受け渡しとBigQueryへの読み込みを使います。",
            "集計処理で入力の欠落・重複を検証します。Windows上の定期出力には失敗時の処理を組み込み、React／Fastifyでレポートを表示するアプリを開発しました。",
        ]),
        "results": bilingual("The developed capabilities include full and date-window ingestion, Parquet staging, validated reporting, a React/Fastify dashboard and scheduled Windows exports with failure handling. The work is attributed to Kento through FalconeX for an anonymous salon-chain client.", "全件・期間指定の取り込み、Parquetでの受け渡し、検証付きの集計、React／Fastifyの画面、失敗時の処理を含むWindowsの定期出力を開発しました。FalconeXで、美容室チェーン向けに担当した業務です。"),
        "related": ["event-platform", "event-ticketing"],
    },
    "event-ticketing": {
        "area": "data-systems", "order": 3,
        "summary": bilingual("A queued ticketing system separates incoming requests from issuance and LINE notifications.", "発券要求の受付と処理を分け、LINE通知につなぐチケットシステムです。"),
        "stage": bilingual("Professional work at Generosity", "Generosityでの業務開発"),
        "problem": bilingual("Ticket-release time creates competing issuance requests that need coordinated processing and stored ticket state.", "チケット公開時に集中する発券要求を処理し、チケットの状態を保存する必要がありました。"),
        "workflow": bilingual(["Ticket request", "BullMQ / Redis worker", "MySQL state + LINE notification"], ["発券要求", "BullMQ・Redisのワーカー", "MySQLへ保存・LINE通知"]),
        "decisions": bilingual(["Producer and worker paths separate request acceptance from ticket issuance. BullMQ/Redis queues connect them, and Prisma/MySQL retain ticket state."], ["要求を受け付ける処理と発券ワーカーを分離しました。BullMQ／Redisのキューで接続し、Prisma／MySQLでチケットの状態を保存します。"]),
        "results": bilingual("The implementation includes Vue interfaces, a NestJS backend, queued issuance, persistent ticket state and LINE notifications.", "Vueの画面、NestJSのバックエンド、発券キュー、チケット状態の保存、LINE通知を実装しました。"),
        "related": ["event-platform", "agent-coordination"],
    },
    "snap-photobooth": {
        "area": "products-websites", "order": 1,
        "summary": bilingual("Connected photobooth applications let venue staff manage events and guests view photos.", "式場スタッフのイベント管理と、ゲストの写真閲覧をつなぐフォトブース用アプリです。"),
        "stage": bilingual("Product development at Introduction", "Introductionでのプロダクト開発"),
        "problem": bilingual("Venue staff and wedding guests need different interfaces connected to the same photobooth event and captured photos.", "式場スタッフと結婚式のゲストが、同じイベントと撮影写真をそれぞれの画面で扱う必要がありました。"),
        "workflow": bilingual(["Staff event settings", "Firebase + Salsa API", "Guest album + venue display"], ["スタッフのイベント設定", "Firebase・Salsa API", "ゲストのアルバム・会場表示"]),
        "decisions": bilingual(["Event settings, guest albums and venue displays form connected applications. Next.js and Firebase connect these interfaces with the Salsa API."], ["イベント設定、ゲスト向けアルバム、会場表示を連携するアプリとして実装しました。Next.jsとFirebaseを使い、Salsa APIと接続しています。"]),
        "results": bilingual("The reviewed work supports event administration, guest albums and venue displays at Introduction.", "Introductionでの開発として、イベント管理、ゲスト向けアルバム、会場表示を確認しています。"),
        "related": ["ongy-viewer", "architecture-portfolio"],
    },
    "architecture-portfolio": {
        "area": "products-websites", "order": 2,
        "summary": bilingual("An architecture website pairs project presentation with custom editorial blocks.", "建築事例の紹介と、専用ブロックによる継続的な更新を両立するサイトです。"),
        "stage": bilingual("Website theme development", "Webサイトのテーマ開発"),
        "problem": bilingual("An architecture portfolio needs expressive project pages that editors can keep up to date, including open-house listings and inquiries.", "建築事例を伝えるページを継続して更新し、見学会の案内と問い合わせにつなぐ必要がありました。"),
        "workflow": bilingual(["Editorial blocks", "WordPress / Sage theme", "Projects + inquiries"], ["編集用ブロック", "WordPress・Sageテーマ", "事例紹介・問い合わせ"]),
        "decisions": bilingual(["Custom PHP/Blade blocks support the editorial workflow. The open-house listing falls back to recent events, and a pausable hero respects reduced-motion settings."], ["PHP／Bladeのカスタムブロックで編集を支えます。見学会の予定がない場合は直近の事例を表示し、ヒーロー表示は一時停止と動きを減らす設定に対応します。"]),
        "results": bilingual("The theme implements project pages, editorial blocks, event-list fallback and inquiry focus handling.", "事例ページ、編集用ブロック、見学会表示の切り替え、問い合わせ時のフォーカス移動を実装しました。"),
        "related": ["falconex-site", "snap-photobooth"],
    },
    "falconex-site": {
        "area": "products-websites", "order": 3,
        "summary": bilingual("A corporate website turns Markdown content into validated company pages and inquiry forms.", "Markdownの内容から会社ページを生成し、ページ情報と問い合わせ入力を検証するサイトです。"),
        "stage": bilingual("Website development at FalconeX", "FalconeXでのWebサイト開発"),
        "problem": bilingual("Company pages and inquiry interactions need a maintainable shared content structure and clear validation.", "会社情報と問い合わせを共通の構成で管理し、入力やページ情報を検証する必要がありました。"),
        "workflow": bilingual(["Markdown content", "Metadata validation + PHP theme", "Company pages + inquiries"], ["Markdownの内容", "メタデータ検証・PHPテーマ", "会社ページ・問い合わせ"]),
        "decisions": bilingual(["The theme validates invalid or duplicate metadata before page generation. JavaScript form errors move focus to inquiry fields that need correction."], ["ページ生成時に不正・重複するメタデータを検出します。問い合わせフォームはJavaScriptでエラーを表示し、修正が必要な項目へフォーカスを移します。"]),
        "results": bilingual("The custom WordPress/PHP theme supports Markdown-driven pages, metadata validation and inquiry-field guidance.", "WordPress／PHPの独自テーマに、Markdownからのページ生成、メタデータ検証、問い合わせの入力案内を実装しました。"),
        "related": ["architecture-portfolio", "markdown-sharing"],
    },
    "ongy-viewer": {
        "area": "products-websites", "order": 4,
        "summary": bilingual("A research prototype lets businesses browse and organize Instagram stories.", "企業の調査業務でInstagramストーリーを閲覧・整理するプロトタイプです。"),
        "stage": bilingual("Research prototype at Introduction", "Introductionでの調査用プロトタイプ"),
        "problem": bilingual("Business research needed an interface for browsing and organizing Instagram stories.", "企業の調査業務で、Instagramストーリーを閲覧・整理する画面が必要でした。"),
        "workflow": bilingual(["Research task", "Story browsing + organization", "AWS deployment"], ["調査の目的", "ストーリーの閲覧・整理", "AWSへデプロイ"]),
        "decisions": bilingual(["The work spans interface design, frontend, backend and AWS deployment. The current reviewed public stack record identifies AWS."], ["UI設計からフロントエンド、バックエンド、AWSへのデプロイまで担当しました。現時点で確認した公開用の技術情報はAWSです。"]),
        "results": bilingual("The prototype implements story browsing and organization. Kento's contribution was student intern/part-time design and full-stack development at Introduction.", "ストーリーの閲覧と整理を実装しました。在学中にIntroductionのインターン・アルバイトとして、デザインとフルスタック開発を担当したプロトタイプです。"),
        "related": ["snap-photobooth", "architecture-portfolio"],
    },
}

RESPONSIBILITIES = {
    "TypeScript": ("Application logic and contracts", "アプリの処理・データの型"),
    "Python": ("Speech or data automation", "音声処理・データ処理の自動化"),
    "Swift": ("Native player implementation", "ネイティブプレーヤーの実装"),
    "SwiftUI": ("Player interface", "プレーヤーの画面"),
    "AppKit": ("macOS integration", "macOSとの連携"),
    "AVFoundation": ("Audio playback", "音声の再生"),
    "MLX": ("Local model execution", "ローカルモデルの実行"),
    "Kokoro": ("Speech model", "音声モデル"),
    "React": ("Application interface", "アプリの画面"),
    "Nuxt.js": ("Reservation interface", "予約画面"),
    "AWS Lambda": ("Serverless application processing", "サーバーレスの処理"),
    "DynamoDB": ("Event data storage", "イベントデータの保存"),
    "Zod": ("Shared input validation", "共通の入力検証"),
    "CloudFront": ("Content delivery", "コンテンツ配信"),
    "Fastify": ("Reporting API", "レポート用API"),
    "BigQuery": ("Analytical data and calculations", "分析データの保存・集計"),
    "Google Cloud Storage": ("Ingestion staging storage", "取り込み用の一時保存"),
    "Parquet": ("Staged data exchange", "データの受け渡し形式"),
    "Node.js": ("Application runtime", "アプリの実行環境"),
    "Playwright": ("Queued browser search", "検索キューのブラウザー操作"),
    "Go": ("Coordination service and CLI", "状態管理サービス・CLI"),
    "SQLite": ("Transactional task storage", "タスクの保存・トランザクション"),
    "HTTP/JSON": ("Service API", "サービスのAPI"),
    "Unix sockets": ("Local communication", "ローカルの通信"),
    "Vue.js": ("Ticketing interface", "チケットの画面"),
    "NestJS": ("Ticketing backend", "発券のバックエンド"),
    "BullMQ": ("Issuance queue", "発券キュー"),
    "Redis": ("Queue storage", "キューの保存"),
    "Prisma": ("Ticket persistence access", "チケット保存のデータアクセス"),
    "MySQL": ("Ticket state storage", "チケット状態の保存"),
    "Next.js": ("Connected web applications", "連携するWebアプリ"),
    "Firebase": ("Application data services", "アプリのデータ管理"),
    "Mantine": ("Interface components", "画面の部品"),
    "Salsa API": ("Photobooth integration", "フォトブースとの連携"),
    "WordPress": ("Content management", "コンテンツ管理"),
    "Sage": ("Theme structure", "テーマの構成"),
    "PHP": ("Theme and page processing", "テーマ・ページの処理"),
    "Blade": ("Editorial templates", "編集用テンプレート"),
    "JavaScript": ("Browser interactions and validation", "画面の操作・入力検証"),
    "Tailwind CSS": ("Interface styling", "画面のスタイル"),
    "Vite": ("Frontend asset build", "フロントエンドのビルド"),
    "Markdown": ("Page content", "ページの内容"),
    "Cloudflare Workers": ("Sharing application runtime", "共有アプリの実行環境"),
    "Hono": ("Sharing request handling", "共有リクエストの処理"),
    "R2": ("Document storage", "文書の保存"),
    "D1": ("Publication metadata", "公開メタデータ"),
    "markdown-it": ("Markdown rendering", "Markdownの表示"),
    "AWS": ("Prototype deployment", "プロトタイプのデプロイ"),
}


def project_projection(source):
    slug = source["slug"]
    editorial = PROJECTS[slug]
    evidence_en = "Supply attributable measurements, current use/release records and any permitted collaborator quote; include period, scope and method."
    evidence_ja = "測定の期間・対象・方法、現在の利用・公開状況、掲載許可のある協力者のコメントを用意してください。"
    if slug == "subsidy-search-pilot":
        evidence_en = "Supply a versioned evaluation set, baseline, model/configuration/date, scoring method, aggregate outcomes, failures, cost and latency."
        evidence_ja = "版を固定した評価セット、ベースライン、モデル・設定・日付、採点方法、集計結果、失敗例、費用、遅延を用意してください。"
    if slug == "event-platform":
        evidence_en = "Document the annual cost baseline/comparison periods, included services and measurement method for the confirmed approximate headline."
        evidence_ja = "確認済みの概算値について、比較する年度、対象サービス、集計方法を用意してください。"
    if slug == "markdown-sharing":
        evidence_en += " Verify that the deployed application matches the reviewed source."
        evidence_ja += " 公開環境と確認したソースの機能が一致するか検証してください。"
    if slug == "ongy-viewer":
        evidence_en += " Supply an authoritative original stack record."
        evidence_ja += " 当時の技術構成が分かる一次資料も用意してください。"

    artifact_en = "Supply approved screenshots or synthetic examples, a recording, public artifact/code links and required credits."
    artifact_ja = "掲載許可のある画面か合成データの例、録画、公開できる成果物・コードのリンク、必要なクレジットを用意してください。"
    if slug == "subsidy-search-pilot":
        artifact_en += " Confirm ownership and publication rights before sharing code or recordings."
        artifact_ja += " コードや録画の掲載前に、所有権と公開権限を確認してください。"

    stack_roles = {"local-speech": {"Python": ("Streaming speech synthesis", "音声のストリーミング生成")}, "salon-data-platform": {"Python": ("Scheduled Windows POS report exports", "Windows POSの定期帳票出力")}}
    project = {
        "id": source["id"], "slug": slug, "legacySlugs": source.get("legacy_slugs", []),
        "title": source["title"], "summary": editorial["summary"], "description": source["description"],
        "association": bilingual(source["association_public_en"], source["association_public"]),
        "contribution": source["role_public"], "area": editorial["area"],
        "collectionOrder": editorial["order"], "homeOrder": editorial.get("home"),
        **{key: editorial[key] for key in ["stage", "problem", "workflow", "decisions", "results", "related"]},
        "stack": [{"name": name, "responsibility": bilingual(*stack_roles.get(slug, {}).get(name, RESPONSIBILITIES[name]))} for name in source["stack"]],
        "todos": {
            "context": todo(f"{slug}-context", "Confirm the project period, collaborators' responsibilities and one concrete problem or failure to explain.", "プロジェクトの期間、協力者の担当範囲、説明できる具体的な問題か失敗例を確認してください。"),
            "decisions": todo(f"{slug}-decisions", "Add two personal decisions with constraints, alternatives considered and the consequences of the choice.", "本人が判断した2点について、制約、検討した選択肢、選択によって起きたことを追記してください。"),
            "artifacts": todo(f"{slug}-artifacts", artifact_en, artifact_ja),
            "evidence": todo(f"{slug}-evidence", evidence_en, evidence_ja),
            "reflection": todo(f"{slug}-reflection", "Choose the next improvement and explain how to assess it.", "次に改善する点と、その効果を確かめる方法を選んでください。"),
        },
    }
    if "cost_reduction" in source:
        cost = source["cost_reduction"]
        project["metric"] = {"currency": cost["currency"], "period": cost["period"], "before": cost["before_approx"], "after": cost["after_approx"], "percent": cost["percent_approx"]}
    return project


def project_profile(profile, revision):
    selected = profile["selected_projects"]
    if {project["slug"] for project in selected} != set(PROJECTS):
        raise ValueError("Review the explicit 11-project publication allowlist before regenerating")
    return {
        "source": {"repository": "kentosity/resume", "revision": revision, "reviewedOn": profile["reviewed_on"]},
        "identity": {
            "name": bilingual(profile["identity"]["name"], profile["identity"]["name_ja"]),
            "location": bilingual(profile["identity"]["location"], "東京、日本"),
            "role": profile["experience"][0]["title"],
            "email": "kento.iizuka@icloud.com", "origin": profile["links"]["portfolio"],
        },
        "links": [{"label": label, "url": profile["links"][key]} for key, label in [("github", "GitHub"), ("linkedin", "LinkedIn"), ("wantedly", "Wantedly"), ("lapras", "LAPRAS")]],
        "introduction": bilingual("I build web products, data pipelines and tools for AI-assisted workflows.", "Webプロダクト、データ連携、業務を支えるAIツールをつくっています。"),
        "about": profile["about"],
        "experience": [{"id": item["id"], "company": item["company"], "title": item["title"], "period": item["display_period"], "summary": item["summary"], "bullets": item["bullets"]} for item in profile["experience"]],
        "skills": [{"title": bilingual(item["group"], item["group_ja"]), "items": bilingual(item["items"], [profile["technical_labels_ja"].get(name, name) for name in item["items"]])} for item in profile["skills"]],
        "education": [{"school": bilingual(item["school"], item["school_ja"]), "description": item["public_description"]} for item in profile["education"]],
        "todos": {
            "hiring": todo("hiring-preferences", "Confirm hiring focus, location/remote arrangements, relocation/travel preferences and public availability wording.", "採用で希望する分野、勤務地・リモート条件、転居・出張の希望、公開する稼働状況を確認してください。"),
            "languages": todo("working-languages", "Confirm the public wording of working-language proficiency.", "業務で使う言語と習熟度の公開表現を確認してください。"),
            "identity": todo("public-identity", "Confirm this name presentation, public contact email and professional links.", "氏名の表記、公開する連絡先メールアドレス、仕事用リンクを確認してください。"),
            "domain": todo("production-domain", "Confirm the final production domain; metadata currently uses the existing portfolio origin.", "最終的な公開ドメインを確認してください。メタデータには既存のポートフォリオURLを使用しています。"),
            "engagement": todo("client-engagement", "Confirm the contracting party, work offered, actual availability, engagement sequence, deliverables and any pricing or response-time wording.", "契約主体、提供できる業務、稼働状況、進め方、成果物、料金や返信時期の表現を確認してください。"),
            "portrait": todo("portrait-and-interests", "Supply an approved portrait/name treatment, a personal story about organizing systems and any interests or sketches to share.", "掲載する写真・氏名の見せ方、仕組みを整理することにまつわるエピソード、公開したい関心やスケッチを用意してください。"),
            "resume-en": todo("resume-pdf-en", "Review a new public-safe English PDF export from the canonical profile, including contact details and project links.", "正本プロフィールから英語PDFを作成し、連絡先と公開可能なプロジェクトリンクを確認してください。"),
            "resume-ja": todo("resume-pdf-ja", "Review a new public-safe Japanese PDF export from the canonical profile, including contact details and project links.", "正本プロフィールから日本語PDFを作成し、連絡先と公開可能なプロジェクトリンクを確認してください。"),
        },
        "projects": [project_projection(project) for project in selected],
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--profile", type=Path, required=True)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    profile_path = args.profile.resolve()
    revision = subprocess.check_output(["git", "-C", str(profile_path.parent), "rev-parse", "HEAD"], text=True).strip()
    content = project_profile(json.loads(profile_path.read_text()), revision)
    rendered = 'import type { SiteContent } from "./model";\n\nexport const siteContent: SiteContent = ' + json.dumps(content, ensure_ascii=False, indent=2) + ";\n"
    output = Path(__file__).resolve().parents[1] / "app/content/site-content.ts"
    if args.check:
        if output.read_text() != rendered:
            raise SystemExit("Public content is out of sync")
        print("Public projection matches the canonical profile and editorial rules")
    else:
        output.write_text(rendered)
        print("Generated 11 public project records and bilingual career content")


if __name__ == "__main__":
    main()
