<template>
  <tbody class="coCalendarBody">
  <tr
    v-for="(timePeriod, index) in timePeriods"
    :key="index"
  >
    <td class="timeLabel">
      {{timePeriod[0] | timeFormatFilter}}:{{timePeriod[1] | timeFormatFilter}}
    </td>
    <td class="timeSlot"></td>
    <td class="timeSlot"></td>
    <td class="timeSlot"></td>
    <td class="timeSlot"></td>
    <td class="timeSlot"></td>
    <td class="timeSlot"></td>
    <td class="timeSlot"></td>
  </tr>
  </tbody>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { timeFormatFilter } from '@/utils/filters/timeFormatFilter';

  @Component({
    filters: {
      timeFormatFilter,
    },
  })
  export default class CalendarBody extends Vue {
    public get timePeriods() {
      const loopLength = Array.from(Array(48).keys());
      const hours: number[] = loopLength.filter((loop) => (!(loop % 2)))
        .map((loop) => (loop / 2));

      return hours.map((hour) => [[hour, 0], [hour, 30]]).flat();
    }
  }
</script>

<style lang="scss" scoped>
  .coCalendarBody {
    .timeSlot, .timeLabel {
      padding: 5px 10px;
      text-align: center;
      border-radius: 3px;
    }

    .timeSlot {
      background-color: $primary-bg;
      transition: background-color .3s ease-in-out;

      &:hover {
        cursor: pointer;
        background-color: lighten($primary-bg, 10);
      }
    }

    .timeLabel {
      background-color: $purple-light;
    }
  }
</style>
