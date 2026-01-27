# Generosity - University Course Registration System

**期間:** 2024 年（2 日 / 約 30 時間）  
**組織:** GENEROSITY Inc.（技術課題）  
**役割:** フルスタックデベロッパー  
**ステータス:** 完成・デプロイ済み  
**タグ:** #NextJS #React #TypeScript #Prisma #PostgreSQL #Authentication #UI/UX #WebDevelopment

---

## Resume Mode

### プロジェクト概要

GENEROSITY Inc. の技術課題として、大学の履修登録 Web アプリをフルスタックで開発。科目閲覧、学期ごとの履修登録、受講管理、パスワード更新を備え、モダン Web 開発・DB 設計・UI/UX を短期間で実装した。

### 主な責任と貢献

- **フルスタック開発:** Next.js 14 (App Router) + TypeScript + Prisma + PostgreSQL でエンドツーエンド実装
- **認証基盤:** NextAuth.js（JWT）と bcrypt による安全な認証、独自のパスワードリセット API を提供
- **DB 設計:** Prisma で User / Course / Professor / Faculty のリレーションを正規化設計（多対多含む）
- **高度なルーティング:** Next.js 14 の Intercepting Routes で Instagram 風モーダル遷移を実装（URL 同期しつつ直リンクは専用ページで表示）
- **UI/UX:** Tailwind CSS + Radix UI でレスポンシブかつアクセシブルな UI、スケルトンローディングとサーバ/クライアントコンポーネント最適化を実装
- **クリエイティブ要素:** 認証画面に React Three Fiber で 3D トーラスノットを追加し、要件外のビジュアルに遊び心を付与

### 実装したコア機能

- 認証（ログイン・パスワード変更・パスワードリセット API）
- 科目検索・閲覧
- 学期ごとの履修登録（CRUD）
- 登録科目一覧と詳細表示
- デバイス横断のレスポンシブデザイン
- スケルトンスクリーンで知覚パフォーマンス向上
- デフォルトに戻すパスワードリセット (`/api/auth/password`)

### 技術スタック

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS, Radix UI, Lucide React Icons, class-variance-authority
- **Auth:** NextAuth.js (JWT), bcrypt
- **Database:** PostgreSQL (Vercel Postgres), Prisma ORM
- **Validation:** Yup
- **3D:** React Three Fiber, Three.js
- **Deployment:** Vercel（Frontend & API、コネクションプーリング使用）
- **Dev Tools:** ESLint (Next.js core web vitals)

### 技術的ハイライト

- **Intercepting Routes:** モーダル + URL 同期の高度ルーティングを Next.js 14 で実装
- **Type Safety:** 全面 TypeScript（`any` なし）、Prisma 型を活用
- **Server Components:** RSC/CSC を適所に使い分けパフォーマンス最適化
- **Security:** ハッシュ化パスワードと JWT セッション、保護された API ルート
- **DB 設計:** 外部キー・インデックスを備えた正規化スキーマ

### 課題と対応

- **新機能の習得:** 初の Intercepting Routes だったため、ドキュメントを精読しモーダル/ページ二重動作を検証
- **要件ドリブン開発:** アイデア先行から仕様順守型への切替を行い、要求充足を最優先に設計
- **時間制約:** 2 日で完了するため、テストや CI/CD よりコア機能と UI/UX の磨き込みを優先

### 成果と結果

- **内定獲得:** この課題が評価され、GENEROSITY Inc. からオファーを受諾
- **高評価:** 開発速度と UI 品質を称賛
- **本番公開:** `generosity.vercel.app` で公開し、GitHub リポジトリも一般公開
- **包括ドキュメント:** セットアップ、デモ認証情報、アーキ解説を README に整備

### デモンストレーションしたスキル

- モダン JS エコシステムでのフルスタック開発
- リレーショナル DB モデリング
- 認証とセキュリティベストプラクティス
- アクセシビリティを考慮した UI/UX 設計
- API 設計と実装
- TypeScript による型安全開発
- パフォーマンス最適化（RSC, skeleton）
- Git 運用とドキュメント整備
- 短納期でのプロトタイピングとデリバリー

### もし再訪するなら

- プロファイルに基づく AI コース推薦
- お気に入り / ブックマーク機能
- コンテンツベースのコース類型・発見
- ユーザープロフィール項目拡張
- AI 生成コースサムネイル
- テスト（unit / integration / E2E）拡充
- CI/CD パイプライン構築

---

## Storytelling Mode

### 48 時間で証明する挑戦

GENEROSITY から届いた技術課題。自分のアイデアで作るのとは違い、**相手の要件** を形にするプレッシャーがあった。課題は明確：履修登録システムを作り、認証・検索・登録管理を揃え、デプロイまで行う。経験者なら 1 週間、未経験でも 2 週間でよいと言われたが、私は **2 日** と決めた。

### いつもと違う戦い方

学生時代に自作した履修検索ツールは自分の不満解消のためだった。今回は **仕様順守** がゴール。発想より要件、遊び心より速度と完全性。どの機能が本質で、何を後回しにできるかを徹底的に仕分けた。

### 意図ある構築

選んだのは **Next.js 14**。App Router と Server Components、TypeScript でフロント/バックをシームレスに進める。DB は **Prisma + PostgreSQL**。`User`/`Course`/`Professor`/`Faculty` を正規化し、多対多の履修を整理した。認証は **NextAuth.js + bcrypt**、万一のために `/api/auth/password` でリセット API も用意。

UI では **Intercepting Routes** に挑戦。Instagram のようにモーダルで詳細を開きつつ URL は同期、直リンクなら専用ページ——モダンで、実装も楽しかった。**スケルトンロード** を入れて空白待ちを防ぎ、**3D のトーラスノット** をログインに置いて遊び心も少し。Tailwind と Radix UI でアクセシブルな設計にした。

### スプリント

2 日で 30 時間。スキーマ、API、認証、UI、Vercel へのデプロイ、README まで一気に仕上げた。3 つのデモアカウントを用意し、パスワードリセット手順も明記。モバイル確認と検索機能も入れて提出。

### 得たもの

フィードバックは「速さ」と「UI」を評価してもらえた。だが本質的な学びは、**他人の要件を満たすエンジニアリング** へのシフトだった。技術とコミュニケーション、創造性と制約、好みとプロフェッショナリズムのバランスを取ること。要件ドリブン開発には創造性を抑えるのではなく、目標に向けて流すという芸があると知った。

振り返れば、今の知識（Next.js, TS, Prisma, LLM によるレビュー要約や推薦）を持って学生時代に戻れたら、もっとすごいものを作れただろう。だが成長とは、振り返ったときに初めて距離を実感するもの。この課題は鏡のように、適応力とプレッシャー下でのデリバリー、自分の声を失わずに他人のビジョンを形にする力を映してくれた。

仕事のオファーも得たが、それ以上に「チームのエンジニアとは何か」を学んだ。**聞き、実装し、意味のある価値を足すこと**——それが答えだった。

---

## Links & Resources

- **Live Demo**: [generosity.vercel.app](https://generosity.vercel.app/)
- **GitHub Repository**: [github.com/kentozuka/GENEROSITY](https://github.com/kentozuka/GENEROSITY)
- **Demo Credentials**:
  - `test@test.com` / `test`
  - `kentozuka@ruri.waseda.jp` / `generosity`
  - `anonymous@name.com` / `anonymous`
- **Password Reset**: `/api/auth/password` にアクセスで全パスワードをデフォルトへリセット

---

## Gallery

`/assets/generosity/` フォルダにデモ動画あり
