<template>
  <td
    class="coTimeSlot"
    @click="handleClick()"
    :class="[
      {'isPast': isNotWorking},
      {'isBreak': (isEvenDayBreak || isOddDayBreak)},
      {'isReserved': isReserved},
      {'isAutoGenerated': isAutoGenerated},
    ]"
  >
  </td>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  import moment from 'moment';
  import { Reservation } from '@/types/Reservations';

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

    private get autoGeneratedReservations(): Reservation[] {
      return this.$store.getters.autoGeneratedReservations;
    }

    private get reservations(): Reservation[] {
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

    public get isEvenDayBreak(): boolean {
      if (!this.isDayEven || this.isTimePast) {
        return false;
      }

      const slotHour: number = this.timePeriodProp[0];
      const slotMinute: number = this.timePeriodProp[1];

      return slotHour === this.evenDay.breakStart.hour
        && slotMinute !== 30
        && !this.isSunday
        && !this.isNotWorkingSaturday;
    }

    public get isOddDayBreak(): boolean {
      if (this.isDayEven || this.isTimePast) {
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

    public get isReserved(): boolean {
      const currentDay = this.currentDay;
      const reserved = this.reservations.filter((reservation) => (
        reservation.hour === this.timePeriodProp[0]
        && reservation.minute === this.timePeriodProp[1]
        && currentDay.isSame(reservation.day, 'day')
      ));
      return reserved.length > 0;
    }

    public get isAutoGenerated(): boolean {
      const currentDay = this.currentDay;
      const autoGenerated = this.autoGeneratedReservations.filter((reservation) => (
        reservation.hour === this.timePeriodProp[0]
        && reservation.minute === this.timePeriodProp[1]
        && currentDay.isSame(reservation.day, 'day')
      ));
      return autoGenerated.length > 0;
    }

    private get reservedThatDay(): boolean {
      const reservationsThatDay = this.reservations.filter((reservation) => (
        this.currentDay.isSame(reservation.day, 'day')
      ));
      return reservationsThatDay.length >= 1;
    }

    private get reservedThatWeek(): boolean {
      const reservationsThatDay = this.reservations.filter((reservation) => (
        this.currentDay.isSame(reservation.day, 'week')
      ));
      return reservationsThatDay.length >= 2;
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
      if (this.reservedThatDay) {
        this.$emit('onValidationError', 'You already have reservation on this day!');
        return;
      }

      if (this.reservedThatWeek) {
        this.$emit('onValidationError', 'You already have 2 reservations this week!');
        return;
      }

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
      background-color: $past;
    }

    &.isBreak {
      pointer-events: none;
      background-color: $break;
    }

    &.isReserved {
      pointer-events: none;
      background-color: $reserved;
    }

    &.isAutoGenerated {
      pointer-events: none;
      background-color: $generated;
    }
  }
</style>
