---
title: 'モダンバックエンド開発入門'
date: '2024-02-09'
description: 'バックエンド開発の基礎から実践的なアーキテクチャ設計まで解説します'
---

# モダンバックエンド開発入門

バックエンド開発の基礎知識から実践的なアーキテクチャ設計まで、具体例を交えて解説します。

## 1. RESTful API設計

### エンドポイント設計の基本

```typescript
// ユーザー関連のエンドポイント例
import express from 'express'
const router = express.Router()

// ユーザー一覧取得
router.get('/users', async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  const users = await User.find()
    .skip((page - 1) * limit)
    .limit(limit)
  res.json(users)
})

// ユーザー詳細取得
router.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return res.status(404).json({ message: 'ユーザーが見つかりません' })
  }
  res.json(user)
})
```

## 2. データベース設計

### スキーマ設計

```typescript
// Mongooseを使用したスキーマ例
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// インデックスの設定
userSchema.index({ email: 1 })
userSchema.index({ username: 1 })
```

## 3. 認証・認可

### JWT認証の実装

```typescript
// JWTミドルウェア
import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: '認証が必要です' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'トークンが無効です' })
  }
}

// ログインエンドポイント
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: '認証に失敗しました' })
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })

  res.json({ token })
})
```

## 4. エラーハンドリング

### グローバルエラーハンドラー

```typescript
// カスタムエラークラス
class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

// エラーハンドリングミドルウェア
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  // 予期せぬエラー
  console.error('予期せぬエラー:', err)
  res.status(500).json({
    status: 'error',
    message: '内部サーバーエラーが発生しました',
  })
}

app.use(errorHandler)
```

## 5. キャッシュ戦略

### Redisを使用したキャッシュ

```typescript
import Redis from 'ioredis'

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379,
})

// キャッシュミドルウェア
const cacheMiddleware =
  (duration: number) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const key = `cache:${req.originalUrl}`
    const cached = await redis.get(key)

    if (cached) {
      return res.json(JSON.parse(cached))
    }

    res.originalJson = res.json
    res.json = (body: any) => {
      redis.setex(key, duration, JSON.stringify(body))
      return res.originalJson(body)
    }

    next()
  }
```

## バックエンド開発のベストプラクティス

1. セキュリティ

   - 入力値のバリデーション
   - SQLインジェクション対策
   - XSS対策

2. パフォーマンス

   - 適切なインデックス設計
   - N+1問題の解決
   - キャッシュの活用

3. スケーラビリティ
   - 水平スケーリング
   - 非同期処理
   - マイクロサービス化

バックエンド開発では、セキュリティ、パフォーマンス、スケーラビリティのバランスを取りながら、保守性の高いシステムを設計することが重要です。
