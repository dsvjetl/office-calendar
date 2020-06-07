<template>
  <tbody class="coCalendarBody">
  <tr
    v-for="(timePeriod, index) in timePeriods"
    :key="index"
  >
    <td class="timeLabel">
      {{timePeriod[0] | timeFormatFilter}}:{{timePeriod[1] | timeFormatFilter}}
    </td>
    <TimeSlot
      v-for="n in 7"
      :key="n"
      :timePeriodProp="timePeriod"
      :dayProp="n"
      @onReservationClicked="onReservationClicked($event)"
    />
  </tr>
  <Modal
    v-if="modal.show"
    :message="modal.message"
    @onCancel="onModalCancel()"
    @onSubmit="onModalSubmit()"
  />
  </tbody>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { timeFormatFilter } from '@/utils/filters/timeFormatFilter';
  import TimeSlot from '@/components/elements/TimeSlot.vue';
  import Modal from '@/components/blocks/Modal.vue';
  import { Reservations } from '@/types/Reservations';
  import moment from 'moment';

  @Component({
    components: { Modal, TimeSlot },
    filters: {
      timeFormatFilter,
    },
  })
  export default class CalendarBody extends Vue {
    public modal: { message: string | undefined, show: boolean } = {
      message: '',
      show: false,
    };
    private reservation: Reservations = {
      day: null,
      hour: 0,
      minute: 0,
    };

    public onModalCancel() {
      this.modal.show = false;
    }

    public onModalSubmit() {
      this.$store.commit('addReservation', this.reservation);
      this.modal.show = false;
    }

    public get timePeriods(): number[][] {
      const loopLength = Array.from(Array(48).keys());
      const hours: number[] = loopLength.filter((loop) => (!(loop % 2)))
        .map((loop) => (loop / 2));

      return hours.map((hour) => [[hour, 0], [hour, 30]]).flat();
    }

    public onReservationClicked(reservation: Reservations) {
      this.modal.message = reservation.message;
      const reservationISO = reservation.day.toISOString();
      this.reservation = {
        day: moment(reservationISO),
        hour: reservation.hour,
        minute: reservation.minute,
      };
      this.modal.show = true;
    }
  }
</script>

<style lang="scss" scoped>
  .coCalendarBody {
    .timeLabel {
      padding: 5px 10px;
      text-align: center;
      border-radius: 3px;
    }

    .timeLabel {
      background-color: $purple;
    }
  }
</style>
