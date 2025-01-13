---
title: 'モダンなJavaScriptデザインパターン入門'
date: '2024-01-30'
description: 'フロントエンド開発で活用できる実践的なデザインパターンについて解説します'
---

# モダンなJavaScriptデザインパターン入門

フロントエンド開発において有用なデザインパターンについて、実践的な例を交えて解説します。

## 1. Observerパターン

状態の変更を監視し、依存するコンポーネントに通知するパターンです。

```typescript
// 基本的なObserverパターン
class Observable {
  private observers: Observer[] = []

  subscribe(observer: Observer) {
    this.observers.push(observer)
  }

  unsubscribe(observer: Observer) {
    this.observers = this.observers.filter((obs) => obs !== observer)
  }

  notify(data: any) {
    this.observers.forEach((observer) => observer.update(data))
  }
}

// Reactでの実装例
const useDataSubscription = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const subscription = dataService.subscribe((newData) => {
      setData(newData)
    })
    return () => subscription.unsubscribe()
  }, [])

  return data
}
```

## 2. Singletonパターン

アプリケーション全体で単一のインスタンスを共有するパターンです。

```typescript
// モダンなSingletonパターン
class ConfigService {
  private static instance: ConfigService
  private config: Record<string, any> = {}

  private constructor() {}

  static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService()
    }
    return ConfigService.instance
  }

  getConfig(key: string) {
    return this.config[key]
  }

  setConfig(key: string, value: any) {
    this.config[key] = value
  }
}

// 使用例
const config = ConfigService.getInstance()
```

## 3. Factoryパターン

オブジェクトの生成を抽象化するパターンです。

```typescript
// コンポーネントのFactory
interface ButtonProps {
  label: string
  variant: 'primary' | 'secondary' | 'danger'
}

class ButtonFactory {
  static createButton(props: ButtonProps) {
    switch (props.variant) {
      case 'primary':
        return <PrimaryButton label={props.label} />
      case 'secondary':
        return <SecondaryButton label={props.label} />
      case 'danger':
        return <DangerButton label={props.label} />
      default:
        throw new Error('Unknown button variant')
    }
  }
}

// 使用例
const MyComponent = () => {
  return (
    <div>
      {ButtonFactory.createButton({
        label: '保存',
        variant: 'primary'
      })}
    </div>
  )
}
```

## 4. Strategyパターン

アルゴリズムを動的に切り替えるパターンです。

```typescript
// フォームバリデーションの例
interface ValidationStrategy {
  validate(value: string): boolean
}

class EmailValidator implements ValidationStrategy {
  validate(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
}

class PasswordValidator implements ValidationStrategy {
  validate(password: string): boolean {
    return password.length >= 8
  }
}

// Reactでの使用例
const FormField = ({ type, value, onChange }) => {
  const validator = useMemo(() => {
    switch (type) {
      case 'email':
        return new EmailValidator()
      case 'password':
        return new PasswordValidator()
      default:
        throw new Error('Unknown field type')
    }
  }, [type])

  const isValid = validator.validate(value)

  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={isValid ? 'valid' : 'invalid'}
      />
    </div>
  )
}
```

## 5. Compositeパターン

部分と全体を同一視するパターンです。

```typescript
// UIコンポーネントの例
interface Component {
  render(): JSX.Element
}

class Container implements Component {
  private children: Component[] = []

  addChild(child: Component) {
    this.children.push(child)
  }

  render() {
    return (
      <div className="container">
        {this.children.map(child => child.render())}
      </div>
    )
  }
}

// 使用例
const layout = new Container()
layout.addChild(new Header())
layout.addChild(new Sidebar())
layout.addChild(new MainContent())
```

## デザインパターンの選択

適切なデザインパターンを選択する際の考慮点：

1. 問題の性質

   - パターンが解決する問題の種類
   - 適用範囲と制約

2. メンテナンス性

   - コードの可読性
   - 拡張のしやすさ

3. パフォーマンス
   - メモリ使用量
   - 実行速度

デザインパターンは、コードの品質を向上させる重要なツールですが、過剰な適用は避け、必要な場所で適切に使用することが重要です。
