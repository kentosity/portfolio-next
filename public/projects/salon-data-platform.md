# 美容室チェーン向けデータ連携・レポート基盤

**所属・関係:** FalconeX — 美容室チェーンへの支援

**担当領域:** データ連携・アプリ開発・自動化

## 概要

美容室チェーンのPOSデータを集計・分析につなぐため、FalconeXでTypeScript／PythonによるBigQueryへの取り込み、集計処理、React／Fastifyのダッシュボードを開発。全件・期間指定の取り込み、Parquet形式での受け渡し、Windows POSの定期帳票出力と失敗時の処理に対応しました。集計では入力の欠落・重複を検出します。

## Overview

Data integration and reporting for a hair salon chain client

**Context:** FalconeX — hair salon chain client engagement

**Role:** Data integration, reporting application and automation development

To connect a hair salon chain client’s POS data with analytical reporting, built TypeScript/Python ingestion into BigQuery, reporting calculations and a React/Fastify dashboard through FalconeX. The workflow supports full and date-window imports, Parquet staging and scheduled Windows report exports with failure handling. Report calculations flag missing or duplicate inputs.

## 技術 / Stack

TypeScript, Python, React, Fastify, BigQuery, Google Cloud Storage, Parquet
