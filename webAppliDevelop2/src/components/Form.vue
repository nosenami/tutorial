<template>
  <div >
    <v-form ref="bookInputForm" v-model="isInputValid" >

      <v-card>
        <v-card-title>
          <span class="text-h5">書籍の情報を{{ registEditDeleteTypeName }}します</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12" sm="12" md="12" >
                <v-text-field v-model="inputBookInfo.title" label="タイトル"
                  :counter="maxlengthTitle"
                  :rules="[validateRequired,validateTitleLength]"
                  :readonly="isReadonly"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="12" >
                ジャンル<br>
                <v-radio-group v-model="inputBookInfo.kind" row
                  :readonly="isReadonly">
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
                  :readonly="isReadonly"
                ></v-date-picker>
              </v-col>

              <v-col cols="12" sm="12" md="12" >
                <v-text-field v-model="inputBookInfo.buyPerson" label="購入者"
                  :counter="maxlengthBuyPerson"
                  :rules="[validateRequired, validateBuyPersonLength]"
                  :readonly="isReadonly"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="12" >
                <v-textarea v-model="inputBookInfo.reviewComment" label="レビュー内容"
                  :counter="maxlengthReviewComment"
                  :rules="[validateRequired, validateReviewCommentLength]"
                  :readonly="isReadonly"
                ></v-textarea>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn v-on:click="clickBackButton" >
            戻る
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-on:click="clickRegistEditDeleteButton"
            :disabled="!isInputValid"
          >
            この書籍情報で{{ registEditDeleteTypeName }}する
          </v-btn>
        </v-card-actions>

      </v-card>

    </v-form>
  </div>
</template>

<script>
export default {

  data () {
    return {

      /**
      * 入力項目をreadonlyにするか。
      * false:入力可能。（当コンポーネントが登録・変更の場合）
      * true :入力不可。readonlyである。（当コンポーネントが削除の場合）
      */
      isReadonly: false,

      /**
      * フォーム内の入力項目のバリデーションチェック結果を表す。
      * true  : チェックOKである。
      * false : チェックNGである。
      */
      isInputValid: false,

      /**
      * 入力可能な文字数を表す。
      */
      maxlengthTitle: 100,
      maxlengthBuyPerson: 40,
      maxlengthReviewComment: 300
    }
  },

  props:

    [
      /** 明細１つ分を表す。 */
      'inputBookInfo',

      /** 当コンポーネントが登録、変更、削除のどのダイアログかを表す区分。 */
      'registEditDeleteType'
    ],

  created () {
    /**
    * 入力項目のreadonly設定を行う。
    * ・当コンポーネントが登録・変更の場合は、入力項目のreadonlyをfalseに設定する。
    * ・当コンポーネントが削除の場合は、入力項目のreadonlyをtrueに設定する。
    */
    if (this.registEditDeleteType === 'registEditDeleteType_regist' || this.registEditDeleteType === 'registEditDeleteType_edit') {
      this.isReadonly = false
    } else {
      this.isReadonly = true
    }
  },

  computed: {

    /**
     *  当コンポーネントの処理の日本語名を返す。
     */
    registEditDeleteTypeName () {
      if (this.registEditDeleteType === 'registEditDeleteType_regist') {
        return '登録'
      } else if (this.registEditDeleteType === 'registEditDeleteType_edit') {
        return '変更'
      } else if (this.registEditDeleteType === 'registEditDeleteType_delete') {
        return '削除'
      } else {
        return ' '
      }
    }

  },

  methods: {

    /**
    * 登録、変更、削除ボタン押下時の処理。
    * ・当コンポーネントが登録・変更の場合は、登録・変更用のメソッドを呼び出す。
    * ・当コンポーネントが削除の場合は、削除用のメソッドを呼び出す。
    */
    clickRegistEditDeleteButton () {
      if (this.registEditDeleteType === 'registEditDeleteType_regist' || this.registEditDeleteType === 'registEditDeleteType_edit') {
        this.$emit('clickRegistEditButton', this.registEditDeleteTypeName)
      } else {
        this.$emit('clickDeleteButton', this.registEditDeleteTypeName)
      }
    },

    /**
     * 戻るボタン押下時の処理。
     */
    clickBackButton () {
      this.$emit('clickBackButton')
    },

    /**
    * 文字列valueが、入力されていることのチェック。
    * ・valueに文字が入力されているなら、trueを返す。
    * ・valueに文字が入力されていない（文字数がゼロ）なら、エラーメッセージの文字列を返す。
    */
    validateRequired (value) {
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
    validateTitleLength (value) {
      return this.validateLength(value, this.maxlengthTitle)
    },

    /**
    * 文字列valueが、「購入者」の既定文字数以内であることのチェック。
    */
    validateBuyPersonLength (value) {
      return this.validateLength(value, this.maxlengthBuyPerson)
    },

    /**
    * 文字列valueが、「レビュー内容」の既定文字数以内であることのチェック。
    */
    validateReviewCommentLength (value) {
      return this.validateLength(value, this.maxlengthReviewComment)
    },

    /**
    * 文字列の長さがmaxLength以内であることのチェック。
    */
    validateLength (value, maxLength) {
      return value.length <= maxLength || `${maxLength}文字まで入力できます。`
    },

    /**
    * バリデーションをリセットする。
    */
    resetFormValidate () {
      this.$refs.bookInputForm.resetValidation()
    }

  }
}
</script>
