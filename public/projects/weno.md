# LINE連携チケット発券

**所属・関係:** Generosity Inc.

**担当領域:** フルスタック開発

## 概要

チケット公開時に集中する発券要求に対応するため、イベント向けの発券処理を再構築。Vueの画面とNestJSのバックエンドを開発し、BullMQ／Redisのキュー、Prisma／MySQLでの保存、LINE通知を組み合わせました。発券要求の受付とワーカー処理を分離しています。

## Overview

LINE-connected ticketing

**Context:** Generosity Inc.

**Role:** Full-stack engineering

Rebuilt event ticketing flows to handle competing requests at ticket-release time. Developed Vue interfaces and a NestJS backend with BullMQ/Redis queues, Prisma/MySQL persistence and LINE notifications. Ticket issuance uses separate producer and worker paths.

## 技術 / Stack

TypeScript, Vue.js, NestJS, BullMQ, Redis, Prisma, MySQL
