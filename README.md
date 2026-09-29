# SHINTAKU ToDo（伸託やることリスト）

有限会社伸託の共用やることリスト（スマホ用アプリ / PWA）。

- 公開URL: https://syndybird.github.io/shintaku-todo/
- データ: Google スプレッドシート（GAS Webアプリを API として使用）
- 見た目: OS利用組合 新UI（liff2 / gate）に合わせたデザイン

## ファイル
- `index.html` … アプリ本体（一覧・追加・編集・完了・必要物資チェック）
- `manifest.webmanifest` / `sw.js` … ホーム画面に追加して使うための設定
- `icon-*.png` / `apple-touch-icon.png` / `logo.png` / `favicon.png` … アイコン

## 保存先を変えるとき
`index.html` の `API_URL` を GAS WebアプリのURLに書き換える。
