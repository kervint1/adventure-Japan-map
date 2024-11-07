# 🌟 Anime Map Webアプリケーション 🌟

このリポジトリは、**アニメスポット検索機能**を提供するWebアプリケーションです。  
フロントエンドは**React (TypeScript)**、バックエンドは**Express**、ORMは**Prisma**、データベースは**MySQL**を使用しています。  
**Docker**を利用して開発環境を簡単に構築できます。

---

## ⚙️ 環境構築手順

### ✅ 前提条件
- **Docker** がインストールされていること
- **Docker Compose** がインストールされていること

### 📝 手順

1. **リポジトリをクローン**
   ```bash
   git clone https://github.com/yourusername/anime-map.git
   cd anime-map

2. **環境変数ファイルの作成**
    ```bash
    # MySQLデータベース
    MYSQL_ROOT_PASSWORD=yourpassword
    MYSQL_DATABASE=animemap

3. **Dockerコンテナの起動**
Docker Compose を使用してフロントエンド、バックエンド、データベースのコンテナを一括で起動します。

    ```bash
    docker-compose up --build
    ```

- フロントエンド (React) はポート http://localhost:3000 でアクセスできます。
- バックエンド (Express) はポート http://localhost:5000 でアクセスできます。
- MySQLデータベースはポート 3306 で接続できます。

4. **Prismaのセットアップ**
初回起動時に、Prismaのマイグレーションを適用してデータベースを設定します。

    ```bash
    docker-compose exec backend npx prisma migrate dev --name init
    ```
5. **フロントエンドとバックエンドの確認**
- フロントエンドのReactアプリは、http://localhost:3000 で確認できます。
- バックエンドのExpress APIは、http://localhost:5000 で Hello from Express! と表示されることを確認します。

# 🚀 GitHub Actions CI/CD
GitHubにプッシュすると、自動的にCI (テスト・ビルド) が実行される設定になっています。
詳細は **.github/workflows/ci.yml** を参照してください。

# 🔧 その他のコマンド
- コンテナの停止
```bash
docker-compose down
```
- 不要なキャッシュとボリュームの削除
```bash
docker-compose down --volumes --remove-orphans
```

# 📁 ディレクトリ構成
```bash
AJM
├── .github
│   └── workflows
│       └── ci.yml
├── backend
│   ├── node_modules
│   ├── prisma
│   │   ├── migrations
│   │   │   └── migration_lock.toml
│   │   └── schema.prisma
│   ├── src
│   │   ├── adventureSpotController.ts
│   │   ├── adventureSpotRoutes.ts
│   │   └── index.ts
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├── database
├── frontend
│   ├── node_modules
│   ├── public
│   │   ├── logo.svg
│   └── src
│       ├── components
│       │   ├── layout
│       │   │   └── header.tsx
│       │   ├── pages
│       │   │   ├── home.tsx
│       │   │   └── register.tsx
│       │   └── UI
│       │       ├── header.tsx
│       │       └── map.tsx
│       ├── css
│       ├── AdventureSpotList.tsx
│       ├── App.css
│       ├── App.test.tsx
│       ├── App.tsx
│       ├── index.css
│       ├── index.tsx
│       ├── react-app-env.d.ts
│       ├── reportWebVitals.ts
│       ├── setupTests.ts
│       ├── .gitignore
│       ├── Dockerfile
│       ├── package-lock.json
│       ├── package.json
│       ├── README.md
│       └── tsconfig.json
├── node_modules
├── .gitignore
├── docker-compose.yml
├── package-lock.json
├── package.json
└── README.md

```
