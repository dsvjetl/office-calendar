<template>
  <button class="coButton">
    <span>
      <slot/>
    </span>
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  @Component
  export default class Button extends Vue {

  }
</script>

<style lang="scss" scoped>
  .coButton {
    padding: 5px 10px;
    border: none;
    text-align: center;
    border-radius: 3px;
    background-color: $purple;
    transition: all .3s ease-in-out;

    &:hover {
      background-color: darken($purple, 5);
      transform: scale(1.05);
      cursor: pointer;
    }

    span {
      display: flex;
    }
  }
</style>
