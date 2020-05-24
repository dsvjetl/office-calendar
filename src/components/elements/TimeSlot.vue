<template>
  <td
    class="coTimeSlot"
    @click="handleClick"
    :class="[{'isPast': isTimePast}]"
  >
  </td>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  import moment from 'moment';

  @Component
  export default class TimeSlot extends Vue {
    @Prop({ required: true }) public timePeriodProp!: number[];
    @Prop({ required: true }) public dayProp!: number;
    private clickedDay: any = moment();
    private now: any = moment();

    public handleClick() {
      this.clickedDay = this.startingDay.day(this.dayProp);

      const message = `
        You want reservation on ${this.timePeriodProp[0]}h:${this.timePeriodProp[1]}m
        on ${this.clickedDay.format('DD.MM.YYYY')}?
      `;

      // TODO @dsvjetl - remove
      alert(message);
    }

    private get startingDay(): any {
      return this.$store.getters.startingDay;
    }

    public get currentDay(): any {
      const startingISO = this.startingDay.toISOString();
      return moment(startingISO).day(this.dayProp);
    }

    public get isTimePast(): any {
      return this.currentDay.endOf('day').isBefore(moment().add(1, 'days').endOf('day'));
    }
  }
</script>

<style lang="scss" scoped>
  .coTimeSlot {
    background-color: $primary-bg;
    transition: all .3s ease-in-out;
    padding: 5px 10px;
    text-align: center;
    border-radius: 3px;

    &:hover {
      cursor: pointer;
      background-color: lighten($primary-bg, 10);
      transform: scale(1.05);
    }

    &.isPast {
      pointer-events: none;
      background-color: lighten($primary-bg, 10);
    }
  }
</style>
