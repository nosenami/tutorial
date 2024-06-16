<template>
  <div>
    書籍管理アプリだよ
    <br>
    <br>

    <v-overlay :value="showOverlay"></v-overlay>

    <v-toolbar >

      <!-- 検索ボタン用のコンポーネント -->
      <search-components v-on:searchBookButton="searchBookButton"/>

      <v-spacer></v-spacer>

      <v-btn v-on:click="registBookButton">登録する</v-btn>

    </v-toolbar>

    <!-- 登録用のダイアログ -->
    <v-dialog v-model="registDialog"  max-width="700px" >

      <!-- 登録・変更・削除ダイアログ用のコンポーネント -->
      <form-components
        registEditDeleteType="registEditDeleteType_regist"
        v-bind:inputBookInfo="inputBookInfo"
        v-on:clickRegistEditButton="insertUpdateBookInfo"
        v-on:clickBackButton="closeDialog"
        ref="registDialogFormComponents"
      />
    </v-dialog>

    <!-- 変更用のダイアログ -->
    <v-dialog v-model="editDialog"  max-width="700px" >

      <!-- 登録・変更・削除ダイアログ用のコンポーネント -->
      <form-components
        registEditDeleteType="registEditDeleteType_edit"
        v-bind:inputBookInfo="inputBookInfo"
        v-on:clickRegistEditButton="insertUpdateBookInfo"
        v-on:clickBackButton="closeDialog"
      />

    </v-dialog>

    <!-- 削除用のダイアログ -->
    <v-dialog v-model="deleteDialog" max-width="500px">
      <!-- 登録・変更・削除ダイアログ用のコンポーネント -->
      <form-components
        registEditDeleteType="registEditDeleteType_delete"
        v-bind:inputBookInfo="inputBookInfo"
        v-on:clickDeleteButton="deleteBookInfo"
        v-on:clickBackButton="closeDialog"
      />
    </v-dialog>

    <!-- 一覧用のコンポーネント -->
    <list-components
      v-bind:bookHeaders="bookHeaders"
      v-bind:bookRecords="bookRecords"
      v-on:clickEditButton="editBookButton"
      v-on:clickDeleteButton="deleteBookButton"
    />

  </div>
</template>

<script src='server\Code.js'></script>
<script>

// 子コンポーネントを定義。
import SearchComponents from '@/components/Search.vue'
import FormComponents from '@/components/Form.vue'
import ListComponents  from '@/components/List.vue'

export default {

  components: {
    SearchComponents,
    FormComponents,
    ListComponents
  },

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

    /**
     * 検索種別
     *  searchType_title : タイトル 部分一致（初期値）
     *  searchType_kind  : ジャンル 完全一致
     */
    searchType: 'searchType_title',

    /**
     *  登録用のダイアログ、変更用のダイアログ、削除用のダイアログ
     */
    registDialog: false,
    editDialog: false,
    deleteDialog: false,

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
    showOverlay: false

  }),

  created () {
    this.displayAllBookList()
  },

  computed: {
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
      // 子画面の初期値の内容を入力用配列にコピーする。
      this.inputBookInfo = Object.assign({}, this.initBookInfo)
      this.registDialog = true

      // 子画面のバリデーションをリセットする。
      // （入力用子画面を、登録せずに閉じて開くと、前回のバリデーション結果が残っているため）
      this.$refs.registDialogFormComponents.resetFormValidate()
    },

    /**
    * 変更アイコン押下時の動作。
    */
    editBookButton (item) {
      //  該当明細の内容を入力用配列にコピーする。
      this.inputBookInfo = Object.assign({}, item)
      this.editDialog = true
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
    * 子画面の入力内容をＤＢへ反映する。
    */
    insertUpdateBookInfo : async function (registEditDeleteTypeName)  {

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
                () => { alert( registEditDeleteTypeName + 'しました。'); resolve(); }
              )
              .withFailureHandler(
                (error) => { alert( registEditDeleteTypeName + 'に失敗しました。'); reject(error); }
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
    deleteBookInfo : async function (registEditDeleteTypeName) {

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
                () => { alert(registEditDeleteTypeName +'しました。'); resolve(); }
              )
              .withFailureHandler(
                (error) => { alert(registEditDeleteTypeName + "に失敗しました。"); reject(error); }
              )
              .deleteBookInfo(this.inputBookInfo.bookId)
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

    /**
    * ダイアログを閉じる。
    */
    closeDialog () {
      this.registDialog = false
      this.editDialog = false
      this.deleteDialog = false
    },

    alertErrorMessage(e) {
      alert(`ただいま使用できません。\n${e.message}`)
    }

  }
}
</script>
