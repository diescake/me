---
title: 'テスト自動化の実践ガイド'
date: '2024-02-19'
description: 'モダンなテスト自動化の手法と効果的なテスト戦略について解説します'
---

# テスト自動化の実践ガイド

効果的なテスト自動化の実装方法と、テスト戦略の立て方について解説します。

## 1. ユニットテスト

### Jestを使用したテスト実装

```typescript
// テスト対象の関数
const calculateTotal = (items: Array<{ price: number; quantity: number }>) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

// テストケース
describe('calculateTotal', () => {
  it('正しい合計金額を計算する', () => {
    const items = [
      { price: 100, quantity: 2 },
      { price: 200, quantity: 1 },
    ]
    expect(calculateTotal(items)).toBe(400)
  })

  it('空の配列の場合は0を返す', () => {
    expect(calculateTotal([])).toBe(0)
  })
})
```

## 2. インテグレーションテスト

### APIエンドポイントのテスト

```typescript
import request from 'supertest'
import app from './app'

describe('User API', () => {
  beforeEach(async () => {
    await db.clear()
  })

  it('ユーザーの作成に成功する', async () => {
    const response = await request(app).post('/api/users').send({
      name: 'テストユーザー',
      email: 'test@example.com',
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.name).toBe('テストユーザー')
  })

  it('無効なメールアドレスでエラーを返す', async () => {
    const response = await request(app).post('/api/users').send({
      name: 'テストユーザー',
      email: 'invalid-email',
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error')
  })
})
```

## 3. E2Eテスト

### Playwrightを使用したテスト

```typescript
import { test, expect } from '@playwright/test'

test.describe('ログインフロー', () => {
  test('正常なログインができる', async ({ page }) => {
    await page.goto('/login')

    // フォームの入力
    await page.fill('input[name="email"]', 'user@example.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')

    // ダッシュボードにリダイレクトされることを確認
    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('h1')).toContainText('ダッシュボード')
  })

  test('エラーメッセージが表示される', async ({ page }) => {
    await page.goto('/login')

    // 誤ったパスワードで試行
    await page.fill('input[name="email"]', 'user@example.com')
    await page.fill('input[name="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')

    // エラーメッセージの確認
    const errorMessage = page.locator('.error-message')
    await expect(errorMessage).toBeVisible()
    await expect(errorMessage).toContainText('認証に失敗しました')
  })
})
```

## 4. コンポーネントテスト

### React Testing Libraryの使用例

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Counter } from './Counter'

describe('Counter', () => {
  it('初期値が0で表示される', () => {
    render(<Counter />)
    expect(screen.getByText('カウント: 0')).toBeInTheDocument()
  })

  it('増加ボタンをクリックするとカウントが増える', () => {
    render(<Counter />)
    const button = screen.getByText('増加')
    fireEvent.click(button)
    expect(screen.getByText('カウント: 1')).toBeInTheDocument()
  })

  it('減少ボタンをクリックするとカウントが減る', () => {
    render(<Counter />)
    const button = screen.getByText('減少')
    fireEvent.click(button)
    expect(screen.getByText('カウント: -1')).toBeInTheDocument()
  })
})
```

## 5. テストカバレッジ

### カバレッジレポートの設定

```javascript
// jest.config.js
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
  ],
}
```

## テスト戦略のベストプラクティス

1. テストピラミッド

   - 多くのユニットテスト
   - 適度なインテグレーションテスト
   - 少数の E2E テスト

2. テストの品質

   - 読みやすいテストコード
   - 適切なアサーション
   - テストの独立性

3. CI/CDとの統合
   - 自動テストの実行
   - カバレッジレポートの生成
   - 品質ゲートの設定

テスト自動化は、ソフトウェアの品質を保証する重要な手段です。適切なテスト戦略を立て、継続的に改善していくことが重要です。
