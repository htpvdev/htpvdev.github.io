const squareAnswer = squareOrigin => {

  // 数値ではない場合は終了
  if (isNaN(Number(squareOrigin))) return '整数以外の文字列が入力されました。';

  // 0 だったら0を表示して終了
  if (Number(squareOrigin) === 0) return '0の二乗根は0です';

  // 変数 square に引数 squareOrigin の絶対値を代入
  let square = Math.abs(squareOrigin);

  // 素因数分解の要素を格納するオブジェクト splitObj を定義
  const splitObj = {};

  // 素因数分解
  for(i = 2; i > 0 ; i ++) {

    if(i > square) {
      // 変数 square を割り切ってこれ以上分割できなくなったら終了
      if (square !== 1) splitObj[square] ++;
      break;

    } else if (square % i === 0) {
      // square を i であまりなく割り切れる場合、i で square を割って、割った数 i の数を splitObj のインデックス値: i に格納
      square = square / i;

      // i が1つも格納されていなければ新たに i という名前でインデックス値を作成し、存在すれば i の値を+1する。
      if (typeof splitObj[i] === 'undefined') {
        splitObj[i] = 1;
      } else {
        splitObj[i] ++;
      }

      // i の値をリセットして 2 から探索しなおす
      i = 1;
    }
  }

  // 解の数字となる変数 route を定義。平方根が整数になり切れない場合の、ルートの中身(無理数)となる muriNumber を定義。
  let route = 1;
  let muriNumber = 1;

  // 素因数分解した要素が格納されたオブジェクト splitObj をループし、(素因数) ** (素因数のペアの数) をする。（ペアということは"a * a"ということになり、平方根がaとなるから）。そしてペアからあぶれた素因数はすべてルートの中身となるので、変数 muriNumber に掛けていく。
  for (const splittedNumber in splitObj) {
    // route に、splittedNumber(素因数) ** (splittedNumberのペアの数) の結果を掛ける。
    route *= ( splittedNumber ** (Math.floor(splitObj[splittedNumber] / 2)) );
    // splittedNumber の数が奇数だった場合は、必ず一つだけ splittedNumber があぶれるので、それを muriNumber に掛けていく
    if (splitObj[splittedNumber] % 2 === 1) muriNumber *= splittedNumber;
  }

  // 解を文字列で表記
  const resultRoute =
    ( route === 1              ? ''  : String(route)        ) +
    ( Number(squareOrigin) < 0 ? 'i' : ''                   ) +
    ( muriNumber === 1         ? ''  : 'ルート' + muriNumber );

  // 解答の文字列を return して終了
  return ` [ ${squareOrigin} ] の2乗根は [ ${resultRoute} ] です。`;

};

const squareAnswerBoot = () => {
  const inputNumber = prompt('2乗根を求めます。値を入力してください。');
  if (inputNumber !== null) alert(squareAnswer(inputNumber));
}

