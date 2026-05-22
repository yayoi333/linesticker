# AKIRU Portfolio

イラストレーター／LINEスタンプ作家向けのモダンなポートフォリオサイト。

## 特徴
- 静的な HTML / CSS / JavaScript のみ（ビルド不要・`index.html` を開くだけで動作）
- 外部ライブラリ非依存。スクロール連動アニメは Intersection Observer、軽量パララックスは `requestAnimationFrame`
- 画像はすべて自作 SVG のためリンク切れなし
- レスポンシブ（モバイルファースト）／ハンバーガーメニュー（白背景）／作品モーダル／スクロールスパイ
- Google Fonts（Zen Maru Gothic / Noto Sans JP / Poppins）＋デバイスフォントへのフォールバック

## セクション構成
Hero → Works → Skills → About → Value → Pricing → Contact

## 開発・プレビュー
```bash
python3 -m http.server 8000
# http://localhost:8000 を開く
```

## 構成
```
index.html        # マークアップ（全7セクション）
css/style.css     # スタイル・レスポンシブ・アニメーション
js/main.js        # ナビ / モーダル / スクロール演出
assets/           # 自作 SVG イラスト（hero / about / favicon / works/*）
```
