Anime Map Webアプリケーション
このリポジトリは、アニメスポット検索機能を提供するWebアプリケーションです。フロントエンドはReact (TypeScript)、バックエンドはExpress、ORMはPrisma、データベースはMySQLを使用しています。Dockerを利用して開発環境を簡単に構築できます。

環境構築手順
前提条件
Dockerがインストールされていること
Docker Composeがインストールされていること
手順
リポジトリをクローン

bash
コードをコピーする
git clone https://github.com/yourusername/anime-map.git
cd anime-map
環境変数ファイルの作成

.env ファイルをプロジェクトのルートディレクトリに作成し、以下のように設定します。

env
コードをコピーする
# MySQLデータベース
MYSQL_ROOT_PASSWORD=yourpassword
MYSQL_DATABASE=animemap
Dockerコンテナの起動

Docker Composeを使用してフロントエンド、バックエンド、データベースのコンテナを一括で起動します。

bash
コードをコピーする
docker-compose up --build
フロントエンド (React) はポート 3000 でアクセスできます: http://localhost:3000
バックエンド (Express) はポート 5000 でアクセスできます: http://localhost:5000
MySQLデータベースはポート 3306 で接続できます。
Prismaのセットアップ

初回起動時に、Prismaのマイグレーションを適用してデータベースを設定します。

bash
コードをコピーする
docker-compose exec backend npx prisma migrate dev --name init
フロントエンドとバックエンドの確認

フロントエンドのReactアプリは、http://localhost:3000で確認できます。
バックエンドのExpress APIは、http://localhost:5000でHello from Express!と表示されることを確認します。
GitHub Actions CI/CD

GitHubにプッシュすると、自動的にCI (テスト・ビルド) が実行される設定になっています。詳細は .github/workflows/ci.yml を参照してください。

その他のコマンド
コンテナの停止.

bash
コードをコピーする
docker-compose down
不要なキャッシュとボリュームの削除

bash
コードをコピーする
docker-compose down --volumes --remove-orphans