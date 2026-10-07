// Built-in phrases. Each target entry is "phrase|katakana reading".
// Thai polite endings: ครับ (male speaker) / ค่ะ (female), คะ in questions.
export type Code = 'en' | 'es' | 'fr' | 'it' | 'ko' | 'zh' | 'th' | 'ar' | 'pt' | 'de'
export type Cat = 'greet' | 'food' | 'shop' | 'move' | 'hotel' | 'help' | 'num'

export const LANGS: { code: Code; ja: string; en: string; native: string; bcp: string; rtl?: boolean }[] = [
  { code: 'en', ja: '英語', en: 'English', native: 'English', bcp: 'en' },
  { code: 'es', ja: 'スペイン語', en: 'Spanish', native: 'Español', bcp: 'es' },
  { code: 'fr', ja: 'フランス語', en: 'French', native: 'Français', bcp: 'fr' },
  { code: 'it', ja: 'イタリア語', en: 'Italian', native: 'Italiano', bcp: 'it' },
  { code: 'ko', ja: '韓国語', en: 'Korean', native: '한국어', bcp: 'ko' },
  { code: 'zh', ja: '中国語', en: 'Chinese', native: '简体中文', bcp: 'zh-CN' },
  { code: 'th', ja: 'タイ語', en: 'Thai', native: 'ไทย', bcp: 'th' },
  { code: 'ar', ja: 'アラビア語', en: 'Arabic', native: 'العربية', bcp: 'ar', rtl: true },
  { code: 'pt', ja: 'ポルトガル語', en: 'Portuguese', native: 'Português', bcp: 'pt' },
  { code: 'de', ja: 'ドイツ語', en: 'German', native: 'Deutsch', bcp: 'de' },
]

export const CATS: Cat[] = ['greet', 'food', 'shop', 'move', 'hotel', 'help', 'num']

export type Phrase = { id: string; cat: Cat; ja: string; en: string; t: Record<Code, string> }

const raw: [Cat, string, string, Record<Code, string>][] = [
  ['greet', 'こんにちは', 'Hello', {
    en: 'Hello.|ハロー', es: 'Hola.|オラ', fr: 'Bonjour.|ボンジュール', it: 'Buongiorno.|ブオンジョルノ',
    ko: '안녕하세요.|アンニョンハセヨ', zh: '你好。|ニーハオ', th: 'สวัสดีครับ/ค่ะ|サワッディー クラップ／カー',
    ar: 'مرحبًا.|マルハバン', pt: 'Olá.|オラー', de: 'Guten Tag.|グーテン ターク' }],
  ['greet', 'ありがとうございます', 'Thank you', {
    en: 'Thank you.|センキュー', es: 'Gracias.|グラシアス', fr: 'Merci.|メルシー', it: 'Grazie.|グラッツィエ',
    ko: '감사합니다.|カムサハムニダ', zh: '谢谢。|シエシエ', th: 'ขอบคุณครับ/ค่ะ|コープクン クラップ／カー',
    ar: 'شكرًا.|シュクラン', pt: 'Obrigado. / Obrigada.|オブリガード／オブリガーダ', de: 'Danke schön.|ダンケ シェーン' }],
  ['greet', 'すみません（呼びかけ）', 'Excuse me', {
    en: 'Excuse me.|エクスキューズ ミー', es: 'Disculpe.|ディスクルペ', fr: 'Excusez-moi.|エクスキュゼ モワ', it: 'Mi scusi.|ミ スクーズィ',
    ko: '저기요.|チョギヨ', zh: '不好意思。|ブー ハオ イース', th: 'ขอโทษครับ/ค่ะ|コートート クラップ／カー',
    ar: 'لو سمحت.|ラウ サマハト', pt: 'Com licença.|コン リセンサ', de: 'Entschuldigung.|エントシュルディグング' }],
  ['greet', 'ごめんなさい', "I'm sorry", {
    en: "I'm sorry.|アイム ソーリー", es: 'Lo siento.|ロ シエント', fr: 'Je suis désolé(e).|ジュ スイ デゾレ', it: 'Mi dispiace.|ミ ディスピアーチェ',
    ko: '죄송합니다.|チェソンハムニダ', zh: '对不起。|ドゥイブチー', th: 'ขอโทษครับ/ค่ะ|コートート クラップ／カー',
    ar: 'آسف. / آسفة.|アーシフ／アーシファ', pt: 'Desculpe.|デスクルピ', de: 'Es tut mir leid.|エス トゥート ミア ライト' }],
  ['greet', 'さようなら', 'Goodbye', {
    en: 'Goodbye.|グッバイ', es: 'Adiós.|アディオス', fr: 'Au revoir.|オ ルヴォワール', it: 'Arrivederci.|アリヴェデルチ',
    ko: '안녕히 계세요.|アンニョンヒ ケセヨ', zh: '再见。|ザイジエン', th: 'ลาก่อนครับ/ค่ะ|ラーコーン クラップ／カー',
    ar: 'مع السلامة.|マアッサラーマ', pt: 'Até logo.|アテ ローゴ', de: 'Auf Wiedersehen.|アウフ ヴィーダーゼーエン' }],
  ['greet', 'はい', 'Yes', {
    en: 'Yes.|イエス', es: 'Sí.|スィ', fr: 'Oui.|ウィ', it: 'Sì.|スィ', ko: '네.|ネ', zh: '是的。|シーダ',
    th: 'ใช่ครับ/ค่ะ|チャイ クラップ／カー', ar: 'نعم.|ナアム', pt: 'Sim.|スィン', de: 'Ja.|ヤー' }],
  ['greet', 'いいえ', 'No', {
    en: 'No.|ノー', es: 'No.|ノ', fr: 'Non.|ノン', it: 'No.|ノ', ko: '아니요.|アニヨ', zh: '不是。|ブーシー',
    th: 'ไม่ใช่ครับ/ค่ะ|マイチャイ クラップ／カー', ar: 'لا.|ラー', pt: 'Não.|ナォン', de: 'Nein.|ナイン' }],
  ['greet', '日本から来ました', "I'm from Japan", {
    en: "I'm from Japan.|アイム フロム ジャパン", es: 'Soy de Japón.|ソイ デ ハポン', fr: 'Je viens du Japon.|ジュ ヴィアン デュ ジャポン',
    it: 'Vengo dal Giappone.|ヴェンゴ ダル ジャッポーネ', ko: '일본에서 왔어요.|イルボネソ ワッソヨ', zh: '我来自日本。|ウォー ライズー リーベン',
    th: 'มาจากญี่ปุ่นครับ/ค่ะ|マー チャーク イープン クラップ／カー', ar: 'أنا من اليابان.|アナ ミナル ヤーバーン',
    pt: 'Sou do Japão.|ソウ ド ジャパォン', de: 'Ich komme aus Japan.|イッヒ コメ アウス ヤーパン' }],
  ['greet', '英語を話せますか', 'Do you speak English?', {
    en: 'Do you speak English?|ドゥ ユー スピーク イングリッシュ', es: '¿Habla inglés?|アブラ イングレス', fr: 'Parlez-vous anglais ?|パルレ ヴ アングレ',
    it: 'Parla inglese?|パルラ イングレーゼ', ko: '영어 할 수 있어요?|ヨンオ ハル ス イッソヨ', zh: '您会说英语吗？|ニン ホイ シュオ インユィ マ',
    th: 'พูดภาษาอังกฤษได้ไหมครับ/คะ|プート パーサー アンクリット ダイ マイ クラップ／カ', ar: 'هل تتكلم الإنجليزية؟|ハル タタカッラム アル・インジリーズィーヤ',
    pt: 'Fala inglês?|ファラ イングレス', de: 'Sprechen Sie Englisch?|シュプレッヒェン ズィー エングリッシュ' }],
  ['greet', 'わかりません', "I don't understand", {
    en: "I don't understand.|アイ ドント アンダースタンド", es: 'No entiendo.|ノ エンティエンド', fr: 'Je ne comprends pas.|ジュ ヌ コンプラン パ',
    it: 'Non capisco.|ノン カピスコ', ko: '이해가 안 돼요.|イヘガ アン ドェヨ', zh: '我听不懂。|ウォー ティン ブ ドン',
    th: 'ไม่เข้าใจครับ/ค่ะ|マイ カオチャイ クラップ／カー', ar: 'لا أفهم.|ラー アフハム', pt: 'Não entendo.|ナォン エンテンド',
    de: 'Ich verstehe nicht.|イッヒ フェアシュテーエ ニヒト' }],
  ['greet', 'ゆっくり話してください', 'Please speak slowly', {
    en: 'Please speak slowly.|プリーズ スピーク スローリー', es: 'Hable despacio, por favor.|アブレ デスパシオ ポル ファボール',
    fr: "Parlez lentement, s'il vous plaît.|パルレ ラントマン スィル ヴ プレ", it: 'Parli piano, per favore.|パルリ ピアーノ ペル ファヴォーレ',
    ko: '천천히 말해 주세요.|チョンチョニ マレ ジュセヨ', zh: '请说慢一点。|チン シュオ マン イーディエン',
    th: 'กรุณาพูดช้าๆ หน่อยครับ/ค่ะ|カルナー プート チャー チャー ノイ', ar: 'تكلم ببطء من فضلك.|タカッラム ビブトゥ ミン ファドリク',
    pt: 'Fale devagar, por favor.|ファリ デヴァガール ポル ファヴォール', de: 'Bitte sprechen Sie langsam.|ビッテ シュプレッヒェン ズィー ラングザーム' }],

  ['food', 'メニューをください', 'The menu, please', {
    en: 'The menu, please.|ザ メニュー プリーズ', es: 'La carta, por favor.|ラ カルタ ポル ファボール', fr: "La carte, s'il vous plaît.|ラ カルト スィル ヴ プレ",
    it: 'Il menù, per favore.|イル メヌー ペル ファヴォーレ', ko: '메뉴판 주세요.|メニュパン ジュセヨ', zh: '请给我菜单。|チン ゲイ ウォー ツァイダン',
    th: 'ขอเมนูหน่อยครับ/ค่ะ|コー メーヌー ノイ', ar: 'القائمة من فضلك.|アル・カーイマ ミン ファドリク', pt: 'O menu, por favor.|オ メヌー ポル ファヴォール',
    de: 'Die Speisekarte, bitte.|ディー シュパイゼカルテ ビッテ' }],
  ['food', '2人です（席をお願いします）', 'A table for two, please', {
    en: 'A table for two, please.|ア テーブル フォー トゥー プリーズ', es: 'Una mesa para dos, por favor.|ウナ メサ パラ ドス ポル ファボール',
    fr: "Une table pour deux, s'il vous plaît.|ユヌ ターブル プール ドゥ スィル ヴ プレ", it: 'Un tavolo per due, per favore.|ウン ターヴォロ ペル ドゥーエ ペル ファヴォーレ',
    ko: '두 명이에요.|トゥ ミョンイエヨ', zh: '两位。|リャン ウェイ', th: 'สองคนครับ/ค่ะ|ソーン コン',
    ar: 'طاولة لشخصين من فضلك.|ターウィラ リシャフサイン ミン ファドリク', pt: 'Uma mesa para dois, por favor.|ウマ メザ パラ ドイス ポル ファヴォール',
    de: 'Einen Tisch für zwei, bitte.|アイネン ティッシュ フュア ツヴァイ ビッテ' }],
  ['food', 'これをください（指さして）', 'This one, please', {
    en: 'This one, please.|ディス ワン プリーズ', es: 'Esto, por favor.|エスト ポル ファボール', fr: "Ceci, s'il vous plaît.|ススィ スィル ヴ プレ",
    it: 'Questo, per favore.|クエスト ペル ファヴォーレ', ko: '이거 주세요.|イゴ ジュセヨ', zh: '我要这个。|ウォー ヤオ ジェイガ',
    th: 'เอาอันนี้ครับ/ค่ะ|アオ アンニー', ar: 'هذا من فضلك.|ハーザー ミン ファドリク', pt: 'Este, por favor.|エスチ ポル ファヴォール',
    de: 'Das hier, bitte.|ダス ヒーア ビッテ' }],
  ['food', 'おすすめは何ですか', 'What do you recommend?', {
    en: 'What do you recommend?|ワット ドゥ ユー レコメンド', es: '¿Qué me recomienda?|ケ メ レコミエンダ', fr: "Qu'est-ce que vous me conseillez ?|ケスク ヴ ム コンセイエ",
    it: 'Cosa mi consiglia?|コーザ ミ コンスィッリア', ko: '추천 메뉴가 뭐예요?|チュチョン メニュガ ムォエヨ', zh: '有什么推荐的吗？|ヨウ シェンマ トゥイジエン ダ マ',
    th: 'มีอะไรแนะนำไหมครับ/คะ|ミー アライ ネナム マイ', ar: 'بماذا تنصحني؟|ビマーザー タンサフニー', pt: 'O que recomenda?|オ ケ ヘコメンダ',
    de: 'Was empfehlen Sie?|ヴァス エンプフェーレン ズィー' }],
  ['food', 'お水をください', 'Water, please', {
    en: 'Water, please.|ウォーター プリーズ', es: 'Agua, por favor.|アグア ポル ファボール', fr: "De l'eau, s'il vous plaît.|ドゥ ロー スィル ヴ プレ",
    it: "Dell'acqua, per favore.|デッラックア ペル ファヴォーレ", ko: '물 좀 주세요.|ムル ジョム ジュセヨ', zh: '请给我一杯水。|チン ゲイ ウォー イーベイ シュイ',
    th: 'ขอน้ำเปล่าหน่อยครับ/ค่ะ|コー ナーム プラオ ノイ', ar: 'ماء من فضلك.|マーウ ミン ファドリク', pt: 'Água, por favor.|アグア ポル ファヴォール',
    de: 'Wasser, bitte.|ヴァッサー ビッテ' }],
  ['food', '辛くしないでください', 'Not spicy, please', {
    en: 'Not spicy, please.|ノット スパイシー プリーズ', es: 'Sin picante, por favor.|スィン ピカンテ ポル ファボール', fr: "Pas épicé, s'il vous plaît.|パ エピセ スィル ヴ プレ",
    it: 'Non piccante, per favore.|ノン ピッカンテ ペル ファヴォーレ', ko: '안 맵게 해 주세요.|アン メプケ ヘ ジュセヨ', zh: '请不要辣。|チン ブーヤオ ラー',
    th: 'ไม่เผ็ดครับ/ค่ะ|マイ ペット', ar: 'من فضلك، بدون بهارات حارة.|ミン ファドリク ビドゥーン ブハーラート ハーッラ', pt: 'Sem pimenta, por favor.|セン ピメンタ ポル ファヴォール',
    de: 'Bitte nicht scharf.|ビッテ ニヒト シャルフ' }],
  ['food', 'おいしいです', "It's delicious", {
    en: "It's delicious.|イッツ デリシャス", es: 'Está delicioso.|エスタ デリシオソ', fr: "C'est délicieux.|セ デリスィユー",
    it: 'È buonissimo.|エ ブオニッスィモ', ko: '맛있어요.|マシッソヨ', zh: '很好吃。|ヘン ハオチー', th: 'อร่อยมากครับ/ค่ะ|アロイ マーク',
    ar: 'لذيذ جدًا.|ラズィーズ ジッダン', pt: 'Está delicioso.|エスタ デリスィオーゾ', de: 'Es ist sehr lecker.|エス イスト ゼーア レッカー' }],
  ['food', '持ち帰りでお願いします', 'To go, please', {
    en: 'To go, please.|トゥ ゴー プリーズ', es: 'Para llevar, por favor.|パラ ジェバール ポル ファボール', fr: "À emporter, s'il vous plaît.|ア アンポルテ スィル ヴ プレ",
    it: 'Da portare via, per favore.|ダ ポルターレ ヴィーア ペル ファヴォーレ', ko: '포장해 주세요.|ポジャンヘ ジュセヨ', zh: '我要带走。|ウォー ヤオ ダイゾウ',
    th: 'เอากลับบ้านครับ/ค่ะ|アオ クラップ バーン', ar: 'للأخذ معي من فضلك.|リルアフズィ マアイ ミン ファドリク', pt: 'Para levar, por favor.|パラ レヴァール ポル ファヴォール',
    de: 'Zum Mitnehmen, bitte.|ツム ミットネーメン ビッテ' }],
  ['food', 'お会計をお願いします', 'The bill, please', {
    en: 'The bill, please.|ザ ビル プリーズ', es: 'La cuenta, por favor.|ラ クエンタ ポル ファボール', fr: "L'addition, s'il vous plaît.|ラディスィオン スィル ヴ プレ",
    it: 'Il conto, per favore.|イル コント ペル ファヴォーレ', ko: '계산해 주세요.|ケサネ ジュセヨ', zh: '请结账。|チン ジエジャン',
    th: 'เช็กบิลด้วยครับ/ค่ะ|チェック ビン ドゥアイ', ar: 'الحساب من فضلك.|アル・ヒサーブ ミン ファドリク', pt: 'A conta, por favor.|ア コンタ ポル ファヴォール',
    de: 'Die Rechnung, bitte.|ディー レヒヌング ビッテ' }],
  ['food', 'カードで払えますか', 'Can I pay by card?', {
    en: 'Can I pay by card?|キャナイ ペイ バイ カード', es: '¿Puedo pagar con tarjeta?|プエド パガール コン タルヘタ', fr: 'Je peux payer par carte ?|ジュ プ ペイエ パール カルト',
    it: 'Posso pagare con la carta?|ポッソ パガーレ コン ラ カルタ', ko: '카드로 계산할 수 있어요?|カドゥロ ケサナル ス イッソヨ', zh: '可以刷卡吗？|クーイー シュアカー マ',
    th: 'จ่ายด้วยบัตรได้ไหมครับ/คะ|チャーイ ドゥアイ バット ダイ マイ', ar: 'هل يمكنني الدفع بالبطاقة؟|ハル ユムキヌニー アッダフウ ビル・ビターカ',
    pt: 'Posso pagar com cartão?|ポッソ パガール コン カルタォン', de: 'Kann ich mit Karte zahlen?|カン イッヒ ミット カルテ ツァーレン' }],

  ['shop', 'いくらですか', 'How much is this?', {
    en: 'How much is this?|ハウ マッチ イズ ディス', es: '¿Cuánto cuesta?|クアント クエスタ', fr: 'Combien ça coûte ?|コンビアン サ クート',
    it: 'Quanto costa?|クアント コスタ', ko: '이거 얼마예요?|イゴ オルマエヨ', zh: '这个多少钱？|ジェイガ ドゥオシャオ チエン',
    th: 'อันนี้ราคาเท่าไหร่ครับ/คะ|アンニー ラーカー タオライ', ar: 'بكم هذا؟|ビカム ハーザー', pt: 'Quanto custa?|クアント クスタ',
    de: 'Was kostet das?|ヴァス コステット ダス' }],
  ['shop', '見ているだけです', "I'm just looking", {
    en: "I'm just looking.|アイム ジャスト ルッキング", es: 'Solo estoy mirando.|ソロ エストイ ミランド', fr: 'Je regarde seulement.|ジュ ルギャルド スルマン',
    it: 'Sto solo guardando.|スト ソーロ グアルダンド', ko: '그냥 구경하는 거예요.|クニャン クギョンハヌン ゴエヨ', zh: '我只是看看。|ウォー ジーシー カンカン',
    th: 'ดูเฉยๆ ครับ/ค่ะ|ドゥー チューイ チューイ', ar: 'أنا أتفرج فقط.|アナ アタファッラジュ ファカト', pt: 'Só estou olhando.|ソ エストウ オリャンド',
    de: 'Ich schaue nur.|イッヒ シャウエ ヌーア' }],
  ['shop', 'ほかのサイズはありますか', 'Do you have another size?', {
    en: 'Do you have this in another size?|ドゥ ユー ハヴ ディス イン アナザー サイズ', es: '¿Lo tiene en otra talla?|ロ ティエネ エン オトラ タジャ',
    fr: "Vous l'avez dans une autre taille ?|ヴ ラヴェ ダン ジュノートル タイユ", it: "Ce l'ha in un'altra taglia?|チェ ラ イン ウナルトラ ターリア",
    ko: '다른 사이즈 있어요?|タルン サイジュ イッソヨ', zh: '有别的尺码吗？|ヨウ ビエダ チーマー マ', th: 'มีไซซ์อื่นไหมครับ/คะ|ミー サイ ウーン マイ',
    ar: 'هل يوجد مقاس آخر؟|ハル ユージャド マカース アーハル', pt: 'Tem outro tamanho?|テン オウトロ タマーニョ',
    de: 'Haben Sie das in einer anderen Größe?|ハーベン ズィー ダス イン アイナー アンデレン グレーセ' }],
  ['shop', '試着してもいいですか', 'Can I try it on?', {
    en: 'Can I try it on?|キャナイ トライ イット オン', es: '¿Puedo probármelo?|プエド プロバールメロ', fr: "Je peux l'essayer ?|ジュ プ レセイエ",
    it: 'Posso provarlo?|ポッソ プロヴァールロ', ko: '입어 봐도 돼요?|イボ ブァド ドェヨ', zh: '可以试穿吗？|クーイー シーチュアン マ',
    th: 'ลองได้ไหมครับ/คะ|ローン ダイ マイ', ar: 'هل يمكنني تجربته؟|ハル ユムキヌニー タジュリバトゥフ', pt: 'Posso experimentar?|ポッソ エスペリメンタール',
    de: 'Kann ich das anprobieren?|カン イッヒ ダス アンプロビーレン' }],
  ['shop', 'これを買います', "I'll take this", {
    en: "I'll take this.|アイル テイク ディス", es: 'Me lo llevo.|メ ロ ジェボ', fr: 'Je le prends.|ジュ ル プラン', it: 'Lo prendo.|ロ プレンド',
    ko: '이걸로 할게요.|イゴルロ ハルケヨ', zh: '我要买这个。|ウォー ヤオ マイ ジェイガ', th: 'เอาอันนี้ครับ/ค่ะ|アオ アンニー',
    ar: 'سآخذ هذا.|サ・アーフズ ハーザー', pt: 'Vou levar este.|ヴォウ レヴァール エスチ', de: 'Ich nehme das.|イッヒ ネーメ ダス' }],
  ['shop', '少し安くなりますか', 'Can you give me a discount?', {
    en: 'Could you make it a little cheaper?|クッジュー メイク イット ア リトル チーパー', es: '¿Me puede hacer un descuento?|メ プエデ アセール ウン デスクエント',
    fr: 'Vous pouvez faire un petit prix ?|ヴ プヴェ フェール アン プティ プリ', it: 'Mi può fare uno sconto?|ミ プオ ファーレ ウノ スコント',
    ko: '좀 깎아 주실 수 있어요?|チョム カッカ ジュシル ス イッソヨ', zh: '能便宜一点吗？|ノン ピエンイー イーディエン マ',
    th: 'ลดหน่อยได้ไหมครับ/คะ|ロット ノイ ダイ マイ', ar: 'هل يمكن تخفيض السعر قليلًا؟|ハル ユムキン タフフィード アッスィウル カリーラン',
    pt: 'Pode fazer um desconto?|ポジ ファゼール ウン デスコント', de: 'Geht es etwas günstiger?|ゲート エス エトヴァス ギュンスティガー' }],
  ['shop', '袋をください', 'A bag, please', {
    en: 'Can I have a bag, please?|キャナイ ハヴ ア バッグ プリーズ', es: 'Una bolsa, por favor.|ウナ ボルサ ポル ファボール', fr: "Un sac, s'il vous plaît.|アン サック スィル ヴ プレ",
    it: 'Un sacchetto, per favore.|ウン サッケット ペル ファヴォーレ', ko: '봉투 주세요.|ポントゥ ジュセヨ', zh: '请给我一个袋子。|チン ゲイ ウォー イーガ ダイズ',
    th: 'ขอถุงด้วยครับ/ค่ะ|コー トゥン ドゥアイ', ar: 'كيس من فضلك.|キース ミン ファドリク', pt: 'Uma sacola, por favor.|ウマ サコーラ ポル ファヴォール',
    de: 'Eine Tüte, bitte.|アイネ テューテ ビッテ' }],
  ['shop', 'レシートをください', 'A receipt, please', {
    en: 'A receipt, please.|ア レシート プリーズ', es: 'El recibo, por favor.|エル レシボ ポル ファボール', fr: "Le reçu, s'il vous plaît.|ル ルスュ スィル ヴ プレ",
    it: 'Lo scontrino, per favore.|ロ スコントリーノ ペル ファヴォーレ', ko: '영수증 주세요.|ヨンスジュン ジュセヨ', zh: '请给我收据。|チン ゲイ ウォー ショウジュー',
    th: 'ขอใบเสร็จด้วยครับ/ค่ะ|コー バイセット ドゥアイ', ar: 'الإيصال من فضلك.|アル・イーサール ミン ファドリク', pt: 'O recibo, por favor.|オ ヘスィーボ ポル ファヴォール',
    de: 'Die Quittung, bitte.|ディー クヴィットゥング ビッテ' }],

  ['move', 'ここへ行きたいです（地図を見せて）', "I'd like to go here", {
    en: "I'd like to go here.|アイド ライク トゥ ゴー ヒア", es: 'Quiero ir aquí.|キエロ イール アキ', fr: 'Je voudrais aller ici.|ジュ ヴドレ アレ イスィ',
    it: 'Vorrei andare qui.|ヴォッレイ アンダーレ クイ', ko: '여기에 가고 싶어요.|ヨギエ カゴ シッポヨ', zh: '我想去这里。|ウォー シャン チュイ ジェリ',
    th: 'อยากไปที่นี่ครับ/ค่ะ|ヤーク パイ ティーニー', ar: 'أريد الذهاب إلى هنا.|ウリード アッザハーブ イラー フナー', pt: 'Quero ir a este lugar.|ケロ イール ア エスチ ルガール',
    de: 'Ich möchte hierhin.|イッヒ メヒテ ヒーアヒン' }],
  ['move', '駅はどこですか', 'Where is the station?', {
    en: 'Where is the station?|ウェア イズ ザ ステーション', es: '¿Dónde está la estación?|ドンデ エスタ ラ エスタシオン', fr: 'Où est la gare ?|ウ エ ラ ガール',
    it: "Dov'è la stazione?|ドヴェ ラ スタツィオーネ", ko: '역이 어디예요?|ヨギ オディエヨ', zh: '车站在哪里？|チョージャン ザイ ナーリ',
    th: 'สถานีอยู่ที่ไหนครับ/คะ|サターニー ユー ティーナイ', ar: 'أين المحطة؟|アイナル マハッタ', pt: 'Onde fica a estação?|オンジ フィカ ア エスタサォン',
    de: 'Wo ist der Bahnhof?|ヴォー イスト デア バーンホーフ' }],
  ['move', 'トイレはどこですか', 'Where is the toilet?', {
    en: 'Where is the restroom?|ウェア イズ ザ レストルーム', es: '¿Dónde está el baño?|ドンデ エスタ エル バーニョ', fr: 'Où sont les toilettes ?|ウ ソン レ トワレット',
    it: "Dov'è il bagno?|ドヴェ イル バーニョ", ko: '화장실이 어디예요?|ファジャンシリ オディエヨ', zh: '洗手间在哪里？|シーショウジエン ザイ ナーリ',
    th: 'ห้องน้ำอยู่ที่ไหนครับ/คะ|ホンナーム ユー ティーナイ', ar: 'أين الحمام؟|アイナル ハンマーム', pt: 'Onde fica o banheiro?|オンジ フィカ オ バニェイロ',
    de: 'Wo ist die Toilette?|ヴォー イスト ディー トアレッテ' }],
  ['move', 'この住所までお願いします（タクシー）', 'To this address, please', {
    en: 'To this address, please.|トゥ ディス アドレス プリーズ', es: 'A esta dirección, por favor.|ア エスタ ディレクシオン ポル ファボール',
    fr: "À cette adresse, s'il vous plaît.|ア セッタドレス スィル ヴ プレ", it: 'A questo indirizzo, per favore.|ア クエスト インディリッツォ ペル ファヴォーレ',
    ko: '이 주소로 가 주세요.|イ ジュソロ カ ジュセヨ', zh: '请到这个地址。|チン ダオ ジェイガ ディージー', th: 'ไปที่อยู่นี้ครับ/ค่ะ|パイ ティーユー ニー',
    ar: 'إلى هذا العنوان من فضلك.|イラー ハーザル ウンワーン ミン ファドリク', pt: 'Para este endereço, por favor.|パラ エスチ エンデレッソ ポル ファヴォール',
    de: 'Zu dieser Adresse, bitte.|ツー ディーザー アドレッセ ビッテ' }],
  ['move', '空港までお願いします', 'To the airport, please', {
    en: 'To the airport, please.|トゥ ズィ エアポート プリーズ', es: 'Al aeropuerto, por favor.|アル アエロプエルト ポル ファボール', fr: "À l'aéroport, s'il vous plaît.|ア ラエロポール スィル ヴ プレ",
    it: "All'aeroporto, per favore.|アッラエロポルト ペル ファヴォーレ", ko: '공항으로 가 주세요.|コンハンウロ カ ジュセヨ', zh: '请去机场。|チン チュイ ジーチャン',
    th: 'ไปสนามบินครับ/ค่ะ|パイ サナームビン', ar: 'إلى المطار من فضلك.|イラル マタール ミン ファドリク', pt: 'Para o aeroporto, por favor.|パラ オ アエロポルト ポル ファヴォール',
    de: 'Zum Flughafen, bitte.|ツム フルークハーフェン ビッテ' }],
  ['move', '切符はどこで買えますか', 'Where can I buy a ticket?', {
    en: 'Where can I buy a ticket?|ウェア キャナイ バイ ア チケット', es: '¿Dónde puedo comprar un billete?|ドンデ プエド コンプラール ウン ビジェテ',
    fr: 'Où puis-je acheter un billet ?|ウ ピュイジュ アシュテ アン ビエ', it: 'Dove posso comprare un biglietto?|ドーヴェ ポッソ コンプラーレ ウン ビリエット',
    ko: '표는 어디서 사요?|ピョヌン オディソ サヨ', zh: '在哪里买票？|ザイ ナーリ マイ ピャオ', th: 'ซื้อตั๋วได้ที่ไหนครับ/คะ|スー トゥア ダイ ティーナイ',
    ar: 'أين يمكنني شراء تذكرة؟|アイナ ユムキヌニー シラーウ タズキラ', pt: 'Onde posso comprar um bilhete?|オンジ ポッソ コンプラール ウン ビリェチ',
    de: 'Wo kann ich eine Fahrkarte kaufen?|ヴォー カン イッヒ アイネ ファールカルテ カウフェン' }],
  ['move', 'この電車はここへ行きますか', 'Does this train go here?', {
    en: 'Does this train go here?|ダズ ディス トレイン ゴー ヒア', es: '¿Este tren va aquí?|エステ トレン バ アキ', fr: 'Est-ce que ce train va ici ?|エスク ス トラン ヴァ イスィ',
    it: 'Questo treno va qui?|クエスト トレーノ ヴァ クイ', ko: '이 열차 여기 가요?|イ ヨルチャ ヨギ カヨ', zh: '这趟车去这里吗？|ジェイ タン チョー チュイ ジェリ マ',
    th: 'รถไฟขบวนนี้ไปที่นี่ไหมครับ/คะ|ロットファイ カブアン ニー パイ ティーニー マイ', ar: 'هل يذهب هذا القطار إلى هنا؟|ハル ヤズハブ ハーザル キタール イラー フナー',
    pt: 'Este trem vai para cá?|エスチ トレン ヴァイ パラ カ', de: 'Fährt dieser Zug hierhin?|フェールト ディーザー ツーク ヒーアヒン' }],
  ['move', '歩いて行けますか', 'Can I walk there?', {
    en: 'Can I walk there?|キャナイ ウォーク ゼア', es: '¿Se puede ir a pie?|セ プエデ イール ア ピエ', fr: 'On peut y aller à pied ?|オン プ イ アレ ア ピエ',
    it: 'Ci si può andare a piedi?|チ スィ プオ アンダーレ ア ピエーディ', ko: '걸어서 갈 수 있어요?|コロソ カル ス イッソヨ', zh: '可以走路去吗？|クーイー ゾウルー チュイ マ',
    th: 'เดินไปได้ไหมครับ/คะ|ドゥーン パイ ダイ マイ', ar: 'هل يمكنني الذهاب سيرًا على الأقدام؟|ハル ユムキヌニー アッザハーブ サイラン アラル・アクダーム',
    pt: 'Dá para ir a pé?|ダ パラ イール ア ペ', de: 'Kann man zu Fuß gehen?|カン マン ツー フース ゲーエン' }],
  ['move', '地図で教えてください', 'Please show me on the map', {
    en: 'Please show me on the map.|プリーズ ショウ ミー オン ザ マップ', es: '¿Me lo puede mostrar en el mapa?|メ ロ プエデ モストラール エン エル マパ',
    fr: 'Vous pouvez me montrer sur la carte ?|ヴ プヴェ ム モントレ スュール ラ カルト', it: 'Me lo può indicare sulla mappa?|メ ロ プオ インディカーレ スッラ マッパ',
    ko: '지도에서 알려 주세요.|チドエソ アルリョ ジュセヨ', zh: '请在地图上指给我看。|チン ザイ ディートゥー シャン ジー ゲイ ウォー カン',
    th: 'ช่วยชี้ในแผนที่ให้หน่อยครับ/ค่ะ|チュアイ チー ナイ ペーンティー ハイ ノイ', ar: 'أرني على الخريطة من فضلك.|アリニー アラル ハリータ ミン ファドリク',
    pt: 'Pode me mostrar no mapa?|ポジ ミ モストラール ノ マパ', de: 'Können Sie es mir auf der Karte zeigen?|ケネン ズィー エス ミア アウフ デア カルテ ツァイゲン' }],

  ['hotel', '予約しています', 'I have a reservation', {
    en: 'I have a reservation.|アイ ハヴ ア リザヴェーション', es: 'Tengo una reserva.|テンゴ ウナ レセルバ', fr: "J'ai une réservation.|ジェ ユヌ レゼルヴァスィオン",
    it: 'Ho una prenotazione.|オ ウナ プレノタツィオーネ', ko: '예약했어요.|イェヤケッソヨ', zh: '我有预订。|ウォー ヨウ ユィディン',
    th: 'จองไว้แล้วครับ/ค่ะ|チョーン ワイ レーオ', ar: 'لدي حجز.|ラダイヤ ハジュズ', pt: 'Tenho uma reserva.|テーニョ ウマ ヘゼルヴァ',
    de: 'Ich habe eine Reservierung.|イッヒ ハーベ アイネ レザヴィールング' }],
  ['hotel', 'チェックインをお願いします', "I'd like to check in", {
    en: "I'd like to check in.|アイド ライク トゥ チェックイン", es: 'Quisiera hacer el check-in.|キシエラ アセール エル チェキン', fr: "Je voudrais m'enregistrer.|ジュ ヴドレ マンルジストレ",
    it: 'Vorrei fare il check-in.|ヴォッレイ ファーレ イル チェックイン', ko: '체크인하고 싶어요.|チェクインハゴ シッポヨ', zh: '我要办理入住。|ウォー ヤオ バンリー ルージュー',
    th: 'เช็กอินครับ/ค่ะ|チェックイン', ar: 'أريد تسجيل الدخول.|ウリード タスジール アッドゥフール', pt: 'Quero fazer o check-in.|ケロ ファゼール オ シェキン',
    de: 'Ich möchte einchecken.|イッヒ メヒテ アインチェッケン' }],
  ['hotel', 'Wi-Fiのパスワードは何ですか', 'What is the Wi-Fi password?', {
    en: "What's the Wi-Fi password?|ワッツ ザ ワイファイ パスワード", es: '¿Cuál es la contraseña del wifi?|クアル エス ラ コントラセーニャ デル ウィフィ',
    fr: 'Quel est le mot de passe du wifi ?|ケレ ル モ ドゥ パス デュ ウィフィ', it: "Qual è la password del wi-fi?|クアレ ラ パスワード デル ワイファイ",
    ko: '와이파이 비밀번호가 뭐예요?|ワイパイ ピミルボノガ ムォエヨ', zh: 'Wi-Fi密码是多少？|ワイファイ ミーマー シー ドゥオシャオ',
    th: 'รหัสไวไฟคืออะไรครับ/คะ|ラハット ワイファイ クー アライ', ar: 'ما كلمة سر الواي فاي؟|マー カリマト スィッル アル・ワーイファーイ',
    pt: 'Qual é a senha do wi-fi?|クアウ エ ア セーニャ ド ウァイファイ', de: 'Wie ist das WLAN-Passwort?|ヴィー イスト ダス ヴェーラン パスヴォルト' }],
  ['hotel', '荷物を預かってもらえますか', 'Can you keep my luggage?', {
    en: 'Can you keep my luggage?|キャン ユー キープ マイ ラゲッジ', es: '¿Me puede guardar el equipaje?|メ プエデ グアルダール エル エキパヘ',
    fr: 'Vous pouvez garder mes bagages ?|ヴ プヴェ ガルデ メ バガージュ', it: 'Posso lasciare qui i bagagli?|ポッソ ラッシャーレ クイ イ バガッリ',
    ko: '짐 좀 맡아 주실 수 있어요?|チム ジョム マタ ジュシル ス イッソヨ', zh: '可以寄存行李吗？|クーイー ジーツン シンリ マ',
    th: 'ฝากกระเป๋าได้ไหมครับ/คะ|ファーク クラパオ ダイ マイ', ar: 'هل يمكنكم حفظ أمتعتي؟|ハル ユムキヌクム ヒフズ アムティアティー',
    pt: 'Pode guardar minha bagagem?|ポジ グアルダール ミーニャ バガージェン', de: 'Können Sie mein Gepäck aufbewahren?|ケネン ズィー マイン ゲペック アウフベヴァーレン' }],
  ['hotel', '朝食は何時ですか', 'What time is breakfast?', {
    en: 'What time is breakfast?|ワット タイム イズ ブレックファスト', es: '¿A qué hora es el desayuno?|ア ケ オラ エス エル デサユノ',
    fr: 'Le petit-déjeuner est à quelle heure ?|ル プティデジュネ エタ ケルール', it: "A che ora è la colazione?|ア ケ オーラ エ ラ コラツィオーネ",
    ko: '아침 식사는 몇 시예요?|アチム シクサヌン ミョッ シエヨ', zh: '早餐几点？|ザオツァン ジーディエン', th: 'อาหารเช้ากี่โมงครับ/คะ|アーハーン チャオ キー モーン',
    ar: 'في أي ساعة الفطور؟|フィー アイイ サーア アル・フトゥール', pt: 'A que horas é o café da manhã?|ア ケ オーラス エ オ カフェ ダ マニャン',
    de: 'Wann gibt es Frühstück?|ヴァン ギープト エス フリューシュトゥック' }],
  ['hotel', '部屋の設備が動きません', 'Something in my room is not working', {
    en: 'Something in my room is not working.|サムシング イン マイ ルーム イズ ノット ワーキング', es: 'Algo no funciona en mi habitación.|アルゴ ノ フンシオナ エン ミ アビタシオン',
    fr: 'Quelque chose ne marche pas dans ma chambre.|ケルクショーズ ヌ マルシュ パ ダン マ シャンブル', it: 'Qualcosa non funziona in camera.|クアルコーザ ノン フンツィオーナ イン カーメラ',
    ko: '방에 고장 난 게 있어요.|パンエ コジャン ナン ゲ イッソヨ', zh: '房间里有东西坏了。|ファンジエン リ ヨウ ドンシ ホアイ ラ',
    th: 'ในห้องมีของเสียครับ/ค่ะ|ナイ ホン ミー コーン スィア', ar: 'هناك شيء معطل في غرفتي.|フナーカ シャイウ ムアッタル フィー グルファティー',
    pt: 'Algo não funciona no meu quarto.|アウゴ ナォン フンスィオナ ノ メウ クアルト', de: 'In meinem Zimmer funktioniert etwas nicht.|イン マイネム ツィマー フンクツィオニールト エトヴァス ニヒト' }],
  ['hotel', 'チェックアウトをお願いします', "I'd like to check out", {
    en: "I'd like to check out.|アイド ライク トゥ チェックアウト", es: 'Quisiera hacer el check-out.|キシエラ アセール エル チェカウ', fr: 'Je voudrais faire le check-out.|ジュ ヴドレ フェール ル チェカウト',
    it: 'Vorrei fare il check-out.|ヴォッレイ ファーレ イル チェックアウト', ko: '체크아웃할게요.|チェクアウタルケヨ', zh: '我要退房。|ウォー ヤオ トゥイファン',
    th: 'เช็กเอาต์ครับ/ค่ะ|チェックアウ', ar: 'أريد تسجيل الخروج.|ウリード タスジール アル・フルージュ', pt: 'Quero fazer o check-out.|ケロ ファゼール オ シェカウチ',
    de: 'Ich möchte auschecken.|イッヒ メヒテ アウスチェッケン' }],

  ['help', '助けて！', 'Help!', {
    en: 'Help!|ヘルプ', es: '¡Socorro!|ソコーロ', fr: 'Au secours !|オ スクール', it: 'Aiuto!|アイウート', ko: '도와주세요!|トワジュセヨ',
    zh: '救命！|ジウミン', th: 'ช่วยด้วย!|チュアイ ドゥアイ', ar: 'النجدة!|アンナジュダ', pt: 'Socorro!|ソコーホ', de: 'Hilfe!|ヒルフェ' }],
  ['help', '警察を呼んでください', 'Please call the police', {
    en: 'Please call the police.|プリーズ コール ザ ポリス', es: 'Llame a la policía, por favor.|ジャメ ア ラ ポリシーア ポル ファボール',
    fr: "Appelez la police, s'il vous plaît.|アプレ ラ ポリス スィル ヴ プレ", it: 'Chiami la polizia, per favore.|キアーミ ラ ポリツィーア ペル ファヴォーレ',
    ko: '경찰을 불러 주세요.|キョンチャルル プルロ ジュセヨ', zh: '请帮我报警。|チン バン ウォー バオジン',
    th: 'ช่วยเรียกตำรวจให้หน่อยครับ/ค่ะ|チュアイ リアック タムルアット ハイ ノイ', ar: 'اتصل بالشرطة من فضلك.|イッタスィル ビッシュルタ ミン ファドリク',
    pt: 'Chame a polícia, por favor.|シャミ ア ポリスィーア ポル ファヴォール', de: 'Bitte rufen Sie die Polizei.|ビッテ ルーフェン ズィー ディー ポリツァイ' }],
  ['help', '救急車を呼んでください', 'Please call an ambulance', {
    en: 'Please call an ambulance.|プリーズ コール アン アンビュランス', es: 'Llame a una ambulancia, por favor.|ジャメ ア ウナ アンブランシア ポル ファボール',
    fr: "Appelez une ambulance, s'il vous plaît.|アプレ ユナンビュランス スィル ヴ プレ", it: "Chiami un'ambulanza, per favore.|キアーミ ウナンブランツァ ペル ファヴォーレ",
    ko: '구급차를 불러 주세요.|クグプチャルル プルロ ジュセヨ', zh: '请叫救护车。|チン ジャオ ジウフーチョー',
    th: 'ช่วยเรียกรถพยาบาลให้หน่อยครับ/ค่ะ|チュアイ リアック ロット パヤーバーン ハイ ノイ', ar: 'اتصل بالإسعاف من فضلك.|イッタスィル ビル・イスアーフ ミン ファドリク',
    pt: 'Chame uma ambulância, por favor.|シャミ ウマ アンブランスィア ポル ファヴォール', de: 'Bitte rufen Sie einen Krankenwagen.|ビッテ ルーフェン ズィー アイネン クランケンヴァーゲン' }],
  ['help', '病院に連れて行ってください', 'Please take me to a hospital', {
    en: 'Please take me to a hospital.|プリーズ テイク ミー トゥ ア ホスピタル', es: 'Lléveme al hospital, por favor.|ジェベメ アル オスピタル ポル ファボール',
    fr: "Emmenez-moi à l'hôpital, s'il vous plaît.|アンムネ モワ ア ロピタル スィル ヴ プレ", it: 'Mi porti in ospedale, per favore.|ミ ポルティ イン オスペダーレ ペル ファヴォーレ',
    ko: '병원에 데려가 주세요.|ピョンウォネ テリョガ ジュセヨ', zh: '请带我去医院。|チン ダイ ウォー チュイ イーユエン',
    th: 'ช่วยพาไปโรงพยาบาลหน่อยครับ/ค่ะ|チュアイ パー パイ ローンパヤーバーン ノイ', ar: 'خذني إلى المستشفى من فضلك.|フズニー イラル ムスタシュファー ミン ファドリク',
    pt: 'Leve-me ao hospital, por favor.|レヴィミ アオ オスピタウ ポル ファヴォール', de: 'Bitte bringen Sie mich ins Krankenhaus.|ビッテ ブリンゲン ズィー ミッヒ インス クランケンハウス' }],
  ['help', '気分が悪いです', "I don't feel well", {
    en: "I don't feel well.|アイ ドント フィール ウェル", es: 'Me encuentro mal.|メ エンクエントロ マル', fr: 'Je ne me sens pas bien.|ジュ ヌ ム サン パ ビアン',
    it: 'Mi sento male.|ミ セント マーレ', ko: '몸이 안 좋아요.|モミ アン ジョアヨ', zh: '我不舒服。|ウォー ブー シューフ',
    th: 'รู้สึกไม่สบายครับ/ค่ะ|ルースック マイ サバーイ', ar: 'أشعر بتوعك.|アシュウル ビタワウク', pt: 'Não me sinto bem.|ナォン ミ スィント ベン',
    de: 'Mir geht es nicht gut.|ミア ゲート エス ニヒト グート' }],
  ['help', 'ここが痛いです', 'It hurts here', {
    en: 'It hurts here.|イット ハーツ ヒア', es: 'Me duele aquí.|メ ドゥエレ アキ', fr: "J'ai mal ici.|ジェ マル イスィ", it: 'Mi fa male qui.|ミ ファ マーレ クイ',
    ko: '여기가 아파요.|ヨギガ アパヨ', zh: '这里疼。|ジェリ トン', th: 'เจ็บตรงนี้ครับ/ค่ะ|チェップ トロン ニー', ar: 'يؤلمني هنا.|ユウリムニー フナー',
    pt: 'Dói aqui.|ドイ アキ', de: 'Es tut hier weh.|エス トゥート ヒーア ヴェー' }],
  ['help', '食物アレルギーがあります', 'I have a food allergy', {
    en: 'I have a food allergy.|アイ ハヴ ア フード アラジー', es: 'Tengo alergia a algunos alimentos.|テンゴ アレルヒア ア アルグノス アリメントス',
    fr: "J'ai une allergie alimentaire.|ジェ ユナレルジー アリマンテール", it: "Ho un'allergia alimentare.|オ ウナッレルジーア アリメンターレ",
    ko: '음식 알레르기가 있어요.|ウムシク アルレルギガ イッソヨ', zh: '我对某些食物过敏。|ウォー ドゥイ モウシエ シーウー グオミン',
    th: 'แพ้อาหารบางอย่างครับ/ค่ะ|ペー アーハーン バーン ヤーン', ar: 'لدي حساسية من بعض الأطعمة.|ラダイヤ ハッサースィーヤ ミン バアド アル・アトイマ',
    pt: 'Tenho alergia alimentar.|テーニョ アレルジーア アリメンタール', de: 'Ich habe eine Lebensmittelallergie.|イッヒ ハーベ アイネ レーベンスミッテルアレルギー' }],
  ['help', 'ナッツと卵が食べられません', "I can't eat nuts or eggs", {
    en: "I can't eat nuts or eggs.|アイ キャント イート ナッツ オア エッグズ", es: 'No puedo comer frutos secos ni huevo.|ノ プエド コメール フルトス セコス ニ ウエボ',
    fr: "Je ne peux pas manger de fruits à coque ni d'œufs.|ジュ ヌ プ パ マンジェ ドゥ フリュイ ア コック ニ ドゥ", it: 'Non posso mangiare frutta secca né uova.|ノン ポッソ マンジャーレ フルッタ セッカ ネ ウオーヴァ',
    ko: '견과류와 달걀을 못 먹어요.|キョングァリュワ タルギャルル モン モゴヨ', zh: '我不能吃坚果和鸡蛋。|ウォー ブーノン チー ジエングオ ハー ジーダン',
    th: 'กินถั่วกับไข่ไม่ได้ครับ/ค่ะ|キン トゥア カップ カイ マイダイ', ar: 'لا أستطيع أكل المكسرات أو البيض.|ラー アスタティーウ アクル アル・ムカッサラート アウ アル・バイド',
    pt: 'Não posso comer nozes nem ovos.|ナォン ポッソ コメール ノーゼス ネン オーヴォス', de: 'Ich darf keine Nüsse und keine Eier essen.|イッヒ ダルフ カイネ ニュッセ ウント カイネ アイアー エッセン' }],
  ['help', '財布をなくしました', 'I lost my wallet', {
    en: 'I lost my wallet.|アイ ロスト マイ ウォレット', es: 'He perdido mi cartera.|エ ペルディド ミ カルテラ', fr: "J'ai perdu mon portefeuille.|ジェ ペルデュ モン ポルトフイユ",
    it: 'Ho perso il portafoglio.|オ ペルソ イル ポルタフォッリョ', ko: '지갑을 잃어버렸어요.|チガブル イロボリョッソヨ', zh: '我的钱包丢了。|ウォーダ チエンバオ ディウ ラ',
    th: 'กระเป๋าสตางค์หายครับ/ค่ะ|クラパオ サターン ハーイ', ar: 'فقدت محفظتي.|ファカットゥ ミフファザティー', pt: 'Perdi minha carteira.|ペルジ ミーニャ カルテイラ',
    de: 'Ich habe meine Geldbörse verloren.|イッヒ ハーベ マイネ ゲルトベルゼ フェアローレン' }],
  ['help', 'パスポートをなくしました', 'I lost my passport', {
    en: 'I lost my passport.|アイ ロスト マイ パスポート', es: 'He perdido mi pasaporte.|エ ペルディド ミ パサポルテ', fr: "J'ai perdu mon passeport.|ジェ ペルデュ モン パスポール",
    it: 'Ho perso il passaporto.|オ ペルソ イル パッサポルト', ko: '여권을 잃어버렸어요.|ヨクォヌル イロボリョッソヨ', zh: '我的护照丢了。|ウォーダ フージャオ ディウ ラ',
    th: 'หนังสือเดินทางหายครับ/ค่ะ|ナンスー ドゥーンターン ハーイ', ar: 'فقدت جواز سفري.|ファカットゥ ジャワーズ サファリー', pt: 'Perdi meu passaporte.|ペルジ メウ パサポルチ',
    de: 'Ich habe meinen Reisepass verloren.|イッヒ ハーベ マイネン ライゼパス フェアローレン' }],
  ['help', '道に迷いました', "I'm lost", {
    en: "I'm lost.|アイム ロスト", es: 'Estoy perdido/a.|エストイ ペルディド／ペルディダ', fr: 'Je suis perdu(e).|ジュ スイ ペルデュ', it: 'Mi sono perso/a.|ミ ソーノ ペルソ／ペルサ',
    ko: '길을 잃었어요.|キルル イロッソヨ', zh: '我迷路了。|ウォー ミールー ラ', th: 'หลงทางครับ/ค่ะ|ロン ターン', ar: 'لقد ضللت الطريق.|ラカド ダラルトゥ アッタリーク',
    pt: 'Estou perdido/a.|エストウ ペルジード／ペルジーダ', de: 'Ich habe mich verlaufen.|イッヒ ハーベ ミッヒ フェアラウフェン' }],
  ['help', '日本大使館に連絡したいです', "I'd like to contact the Japanese embassy", {
    en: "I'd like to contact the Japanese embassy.|アイド ライク トゥ コンタクト ザ ジャパニーズ エンバシー", es: 'Quiero contactar con la embajada de Japón.|キエロ コンタクタール コン ラ エンバハダ デ ハポン',
    fr: "Je voudrais contacter l'ambassade du Japon.|ジュ ヴドレ コンタクテ ランバサード デュ ジャポン", it: "Vorrei contattare l'ambasciata del Giappone.|ヴォッレイ コンタッターレ ランバッシャータ デル ジャッポーネ",
    ko: '일본 대사관에 연락하고 싶어요.|イルボン テサグァネ ヨルラカゴ シッポヨ', zh: '我想联系日本大使馆。|ウォー シャン リエンシー リーベン ダーシーグアン',
    th: 'อยากติดต่อสถานทูตญี่ปุ่นครับ/ค่ะ|ヤーク ティットー サターントゥート イープン', ar: 'أريد الاتصال بالسفارة اليابانية.|ウリード アル・イッティサール ビッスィファーラ アル・ヤーバーニーヤ',
    pt: 'Quero contatar a embaixada do Japão.|ケロ コンタタール ア エンバイシャーダ ド ジャパォン', de: 'Ich möchte die japanische Botschaft kontaktieren.|イッヒ メヒテ ディー ヤパーニシェ ボートシャフト コンタクティーレン' }],
]

// Numbers: [digit, en, es, fr, it, ko, zh, th, ar, pt, de], each "word|reading"
const nums: string[][] = [
  ['1', 'one|ワン', 'uno|ウノ', 'un|アン', 'uno|ウーノ', '하나 / 일|ハナ／イル', '一|イー', 'หนึ่ง|ヌン', 'واحد|ワーヒド', 'um|ウン', 'eins|アインス'],
  ['2', 'two|トゥー', 'dos|ドス', 'deux|ドゥ', 'due|ドゥーエ', '둘 / 이|トゥル／イ', '二|アル', 'สอง|ソーン', 'اثنان|イスナーン', 'dois|ドイス', 'zwei|ツヴァイ'],
  ['3', 'three|スリー', 'tres|トレス', 'trois|トロワ', 'tre|トレ', '셋 / 삼|セッ／サム', '三|サン', 'สาม|サーム', 'ثلاثة|サラーサ', 'três|トレス', 'drei|ドライ'],
  ['4', 'four|フォー', 'cuatro|クアトロ', 'quatre|カトル', 'quattro|クアットロ', '넷 / 사|ネッ／サ', '四|スー', 'สี่|スィー', 'أربعة|アルバア', 'quatro|クアトロ', 'vier|フィーア'],
  ['5', 'five|ファイブ', 'cinco|シンコ', 'cinq|サンク', 'cinque|チンクエ', '다섯 / 오|タソッ／オ', '五|ウー', 'ห้า|ハー', 'خمسة|ハムサ', 'cinco|スィンコ', 'fünf|フュンフ'],
  ['6', 'six|スィックス', 'seis|セイス', 'six|スィス', 'sei|セイ', '여섯 / 육|ヨソッ／ユク', '六|リウ', 'หก|ホック', 'ستة|スィッタ', 'seis|セイス', 'sechs|ゼクス'],
  ['7', 'seven|セブン', 'siete|シエテ', 'sept|セット', 'sette|セッテ', '일곱 / 칠|イルゴプ／チル', '七|チー', 'เจ็ด|チェット', 'سبعة|サブア', 'sete|セチ', 'sieben|ズィーベン'],
  ['8', 'eight|エイト', 'ocho|オチョ', 'huit|ユイット', 'otto|オット', '여덟 / 팔|ヨドル／パル', '八|バー', 'แปด|ペート', 'ثمانية|サマーニヤ', 'oito|オイト', 'acht|アハト'],
  ['9', 'nine|ナイン', 'nueve|ヌエベ', 'neuf|ヌフ', 'nove|ノーヴェ', '아홉 / 구|アホプ／ク', '九|ジウ', 'เก้า|ガーオ', 'تسعة|ティスア', 'nove|ノーヴィ', 'neun|ノイン'],
  ['10', 'ten|テン', 'diez|ディエス', 'dix|ディス', 'dieci|ディエーチ', '열 / 십|ヨル／シプ', '十|シー', 'สิบ|シップ', 'عشرة|アシャラ', 'dez|デイス', 'zehn|ツェーン'],
  ['100', 'one hundred|ワン ハンドレッド', 'cien|シエン', 'cent|サン', 'cento|チェント', '백|ペク', '一百|イーバイ', 'หนึ่งร้อย|ヌン ローイ', 'مئة|ミア', 'cem|セン', 'hundert|フンダート'],
  ['1000', 'one thousand|ワン サウザンド', 'mil|ミル', 'mille|ミル', 'mille|ミッレ', '천|チョン', '一千|イーチエン', 'หนึ่งพัน|ヌン パン', 'ألف|アルフ', 'mil|ミウ', 'tausend|タウゼント'],
]
const ORDER: Code[] = ['en', 'es', 'fr', 'it', 'ko', 'zh', 'th', 'ar', 'pt', 'de']

export const PHRASES: Phrase[] = [
  ...raw.map(([cat, ja, en, t], i) => ({ id: 'p' + i, cat, ja, en, t })),
  ...nums.map((row) => {
    const t = {} as Record<Code, string>
    ORDER.forEach((c, i) => (t[c] = row[i + 1]))
    return { id: 'n' + row[0], cat: 'num' as Cat, ja: row[0], en: row[0], t }
  }),
]

export function split(s: string): [string, string] {
  const i = s.lastIndexOf('|')
  return i < 0 ? [s, ''] : [s.slice(0, i), s.slice(i + 1)]
}
