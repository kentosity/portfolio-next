# 有効期限付きMarkdown共有ツール

**所属・関係:** 個人の開発プロジェクト

**担当領域:** Webアプリ開発

## 概要

Markdownを有効期限付きの閲覧リンクで共有するCloudflare Workers／Honoアプリを開発。R2に文書を保存し、D1で公開メタデータを管理します。サイズ・リクエスト数の制限、重複検出、期限切れリンクの拒否を実装しました。

## Overview

Expiring Markdown sharing tool

**Context:** Independent project

**Role:** Markdown sharing application development

Built a Cloudflare Workers/Hono application for sharing rendered Markdown through expiring links. R2 stores documents and D1 tracks publication metadata; the implementation enforces size and rate limits, detects duplicates and rejects expired shares.

## 技術 / Stack

TypeScript, Cloudflare Workers, Hono, R2, D1, markdown-it
