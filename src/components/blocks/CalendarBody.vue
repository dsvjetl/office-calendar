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
    />
  </tr>
  </tbody>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { timeFormatFilter } from '@/utils/filters/timeFormatFilter';
  import TimeSlot from '@/components/elements/TimeSlot.vue';

  @Component({
    components: { TimeSlot },
    filters: {
      timeFormatFilter,
    },
  })
  export default class CalendarBody extends Vue {
    public get timePeriods(): number[][] {
      const loopLength = Array.from(Array(48).keys());
      const hours: number[] = loopLength.filter((loop) => (!(loop % 2)))
        .map((loop) => (loop / 2));

      return hours.map((hour) => [[hour, 0], [hour, 30]]).flat();
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
