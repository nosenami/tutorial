<template>
  <div>
    書籍管理アプリだよ
    <br>
    <br>

    <v-overlay :value="showOverlay"></v-overlay>

<!-- 一覧 START （将来的にはList.vueに記載） - - - - - - - - - - - -->
    <v-data-table :headers="bookHeaders" :items="bookRecords" class="elevation-1" >
      <template v-slot:top>
        <v-toolbar flat>

<!-- 検索 START （将来的にはSearch.vueに記載） - - - - - - - - - -->
          <v-text-field label="検索条件" v-model="searchText" ></v-text-field>

          <v-radio-group v-model="searchType" row>
            <v-radio value="searchType_title" label="タイトル 部分一致"></v-radio>
            <v-radio value="searchType_kind" label="ジャンル 完全一致"></v-radio>
          </v-radio-group>

          <v-btn v-on:click="searchBookButton">検索する</v-btn>
<!-- 検索 END  - - - - - - - - - - - - - - - - - - - - - - - - - -->

          <v-spacer></v-spacer>

          <v-btn v-on:click="registBookButton">登録する</v-btn>

        </v-toolbar>

<!-- 入力用子画面 START  - - - - - - - - - - - - - - - - - - - - - - - - - -->
        <v-dialog v-model="registDialog"  max-width="700px" >

          <v-form ref="bookInputForm" v-model="isInputValid" >

            <v-card>
              <v-card-title>
                <span class="text-h5">書籍の情報を{{ registUpdateTitle }}します</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12" >
                      <v-text-field v-model="inputBookInfo.title" label="タイトル"
                        :counter="maxlengthTitle"
                        :rules="[validateRequired,validateTitleLength]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" >
                      ジャンル<br>
                      <v-radio-group v-model="inputBookInfo.kind" row>
                        <v-radio value="0" label="指定なし"></v-radio>
                        <v-radio value="1" label="小説"></v-radio>
                        <v-radio value="2" label="ファンタジー"></v-radio>
                        <v-radio value="3" label="ミステリ"></v-radio>
                        <v-radio value="4" label="ＳＦ"></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" >
                      購入日<br>
                      <v-date-picker
                        v-model="inputBookInfo.buyDate"
                        no-title="true"
                        locale="jp-ja"
                        :day-format="date=> new Date(date).getDate()"
                      ></v-date-picker>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" >
                      <v-text-field v-model="inputBookInfo.buyPerson" label="購入者"
                        :counter="maxlengthBuyPerson"
                        :rules="[validateRequired, validateBuyPersonLength]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" >
                      <v-textarea v-model="inputBookInfo.reviewComment" label="レビュー内容"
                        :counter="maxlengthReviewComment"
                        :rules="[validateRequired, validateReviewCommentLength]"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-btn v-on:click="close" >戻る</v-btn>
                <v-spacer></v-spacer>
                <!-- 登録/変更ボタンは、バリデーションチェックOKの場合のみ押下可能とする -->
                <v-btn
                  v-on:click="insertUpdateBookInfo"
                  :disabled="!isInputValid"
                >
                  この書籍情報で{{ registUpdateTitle }}する
                </v-btn>
              </v-card-actions>

            </v-card>

          </v-form>

        </v-dialog>
<!-- 入力用子画面 END  - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!-- 削除用子画面 START  - - - - - - - - - - - - - - - - - - - - - - - - - -->
        <v-dialog v-model="deleteDialog" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">選択した書籍の登録情報を削除しますか？</v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12" >
                    <v-text-field v-model="inputBookInfo.title" label="タイトル" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" >
                    <v-text-field v-model="inputBookInfo.kindName" label="ジャンル" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" >
                    <v-text-field v-model="inputBookInfo.buyDate" label="購入日" readonly></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" >
                    <v-text-field v-model="inputBookInfo.buyPerson" label="購入者" readonly></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-btn v-on:click="closeDelete">戻る</v-btn>
              <v-spacer></v-spacer>
              <v-btn v-on:click="deleteBookInfo(inputBookInfo.bookId)">この書籍情報を削除する</v-btn>
            </v-card-actions>

          </v-card>

        </v-dialog>
<!-- 削除用子画面 END  - - - - - - - - - - - - - - - - - - - - - - - - - -->
      </template>

      <template v-slot:item.editDelete="{ item }">
        <v-btn icon fab small class="elevation-1" v-on:click="editBookButton(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn >
        <v-btn icon fab small class="elevation-1" v-on:click="deleteBookButton(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>

    </v-data-table>
<!-- 一覧 END  - - - - - - - - - - - - - - - - - - - - - - - - - -->

  </div>
</template>

<script src='server\Code.js'></script>
<script>
export default {

  data: () => ({
    bookHeaders: [
      { text: 'タイトル', value: 'title' },
      { text: 'ジャンル', value: 'kindName' },
      { text: '購入日', value: 'buyDate' },
      { text: '購入者', value: 'buyPerson' },
      { text: '', value: 'editDelete', sortable: false }
    ],
    bookRecords: [],

    searchText: '',
    searchType: 'searchType_title',

    registDialog: false,
    deleteDialog: false,

    /**
     * 変更かどうかを示す。
     * true  変更ボタン押下時である。
     * false 登録ボタン押下時である。
     */
    isChange: false,

    inputBookInfo: {},

    /**
     * 入力用子画面の内容の初期値。
     * （学習メモ）
     * 日付のnew Date().toISOString().substring(0, 10) とは、
     * 「YYYY-MM-DDTHH:mm:ss.sssZ」形式の日付部分頭１０桁を取得するという意味。
     */
    initBookInfo: {
      bookId : 0, // キー項目にZEROを設定することで、AUTO_INCREMENTを明示的に採番する。
      title : "",
      kind : "0",
      buyDate : new Date().toISOString().substring(0, 10),
      buyPerson : "",
      reviewComment : ""
    },

    //ロード中を示すオーバレイの表示状態。
    showOverlay: false,

    /**
     * フォーム内の入力項目のバリデーションチェック結果を表す。
     * true  : チェックOKである。
     * false : チェックNGである。
     */
    isInputValid : false,

    /**
     * 子画面で入力可能な文字数を表す。
     */
    maxlengthTitle : 100,
    maxlengthBuyPerson : 40,
    maxlengthReviewComment : 300,

  }),

  created () {
    this.displayAllBookList()
  },

  computed: {
    registUpdateTitle () {
      if (this.isChange) {
        return '変更'
      } else {
        return '登録'
      }
    }
  },

  watch: {
  },

  methods: {

    /**
     * ＤＢに登録されている全ての書籍を一覧に表示する。
     */
    displayAllBookList: async function () {

      // ロード中を示すオーバレイを表示する。
      this.showOverlay = true;

      // ＧＡＳ側の関数呼び出しにより非同期となるため、Promiseを使用する。
      try{
        await new Promise(

          (resolve, reject) => {

            google.script.run
              .withSuccessHandler(
                // selectBooksAllが正常終了したら、取得した情報を設定してから、resolveする。
                (bookRecords) => { this.bookRecords = bookRecords; resolve(); }
              )
              .withFailureHandler(
                // selectBooksAllが異常終了したら、空情報を設定してから、rejectする。（例外発生となる。）
                (error) => { this.bookRecords = []; reject(error);  }
              )
              .selectAllBooks()
          }
        )
      }
      catch(e){
        this.alertErrorMessage(e)
      }
      finally{
        //ロード中を示すオーバレイを非表示にする。
        this.showOverlay = false;
      }

    },

    /**
     * 検索ボタン押下時の動作。
     */
    searchBookButton: async function () {

      // ロード中を示すオーバレイを表示する。
      this.showOverlay = true;

      try{
        await new Promise(

          (resolve, reject) => {

            google.script.run
              .withSuccessHandler(
                (bookRecords) => { this.bookRecords = bookRecords; resolve(); }
              )
              .withFailureHandler(
                (error) => { this.bookRecords = []; reject(error);  }
              )
              .selectSearchedBooks(this.searchText, this.searchType)
          }
        )
      }
      catch(e){
        this.alertErrorMessage(e)
      }
      finally{
        //ロード中を示すオーバレイを非表示にする。
        this.showOverlay = false;
      }

    },

    /**
     * 登録ボタン押下時の動作。
     */
    registBookButton () {
      this.isChange = false

      // 子画面の初期値の内容を入力用配列にコピーする。
      this.inputBookInfo = Object.assign({}, this.initBookInfo)
      this.registDialog = true

      // バリデーションをリセットする。
      //（入力用子画面を、登録せずに閉じて開くと、前回のバリデーション結果が残っているため）
      this.resetFormValidate()
    },

    /**
     * 変更アイコン押下時の動作。
     */
    editBookButton (item) {
      this.isChange = true
      //  該当明細の内容を入力用配列にコピーする。
      this.inputBookInfo = Object.assign({}, item)
      this.registDialog = true
    },

    /**
     * 削除アイコン押下時の動作。
     */
    deleteBookButton (item) {
      //  該当明細の内容を入力用配列にコピーする。
      this.inputBookInfo = Object.assign({}, item)
      this.deleteDialog = true
    },

    /**
     * 文字列valueが、入力されていることのチェック。
     * ・valueに文字が入力されているなら、trueを返す。
     * ・valueに文字が入力されていない（文字数がゼロ）なら、エラーメッセージの文字列を返す。
     */
    validateRequired(value) {
      return !!value || '入力してください。'
      // （学習メモ）
      // if、orを省略した書き方。
      // https://blog.cloud-acct.com/posts/u-signup-page-4/
      // http://www.24w.jp/study_contents.php?bid=javascript&iid=javascript&sid=default&cid=008
    },

    /**
     * 文字列valueが、「タイトル」の既定文字数以内であることのチェック。
     * ・valueが既定文字数以内なら、trueを返す。
     * ・valueが既定文字数を超えていると、エラーメッセージの文字列を返す。
     */
    validateTitleLength(value){
      return this.validateLength(value,this.maxlengthTitle)
    },

    /**
     * 文字列valueが、「購入者」の既定文字数以内であることのチェック。
     */
    validateBuyPersonLength (value) {
      return this.validateLength(value,this.maxlengthBuyPerson)
    },

    /**
     * 文字列valueが、「レビュー内容」の既定文字数以内であることのチェック。
     */
    validateReviewCommentLength(value) {
      return this.validateLength(value,this.maxlengthReviewComment)
    },

    /**
     * 文字列の長さがmaxLength以内であることのチェック。
     */
    validateLength(value, maxLength){
      return value.length <= maxLength || `${maxLength}文字まで入力できます。`
    },

    /**
     * 入力用子画面のバリデーションをリセットする。
     */
    resetFormValidate () {
      this.$refs.bookInputForm.resetValidation()
    },

    /**
     * 子画面の入力内容をＤＢへ反映する。
     */
    insertUpdateBookInfo : async function ()  {

      // 登録用子画面の表示を解除する。
      this.registDialog = false
      // ロード中を示すオーバレイを表示する。
      this.showOverlay = true

      try{

        // ＤＢ登録・ＤＢ更新の処理
        await new Promise(

          (resolve, reject) => {
            google.script.run
              .withSuccessHandler(
                () => { alert( this.registUpdateTitle + 'しました。'); resolve(); }
              )
              .withFailureHandler(
                (error) => { alert( this.registUpdateTitle + 'に失敗しました。'); reject(error); }
              )
              .insertBookInfo(this.inputBookInfo)
          }
        )

      }
      catch(e){
        // 当catch内では何もしない。
        // 登録処理が失敗した旨は、withFailureHandler内でメッセージを出力済み。
      }
      finally{
        this.displayAllBookList();
      }

    },

    /**
     * 子画面の書籍情報をＤＢから削除する。
     */
    deleteBookInfo : async function (bookId) {

      // 削除用子画面の表示を解除する。
      this.deleteDialog = false
      // ロード中を示すオーバレイを表示する。
      this.showOverlay = true

      try{

        // ＤＢ削除の処理
        await new Promise(

          (resolve,reject) => {
            google.script.run
              .withSuccessHandler(
                () => { alert('削除しました。'); resolve(); }
              )
              .withFailureHandler(
                (error) => { alert("削除に失敗しました。"); reject(error); }
              )
              .deleteBookInfo(bookId)
          }
        )

      }
      catch(e){
        // 当catch内では何もしない。
        // 削除処理が失敗した旨は、withFailureHandler内でメッセージを出力済み。
      }
      finally{
        this.displayAllBookList()
      }

    },

    close () {
      this.registDialog = false
    },

    closeDelete () {
      this.deleteDialog = false
    },

    alertErrorMessage(e) {
      alert(`ただいま使用できません。\n${e.message}`)
    }

  }
}
</script>
