<template>
  <thead class="coCalendarHead">
  <tr>
    <th class="headLabel">
      <ClockIcon class="clockIcon"/>
    </th>
    <th
      class="u2 headLabel"
      v-for="weekDay in weekDays"
      :key="weekDay.value"
    >
      {{weekDay.label}}
    </th>
  </tr>
  </thead>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import ClockIcon from '@/components/icons/ClockIcon.vue';

  @Component({
    components: { ClockIcon },
  })
  export default class CalendarHead extends Vue {
    public weekDays = [
      { label: 'Mon', value: 0 },
      { label: 'Tue', value: 1 },
      { label: 'Wed', value: 2 },
      { label: 'Thu', value: 3 },
      { label: 'Fri', value: 4 },
      { label: 'Sat', value: 5 },
      { label: 'Sun', value: 6 },
    ];
  }
</script>

<style lang="scss" scoped>
  .coCalendarHead {
    .headLabel {
      background-color: $purple;
      border-radius: 3px;
      padding: 5px 10px;
      width: 40px;
    }

    .clockIcon {
      position: relative;
      top: 2px;
    }
  }
</style>
