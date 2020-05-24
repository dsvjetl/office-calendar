<template>
  <div class="coCalendarWrapper">
    <Calendar/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import Calendar from '@/components/blocks/Calendar.vue';

  @Component({
    components: { Calendar },
  })
  export default class CalendarWrapper extends Vue {

  }
</script>

<style lang="scss" scoped>
  .coCalendarWrapper {
    display: flex;
    justify-content: center;
    padding: 0 0 20px;
  }
</style>
