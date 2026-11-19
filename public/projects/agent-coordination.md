# AIエージェントのタスク・引き継ぎ管理

**所属・関係:** 個人の開発プロジェクト

**担当領域:** 開発

## 概要

AIエージェントの担当やセッションが変わっても、タスク・判断・引き継ぎを保持するGo／SQLiteのローカルサービスとCLIを開発。トランザクション、要求の重複処理、バージョン検証で状態を管理します。再起動時に実行結果が不明な処理は自動で再実行せず、確認待ちにします。確認した版はローカルでの検証段階で、実環境との連携は無効です。

## Overview

Durable AI-agent coordination

**Context:** Independent project

**Role:** Coordination service and CLI development

Built a local Go/SQLite service and CLI to retain AI-agent tasks, decisions and handovers across coordinator changes. Transactional writes, request receipts and version checks protect task state. Restart recovery holds dispatches with uncertain outcomes for reconciliation, avoiding automatic repeat execution. The reviewed project remains in local qualification, with live integration disabled.

## 技術 / Stack

Go, SQLite, HTTP/JSON, Unix sockets
