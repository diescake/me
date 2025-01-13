---
title: 'データベース設計の基礎と実践'
date: '2024-02-14'
description: '効率的なデータベース設計の手法とベストプラクティスについて解説します'
---

# データベース設計の基礎と実践

効率的で保守性の高いデータベースを設計するための基本原則と実践的な手法について解説します。

## 1. テーブル設計の基本

### 正規化の重要性

データの一貫性と整合性を保つための正規化について説明します。

```sql
-- 正規化前のテーブル
CREATE TABLE orders (
  id INT PRIMARY KEY,
  customer_name VARCHAR(100),
  customer_email VARCHAR(100),
  product_name VARCHAR(100),
  product_price DECIMAL(10,2)
);

-- 正規化後のテーブル構造
CREATE TABLE customers (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE
);

CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10,2)
);

CREATE TABLE orders (
  id INT PRIMARY KEY,
  customer_id INT,
  product_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

## 2. インデックス設計

### 効率的なクエリのためのインデックス

```sql
-- 基本的なインデックス
CREATE INDEX idx_customers_email ON customers(email);

-- 複合インデックス
CREATE INDEX idx_orders_customer_date ON orders(customer_id, created_at);

-- パーシャルインデックス
CREATE INDEX idx_active_users ON users(email)
WHERE status = 'active';
```

## 3. リレーションシップ

### 様々な関連付けの実装

```sql
-- 一対多の関係
CREATE TABLE posts (
  id INT PRIMARY KEY,
  user_id INT,
  title VARCHAR(200),
  content TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 多対多の関係
CREATE TABLE tags (
  id INT PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE post_tags (
  post_id INT,
  tag_id INT,
  PRIMARY KEY (post_id, tag_id),
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);
```

## 4. パフォーマンスの最適化

### クエリの最適化

```sql
-- 効率的なクエリの例
SELECT
  p.title,
  u.name as author,
  COUNT(c.id) as comment_count
FROM posts p
JOIN users u ON p.user_id = u.id
LEFT JOIN comments c ON p.id = c.post_id
WHERE p.status = 'published'
GROUP BY p.id, p.title, u.name
HAVING COUNT(c.id) > 5
ORDER BY comment_count DESC
LIMIT 10;

-- 実行計画の確認
EXPLAIN ANALYZE
SELECT * FROM posts
WHERE user_id = 123
  AND created_at > '2024-01-01';
```

## 5. データ整合性

### 制約とトリガー

```sql
-- チェック制約
CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10,2),
  stock INT,
  CONSTRAINT positive_price CHECK (price > 0),
  CONSTRAINT positive_stock CHECK (stock >= 0)
);

-- トリガーの例
CREATE TRIGGER update_stock
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
  UPDATE products
  SET stock = stock - NEW.quantity
  WHERE id = NEW.product_id;
END;
```

## データベース設計のベストプラクティス

1. スキーマ設計

   - 適切な正規化レベル
   - 明確な命名規則
   - 適切なデータ型の選択

2. パフォーマンス

   - 効率的なインデックス設計
   - クエリの最適化
   - パーティショニングの検討

3. セキュリティ
   - アクセス制御
   - データの暗号化
   - SQLインジェクション対策

## よくある設計パターン

| パターン       | 用途           | 例           |
| -------------- | -------------- | ------------ |
| 階層構造       | カテゴリツリー | 商品カテゴリ |
| ソフトデリート | 論理削除       | ユーザー管理 |
| バージョニング | 履歴管理       | 文書管理     |

データベース設計は、アプリケーションの要件とパフォーマンスのバランスを取りながら、将来の拡張性も考慮して行うことが重要です。
