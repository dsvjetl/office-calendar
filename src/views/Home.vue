<template>
  <div class="co-home">
    <Header/>
    <TimeManager/>
    <CalendarWrapper/>
    <ColorScheme/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import CalendarWrapper from '@/components/blocks/CalendarWrapper.vue';
  import Header from '@/components/blocks/Header.vue';
  import TimeManager from '@/components/blocks/TimeManager.vue';
  import ColorScheme from '@/components/blocks/ColorScheme.vue';

  @Component({
    components: {
      ColorScheme,
      TimeManager,
      Header,
      CalendarWrapper,
    },
  })
  export default class Home extends Vue {

  }
</script>
