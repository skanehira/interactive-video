# インタラクティブ動画の仕組みと実装ガイド

## 概要

インタラクティブ動画とは、視聴者が動画を見ながら選択肢を選んだり、特定の要素をクリックしたりすることで、ストーリーの展開を変えられる動画形式です。このプロジェクトでは、React と TypeScript を使用してインタラクティブ動画プレーヤーを実装しています。

## デモの実行方法

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで http://localhost:5173 を開くとデモを確認できます。

## インタラクティブ動画の仕組み

### 1. 基本構成要素

インタラクティブ動画は以下の要素で構成されています：

- **動画セグメント**: 個別の動画ファイル（各シーン）
- **インタラクションポイント**: 選択肢が表示されるタイミング
- **選択肢**: ユーザーが選べる次のアクション
- **シナリオ**: 全体のストーリー構造

### 2. 動作フロー

```
開始
  ↓
動画セグメント再生
  ↓
インタラクションポイントに到達
  ↓
選択肢を表示（動画を一時停止）
  ↓
ユーザーが選択
  ↓
次の動画セグメントへ遷移
  ↓
繰り返し or 終了
```

## 実装の詳細

### 1. データ構造

#### VideoSegment（動画セグメント）
```typescript
interface VideoSegment {
  id: string;           // 一意の識別子
  src: string;          // 動画ファイルのURL
  title: string;        // セグメントのタイトル
  description?: string; // 説明文（オプション）
}
```

#### InteractionPoint（インタラクションポイント）
```typescript
interface InteractionPoint {
  id: string;           // 一意の識別子
  segmentId: string;    // 対象セグメントのID
  timestamp: number;    // 表示開始時間（秒）
  duration: number;     // 表示期間（秒）
  choices: Choice[];    // 選択肢の配列
  pauseOnShow?: boolean; // 表示時に一時停止するか
}
```

#### Choice（選択肢）
```typescript
interface Choice {
  id: string;           // 一意の識別子
  text: string;         // 選択肢のテキスト
  nextSegmentId: string; // 次に再生するセグメントID
  icon?: string;        // アイコン（オプション）
}
```

### 2. 主要コンポーネント

#### InteractiveVideo コンポーネント

メインのコンポーネントで、以下の機能を持ちます：

1. **動画再生制御**
   - HTML5 `<video>` 要素を使用
   - 自動再生とシームレスな切り替え

2. **時間監視**
   ```typescript
   video.addEventListener('timeupdate', () => {
     // 現在の再生時間を監視
     // インタラクションポイントに到達したら選択肢を表示
   });
   ```

3. **状態管理**
   - `currentSegmentId`: 現在再生中のセグメント
   - `showChoices`: 選択肢の表示/非表示
   - `visitedSegments`: 訪問済みセグメントの記録

4. **プログレストラッキング**
   - 訪問したセグメント数を記録
   - プログレスバーで進捗を視覚化

#### ChoiceOverlay コンポーネント

選択肢を表示するオーバーレイコンポーネント：

1. **モーダル表示**
   - 半透明の背景で動画を覆う
   - アニメーション付きで表示

2. **レスポンシブデザイン**
   - グリッドレイアウトで選択肢を配置
   - モバイル対応

### 3. 実装のポイント

#### タイミング制御
```typescript
const interaction = scenario.interactions.find(
  int => int.segmentId === currentSegmentId &&
         currentTime >= int.timestamp &&
         currentTime < int.timestamp + int.duration
);
```
- 現在の再生時間を監視
- タイムスタンプと期間で表示タイミングを制御

#### シームレスな遷移
```typescript
const handleChoiceSelect = (choice: Choice) => {
  setCurrentSegmentId(choice.nextSegmentId);
  if (videoRef.current) {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  }
};
```
- 選択後、即座に次の動画を再生
- 読み込み中はローディング表示

#### エラーハンドリング
- 動画の読み込みエラーを検知
- セグメントが見つからない場合の処理

### 4. スタイリング

- **モダンなUI**: グラデーション、シャドウ、アニメーション
- **レスポンシブ対応**: モバイルからデスクトップまで対応
- **アクセシビリティ**: キーボード操作、適切なコントラスト

## カスタマイズ方法

### 1. 新しいシナリオの作成

`src/data/sampleScenario.ts` を参考に新しいシナリオを作成：

```typescript
export const myScenario: VideoScenario = {
  id: 'my-story',
  title: '私のストーリー',
  startSegmentId: 'intro',
  segments: [
    // セグメントを定義
  ],
  interactions: [
    // インタラクションポイントを定義
  ]
};
```

### 2. 動画ファイルの使用

- ローカルファイル: `public` フォルダに配置
- 外部URL: CDNやストリーミングサービスのURL
- 対応形式: MP4, WebM, OGG

### 3. UIのカスタマイズ

- `ChoiceOverlay.css`: 選択肢のスタイル
- `InteractiveVideo.css`: プレーヤー全体のスタイル

## 応用例

1. **教育コンテンツ**
   - 分岐する学習パス
   - クイズ形式の選択肢

2. **マーケティング**
   - 製品デモの対話型プレゼンテーション
   - パーソナライズされた顧客体験

3. **エンターテインメント**
   - 選択型アドベンチャー
   - インタラクティブな映画体験

## 今後の拡張可能性

1. **分析機能**
   - ユーザーの選択を記録
   - 人気の選択肢を分析

2. **高度なインタラクション**
   - ドラッグ&ドロップ
   - タイマー付き選択
   - 複数選択

3. **バックエンド統合**
   - ユーザーごとの進捗保存
   - マルチプレイヤー機能

## まとめ

このプロジェクトは、React と TypeScript を使用してインタラクティブ動画を実装する基本的な例を示しています。HTML5の動画APIとReactの状態管理を組み合わせることで、視聴者参加型の動画体験を作成できます。コードはモジュール化されており、新しいシナリオや機能を簡単に追加できる構造になっています。