import moment from 'moment';
import { TimeManagementState } from '@/types/TimeManagementState';

const state = {
  startingDay: moment().toISOString(),
};

const getters = {
  startingDay: (state: TimeManagementState) => moment(state.startingDay),
};

const mutations = {
  setStartingDay(state: TimeManagementState, startingDay: any) {
    state.startingDay = startingDay;
  },
  incrementWeek() {
    const currentStartingDate = state.startingDay;
    const incrementedStartingDate = moment(currentStartingDate).add(7, 'days').endOf('day');
    state.startingDay = moment(incrementedStartingDate).toISOString();
  },
  decrementWeek() {
    const currentStartingDate = state.startingDay;
    const incrementedStartingDate = moment(currentStartingDate).subtract(7, 'days').endOf('day');
    state.startingDay = moment(incrementedStartingDate).toISOString();
  },
};

export default {
  state,
  getters,
  mutations,
};
