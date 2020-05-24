<template>
  <table class="coCalendar">
    <CalendarHead/>
    <CalendarBody/>
  </table>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import CalendarBody from '@/components/blocks/CalendarBody.vue';
  import CalendarHead from '@/components/blocks/CalendarHead.vue';

  @Component({
    components: { CalendarHead, CalendarBody },
  })
  export default class Calendar extends Vue {

  }
</script>

