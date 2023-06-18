<template>
  <div>
    書籍管理アプリだよ
    <br>
    <br>

<!-- 一覧 START （将来的にはList.vueに記載） - - - - - - - - - - - -->
    <v-data-table :headers="bookHeaders" :items="bookRecords" class="elevation-1" >
      <template v-slot:top>
        <v-toolbar flat>

<!-- 検索 START （将来的にはSearch.vueに記載） - - - - - - - - - -->
          <v-text-field label="検索条件"></v-text-field>

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
        <v-dialog v-model="registDialog"  max-width="500px" >

          <v-card>
            <v-card-title>
              <span class="text-h5">書籍の情報を{{ registUpdateTitle }}します</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12" >
                    <v-text-field v-model="inputBookInfo.title" label="タイトル"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" >
                    <v-text-field v-model="inputBookInfo.kind" label="ジャンル"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" >
                    <v-text-field v-model="inputBookInfo.buyDate" label="購入日"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" >
                    <v-text-field v-model="inputBookInfo.buyPerson" label="購入者"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-btn v-on:click="close" >戻る</v-btn>
              <v-spacer></v-spacer>
              <v-btn v-on:click="insertUpdateBookInfo" >この書籍情報で{{ registUpdateTitle }}する</v-btn>
            </v-card-actions>

          </v-card>
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
                    <v-text-field v-model="inputBookInfo.kind" label="ジャンル" readonly></v-text-field>
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
              <v-btn v-on:click="deleteBookInfo">この書籍情報を削除する</v-btn>
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

<script>
export default {

  data: () => ({
    bookHeaders: [
      { text: 'タイトル', value: 'title' },
      { text: 'ジャンル', value: 'kind' },
      { text: '購入日', value: 'buyDate' },
      { text: '購入者', value: 'buyPerson' },
      { text: '', value: 'editDelete', sortable: false }
    ],
    bookRecords: [],
    searchType: 'searchType_title',

    registDialog: false,
    deleteDialog: false,

    editedIndex: -1,

    inputBookInfo: { title: '', kind: '', buyDate: '', buyPerson: '' },
    initBookInfo: { title: '', kind: '', buyDate: '', buyPerson: '' }

  }),

  created () {
    this.initialize()
  },

  computed: {
    registUpdateTitle () {
      if (this.editedIndex === -1) {
        return '登録'
      } else {
        return '変更'
      }
    }
  },

  watch: {
  },

  methods: {

    /**
     * テーブルの明細を固定値で設定。将来、ＤＢから取得するように変更予定。
     */
    initialize () {
      this.bookRecords = [
        { title: '宇宙消失', kind: 'ＳＦ', buyDate: '2022/4/1', buyPerson: '氏名Ａ' },
        { title: '空飛ぶ馬', kind: 'ミステリ', buyDate: '2022/5/23', buyPerson: '氏名Ｂ' },
        { title: '罪と罰', kind: '小説', buyDate: '2022/6/5', buyPerson: '氏名Ａ' },
        { title: 'あああ', kind: 'いい', buyDate: 'yyyy/mm/dd', buyPerson: 'ＸＹＺ' }
      ]
    },

    /**
     * 検索ボタン押下時の動作。
     */
    searchBookButton () {
      alert('検索ボタン押下時の動作予定。')
    },

    /**
     * 登録ボタン押下時の動作。
     */
    registBookButton () {
      //  該当明細の選択ではないため行数は-1行目とする。
      this.editedIndex = -1
      //  空の内容を入力用配列にコピーする。
      this.inputBookInfo = Object.assign({}, this.initBookInfo)
      this.registDialog = true
    },

    /**
     * 変更アイコン押下時の動作。
     */
    editBookButton (item) {
      //  該当明細の行を取得する。
      this.editedIndex = this.bookRecords.indexOf(item)
      //  該当明細の内容を入力用配列にコピーする。
      this.inputBookInfo = Object.assign({}, item)
      this.registDialog = true
    },

    /**
     * 削除アイコン押下時の動作。
     */
    deleteBookButton (item) {
      //  該当明細の行を取得する。
      this.editedIndex = this.bookRecords.indexOf(item)
      //  該当明細の内容を入力用配列にコピーする。
      this.inputBookInfo = Object.assign({}, item)
      this.deleteDialog = true
    },

    insertUpdateBookInfo () {
      alert('ＤＢ登録、ＤＢ更新処理を行う。')
      this.registDialog = false
    },

    deleteBookInfo () {
      alert('ＤＢ削除処理を行う。')
      this.deleteDialog = false
    },

    close () {
      this.registDialog = false
    },

    closeDelete () {
      this.deleteDialog = false
    }

  }
}
</script>
