'use strict';//宣言ミスを表示
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
 /**
     * 指定した要素の子供を全て削除
     * @param {HTMLElement} element HTMLの要素
     */
    function removeAllChildren(element){
    while(element.firstChild){//子供の要素がある限り除去、複数クリックに備え
    　element.removeChild(element.firstChild);
     }
    }
assessmentButton.onclick = function(){
    /*アロー関数
    assessment.Button.onclick = () => {};でもかける*/
    const userName = userNameInput.value;//要素の受け取り
   if (userName.length === 0){
       return;//ガード句処理終了
   }
    console.log(userName);
    //Enterでも診断
userNameInput.onkeydown = (event) => {
    if(event.key === 'Enter'){
        assessmentButton.onclick();
    }
};
    //診断結果表示エリアの作成
   removeAllChildren(resultDivided);
   const header = document.createElement('h3');
    header.innerText = '診断結果';//h3tagの中身
    resultDivided.appendChild(header);

   const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    /*<div id='result-area'>
        <h3>診断結果<h3>
        <p>〇〇のいいところは~</p>
      </div>という構造*/
    
    //tweetエリアの作成
    removeAllChildren(tweetDivided);
   const anchor = document.createElement('a');
   const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + 
   encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
   anchor.setAttribute('href',hrefValue);
   anchor.className = 'twitter-hashtag-button';
   anchor.setAttribute('data-text','result');
   anchor.innerText = 'Tweet #あなたのいいところ';
   tweetDivided.appendChild(anchor);
   
   //widgets.jsの設定-twitterLikeに
   const script =document.createElement('script');
   script.setAttribute('src','https://platform.twitter.com/widgets.js');
   tweetDivided.appendChild(script);
   
   
    

    //TODO ツイートエリアの作成
};



const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
'{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName userの名前
 * @return {string} 診断結果
 */

function assessment(userName){
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode =0;
    for(let i=0; i< userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    //文字コードの番号の合計を解凍の数で割って添え字を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    //userName の置き換え
    result = result.replace(/\{userName\}/g,userName);
    return result;
}

console.log(assessment('guru'));
console.log(assessment('guruguru'));
console.log(assessment('guru'));
console.assert(assessment('guru')===assessment('guru'),'入力が同じ名前なら、同じ診断結果を出力する処理に誤り');
