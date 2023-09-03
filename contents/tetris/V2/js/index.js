/** 
  参考  - YouTube-Akichonプログラミング講座-テトリスを作る
        - https://www.youtube.com/watch?v=LJlKaTwtSdI

  変数名は全てロウワーキャメルケースに統一(数値の定数以外)
  このゲームでは、ドット単位で色を指定できるキャンバスというエリアに、1ドットずつ色を指定する処理を、ゲーム画面の動きがあるたびに実行するというやり方だ。そして、テトリスというゲームではブロック状のものしか存在しないので、画面全体をマス目状に区切って、マス目単位で色を指定して描画、というのをマス目の数行うという描画方法でやっているようだ。

*/

// #region 他の値で変動しない、運用上変更があり得る値(全大文字の値)

/** テトリミノの落下速度 */
const SEED_DROP_SPEED = 300

/** テトリミノのサイズ？？ */
const TETRO_SIZE = 4

/** 待機ミノの数 */
const FUTURE_TETRO_COUNT = 4

/** ステージ（フィールド）横のマス目の数 */ 
const FIELD_COL = 10
/** ステージ（フィールド）の縦のマス目の数 */
const FIELD_ROW = 23

/** 待機ミノエリア（フィールド）横のマス目の数 */ 
const FUTURE_FIELD_COL = TETRO_SIZE
/** 待機ミノエリア（フィールド）の縦のマス目の数 */
const FUTURE_FIELD_ROW = TETRO_SIZE * FUTURE_TETRO_COUNT

/** ホールドミノ（フィールド）横のマス目の数 */ 
const HOLDING_FIELD_COL = TETRO_SIZE
/** ホールドミノ（フィールド）の縦のマス目の数 */
const HOLDING_FIELD_ROW = TETRO_SIZE

/** ブロック一つの大きさ(ピクセル) */
const BLOCK_SIZE_PX = 30
const FUTURE_BLOCK_SIZE_PX = BLOCK_SIZE_PX
const HOLDING_BLOCK_SIZE_PX = BLOCK_SIZE_PX

/** 各ブロックのプロパティ */
const TETRO_TYPES = [
  // 0 空白
  {
    colorType: 0,
    map: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  },
  // 1 I 水色
  {
    colorType: 1,
    map: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  },
  // 2 L オレンジ
  {
    colorType: 2,
    map: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ]
  },
  // 3 J 青
  {
    colorType: 3,
    map: [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ]
  },
  // 4 T 紫
  {
    colorType: 4,
    map: [
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ]
  },
  // 5 O 黄色
  {
    colorType: 5,
    map: [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ]
  },
  // 6 Z 赤
  {
    colorType: 6,
    map: [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ]
  },
  // 7 S 緑
  {
    colorType: 7,
    map: [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0]
    ]
  },
]

/** キャンバス内の色のプロパティ */
const CANVAS_COLORS = [
  /** 空白？ */
  '#000000',
  /** 1 水色(I) */
  '#6CF6CF',
  /** 2 オレンジ(L) */
  '#F92F92',
  /** 3 青(J) */
  '#66F66F',
  /** 4 紫(T) */
  '#C5CC5C',
  /** 5 黄色(O) */
  '#FD2FD2',
  /** 6 赤(Z) */
  '#F44F44',
  /** 7 緑(S) */
  '#5B55B5',
]

/**  */
const KEY_COMMAND = {
  CONTROL: {
    KEY : 'Space',
    JP_LABEL : '開始・終了キー',
    EN_LABEL : 'START/STOP KEY'
  },
  MOVE_LEFT: {
    KEY : 'ArrowLeft',
    JP_LABEL : '左に移動',
    EN_LABEL : 'Left Key'
  },
  MOVE_UP: {
    KEY : 'ArrowUp',
    JP_LABEL : '上に移動',
    EN_LABEL : 'Up Key'
  },
  MOVE_RIGHT: {
    KEY : 'ArrowRight',
    JP_LABEL : '右に移動',
    EN_LABEL : 'Right Key'
  },
  MOVE_DOWN: {
    KEY : 'ArrowDown',
    JP_LABEL : '下に移動',
    EN_LABEL : 'Down Key'
  },
  ROLL_LEFT: {
    KEY : 'KeyA',
    JP_LABEL : '左回転',
    EN_LABEL : 'Roll Left'
  },
  ROLL_RIGHT: {
    KEY : 'KeyD',
    JP_LABEL : '右回転',
    EN_LABEL : 'Roll Right'
  },
  HOLD_TETRO: {
    KEY : 'KeyS',
    JP_LABEL : 'ミノ交換',
    EN_LABEL : 'Hold Tetro Block'
  }
}


/** */
const BACKGROUND_COLOR_TYPE = 0

const CANVAS_FRAME_BORDER_STYLE = '4px solid #555'
const BLOCK_FRAME_BORDER_STYLE = '4px solid black'

const GAME_OVERED_TEXT = 'GAME OVER'
const GAME_OVERED_TEXT_FONT = "40px 'MS　ゴシック'"
const GAME_OVERED_TEXT_FONT_STYLE = 'white'
const GAME_OVERED_TEXT_FONT_DISPLAY = 'block'

const DEADLINE_TEXT = 'DEAD LINE'
const DEADLINE_TEXT_FONT = "15px 'Times'"

// #endregion

/**  */
const tetroSquareLength = TETRO_TYPES[0].map.length

const tetroTypesCount = TETRO_TYPES.filter(t => t.colorType !== BACKGROUND_COLOR_TYPE)

/** メインスクリーンの縦幅・横幅のピクセル数 */
const screenWidthPx = BLOCK_SIZE_PX * FIELD_COL
const screenHeightPx = BLOCK_SIZE_PX * FIELD_ROW

/** 待機ミノを描画するキャンバスの縦幅・横幅のピクセル数 */
const futureScreenHeightPx = FUTURE_BLOCK_SIZE_PX * FUTURE_FIELD_ROW
const futureScreenWidthPx = FUTURE_BLOCK_SIZE_PX * FUTURE_FIELD_COL

/** 手持ちミノを描画するキャンバスの縦幅・横幅のピクセル数 */
const holdingScreenHeightPx = HOLDING_BLOCK_SIZE_PX * HOLDING_FIELD_ROW
const holdingScreenWidthPx = HOLDING_BLOCK_SIZE_PX * HOLDING_FIELD_COL

/** テトリミノのスポーン地点のマス目座標 */
const startX = FIELD_COL / 2 - TETRO_SIZE / 2
const startY = 0


/**  */
const MODE = {
  EXTRA: 0,
  BEFORE_PLAYING: 1,
  PLAYING: 2,
  STOPPING: 3,
  OVERED: 4
}





/** リセットボタンの要素を取得 */
const resetButton = document.getElementById('reset-button')

/** メインキャンバスの要素を取得 */
const mainCanvas = document.getElementById('main-canvas')

/** 呪文(スクリーンとして操作するプロパティを実行。) */
const mainCanvasContext = mainCanvas.getContext('2d')

/** ここから、実際のキャンバスにこちらが設定したキャンバスサイズを適用するプロパティ */
mainCanvas.width = screenWidthPx
mainCanvas.height = screenHeightPx

/** キャンバスの黒い外枠を作成。ゲーム画面をわかりやすくした。 */
mainCanvas.style.border = CANVAS_FRAME_BORDER_STYLE

/** キャンバスの要素を取得 */
const futureBlockCanvas = document.getElementById('future-block-canvas')

const futureBlockCanvasContext = futureBlockCanvas.getContext('2d')
futureBlockCanvas.width = futureScreenWidthPx
futureBlockCanvas.height = futureScreenHeightPx
futureBlockCanvas.style.border = CANVAS_FRAME_BORDER_STYLE


const holdingBlockCanvas = document.getElementById('holding-block-canvas')

const holdingBlockCanvasContext = holdingBlockCanvas.getContext('2d')
holdingBlockCanvas.width = holdingScreenWidthPx
holdingBlockCanvas.height = holdingScreenHeightPx
holdingBlockCanvas.style.border = CANVAS_FRAME_BORDER_STYLE

/** */
const gameOveredTextLength = mainCanvasContext.measureText(GAME_OVERED_TEXT).width
const gameOveredTextWidthPx = screenWidthPx / 2 - gameOveredTextLength / 2
const gameOveredTextHeightPx = screenHeightPx / 2 - 20

const deadLineHeightPx  = BLOCK_SIZE_PX * 3;


/** 現在のゲームの状態を格納しているオブジェクト */
const state = {
  /** ゲームの現在のステータス */
  mode: MODE.BEFORE_PLAYING,
  /** 操作中のミノの情報 */
  currentTetro: {
    /** xとyはリアルタイムのテトリミノの座標。その初期位置としてスポーン地点を設定。 */
    x: startX,
    /** xとyはリアルタイムのテトリミノの座標。その初期位置としてスポーン地点を設定。 */
    y: startY,
    /** TETRO_TYPES の番号 */
    type: 0,
    /** 現在のミノが angle * 90 度回転していることを示す(0~3)。 */
    angle: 0
  },

  /** 現在操作中～待機中のミノタイプの配列（0が操作中） */
  dropTetroTypes: [],

  /** ホールド中のミノの情報 */
  holdingTetroType: 0,

  /** フィールド情報 */
  field: {
    main: [],
    holding: [],
    future: []
  },

  /** ゲームのリザルトを保存する */
  result: {
    /** ラインをいくつ消したかを保存するカウンター */
    line: {
      history: [],
      total: 0,
    },
    count: 0,
    score: 0,
  }
}

//時間でテトリミノを落下させる。"SEED_DROP_SPEED"ミリ秒おきに、dropTetroを一回実行する。
setInterval(dropTetro,SEED_DROP_SPEED)

/** ゲームスタート時に行う処理セット */
function bootGame()
{
  // state の値を初期化
  state.mode = MODE.PLAYING
  initState()

  // フィールド（地形ブロック情報）を初期状態にする
  initField()

  // キャンバスをクリア
  mainCanvasContext.clearRect(0, 0, screenWidthPx, screenHeightPx)

  drawFutureField()
  drawHoldingField()
  drawMainField()
}

/** stateの値をリセットする関数 */
function initState()
{
  state.currentTetro = { height: startX, width: startY, type: 0, angle: 0 }
  state.holdingTetroType = 0
  state.field = { main: [], holding: [], future: [] }
  state.result = { line: { history: [], total: 0 }, count: 0, score: 0 }
}

/**  */
function initField()
{
  // field[]という画面すべてのマス目を表す二次元配列すべての値に背景色を入れている。入れているだけで、描画の処理はこの関数内には一切ない。
  for (let y = 0; y < FIELD_ROW; y++)
  {
    // 1レコードを作成
    state.field.main[y] = [];
    for (let x = 0; x < FIELD_COL; x++)
    {
      state.field.main[y][x] = BACKGROUND_COLOR_TYPE
    }
  }

  //同じく、待機ミノキャンバスを担当する二次元配列のstate.field.futureのすべてに背景色を入れる。
  for(let y = 0; y < FUTURE_FIELD_COL; y++){
    //配列の初期化。多分。
    state.field.future[y] = []
    for(let x = 0; x < FUTURE_FIELD_ROW; x++){
      state.field.future[y][x] = BACKGROUND_COLOR_TYPE
    }
  }
}

/**  */
function drawMainField()
{
  mainCanvasContext.clearRect(0, 0, screenWidthPx, screenHeightPx);
  for (let y = 0; y < FIELD_ROW; y++)
  {
    for (let x = 0; x < FIELD_COL; x++)
    {
        drawBlock(x, y, state.field.main[y][x]);
    }
  }
  for (let y = 0; y < TETRO_SIZE; y++)
  {
    for (let x = 0; x < TETRO_SIZE; x++)
    {
      if (checkBlockExist(x, y, state.dropTetroTypes[0], state.currentTetro.angle))
      {
        drawBlock(state.currentTetro.x + x, state.currentTetro.y + y, state.currentTetro.type)
      }
    }
  }
  if (state.mode === MODE.OVERED)
  {
    // GAME OVER のテキスト表示
    mainCanvasContext.font = GAME_OVERED_TEXT_FONT
    mainCanvasContext.lineWidth = 4
    mainCanvasContext.strokeText(GAME_OVERED_TEXT, gameOveredTextWidthPx, gameOveredTextHeightPx)
    mainCanvasContext.fillStyle = GAME_OVERED_TEXT_FONT_STYLE
    mainCanvasContext.fillText(GAME_OVERED_TEXT, gameOveredTextWidthPx, gameOveredTextHeightPx)
    resetButton.style.display = GAME_OVERED_TEXT_FONT_DISPLAY
  }
  // デッドラインの表示
  mainCanvasContext.font = DEADLINE_TEXT_FONT;
  // let dlw  = mainCanvasContext.measureText(dl).height;
  mainCanvasContext.fillStyle = 'red';
  mainCanvasContext.fillText(DEADLINE_TEXT, 0, deadLineHeightPx);
  mainCanvasContext.fillRect(0, BLOCK_SIZE_PX * 5 / 2, screenWidthPx, 3);
}


/**
 * メインキャンバスのブロック一つの描画
 * 
 * @param {number} x 描画するブロックのマス目X座標
 * @param {number} y 描画するブロックのマス目Y座標
 * @param {number} colorType 描画する色ID
 */
function drawBlock(x, y, colorType)
{
  let xPx = x * BLOCK_SIZE_PX
  let yPx = y * BLOCK_SIZE_PX
  
  mainCanvasContext.fillStyle   = TETRO_COLORS[colorType]
  mainCanvasContext.fillRect(xPx, yPx, BLOCK_SIZE_PX, BLOCK_SIZE_PX)
  mainCanvasContext.strokeStyle = BLOCK_FRAME_BORDER_STYLE
  mainCanvasContext.strokeRect(xPx, yPx, BLOCK_SIZE_PX, BLOCK_SIZE_PX)
}

/**
 * 待機ミノキャンバスのブロック一つの描画
 * 
 * @param {number} x 描画するブロックのマス目X座標
 * @param {number} y 描画するブロックのマス目Y座標
 * @param {number} colorType 描画する色ID
 */
function drawFutureBlock(x, y, colorType)
{
  let xPx = x * FUTURE_BLOCK_SIZE_PX
  let yPx = y * FUTURE_BLOCK_SIZE_PX
  
  futureBlockCanvasContext.fillStyle   = TETRO_COLORS[colorType]
  futureBlockCanvasContext.fillRect(xPx, yPx, FUTURE_BLOCK_SIZE_PX, FUTURE_BLOCK_SIZE_PX)
  futureBlockCanvasContext.strokeStyle = BLOCK_FRAME_BORDER_STYLE
  futureBlockCanvasContext.strokeRect(xPx, yPx, FUTURE_BLOCK_SIZE_PX, FUTURE_BLOCK_SIZE_PX)
}

/**
 * 手持ちミノキャンバスのブロック一つの描画
 * 
 * @param {number} x 描画するブロックのマス目X座標
 * @param {number} y 描画するブロックのマス目Y座標
 * @param {number} colorType 描画する色ID
 */
function drawHoldingBlock(x, y, colorType)
{
  let xPx = x * HOLDING_BLOCK_SIZE_PX
  let yPx = y * HOLDING_BLOCK_SIZE_PX
  
  holdingBlockCanvasContext.fillStyle   = TETRO_COLORS[colorType]
  holdingBlockCanvasContext.fillRect(xPx, yPx, HOLDING_BLOCK_SIZE_PX, HOLDING_BLOCK_SIZE_PX)
  holdingBlockCanvasContext.strokeStyle = BLOCK_FRAME_BORDER_STYLE
  holdingBlockCanvasContext.strokeRect(xPx, yPx, HOLDING_BLOCK_SIZE_PX, HOLDING_BLOCK_SIZE_PX)
}

/**
 * ミノを描画する際に、現在操作中のミノの、4*4の正方形を模した二次元配列の中の座標(引数y,x)はブロックを描画するのかどうかを判定する
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} tetroType
 * @param {number} angle
 */
function checkBlockExist(x, y, tetroType, angle = 0)
{
  let rolledX, rolledY
  switch (state.currentTetro.angle)
  {
    case 0:
      rolledX = x
      rolledY = y
      break
    case 1:
      rolledX = y
      rolledY = tetroSquareLength - (x + 1)
      break
    case 2:
      rolledX = tetroSquareLength - (x + 1)
      rolledY = tetroSquareLength - (y + 1)
      break
    case 3:
      rolledX = tetroSquareLength - (y + 1)
      rolledY = x
      break
    default:
      return BACKGROUND_COLOR_TYPE
  }
  return TETRO_TYPES[state.currentTetro.type][rolledY][rolledX] !== 0
}

/** 待機ミノを表示するサブキャンバスの描画。メインキャンバスでは分けてあるdrawBlock()とdrawAll()を包括している。*/
function drawFutureField()
{
  futureBlockCanvasContext.clearRect(0, 0, futureScreenWidthPx, futureScreenHeightPx)

  // 何らかの理由で待機テトロミノの数が少ない場合は、足りない分を再抽選して補う
  let tetroType
  while (state.dropTetroTypes.length < FUTURE_TETRO_COUNT) {
    tetroType = Math.floor(Math.random()*(tetroTypesCount))+1
    state.dropTetroTypes.push(tetroType)
  }

  let tetroType;
  for (let y = 0; y < FUTURE_FIELD_ROW; y++) {
    // 上から（直近のテトリミノから）描画していく
    tetroType = state.dropTetroTypes[(Math.floor(y / TETRO_SIZE) + 1)]

    for (let x = 0; x < FUTURE_FIELD_COL; x++) {
      if (checkBlockExist((x % TETRO_SIZE), (y % TETRO_SIZE), tetroType)) {
        drawFutureBlock(x, y, TETRO_TYPES[tetroType].colorType)
      }
    }
  }

  // 次に落ちるブロックの強調表示
  let s    = "NEXT";
  futureBlockCanvasContext.font = "18px 'Arial'";
  let w    = futureBlockCanvasContext.measureText(s).width;
  let x    = futureScreenWidthPx/2 - w/2;
  let y    = FUTURE_BLOCK_SIZE_PX*15/4;
  futureBlockCanvasContext.fillStyle = "black";
  futureBlockCanvasContext.fillText(s,x,y);
  futureBlockCanvasContext.strokeStyle = "red";        //次のミノを赤枠で強調表示
  futureBlockCanvasContext.strokeRect(3, 3, FUTURE_BLOCK_SIZE_PX*4-6,FUTURE_BLOCK_SIZE_PX*4-6);
}

/**  */
function drawHoldingField(){
  holdingBlockCanvasContext.clearRect(0, 0, holdingScreenWidthPx, holdingScreenHeightPx)

  if (state.holdingTetroType === 0) return

  for (let y = 0; y < HOLDING_FIELD_ROW; y++) {
    for (let x = 0; x < HOLDING_FIELD_COL; x++) {
      if (checkBlockExist((x % TETRO_SIZE), (y % TETRO_SIZE), state.holdingTetroType)) {
        drawHoldingBlock(x, y, state.holdingTetroType)
      }
    }
  }

  let s    = 'HOLDING'
  holdingBlockCanvasContext.font = "180px 'Arial'"
  // let w    = holdingBlockCanvasContext.measureText(s).width;
  // let x    = SbScn_W/2 - w/2;
  // let y    = BLOCK_SIZE_PX*3/4;
  holdingBlockCanvasContext.fillStyle = 'black'
  holdingBlockCanvasContext.fillText(s, 10, 10)
}

/** 現在操作中のテトロミノとホールドテトロミノを交換する関数 */
function exchangeHoldingTetro() {
  // ホールドミノブロックのタイプが0以外の場合、ホールドミノが存在すると判定し、交換処理を行う
  const holdingTetroType = state.holdingTetroType
  if (holdingTetroType !== 0) {
    state.holdingTetroType = state.dropTetroTypes[0]
    state.dropTetroTypes[0] = holdingTetroType
  }else{
    state.currentTetro = { height: startX, width: startY, type: 0, angle: 0 }
    state.holdingTetroType = state.dropTetroTypes[0]

    state.dropTetroTypes.shift()
    drawFutureField()
  }
  drawHoldingField()
}

function checkMove(mx, my, ntetro) {
  if(ntetro === undefined){ntetro = tetro}
  for(let y=0; y<TETRO_SIZE; y++){
    for(let x=0; x<TETRO_SIZE; x++){
      if(ntetro[y][x]){
        let nx = currentTetroHeightPx + mx + x;
        let ny = tetroY + my + y;
        if(ny < 0 || nx < 0 ||
          ny >= FIELD_ROW ||
          nx >= FIELD_COL ||
          field[ny][nx] != 0 ){
            return false;
          }
        }
      }
    }
  return true;
}

// テトロ右回転
function rotateRight(){
  let ntetro = [];
  for(let y=0; y<TETRO_SIZE; y++){
    ntetro[y] = [];
    for(let x=0; x<TETRO_SIZE; x++){
      ntetro[y][x] = tetro[TETRO_SIZE-x-1][y];
    }
  }
  return ntetro;
}

// function rotateLeft(){
  //   let otetro = [];
  //   for(let y=0; y<TETRO_SIZE; y++){
    //     otetro[y] = [];
    //     for(let x=0; x<TETRO_SIZE; x++){
      //       otetro[y][x] = tetro[x][TETRO_SIZE-y-1];
//     }
//   }
//   return otetro;
// }

function fixTetro(){
  for(let y=0; y<TETRO_SIZE; y++){
    for(let x=0; x<TETRO_SIZE; x++){
      if(tetro[y][x] === 1){
        field[tetroY + y][currentTetroHeightPx + x] = MTline[0];
      }
    }
  }
}

function checkLine(){
  for(let y=0; y<FIELD_ROW; y++){
    let flag = true;
    for(let x=0; x<FIELD_COL; x++){
      if(!field[y][x]){
        flag = false
        break
      }
    }
    if(flag){
      state.result.line.total += 1

      for(let ny = y; ny > 0; ny--){
        for(let nx=0; nx < FIELD_COL; nx++){
          field[ny][nx] = field[ny-1][nx];
        }
      }
    }
  }
  state.result.score += 1
}

function checkAlive(){
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < FIELD_COL; x++) {
      if(state.field.main[y][x] != 0) state.mode = MODE.OVERED
    }
  }
}

/** テトリミノを一段下げる処理を行う関数。 */
function dropTetro()
{
  // プレイ中以外の時（一時停止中orゲームオーバー）、関数の処理をこれ以上行わずに終了する。
  if (state.mode !== MODE.PLAYING) return
  if(checkMove(0,1))tetroY++;
  else{
    fixTetro();
    checkLine();
    drawNxt();
    checkAlive();
    currentTetroHeightPx   = startY;
    tetroY   = startY;
    
    // if(!checkMove(0,0)){
    //   status = "over";
    // }
  }
  drawAll();
}

document.onkeydown = e => {

  if (state.mode === MODE.OVERED) return
  // Youtube通りにkeycodeを使うと、VSCodeなどなら中線が引かれ、カーソルを合わせると「非推奨」と出てくる。keycodeよりもkeyかcodeプロパティを使うほうが確実なようだ。keyプロパティは、大文字・小文字の区別などをされる。
  switch (e.code)
  {
    // space key Start and Stop
    case KEY_COMMAND.CONTROL.KEY:
      switch (state.mode) {
        case MODE.BEFORE_PLAYING :
          bootGame()
          break
        case MODE.PLAYING :
          state.mode = MODE.STOPPING
          let s = "STOPPING NOW"
          mainCanvasContext.font = "30px 'MS　ゴシック'"
          let w = mainCanvasContext.measureText(s).width
          let x = SCREEN_W/2 - w/2
          let y = SCREEN_H/2 - 15
          mainCanvasContext.strokeText(s, x, y)
          mainCanvasContext.fillStyle = "blue"
          mainCanvasContext.fillText(s, x, y)
          break
        case MODE.STOPPING :
          state.mode = MODE.PLAYING
          mainCanvasContext.clearRect(0,0,SCREEN_W,SCREEN_H)
          drawAll()
          break
        default : break
      }
      break
    // Left Key
    case KEY_COMMAND.MOVE_LEFT.KEY:
      if (state.mode !== MODE.PLAYING) break
      if (checkMove(-1,0)) currentTetroHeightPx--
      drawAll()
      break
    // up key
    case KEY_COMMAND.MOVE_UP.KEY:
      if (state.mode !== MODE.PLAYING) break
      while (checkMove(0,1)) tetroY++
      drawAll()
      break
    // right key
    case KEY_COMMAND.MOVE_RIGHT.KEY:
      if (state.mode !== MODE.PLAYING) break
      if (checkMove(1,0)) currentTetroHeightPx++
      drawAll()
      break
    // down key
    case KEY_COMMAND.MOVE_DOWN.KEY:
      if (state.mode !== MODE.PLAYING) break
      // while文は、いけるとこまで行くってイメージ。条件が満たされる限り繰り返し処理。
      if (checkMove(0,1)) tetroY++
      drawAll()
      break
    // "a" key(rolling left)
    case KEY_COMMAND.ROLL_LEFT.KEY:
      if (state.mode !== MODE.PLAYING) break
      let otetro
      // otero = rotateLeft();
      for(i=1;i<=3;i++){
        otetro = rotateRight()
      }
      if(checkMove(0,0,otetro)){tetro = otetro}
      drawAll()
      break
    // "d" key(rolling right)
    case KEY_COMMAND.ROLL_RIGHT.KEY:
      if (state.mode !== MODE.PLAYING) break
      let ntetro = rotateRight()
      // 回転後の形が他のブロックと重ならないとき、テトリミノを回転後の形に置き換える。
      if (checkMove(0,0,ntetro)) tetro = ntetro
      drawAll()
      break
    // "s" key(mino hold)
    case KEY_COMMAND.HOLD_TETRO.KEY:
      if (state.mode !== MODE.PLAYING) break
      if(!checkMove(0, 0, hldtetro)) break
      exChange()
      drawAll()
      drawHld()
      break
    default : break
  }
}