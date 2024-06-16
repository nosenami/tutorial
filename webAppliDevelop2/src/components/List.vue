<template>
  <div>

    <v-data-table :headers="bookHeaders" :items="bookRecords" class="elevation-1" >

      <template v-slot:item.editDelete="{ item }">

        <v-btn icon fab small class="elevation-1" v-on:click="clickEditButton(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn >

        <v-btn icon fab small class="elevation-1" v-on:click="clickDeleteButton(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>

      </template>

    </v-data-table>

  </div>
</template>

<script>
export default {
  data () {
    return {}
  },

  props: [
    'bookHeaders',
    'bookRecords'
  ],

  created () {
  },

  computed: {
  },

  methods: {

    clickEditButton (item) {
      this.$emit('clickEditButton', item)
    },

    clickDeleteButton (item) {
      this.$emit('clickDeleteButton', item)
    }
  }
}
</script>
