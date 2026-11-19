# 美容室チェーン向けデータ連携・レポート基盤

**所属・関係:** FalconeX — 美容室チェーンへの支援

**担当領域:** データ連携・アプリ開発・自動化

## 概要

FalconeXのクライアント業務として、美容室チェーンのPOSデータをBigQueryへ連携する仕組み、集計処理、Reactのダッシュボードを開発しました。抽出・取り込み・実行管理を分離し、全件・期間指定の取り込みと入力の欠落・重複の検証に対応。PythonによるWindows POSの定期帳票出力や失敗時の処理も実装しています。

## 技術

TypeScript, Python, React, Fastify, BigQuery, Google Cloud Storage, Parquet
