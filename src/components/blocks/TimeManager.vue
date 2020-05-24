<template>
  <div class="coTimeManager">
    <div>
      <Button
        @click.native="changeCurrentWeek('DECREMENT')"
      >
        <ArrowLeftIcon/>
      </Button>
    </div>
    <div class="timeContent">
      <p class="u3">{{weekRange}}</p>
    </div>
    <div>
      <Button
        @click.native="changeCurrentWeek('INCREMENT')"
      >
        <ArrowRightIcon/>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Watch } from 'vue-property-decorator';
  import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon.vue';
  import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue';
  import Button from '@/components/elements/Button.vue';
  import moment from 'moment';

  @Component({
    components: { Button, ArrowRightIcon, ArrowLeftIcon },
  })
  export default class TimeManager extends Vue {
    public get startingDay(): any {
      return this.$store.getters.startingDay;
    }

    public get weekStart() {
      return this.startingDay.add(1, 'days').clone().weekday(1);
    }

    public get weekEnd() {
      return this.startingDay.add(1, 'days').clone().weekday(7);
    }

    public get weekRange(): string {
      const formatMoment = (date: any): string => date.format('DD.MM.YYYY');
      return `${formatMoment(this.weekStart)} - ${formatMoment(this.weekEnd)}`;
    }

    public changeCurrentWeek(type: string) {
      switch (type) {
        case 'INCREMENT':
          this.$store.commit('incrementWeek');
          break;
        case 'DECREMENT':
          this.$store.commit('decrementWeek');
          break;
      }
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
