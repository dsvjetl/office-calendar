<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
    private mounted() {
      this.$store.commit('autoGenerateRandomReservations');
    }
  }
</script>

<style lang="scss">
  @import "stylesheets/index";
</style>
