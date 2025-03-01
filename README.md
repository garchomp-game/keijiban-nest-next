# Keijiban - 掲示板アプリ

このプロジェクトは、シンプルな掲示板アプリケーションです。Node.js、Express、MongoDBを使用して構築されています。

## 機能

- 投稿の作成・表示
- 投稿へのコメント追加
- レスポンシブデザイン

## セットアップ

1. リポジトリをクローンする:

```bash
git clone <repository-url>
cd keijiban
```

2. 依存パッケージをインストールする:

```bash
npm install
```

3. MongoDBをインストールして実行する（もしくはMongoDBクラウドサービスを使用する）

4. 環境変数を設定する（`.env`ファイルを作成する）:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/keijiban
```

5. アプリケーションを起動する:

```bash
npm start
```

開発モードで実行する場合:

```bash
npm run dev
```

6. ブラウザで `http://localhost:3000` にアクセスする

## プロジェクト構造

```
keijiban/
│
├── models/           # データモデル
│   └── Post.js       # 投稿モデル
│
├── public/           # 静的ファイル
│   ├── index.html    # メインHTMLファイル
│   ├── styles.css    # スタイルシート
│   └── script.js     # クライアントサイドJavaScript
│
├── routes/           # APIルート
│   └── posts.js      # 投稿関連のエンドポイント
│
├── .env              # 環境変数
├── package.json      # プロジェクト設定
├── README.md         # プロジェクト説明
└── server.js         # サーバーエントリーポイント
```

## 使い方

1. トップページでタイトル、名前、内容を入力して投稿を作成できます。
2. 投稿をクリックすると詳細が表示され、コメントを追加できます。

## ライセンス

MIT
# keijiban-nest-next
