# SNAP - 結婚式場向けフォトブースソリューション

**期間:** 2022 ~ 2023  
**組織:** Introduction Inc.  
**役割:** 事業オーナー / リードエンジニア / プロダクトマネージャー / セールス  
**タグ:** #engineering #sales #product-management #b2b #saas #full-stack

---

## プロジェクト概要

**種別:** B2B SaaS アプリケーション  
**役割:** 事業オーナー / リードエンジニア / プロダクトマネージャー / セールス  
**期間:** 2022 ~ 2023  
**ステータス:** 本番運用（退職時も稼働中）  
**会社:** Introduction Inc.  
**ビジネスモデル:** サブスクリプション（結婚式場向け B2B）

---

## 機会

結婚式場を運営するオーナーが市場機会を発見。既存フォトブースには課題が多かった:

- **高価格** で式場側の ROI が出にくい
- **機能不足** で「思い出」としての価値が弱い
- **高価な専用ハード** と保守コスト
- **日本語対応不足**

他社イベントでフォトブースを見た経験から、ウェディング特化で安価かつ多機能なソリューションの余地を確認。

---

## 解決策

SNAP はタブレットや PC をフォトブース化する Web アプリ。Photoboothsupplyco のハードと Salsa API を活用しつつ、日本市場向けカスタマイズと豊富な機能を提供。

### コア価値提案

**式場向け:**

- 段階型サブスク（〜月 30 万円）
- 約 10 組で ROI 達成（1 組あたり 3 万円で提供）
- モダン技術で差別化し、価格競争を回避
- サブスクで継続収益を確保

**ゲスト向け:**

- 直感的なタッチ UI
- 豊富なテンプレートとフィルター
- スマホカメラ連携で高画質化
- 会場スクリーンへのリアルタイム表示
- 全写真へのデジタルアルバムアクセス
- 即時プレビューと共有
- 楽しい体験を提供

**式場運用者向け:**

- 簡単セットアップ
- イベント管理ダッシュボード
- ゲスト写真ギャラリー
- ブランドカスタマイズ
- 最小限のトレーニングで運用可能

**ビジネス側:**

- サブスク課金で安定収益
- 専用高額ハード不要
- リモートサポートとリリースが容易
- 複数会場へスケール可能

---

## 役割・責務

本プロジェクトでは、ほぼ全ての役割を兼任。

### プロダクト開発

- プロダクトとビジネスモデルを企画
- UI/UX 設計
- フロント・バック実装
- Salsa API 連携
- テストとデバッグ

### ビジネス開発

- 価格・サブスクモデルを設計
- 営業資料・プレゼンを作成
- 式場への営業・商談を実施
- 契約交渉と合意形成
- 顧客リレーションを管理

### カスタマーサクセス

- 会場スタッフへのトレーニング
- 継続的な技術サポート
- フィードバック収集と改善反映
- イベント当日の安定稼働を支援

---

## 技術実装

### アーキテクチャ概要

```
フロント（ゲスト向け）:
- React ベースのタッチ UI
- カメラ連携
- リアルタイムプレビュー
- テンプレート/フィルター機構

バックエンド:
- Node.js / Express API サーバ
- 認証とセッション管理
- イベント設定・管理
- Salsa API 連携

サードパーティ連携:
- Photoboothsupplyco の Salsa API
  - 撮影・加工
  - フィルター・エフェクト
  - プリントキュー管理
```

### 主要コンポーネント

**カメラ連携:**

```javascript
// カメラハンドリングの簡略例
- WebRTC でブラウザカメラにアクセス
- 端末性能差に応じたフォールバック
- 高解像度撮影
- タッチ最適化 UI
```

**イベント管理:**

```javascript
// 式場スタッフ向けダッシュボード
- イベント作成/設定
- ブランド設定（色・ロゴ）
- テンプレート選択
- リアルタイム写真閲覧
- ギャラリー一括ダウンロード
```

**Salsa API 連携:**

```javascript
// Photoboothsupplyco Salsa のラッパー
;-認証 / セッション管理 -
  写真アップロードと加工 -
  フィルター / テンプレ適用 -
  キュー管理 -
  エラーリトライ
```

### インフラ

```
Hosting: AWS
Components:
- EC2: アプリサーバ
- S3: 写真ストレージ
- CloudFront: CDN
- RDS: データベース
- Route53: DNS
```

---

## 開発ジャーニー

### フェーズ1: リサーチ & 検証（1-2か月目）

- 式場へのヒアリングでニーズ把握
- 既存フォトブースの調査
- 技術アプローチの検討
- Photoboothsupplyco Salsa API を発見
- サブスクモデルの関心を検証

### フェーズ2: MVP 開発（3-4か月目）

- コア撮影機能を実装
- Salsa API を組み込み
- シンプルな管理ダッシュボード構築
- 基本テンプレートを作成
- 社内テスト

### フェーズ3: ベータテスト（5か月目）

- 初のベータ会場をオンボード
- 実際の結婚式で検証
- スタッフ/ゲストからフィードバック回収
- バグと UX 課題を特定
- デザインと機能を反復改善

### フェーズ4: ローンチ & セールス（6-12か月目）

- ベータ反映でプロダクトを磨き込み
- 営業資料を作成
- 式場向け商談を実施
- 有料顧客を獲得
- 運用サポートを継続

### フェーズ5: 成長と改善（2年目以降）

- 顧客要望に応じた機能追加
- テンプレ/フィルターを拡充
- ダッシュボードを強化
- 会場増に合わせてインフラをスケール
- サブスク価格を最適化

---

## ビジネス成果

### 顧客獲得

- 複数の結婚式場をオンボード
- 継続課金のストリームを構築
- 高い顧客満足を獲得
- 口コミによるリファラルを創出

### 収益

- サブスクで予測可能な収益を確立
- 価格は市場テストで検証
- 事業としての実現性を証明

### 市場検証

- ソフトウェア型フォトブースが日本市場で成立することを実証
- 式場向けサブスクモデルを検証
- ターゲット顧客で PMF を確認

---

## 技術課題と解決

### 課題1: デバイス互換性

**問題:** 端末やカメラ性能がバラバラでも動く必要。

**対応:** 端末検知と性能テストを実装し、性能が低い端末向けフォールバックを用意。推奨端末を式場へ提示。

### 課題2: 信頼性の高い画像処理

**問題:** 会場 WiFi が不安定でも高速・安定に処理したい。

**対応:** リトライ・ローカルキャッシュ・キュー制御を実装。オフライン撮影と接続復帰後のバックグラウンド同期を用意。

### 課題3: 簡単なイベント設定

**問題:** 非エンジニアの式場スタッフでも短時間で設定したい。

**対応:** ウィザード形式のセットアップとテンプレ/プリセットを用意。成功設定を複製できるイベント複製機能を追加。

### 課題4: リアルタイム体験

**問題:** 撮った写真が即座に共有ギャラリーに出てほしい。

**対応:** WebSocket でリアルタイム更新。別画面でスライドショー表示を実装。

---

## 学び

### 技術

1. **サードパーティ API:** 外部 API のラップと統合の知見を獲得
2. **カメラ制御:** ブラウザカメラの癖と制約を学習
3. **リアルタイム:** WebSocket でリアルタイムギャラリーを実装
4. **スケーリング:** 複数同時イベントを捌けるインフラ設計

### プロダクト

1. **ユーザーリサーチ:** 作る前に実ユーザーへ聞く重要性
2. **MVP スコープ:** コアから作り、利用実績で拡張
3. **使いやすさ:** B2B は現場スタッフの UX が肝
4. **サポート:** 良い CS はプロダクトの弱点を補う

### ビジネス

1. **価格戦略:** 小規模 B2B のサブスク設計
2. **営業プロセス:** 式場向け B2B 営業は関係構築が中心
3. **カスタマーサクセス:** 既存顧客が最大の営業チャネルになる
4. **MRR の価値:** サブスクによる安定性を体感

### 個人

1. **マルチロール:** プロダクト/開発/営業を一人で回せると確認
2. **フルオーナーシップ:** アイデアから課金まで担うことの報酬感
3. **顧客共感:** 直接の顧客接点がプロダクト設計を磨く
4. **粘り:** 良いプロダクトには時間と反復が不可欠だと実感

---

## 使用技術

**Frontend:**

- React
- JavaScript (ES6+)
- WebRTC（カメラ）
- CSS3（UI）
- タッチ最適化 UI

**Backend:**

- Node.js
- Express
- REST API 設計
- WebSocket（リアルタイム）

**Third-Party:**

- Salsa API (Photoboothsupplyco)
- 画像加工・エフェクト
- テンプレートシステム

**Infrastructure:**

- AWS (EC2, S3, CloudFront, RDS, Route53)
- PostgreSQL
- Nginx リバースプロキシ

**Tools:**

- Git/GitHub
- Postman（API テスト）
- Analytics（利用計測）

---

## 成功指標

### プロダクト指標

- **セットアップ時間:** 式場スタッフが 5 分未満で設定完了
- **画像処理:** 撮影から 3 秒以内に処理完了
- **稼働率:** イベント中 99%+ の可用性
- **ゲスト満足:** 参加者からのポジティブなフィードバック

### ビジネス指標

- **継続率:** サブスク更新率が高い
- **獲得コスト:** リファラル中心で効率的に獲得
- **MRR:** 月次経常収益が安定成長
- **サポート件数:** 成熟とともに問い合わせ減少

---

## 振り返り

SNAP は Introduction Inc. で最も総合的なプロジェクトだった。作るだけでなく、売り、支え、フィードバックで改善し続ける必要があると痛感した。

式場への営業で学んだのは、

- 非技術顧客へ価値を伝える方法
- 関係性と信頼構築の重要性
- 初期販売より継続的な CS が効くこと

技術面では、「結婚式は待ってくれない」ので信頼性・エラーハンドリング・監視を最優先に設計する必要があった。

もし今作り直すなら:

- 型安全のため TypeScript を採用
- Unit/Integration/E2E を拡充
- 監視・アラートをより堅牢に
- オフラインファーストの PWA を検討
- AI による自動補正などを追加

それでも SNAP は「実顧客の課題を解き、実収益を生んだ完結したプロダクト」として誇りに思っている。

---

## インパクト

SNAP が生んだのは収益だけではない。ゲストが笑いながら撮影し、スタッフが簡単に運用し、特別な日に少し魔法を足せたことが最も報われた瞬間だった。

「実需要を満たし、実価値を生むこと」が最良のプロダクトである——その実感を得た。

---

## Links

- **Company:** Introduction Inc.
- **Platform:** Web (Touch-Optimized)
- **Integration:** Salsa API by Photoboothsupplyco
- **For Wedding Guests:**
  - シンプルで直感的なタッチ UI
  - 多数のテンプレートとフィルター
  - スマホカメラ連携で高画質化
  - 会場スクリーンへのリアルタイム表示
  - 全写真にアクセスできるデジタルアルバム

**For Venue Staff:**

- Admin dashboard for event management
- Real-time monitoring of photo sessions
- Template and branding customization
- Usage analytics and reporting

### Technical Innovation

**Enhanced from Base Platform:**

- Custom smartphone camera integration (not available in base Salsa API)
- Real-time screen display functionality for guest engagement
- Japanese language UI/UX completely redesigned
- Custom album viewing and sharing experience
- Multi-device synchronization across camera, screen, and admin interfaces

---

## My Role & Responsibilities

As the business owner and sole team member, I handled every aspect from conception to deployment:

### Engineering (50% of time)

- **Full-stack development**: Built 4 distinct interfaces (admin dashboard, digital album, camera app, display screen)
- **API Integration**: Connected with Photoboothsupplyco's Salsa API for photo processing
- **Custom Features**: Developed smartphone camera integration and real-time screen display
- **Infrastructure**: Deployed on Vercel with Next.js, managed Firebase for lightweight data storage
- **Development Timeline**: ~6 months from concept to production

### Design (20% of time)

- Designed all user interfaces from scratch
- Created multiple photo templates and filter options
- Developed Japanese-optimized UI/UX flows
- Branded marketing materials and sales collateral

### Sales & Business Development (30% of time)

- Conducted direct sales to wedding venues
- Negotiated contracts with 2 venues (outside owner's existing venues)
- Developed tiered pricing strategy (up to ¥300,000/month)
- Created pitch decks and product demonstrations

---

## Challenges & Solutions

### Challenge 1: Development Scope

**Problem:** Building 4 different applications (admin, album, camera, screen) single-handedly was extremely time-consuming.

**Solution:**

- Prioritized core features for MVP
- Used Next.js for code sharing across applications
- Leveraged Photoboothsupplyco's hardware to avoid hardware development
- Focused on fast iteration rather than perfection

### Challenge 2: Sales Effectiveness

**Problem:** Initial sales approach focused too much on features, resulting in low conversion despite interest.

**Learning:**

- Venue managers cared more about business outcomes (differentiation, price defense) than technical capabilities
- Needed to shift from "what it does" to "what it changes for your business"
- This lesson fundamentally changed how I approach product storytelling

### Challenge 3: Guest Engagement

**Problem:** While venue staff appreciated the technology, actual guest engagement at weddings was lukewarm.

**Reflection:**

- Should have invested more in customer success and onboarding
- Needed better strategies for encouraging guest participation during events
- The B2B2C model created distance from actual end-user feedback
- Would have benefited from more on-site observation and iteration

---

## Key Metrics & Outcomes

### Business Results

- **Venues Contracted:** 2 venues (beyond owner's properties)
- **Monthly Usage:** ~10 weddings per month (at departure)
- **Photos per Wedding:** ~100 photos (when actively used)
- **Revenue Model:** Achieved hardware cost recovery
- **Pricing:** Tiered subscription up to ¥300,000/month to venues; ¥30,000 per wedding to couples

### Technical Delivery

- **Development Timeline:** 6 months from start to production
- **Platform:** Next.js deployed on Vercel
- **Data Storage:** Firebase (lightweight usage)
- **External Integration:** Photoboothsupplyco Salsa API
- **Devices Supported:** iPad, web cameras, smartphones
- **Applications Built:** 4 (admin, album, camera, display)

---

## Technology Stack

### Frontend

- **Framework:** Next.js (React)
- **Deployment:** Vercel
- **UI Development:** Custom design system built from scratch

### Backend & Data

- **Database:** Firebase (minimal usage)
- **External API:** Photoboothsupplyco Salsa API
- **Authentication:** Firebase Auth

### Hardware Integration

- Photoboothsupplyco hardware and enclosures
- Custom smartphone camera integration
- Display screen synchronization

---

## Reflections & Learnings

### What Went Well

✅ Successfully built and shipped a complete B2B SaaS product solo
✅ Gained hands-on experience across engineering, design, and sales
✅ Achieved hardware cost recovery and sustainable pricing model
✅ Venue staff appreciated differentiation value and price defense capability
✅ Expanded skill set significantly—"武器が増えた" (my arsenal of weapons grew)

### What Could Be Improved

⚠️ **Guest engagement was lower than expected** - needed more focus on customer success and on-site experience
⚠️ **Sales approach was too feature-focused** - should have led with business outcomes and storytelling
⚠️ **Market strategy** - wedding venues (B2B2C) created long sales cycles and distance from users; events market would have been faster

### Key Takeaway

If I could do it again, **I would pivot to event-based deployments** instead of wedding-exclusive. Events offer:

- Faster sales cycles (B2B vs B2B2C)
- More immediate value perception
- Direct user feedback
- Higher usage frequency

This project taught me that **building a product is only half the battle**—understanding your go-to-market, sales narrative, and customer success strategy is equally critical.

---

## Resume-Ready Summary

**SNAP - Wedding Photobooth SaaS Platform | Business Owner & Lead Engineer**  
_Introduction Inc. | 2022-2023_

Led end-to-end development and commercialization of a B2B SaaS photobooth solution for wedding venues. As sole owner, designed and built 4 interconnected applications (admin dashboard, digital album, camera app, display screen) using Next.js and Firebase, integrated with Photoboothsupplyco's Salsa API. Developed custom features including smartphone camera integration and real-time screen synchronization.

Conducted direct sales, negotiated contracts with 2 venues, and established tiered pricing model (up to ¥300,000/month subscription). Platform supported ~10 weddings monthly with ~100 photos per event. Achieved hardware cost recovery and provided venues with competitive differentiation tool.

**Key Skills:** Full-stack development (Next.js, Firebase, Vercel), API integration, UI/UX design, B2B sales, product management, customer success

---

## Portfolio Storytelling Version

### The Beginning

When my company's owner approached me about building a photobooth solution for wedding venues, I saw it as more than just a technical project—it was an opportunity to own something completely. From design to code to sales pitch, every pixel and every line would be mine.

The owner had noticed photobooths at events and believed they'd work well in wedding venues. Existing solutions were expensive, clunky, and completely unprepared for the Japanese market. So we decided to build our own.

### The Build

For six months, I lived inside four different applications. An admin dashboard. A digital album. A camera interface. A display screen. Each one needed to feel cohesive, yet serve completely different users. The venue staff needed simplicity. The guests needed delight. The bride and groom needed memories.

I wasn't just writing code—I was designing interfaces from blank Figma files, negotiating with Photoboothsupplyco for hardware, and figuring out how to make a smartphone talk to a display screen in real-time.

The technical work was straightforward. Next.js on Vercel, Firebase for the lightweight stuff, Salsa API for the heavy lifting. What consumed my time wasn't the complexity—it was the _breadth_. Every decision was mine to make and mine to live with.

### The Sales Floor

Then came the part that scared me most: selling.

I put together pitch decks. I practiced demos. I walked into wedding venues and tried to convince managers that this tablet could transform their business.

My first pitches were disasters. I talked about features—smartphone integration! Real-time displays! Custom templates! The venue managers nodded politely and said they'd think about it.

It took me too long to realize: **they didn't care what it could do. They cared what it would change.**

When I finally started talking about competitive differentiation, about defending against price-cutting competitors, about showcasing modern technology to discerning couples—that's when they leaned in.

I closed two venues. Not a massive success, but proof that the model worked.

### The Reality Check

Here's the truth I didn't want to admit: guests weren't that excited.

The venue staff loved it. They could pitch it to couples. They could show off the screens. It looked impressive in the room.

But when the wedding actually happened? Lukewarm. Maybe 100 photos if we were lucky. People were there to celebrate, not to play with a photobooth.

I had built the product for the venue, not for the moment. And in a B2B2C model, that distance from the actual user hurt us.

I tried to improve the experience. I thought about customer success strategies. But I was spread too thin—coding, designing, selling, supporting. I couldn't be everywhere at once.

### The Lesson

If I could go back, I'd pivot immediately to events instead of weddings. Events are faster, more energetic, more forgiving. You can iterate based on direct feedback instead of playing telephone through venue managers.

But more importantly, I learned something about myself: **I can build anything if I'm willing to learn everything.**

Before SNAP, I was an engineer. After SNAP, I was an engineer who could design, sell, manage products, and own outcomes.

The project didn't become a massive success. But it expanded what I believed I was capable of. It added weapons to my arsenal—not just technical skills, but the confidence to step outside my comfort zone.

### What It Means Now

SNAP taught me that **building is the easy part**. Understanding your market, crafting your narrative, and ensuring your solution fits the actual moment of use—that's where the real work lives.

I don't regret the guest engagement issues or the slow sales. Those failures taught me more than any success could have. They showed me that empathy for users and clarity in messaging matter just as much as clean code.

And most importantly, they proved that I could take an idea from zero to revenue—entirely on my own.

---

## Visual Assets

**Location:** `/assets/snap/`

---

_Last Updated: November 2025_

```

```
