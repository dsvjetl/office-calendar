<template>
  <div class="coTimeManager">
    <div>
      <Button>
        <ArrowLeftIcon/>
      </Button>
    </div>
    <div class="timeContent">
      <p class="u3">{{weekRange}}</p>
    </div>
    <div>
      <Button>
        <ArrowRightIcon/>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon.vue';
  import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue';
  import Button from '@/components/elements/Button.vue';
  import moment from 'moment';

  @Component({
    components: { Button, ArrowRightIcon, ArrowLeftIcon },
  })
  export default class TimeManager extends Vue {
    public now = moment();
    private monday = this.now.clone().weekday(1);
    private sunday = this.now.clone().weekday(7);

    public get weekRange(): string {
      const formatMoment = (date: any): string => date.format('DD.MM.YYYY');
      return `${formatMoment(this.monday)} - ${formatMoment(this.sunday)}`;
    }
  }
</script>

<style lang="scss" scoped>
  .coTimeManager {
    width: 450px;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
