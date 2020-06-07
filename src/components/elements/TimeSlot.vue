<template>
  <td
    class="coTimeSlot"
    @click="handleClick()"
    :class="[
      {'isPast': isNotWorking},
      {'isBreak': (isEvenDayBreak || isOddDayBreak)},
      {'isReserved': isReserved}
    ]"
  >
  </td>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  import moment from 'moment';
  import { Reservations } from '@/types/Reservations';

  @Component
  export default class TimeSlot extends Vue {
    @Prop({ required: true }) public timePeriodProp!: number[];
    @Prop({ required: true }) public dayProp!: number;
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

    public get isNotWorking(): boolean {
      return this.isTimePast
        || this.isNotWorkingTime
        || this.isEvenDayBreak
        || this.isOddDayBreak
        || this.isSunday
        || this.isNotWorkingSaturday;
    }

    private get reservations(): Reservations[] {
      return this.$store.getters.reservations;
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
      return this.currentDay.date() % 2 === 0;
    }

    private get isEvenDayBreak(): boolean {
      if (!this.isDayEven) {
        return false;
      }

      const slotHour: number = this.timePeriodProp[0];
      const slotMinute: number = this.timePeriodProp[1];

      return slotHour === this.evenDay.breakStart.hour
        && slotMinute !== 30
        && !this.isSunday
        && !this.isNotWorkingSaturday;
    }

    private get isOddDayBreak(): boolean {
      if (this.isDayEven) {
        return false;
      }

      const slotHour: number = this.timePeriodProp[0];
      const slotMinute: number = this.timePeriodProp[1];

      return slotHour === this.oddDay.breakStart.hour
        && slotMinute !== 30
        && !this.isSunday
        && !this.isNotWorkingSaturday;
    }

    private get isSunday() {
      return this.dayProp === 7;
    }

    private get isNotWorkingSaturday() {
      return !this.isDayEven && this.dayProp === 6;
    }

    private get isReserved(): boolean {
      const currentDay = this.currentDay;
      const reserved = this.reservations.filter((reservation) => (
        reservation.hour === this.timePeriodProp[0]
        && reservation.minute === this.timePeriodProp[1]
        && currentDay.isSame(reservation.day, 'day')
      ));
      return reserved.length > 0;
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

    public handleClick() {
      const day = this.startingDay.day(this.dayProp);
      const message = `
        You want this reservation?
        Time: ${this.timePeriodProp[0]}h:${this.timePeriodProp[1]}m
        /
        Duration: 30min
        /
        Day: ${day.format('DD.MM.YYYY')}
      `;

      this.$emit('onReservationClicked', {
        message,
        day,
        hour: this.timePeriodProp[0],
        minute: this.timePeriodProp[1],
      });
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

    &.isBreak {
      pointer-events: none;
      background-color: $break;
    }

    &.isReserved {
      pointer-events: none;
      background-color: $reserved;
    }
  }
</style>
