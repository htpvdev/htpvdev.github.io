# ポートフォリオ

## 自己紹介

Webアプリ開発経験2年目SEです！
簡単なJavaScript等の制作物をこちらのページで公開させていただきます。ご意見コメントいただいたら嬉しすぎて泣きます！！

<https://htpvdev.github.io>

<br>

## 制作経緯

先輩社員さんからGitHub Pages をおすすめされたので、自らの学習用に始めた。  

<br>

## GitHub Pages について（備忘録）

リポジトリ名を、".github.io"で終わるリポジトリ名にすることで、ブラウザのGitHubのリポジトリのSettingsからGitHub Pageが有効化できる。  
SettingのタブにPageがあるので、そこから編集する。  
  
また、デフォルトでREADME.mdがルートURLに表示されてしまうので、README.mdを.github/README.mdへ移動する。

<br>

## React 環境について

この GitHub Page はReactアプリケーションで作成されている。ただ、GitHub Pageには静的ファイルしか置けない(Node.jsを実行できない)ので、デプロイするために以下の操作を行い、ビルド後のファイル(webpackでモジュールバインドされた後のファイル)を生成した。

### React開発環境構築

Node.jsのバージョン管理ツール「Volta」を利用した。そのため、voltaコマンドも使用している。

1. 以下のコマンドを順に実行
- voltaコマンドで、最新のNode.jsとnpmをインストール
- `volta install node@latest`
- `volta install npm@latest`
- volta pin コマンドで、package.jsonに、このプロジェクトで利用するNode.js/npmのバージョンを固定する
- `volta pin node@latest`
- `volta pin npm@latest`
- create-react-appコマンドを利用してReactアプリケーションをインストールする(TypeScript)
- `npm i -g create-react-app`
- `npx create-react-app my-app --template typescript`

2. 作成したアプリを、静的ファイルにビルドする
- アプリのURL(%PUBLIC_URL%)を設定する必要がある
- package.jsonに、homepageという名前のプロパティを追加して、"https://htpvdev.github.io/react-reversi"という値を設定
- `npm run build`を実行

## コンテンツ

## React ゲーム

今はオセロだけだが、チェスや将棋なども作りたい  
プレイヤー同士の対戦機能も実装したい

## TETRIS
<br>

### 概要
こちらのページでテトリスがプレイできます。

<https://htpvdev.github.io/V2/tetris/>

<br>

JavaScript学習1ヶ月目に作成。YouTubeで公開されているコードを写経しただけだが、大変勉強になった。  
その後、テトリミノ保持機能や、次のテトリミノが見える機能、スコア機能、一時停止などの機能を取り付けた。  

<br>

参考：<https://www.youtube.com/watch?v=LJlKaTwtSdI>  

<br>

### 今後の展望
落下先予測機能（テトリミノの落下中に、現在の状態だとどのようにテトリミノが固定されるかを薄く表示する機能）をつけたい（時間があれば・・・）  

## 平方根計算機

### 概要

こちらのページです。

<https://htpvdev.github.io/square/>

<br>

2022/01 頃に作成。30分くらいで作った。教えてもらったブックマークレットでできるものを考えた。

<br>

### 今後の展望

<br>

N乗根に対応しようかな？

## ログ

- 2022/1/31 リポジトリ作成

## Tips

### 以下より、SE関連の知識を、雑多にメモしていきます。

SPAとは？  
Single Page Application の略。単一のページから遷移することなく様々な機能を果たせるもの。Reactとかで実装される？(GmailやFaceBookなど)

