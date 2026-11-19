# イベント管理基盤の再設計

**所属・関係:** Generosity Inc.

**担当領域:** アーキテクチャ設計・フルスタック開発

## 概要

イベントごとに再利用できる構成とインフラ費の削減を目指し、LINE連携の予約基盤を再設計。Nuxt、TypeScript、AWS Lambda、DynamoDBで予約・チェックイン機能を分離し、共通バリデーションと分析用データ連携を整備しました。年間インフラ費を約20万ドルから約1万ドルへ、約95%削減しました。

## Overview

Event-platform rearchitecture

**Context:** Generosity Inc.

**Role:** Architecture and full-stack engineering

Rearchitected a LINE-connected reservation platform to make event configurations reusable and reduce infrastructure cost. Built modular reservation and check-in features with Nuxt, TypeScript, AWS Lambda and DynamoDB, alongside shared validation and an analytics pipeline. Annual infrastructure cost fell from about $200k to about $10k, approximately 95%.

## 技術 / Stack

Nuxt.js, TypeScript, AWS Lambda, DynamoDB, Zod, CloudFront
