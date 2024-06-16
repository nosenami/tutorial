<template>
  <div >

    <v-simple-table>
      <tr>

        <td>
          <v-text-field label="検索条件" v-model="searchText" ></v-text-field>
        </td>

        <td>
          <v-radio-group v-model="searchType" row>
            <v-radio value="searchType_title" label="タイトル 部分一致"></v-radio>
            <v-radio value="searchType_kind" label="ジャンル 完全一致"></v-radio>
          </v-radio-group>
        </td>

        <td>
          <v-btn v-on:click="clickSearchButton">検索する</v-btn>
        </td>

      </tr>
    </v-simple-table>

  </div>
</template>

<script>
export default {
  data () {
    return {}
  },

  created () {
  },

  computed: {
  },

  methods: {

    clickSearchButton () {
      this.$emit('searchBookButton')
    }

  }
}
</script>
