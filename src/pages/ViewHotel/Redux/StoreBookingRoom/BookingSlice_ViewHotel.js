import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  saveHouse: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    storeBookRoom(state, action) {
      const { mainRoomInfo, offer, roomAmount } = action.payload;
      const room_am = Number(roomAmount);

      const roomIndex = state.saveHouse.findIndex(
        baseObj => baseObj.base_room_id === mainRoomInfo.room_id
      );

      const baseOff = {
        amount: room_am,
        block_id: offer.block_id,
        spec_room_data: offer,
      };

      if (roomIndex === -1) {
        // if no contain the main room info and this room offers
        if (room_am === 0) return;

        state.saveHouse.push({
          base_room_id: mainRoomInfo.room_id,
          base_room_name: mainRoomInfo.room_name,
          base_room_surface_m2: mainRoomInfo.room_surface_in_m2,
          base_main_photos: mainRoomInfo.room_data.photos[0].url_square60,
          base_select_room: [baseOff],
        });
        return;
      }

      // contain the main room info and atleast one room offers
      const roomObj = state.saveHouse[roomIndex];
      // contain the room offers in the main room 
      const offerIndex = roomObj.base_select_room.findIndex(
        currentOff => currentOff.block_id === offer.block_id
      );

      if (offerIndex === -1) {
        // if no this room offers, add room offer
        if (room_am === 0) return;
        roomObj.base_select_room.push(baseOff);
        return;
      }

      if (room_am === 0) {
        // if the selected room amount change zero, remove it
        roomObj.base_select_room.splice(offerIndex, 1);

        // if the remain room offers of the main rooms is empty, remove the main room 
        if (roomObj.base_select_room.length === 0) {
          state.saveHouse.splice(roomIndex, 1);
        }
        return;
      }

      // if original room offer rooms amount change, follow the latest value
      roomObj.base_select_room[offerIndex].amount = room_am;
    },

    clearBookedRooms(state) {
      state.saveHouse = [];
    },
  },
});

export const { storeBookRoom, clearBookedRooms } = bookingSlice.actions;
export default bookingSlice.reducer;






