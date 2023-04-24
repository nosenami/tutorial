<template>
  <div>
    書籍管理アプリだよ
    <br>

    <table width="70%" >
      <tr>
    <!-- 検索 START （将来的にはSearch.vueに記載） - - - - - - - - - -->
        <td>
          <v-text-field> </v-text-field>
        </td>
        <td>
          <input type="radio" name="searchType" checked> タイトル 部分一致 &nbsp;&nbsp;
          <input type="radio" name="searchType" > ジャンル 完全一致 &nbsp;&nbsp;
          <v-btn  v-on:click="searchBookButton">検索</v-btn>
        </td>
    <!-- 検索 END  - - - - - - - - - - - - - - - - - - - - - - - - - -->

        <td>
          <v-btn v-on:click="registBookButton">登録する</v-btn>
        </td>
      </tr>
    </table>

    <!-- 一覧 START （将来的にはList.vueに記載） - - - - - - - - - - - -->
    <table border="1" width="100%">
      <tr>
        <th>タイトル</th>
        <th>ジャンル</th>
        <th>購入日</th>
        <th>購入者</th>
        <th>編集</th>
        <th>削除</th>
      </tr>
      <tr>
        <td>宇宙消失</td>
        <td>ＳＦ</td>
        <td>2022/4/1</td>
        <td>氏名Ａ</td>
        <td> <v-btn  v-on:click="editBookButton">編集</v-btn> </td>
        <td> <v-btn  v-on:click="deleteBookButton">削除</v-btn></td>
      </tr>
      <tr>
        <td>空飛ぶ馬</td>
        <td>ミステリ</td>
        <td>2022/5/23</td>
        <td>氏名Ｂ</td>
        <td> <v-btn  v-on:click="editBookButton">編集</v-btn> </td>
        <td> <v-btn  v-on:click="deleteBookButton">削除</v-btn></td>
      </tr>
      <tr>
        <td>罪と罰</td>
        <td>小説</td>
        <td>2022/6/5</td>
        <td>氏名Ａ</td>
        <td> <v-btn  v-on:click="editBookButton">編集</v-btn> </td>
        <td> <v-btn  v-on:click="deleteBookButton">削除</v-btn></td>
      </tr>
      <tr>
        <td>あああ</td>
        <td>いい</td>
        <td>yyyy/mm/dd</td>
        <td>ＸＹＺ</td>
        <td> <v-btn  v-on:click="editBookButton">編集</v-btn> </td>
        <td> <v-btn  v-on:click="deleteBookButton">削除</v-btn></td>
      </tr>
    </table>
    <!-- 一覧 END  - - - - - - - - - - - - - - - - - - - - - - - - - -->

  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {},
  computed: {},
  methods: {

    searchBookButton () {
      alert('検索ボタン押下時の動作予定。')
    },

    registBookButton () {
      alert('登録ボタン押下時の動作予定。')
    },

    editBookButton () {
      alert('編集ボタン押下時の動作予定。')
    },

    deleteBookButton () {
      alert('削除ボタン押下時の動作予定。')
    }

  }
}
</script>
