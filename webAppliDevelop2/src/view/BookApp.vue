<template>
  <div>
    書籍管理アプリだよ
    <br>
    <br>

<!-- 一覧 START （将来的にはList.vueに記載） - - - - - - - - - - - -->
    <v-data-table :headers="bookHeaders" :items="bookRecords" sort-by="title" class="elevation-1" >
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
      </template>

      <template v-slot:item.editDelete="{ rows }">
        <v-btn fab small class="grey--text text--darken-1 elevation-1" v-on:click="editBookButton(rows)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn >
        <v-btn fab small class="grey--text text--darken-1 elevation-1" v-on:click="deleteBookButton(rows)">
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
    searchType: 'searchType_title'
  }),

  created () {
    this.initialize()
  },

  computed: {
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

    searchBookButton () {
      alert('検索ボタン押下時の動作予定。')
    },

    registBookButton () {
      alert('登録ボタン押下時の動作予定。')
    },

    editBookButton (rows) {
      alert('編集ボタン押下時の動作予定。')
    },

    deleteBookButton (rows) {
      alert('削除ボタン押下時の動作予定。')
    }

  }
}
</script>
