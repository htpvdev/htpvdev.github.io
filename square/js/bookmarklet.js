var squareAnswer=function(squareOrigin){
if(isNaN(Number(squareOrigin)))return '整数以外の文字列が入力されました。';
if(Number(squareOrigin)===0)return '0の二乗根は0です';
let square=Math.abs(squareOrigin);
const splitObj={};
for(i=2;i>0;i++){
if(i>square){
if(square!==1)splitObj[square]++;
break;
}else if(square%i===0){
square=square/i;
if(typeof splitObj[i]!=='undefined'){
splitObj[i]++;
}else{
splitObj[i]=1;
}
i=1;
}
}
let route=1;
let muriNumber=1;
for(const splittedNumber in splitObj){
route*=(splittedNumber**(Math.floor(splitObj[splittedNumber]/2)));
if(splitObj[splittedNumber]%2===1)muriNumber*=splittedNumber;
}
const resultRoute=(route===1?'':String(route))+(Number(squareOrigin)<0?'i':'')+(muriNumber===1?'':'ルート'+muriNumber);
return ` [ ${squareOrigin} ] の2乗根は [ ${resultRoute} ] です。`;
};
var inputNumber=prompt('2乗根を求めます。値を入力してください。');
if(inputNumber !== null)alert(squareAnswer(inputNumber));
