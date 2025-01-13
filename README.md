# diescake.com

これは [Next.js](https://nextjs.org) で構築された、Markdown対応のブログ機能を備えた個人サイトです。
すべての実装を[cline](https://github.com/cline/cline)に委ねています。

## プロジェクト構成

```
├── posts/          # Markdown形式のブログ記事
├── public/         # 静的アセット
└── src/
    ├── app/        # Next.js アプリルーターのページ
    ├── components/ # React コンポーネント
    └── lib/        # ユーティリティ関数とプラグイン
```

## 開発の始め方

まず、依存パッケージをインストールします：

```bash
pnpm install
```

次に、開発サーバーを起動します：

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと結果が表示されます。

## ブログ記事

ブログ記事は `posts/` ディレクトリに保存され、Markdown形式で記述されています。各記事にはメタデータを含むフロントマターが必要です。

## 使用技術

- [Next.js](https://nextjs.org) - React フレームワーク
- [TailwindCSS](https://tailwindcss.com) - ユーティリティファーストな CSS フレームワーク
- [Remark](https://github.com/remarkjs/remark) - Markdownプロセッサー
- [Cline]() - AIアシスタント
