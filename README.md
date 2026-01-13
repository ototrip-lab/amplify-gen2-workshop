# amplify-gen2-workshop

## 概要

このワークショップでは、AWS Amplify Gen2 と Kiro CLI を使用して、ログイン機能付きの Todo アプリケーションを構築します。

## 前提条件

- AWS アカウント（Admin 相当の権限）
- AWS ビルダー ID
- GitHub アカウント

## ワークショップの内容

作業時間目安：1 時間

### 1. 初期設定 ([docs/1\_初期設定.md](docs/1_初期設定.md))

- AWS CLI、Node.js、Kiro CLI、UV のインストール
- AWS アカウントへのログイン
- Kiro CLI の認証設定
- GitHub Codespaces での環境構築

### 2. Todo アプリ開発 ([docs/2\_アプリ作成.md](docs/2_アプリ作成.md))

- Vite + React + TypeScript のセットアップ
- Amplify Sandbox の起動と開発
- Kiro CLI を使用した AI 支援開発
- AWS MCP サーバーを活用した Amplify ガイド付きワークフロー

### 3. Hosting ([docs/3\_ホスティング.md](docs/3_ホスティング.md))

- Amplify Hosting の設定

### 4. 後処理 ([docs/4\_後処理.md](docs/4_後処理.md))

- ワークショップで利用したリソースの削除

## ファイル構成

```
amplify-gen2-workshop/
├── .devcontainer/
│   └── devcontainer.json           # GitHub Codespaces / Dev Container設定
├── .kiro/
│   └── settings/
│       └── mcp.json                # Kiro CLI用 AWS MCPサーバー設定
├── docs/
│   ├── 1_初期設定.md                # Step1: 環境セットアップ手順
│   ├── 2_アプリ作成.md              # Step2: Kiro CLIでTodoアプリ開発
│   ├── 3_ホスティング.md             # Step3: Amplify Hostingデプロイ
│   └── 4_後処理.md                  # Step4: 環境の削除手順
├── todo-app/
│   ├── amplify/
│   │   ├── auth/
│   │   │   └── resource.ts         # Cognito認証設定
│   │   ├── data/
│   │   │   └── resource.ts         # AppSync/DynamoDBスキーマ定義
│   │   ├── backend.ts              # バックエンドエントリーポイント
│   │   ├── package.json            # Amplifyバックエンド依存関係
│   │   └── tsconfig.json           # Amplify用TypeScript設定
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── App.css                 # Appコンポーネント用CSS
│   │   ├── App.tsx                 # メインAppコンポーネント
│   │   ├── index.css               # グローバルCSS
│   │   └── main.tsx                # Reactエントリーポイント
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html                  # HTMLテンプレート
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   └── README.md
├── amplify.yml                     # ビルドとデプロイの設定を定義するファイル
├── LICENSE
└── README.md                       # ワークショップ全体のREADME
```
