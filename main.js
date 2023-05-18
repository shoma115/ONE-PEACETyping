class Monster {
    constructor(img, hp) {
        this.img = img;
        this.hp = hp;
    };
}

// モンスターの画像
const monsterImg = [
    'images/monster0.png',
    'images/monster1.png',
    'images/final_monster.png',
    'images/monster3.png',
    'images/monster4.png',
    'images/uraura_monster.png',
    'images/nekoneko.png',
    'images/oyabun.png',
    'images/bigboss.png',
    'images/kurohige.png',
    'images/last_boss.png',

]

// モンスターのHP
const monsterHp = [
    10, 20, 50, 50, 60, 80, 80, 90, 150, 110, 200
]





// 複数のテキストを格納
const textList = [
   'kaizokuouniorehanaru!!','syousyadakegaseigida!','hitonoyumehaowaranele!!!',
   'warehakaminari', 'urusele!ikou!', 'orehayamida!','orehasirohigeda!!','kanarazuanikisukuttekoiyala~~!!!',
   'reiwoiuorehamadamadatuyokunareru', 'konoorewokoetemiyo!roronoa!','makeinuhaseigiwokatarenele',
   'orenohaikani...tinnpirahairanelenndakozuodomo...!!','itimonnittoudeugoityainelenndayononakaha!',
   'aisitekurete...arigatou!!!','o-na-zehu...!!!nagaiaida...!!!kusoosewaninarimasita!!!',
   'mouitido...!!!orewonakamaniiretekurele!!!!'
];

const dialogue = [
    '海賊王に俺はなる!!','勝者だけが正義だ!','人の夢は、終わらねぇ!!!','われは神なり','うるせぇ!行こう!',
    'おれは闇だ!','おれは白ひげだ!!','必ずアニキ救ってこいやァ～～!!!','礼を言う。俺はまだまだ強くなれる',
    'この俺を超えてみよ!ロロノア!','負け犬は正義を語れねぇ','俺の配下に...チンピラは要らねぇんだ小僧ども...!!',
    '一問一答で動いちゃいねぇんだ世の中は!','愛してくれて...ありがとう!!!','オーナーゼフ...!!!長い間...!!!クソお世話になりました!!!',
    'もう一度...!!!おれを仲間に入れてくれぇ!!!!',

]

// 画面に表示する文字列を入れる変数を準備
let untyped = '';
let typed = '';
let score = 0;
// モンスターを生み出すために使う番号
let i = 0;
// モンスターのHP
let hitPoint = monsterHp[i];

// 定数を宣言し、そこにid untypeのHTML要素をぶち込む
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
// const img = document.getElementById('image-place');
// モンスターのHPを表示する部分のHTML要素を取得
const hp = document.getElementById('monster-hp');
// モンスターを追加するためにimg要素を作る
const img = document.createElement('img');
// 作ったimg要素を追加するHTML要素を取得
const field = document.getElementById('battle-field');
// 攻撃音
const attack = new Audio('sounds/attack.mp3');
// KO音
const ko = new Audio('sounds/KO.mp3');
// 最初の画面のHTML要素
const description = document.getElementById('description');
// 日本語のセリフを表示する部分
const serihu = document.getElementById('one-piece');

                                                                                                                                                                    

// モンスターを生成
const createMonster = () => {
// モンスターを初期化
    img.src = '';
    hp.textContent = '';
    // インスタンスを生成
    const monster = new Monster(monsterImg[i], monsterHp[i]);
    // 60行目で作ったimg画像のsrcを指定
    img.src = monster.img
    // 子要素として追加
    field.appendChild(img);
    // HPを表示する部分のテキストに代入
    hp.textContent = 'HP' + monster.hp;
    

};

const addDamageToMonster = () => {

};


// ランダムなテキストを表示
const createText = () => {

    // 正タイプした文字列をクリア
    typed = '';
    typedfield.textContent = typed;
    // 日本語版のセリフもクリア
    serihu.textContent = '';

    // 0以上1未満の数をランダムで生成するmath.randomとテキストリストの長さをかけ、小数点以下を切り捨てることで0～2までのランダムな数値を生成する
    let random = (Math.floor(Math.random() * textList.length));

    // untyped = textList[1];
    serihu.textContent = dialogue[random];
    untyped = textList[random];
    untypedfield.textContent = untyped ; 
};

// キー入力の判定
const keyPress = e => {
    // console.log(e.key);

    // 誤タイプの場合
    if(e.key !== untyped.substring(0, 1)) {
        wrap.classList.add('mistyped');

        // ミスタイプの0.1秒後に背景の色を元に戻す
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        }, 100);

        return;
    
    }
    
    // 正タイプの場合
    score++;
    typed += untyped.substring(0, 1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    // テキストが無くなったら新しいテストを表示
    if(untyped === '') {
        createText();
        // テキストを打ち終わったら攻撃音を鳴らす
        attack.play();
        // テキストが無くなったらモンスターのHPを10減らす
        let damege = hitPoint - 10;
        hitPoint = damege;
        // HPに減少後の値を代入
        hp.textContent = 'HP' + hitPoint;
        if(hitPoint <= 0) {
            ko.play();
            i++;
            // ヒットポイントの初期値を更新。これが無いとヒットポイントが戻らず、-10,-20となっていく。これで苦労しました。なまじcreateMonsterでHPを設定する際にhitPoint変数を使っていないので余計に分らなかった。
            hitPoint = monsterHp[i];
            createMonster();
        }

    }
};



// タイピングスキルのランクを判定
const rankCheck = (i, score)  => {
       
    // テキストを格納する変数を作る
    let text = '';

    // スコアに応じてランク付け
    if(i < 2) {
        text = `あなたのタイピングは「東の海」レベル\nこれから頑張ろう！`
    }else if(i < 5) {
        text = `あなたタイピングは「偉大なる航路」レベル\nまだまだ先は長いぞ！`
    }else if(i < 8) {
        text = `あなたはタイピングは「新世界」レベル\nあなたは中々の実力者だ！`
    }else if(i < 10) {
        text = `あなたのタイピングは「四皇」レベル\nタイピング王までもう少し！`
    }else if(i >= 11) {
        text = 'あなたのタイピングは「海賊王」レベル\nおめでとう！君こそがタイピング王だ！'
    }

    return `${score}文字打てました！\n${text}\n【OK】リトライ/ 【キャンセル】終了`
    
};

// ゲームを終了
const gameOver = id => {
    clearInterval(id);
    
    const result =confirm(rankCheck(i, score));

    if(result === true) {
        window.location.reload();
    }
};

// カウントダウンタイマー
const timer = () => {

    // タイマー部分のHTML要素を取得
    let time = count.textContent;

    const id = setInterval(() => {
        // カウントダウンする
        time--;
        count.textContent = time;

        // カウントダウンが0になったらタイマーを止める
        if(time <= 0) {
            gameOver(id);
        }
    }, 1000);
};


// スタートボタンを押したら開始
start.addEventListener('click', () => {
    

    // カウントダウンを開始
    timer();

    // モンスターを生成
    createMonster();

    // createText関数を宣言
    createText();

    // descriptionを非表示
    description.style.display = 'none';

    // キーボードのイベント処理
    document.addEventListener('keypress', keyPress)
});

untypedfield.textContent = 'スタートボタンで開始';