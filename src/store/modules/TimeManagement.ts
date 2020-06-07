import moment from 'moment';
import { TimeManagementState } from '@/types/TimeManagementState';

const state: TimeManagementState = {
  startingDay: moment().toISOString(),
  reservations: [],
};

const getters = {
  startingDay: (state: TimeManagementState) => moment(state.startingDay),
  reservations: (state: TimeManagementState) => state.reservations,
};

const mutations = {
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
  addReservation(
    state: TimeManagementState,
    reservation: {
      day: any,
      hour: number,
      minute: number,
    },
  ) {
    state.reservations.push(reservation);
  },
};

export default {
  state,
  getters,
  mutations,
};
