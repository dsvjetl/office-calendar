<template>
  <td
    class="coTimeSlot"
    @click="handleClick"
    :class="[{'isPast': isNotWorking}]"
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
    private evenDay: {
      startHour: number,
      endHour: number,
      breakStart: {
        hour: number,
      },
    } = {
      startHour: 8,
      endHour: 14,
      breakStart: {
        hour: 11,
      },
    };
    private oddDay: {
      startHour: number,
      endHour: number,
      breakStart: {
        hour: number,
      },
    } = {
      startHour: 13,
      endHour: 19,
      breakStart: {
        hour: 16,
      },
    };

    public handleClick() {
      this.clickedDay = this.startingDay.day(this.dayProp);

      const message = `
        You want reservation on ${this.timePeriodProp[0]}h:${this.timePeriodProp[1]}m
        on ${this.clickedDay.format('DD.MM.YYYY')}?
      `;

      // TODO @dsvjetl - remove
      alert(message);
    }

    public get isNotWorking() {
      return this.isTimePast
        || this.isNotWorkingTime
        || this.isEvenDayBreak
        || this.isOddDayBreak;
    }

    private get startingDay(): any {
      return this.$store.getters.startingDay;
    }

    private get currentDay(): any {
      const startingISO = this.startingDay.toISOString();
      return moment(startingISO).day(this.dayProp);
    }

    private get isTimePast(): boolean {
      return this.currentDay.endOf('day').isBefore(moment().add(1, 'days').endOf('day'));
    }

    private get isDayEven(): boolean {
      return this.currentDay.isoWeekday() % 2 === 0;
    }

    private get isEvenDayBreak(): boolean {
      if (!this.isDayEven) {
        return false;
      }

      const slotHour: number = this.timePeriodProp[0];

      return slotHour === this.evenDay.breakStart.hour;
    }

    private get isOddDayBreak(): boolean {
      if (this.isDayEven) {
        return false;
      }

      const slotHour: number = this.timePeriodProp[0];

      return slotHour === this.oddDay.breakStart.hour;
    }

    private get isNotWorkingTime(): boolean {
      if (this.isTimePast) {
        return false;
      }

      const slotHour: number = this.timePeriodProp[0];
      const slotMinute: number = this.timePeriodProp[1];

      const evenDaysNotWorkingSlots = (slotHour < this.evenDay.startHour)
        || (slotHour > this.evenDay.endHour)
        || (slotHour === this.evenDay.endHour && slotMinute === 30);
      const oddDaysNotWorkingSlots = (slotHour < this.oddDay.startHour)
        || (slotHour > this.oddDay.endHour)
        || (slotHour === this.oddDay.endHour && slotMinute === 30);

      if (this.isDayEven) {
        return evenDaysNotWorkingSlots;
      }

      if (!this.isDayEven) {
        return oddDaysNotWorkingSlots;
      }

      return true;
    }
  }
</script>

<style lang="scss" scoped>
  .coTimeSlot {
    background-color: $available;
    transition: all .3s ease-in-out;
    padding: 5px 10px;
    text-align: center;
    border-radius: 3px;

    &:hover {
      cursor: pointer;
      background-color: lighten($available, 10);
      transform: scale(1.05);
    }

    &.isPast {
      pointer-events: none;
      background-color: lighten($primary-bg, 10);
    }
  }
</style>
