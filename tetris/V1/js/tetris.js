//  YouTube-Akichonプログラミング講座-テトリスを作る
const btnrld     = document.getElementById('rldbtn');
const DrpSpd     = 300; //テトリミノの落下速度
const FIELD_COL  = 10;  //ステージ（フィールド）全体の横のマス目の数
const FIELD_ROW  = 23;  //ステージ（フィールド）全体の縦のマス目の数
const BLOCK_SIZE = 30;  //ブロック一つの大きさ(ピクセル)
const TETRO_SIZE = 4;   //テトリミノのサイズ？？
const SCREEN_W   = BLOCK_SIZE * FIELD_COL;  //フィールド（スクリーン）全体の横のピクセル数
const SCREEN_H   = BLOCK_SIZE * FIELD_ROW;  //フィールド（スクリーン）全体の縦のピクセル数
const SbScn_W    = BLOCK_SIZE * 4;          //サブスクリーン(次のミノと手持ちミノ)の横のピクセル数
const SbScn_NH   = BLOCK_SIZE * 4 * 4;
const SbScn_HH   = BLOCK_SIZE * 4;
const START_X    = FIELD_COL / 2 - TETRO_SIZE / 2;     //START_Yと合わせて、テトリミノのスポーン地点。
const START_Y    = 0;
let tetroX       = START_X;                               //tetroXとtetroYはリアルタイムのテトリミノの座標。その初期位置<br>
let tetroY       = START_Y;                               //としてスポーン地点を設定。(tetroX = tetro_x, tetroY = tetro_Y)

let can          = document.getElementById("can");  //HTMLファイルからキャンバスの存在を取得。
let con          = can.getContext("2d");            //そしてこれで、スクリーンとして操作するプロパティを実行。
can.width        = SCREEN_W;                        //ここから、実際のキャンバスにこちらが設定した<br>
can.height       = SCREEN_H;                        //キャンバスサイズを適用するプロパティ。
can.style.border ="4px solid #555";                 //キャンバスの黒い外枠を作成。ゲーム画面をわかりやすくした。

let lines   = 0;     //ラインをいくつ消したかを保存するカウンター。
let nxt          = document.getElementById("nxt");
let NXT          = nxt.getContext("2d");
nxt.width        = SbScn_W;
nxt.height       = SbScn_NH;
nxt.style.border = "4px solid #555";
let hld          = document.getElementById("hld");
let HLD          = hld.getContext("2d");
hld.width        = SbScn_W;
hld.height       = SbScn_HH;
hld.style.border = "4px solid #555";
let sbd          = document.getElementById("scrbrd");
let SBD          = sbd.getContext("2d");
sbd.width        = SbScn_W;
sbd.height       = SbScn_HH;
sbd.style.border = "4px double green";

SBD.font         = "30px 'Arial'";
let srw          = SBD.measureText("SCORE").width;
let srx          = SbScn_W/2 - srw/2;
let sry          = SbScn_HH/2 - 20;
SBD.fillStyle    = "black";
SBD.fillText("SCORE",srx,sry);
SBD.fillText("0",SbScn_W/2,SbScn_HH*3/4);


const TETRO_COLORS = [
  "#000", //0空白　　　　これらは1次元配列で、
  "#6CF", //1水色　　　　0から番号が振られている。
  "#F92", //2オレンジ　　TETRO_TYPESの番号と
  "#66F", //3青　　　　　紐づけることで同じ形の
  "#C5C", //4紫　　　　　テトリミノは同じ色になる。
  "#FD2", //5黄色
  "#F44", //6赤
  "#5B5", //7緑
];

const TETRO_TYPES  = [
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],                     //0 null
  [                       //1 I　1次元配列を重ねた2次元配列を連ねた3次元配列である。1つ1つにテトリミノの形が保存されており、番号で呼び出して描画する。
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [                       //2 L
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  [                       //3 J
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  [                       //4 T
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
  ],
  [                       //5 O
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  [                       //6 Z
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  [                       //7 S
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0]
  ]
];    //テトリミノの形ｘ7種類

let field   = [];    //二次元の座標を保存する、つまり2個の数値を格納するが、その中まで変数定義すると書き換えが難しいので、角かっこ1つで宣言している
let visual  = [];
let nxtarea = [];
let status  = "pre";
let score   = 0;     //スコアを保存する変数。

let MTline = [0,0,0,0,0];    //落下中のミノ[0]と待機中のミノ[1]~[4]の番号を入れる変数配列。
//MTline[0] = tetro_t
let tetro;         //TETRO_TYPEから指定された番号のテトロミノの2次元配列を取り出し、保存する変数。
//テトロミノの番号(形)を抽選している。0を除外した1~7にするため、1を引いて0~6から抽選してから1を足している。
tetro        = TETRO_TYPES[MTline[0]];  //ここに書かれたテトロミノの呼び出しは初回のみに使われる。2回目以降は、dropTetro()内の抽選に従うことになる。
let TminoHld = 0;  //ホールド中のテトロミノの番号を入れる変数
let hldtetro = TETRO_TYPES[TminoHld];

setInterval(dropTetro,DrpSpd);  //時間でテトリミノを落下させる。"DrpSpd"ミリ秒おきに、dropTetroを一回実行する。

function gStrt(){
  status = "gaming";
  con.clearRect(0,0,SCREEN_W,SCREEN_H);
  field = [];
  lines = 0;                //ラインをいくつ消したかを保存するカウンター。
  score = 0;
  init();                   //フィールド全体のマス目を作成する。たぶん。
  
  for(i=0;i<=4;i++){        //現在ミノから待機ミノ番号までのすべてを抽選する。
    MTline[i] = Math.floor(Math.random()*(TETRO_TYPES.length-1))+1;
  }
  tetro = TETRO_TYPES[MTline[0]];

  drawNxt();
  
  drawHld();
  // dropTetro();
  drawAll();
}

function init(){
  for(let y=0; y<FIELD_ROW; y++){   // field[]という画面すべてのマス目を表す二次元配列すべての値に0を入れている。入れているだけで、描画の処理はこの関数内には一切ない。
    field[y] = [];                  //配列の初期化。多分。
    for(let x=0; x<FIELD_COL; x++){
      field[y][x] = 0;
    }
  }
  for(let y=0; y<4; y++){           //同じく、待機ミノキャンバスを担当する二次元配列のnxtarea[]のすべてに0を入れる。
    nxtarea[y] = [];                //配列の初期化。多分。
    for(let x=0; x<SbScn_W; x++){
      nxtarea[y][x] = 0;
    }
  }

  // status = false;         //この処理を一回実行した時点でゲームスタートされているので、ゲーム中にスタート処理を実行しないようにするための判別を行う。そのために必要な変数。
  // field[5][8] = 1;    //フィールドが描画できているかチェックするための開発用お邪魔ブロック
  // field[19][9] = 1;
}

function drawBlock(x,y,c){    //ブロック一つの描画
  let px = x * BLOCK_SIZE;
  let py = y * BLOCK_SIZE;
  
  con.fillStyle   = TETRO_COLORS[c];
  con.fillRect(px,py,BLOCK_SIZE,BLOCK_SIZE);
  con.strokeStyle = "4px solid black";
  con.strokeRect(px,py,BLOCK_SIZE,BLOCK_SIZE);
}

function drawAll(){
  con.clearRect(0,0,SCREEN_W,SCREEN_H);
  for(let y=0; y<FIELD_ROW; y++){
    for(let x=0; x<FIELD_COL; x++){
      if(field[y][x] != 0){
        drawBlock(x,y, field[y][x]);
      }
    }
  }
  for(let y=0; y<TETRO_SIZE; y++){
    for(let x=0; x<TETRO_SIZE; x++){
      if(tetro[y][x] != 0){
        drawBlock(tetroX + x,tetroY + y, MTline[0]);
      }
    }
  }
  if(status === "over"){
    let s    = "GAME OVER";
    con.font = "40px 'MS　ゴシック'";
    let w    = con.measureText(s).width;
    let x    = SCREEN_W/2 - w/2;
    let y    = SCREEN_H/2 - 20;
    con.lineWidth = 4;
    con.strokeText(s,x,y);
    con.fillStyle = "white";  
    con.fillText(s,x,y);
    btnrld.style.display = 'block';
  }
  let dl   = "DEAD LINE";
  con.font = "15px 'Times'";
  // let dlw  = con.measureText(dl).height;
  let dly  = BLOCK_SIZE*3;
  con.fillStyle = "red";
  con.fillText(dl,0,dly);
  con.fillRect(0,BLOCK_SIZE*5/2,SCREEN_W,3);
  
}

function drawNxt(){     //待機ミノを表示するサブキャンバスの描画。メインキャンバスでは分けてあるdrawBlock()とdrawAll()を包括している。
  NXT.clearRect(0,0,SbScn_W,SbScn_NH);

  MTline[0] = MTline[1];
  MTline[1] = MTline[2];
  MTline[2] = MTline[3];
  MTline[3] = MTline[4];
  MTline[4] = Math.floor(Math.random()*(TETRO_TYPES.length-1))+1;
  tetro = TETRO_TYPES[MTline[0]];

  for(i=1;i<=4;i++){
    let nbr = i;
    let nxtetro  = TETRO_TYPES[MTline[nbr]];
    for(let y=0; y<TETRO_SIZE; y++){
      for(let x=0; x<TETRO_SIZE; x++){
        if(nxtetro[y][x] === 1){
        
        let px = x * BLOCK_SIZE;
        let py = y * BLOCK_SIZE + (nbr-1) * BLOCK_SIZE * 4;
        
        NXT.fillStyle   = TETRO_COLORS[MTline[nbr]];
        NXT.fillRect(px,py,BLOCK_SIZE,BLOCK_SIZE);
        NXT.strokeStyle = "black";
        NXT.strokeRect(px,py,BLOCK_SIZE,BLOCK_SIZE);
        }
      } 
    }
  }
  let s    = "NEXT";
  NXT.font = "18px 'Arial'";
  let w    = NXT.measureText(s).width;
  let x    = SbScn_W/2 - w/2;
  let y    = BLOCK_SIZE*15/4;
  NXT.fillStyle = "black";
  NXT.fillText(s,x,y);
  NXT.strokeStyle = "red";        //次のミノを赤枠で強調表示
  NXT.strokeRect(3,3,BLOCK_SIZE*4-6,BLOCK_SIZE*4-6);
}

function drawHld(){
  HLD.clearRect(0,0,SbScn_W,SbScn_HH);
  for(let y=0; y<SbScn_HH; y++){
    for(let x=0; x<SbScn_W; x++){
      if(hldtetro[y][x] != 0){
        
        let px = x * BLOCK_SIZE;
        let py = y * BLOCK_SIZE;
        
        HLD.fillStyle   = TETRO_COLORS[TminoHld];
        HLD.fillRect(px,py,BLOCK_SIZE,BLOCK_SIZE);
        HLD.strokeStyle = "black";
        HLD.strokeRect(px,py,BLOCK_SIZE,BLOCK_SIZE);
        // drawBlock(tetroX + x,tetroY + y, MTline[0]);
      }
    }
  }
}
function exChange(){
  const box = MTline[0];
  if(TminoHld===0){
    tetroX    = START_X;
    tetroY    = START_Y;
    TminoHld  = box;
    hldtetro  = TETRO_TYPES[TminoHld];
    tetro     = TETRO_TYPES[MTline[0]];
    drawNxt();
  }else{
    MTline[0] = TminoHld;
    TminoHld  = box;
    hldtetro  = TETRO_TYPES[TminoHld];
    tetro     = TETRO_TYPES[MTline[0]];
  }
  let s    = "HOLDING";
  HLD.font = "180px 'Arial'";
  // let w    = HLD.measureText(s).width;
  // let x    = SbScn_W/2 - w/2;
  // let y    = BLOCK_SIZE*3/4;
  HLD.fillStyle = "black";
  HLD.fillText(s,10,10);
}
function checkMove( mx, my, ntetro){
  if(ntetro === undefined){ntetro = tetro}
  for(let y=0; y<TETRO_SIZE; y++){
    for(let x=0; x<TETRO_SIZE; x++){
      if(ntetro[y][x]){
        let nx = tetroX + mx + x;
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
        field[tetroY + y][tetroX + x] = MTline[0];
      }
    }
  }
}

function checkLine(){
  let linec = 0;
  for(let y=0; y<FIELD_ROW; y++){
    let flag = true;
    for(let x=0; x<FIELD_COL; x++){
      if(!field[y][x]){
        flag = false;
        break;
      }
    }
    if(flag){
      linec++;
      lines++;
      SBD.clearRect(0,SbScn_HH/2,SbScn_W,SbScn_HH);
      SBD.fillText(lines,SbScn_W/2,SbScn_HH*3/4);

      for(let ny = y; ny>0; ny--){
        for(let nx=0; nx<FIELD_COL; nx++){
          field[ny][nx] = field[ny-1][nx];
        }
      }
    }
  }
  score++;
}
function checkAlive(){
  for(let y=0; y<3; y++){
    for(let x=0; x<FIELD_COL; x++){
      if(field[y][x] != 0){status = "over";}
    }
  }
}
function dropTetro(){             //テトリミノを一段下げる処理を行う関数。
  if(status !="gaming")return;    //プレイ中以外の時（一時停止中orゲームオーバー）、関数の処理をこれ以上行わずに終了する。
  if(checkMove(0,1))tetroY++;
  else{
    fixTetro();
    checkLine();
    drawNxt();
    checkAlive();
    tetroX   = START_X;
    tetroY   = START_Y;
    
    // if(!checkMove(0,0)){
    //   status = "over";
    // }
  }
  drawAll();
}

document.onkeydown = function(e){

  if(status === "over")return;
  // console.log(e.code);
  switch(e.code){      // Youtube通りにkeycodeを使うと、VSCodeなどなら中線が引かれ、カーソルを合わせると「非推奨」と出てくるだろう。keycodeよりもkeyかcodeプロパティを使うほうが確実なようだ。keyプロパティは、大文字・小文字の区別などをされる。
    case 'Space':    //space key Start and Stop
      if(status==="pre"){
        gStrt();
        break;      //breakに到達すると、、分岐処理の終了地点までジャンプする。（「ここ！」まで）
      }else if(status==="gaming"){
        status   = "stopping";
        let s    = "STOPPING NOW"
        con.font = "30px 'MS　ゴシック'";
        let w    = con.measureText(s).width;
        let x    = SCREEN_W/2 - w/2;
        let y    = SCREEN_H/2 - 15;
        con.strokeText(s,x,y);
        con.fillStyle = "blue";
        con.fillText(s,x,y);
        break;
      }else if(status==="stopping"){
      status = "gaming";
      con.clearRect(0,0,SCREEN_W,SCREEN_H);
      drawAll();
      break;
      }else{break;}
    case 'ArrowLeft':    //left key
      if(status != "gaming")break;
      if(checkMove(-1,0)){tetroX--};
      drawAll();
      break;
    case 'ArrowUp':    //up key
    if(status != "gaming")break;
      while(checkMove(0,1)){tetroY++};
      drawAll();
      break;
    case 'ArrowRight':    //right key
      if(status != "gaming")break;
      if(checkMove(1,0)){tetroX++};
      drawAll();
      break;
    case 'ArrowDown':    //down key
      if(status != "gaming")break;
      if(checkMove(0,1)){tetroY++}; //while文は、いけるとこまで行くってイメージ。条件が満たされる限り繰り返し処理。
      drawAll();
      break;
    case 'KeyA':    //"a"key(rolling left)
      if(status != "gaming")break;
      let otetro;
      // otero = rotateLeft();
      for(i=1;i<=3;i++){
        otetro = rotateRight();
      }
      if(checkMove(0,0,otetro)){tetro = otetro}
      drawAll();
      break;
    case 'KeyD':    //"d" key(rolling right)
      if(status != "gaming")break;
      let ntetro = rotateRight();
      if(checkMove(0,0,ntetro)){tetro = ntetro} //回転後の形が他のブロックと重ならないとき、テトリミノを回転後の形に置き換える。
      drawAll();
      break;
    case 'KeyS':    //"s" key(mino hold)
      if(status != "gaming")break;
      if(!checkMove(0,0,hldtetro)){break;};
      exChange();
      drawAll();
      drawHld();
      break;
  }   //ここ！
}