import { createSlice } from '@reduxjs/toolkit';

function getTotalRoomAmount(baseSelectRoom) {
  return baseSelectRoom.reduce(
    (sum, room) => sum + Number(room.amount),
    0
  );
}

function makeRoomDescription(baseSelectRoom, mainRoomName) {
  const totalRoomAmount = getTotalRoomAmount(baseSelectRoom);

  return {
    total_same_rooms_name: `${totalRoomAmount} X ${mainRoomName}`,
  };
}

function updateRoomSummary(roomObj) {
  const totalRoomAmount = getTotalRoomAmount(roomObj.base_select_room);

  roomObj.base_select_room_total_amount = totalRoomAmount;

  roomObj.base_select_room_description = makeRoomDescription(
    roomObj.base_select_room,
    roomObj.base_room_name
  );
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState: { saveHouse: [] },
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
        if (room_am === 0) return;

        const baseSelectRoom = [baseOff];

        state.saveHouse.push({
          base_room_id: mainRoomInfo.room_id,
          base_room_name: mainRoomInfo.room_name,
          base_room_surface_m2: mainRoomInfo.room_surface_in_m2,
          base_main_photos: mainRoomInfo.room_data.photos[0].url_square60,
          base_select_room_total_amount: getTotalRoomAmount(baseSelectRoom),
          base_select_room: baseSelectRoom,
          base_select_room_description: makeRoomDescription(
            baseSelectRoom,
            mainRoomInfo.room_name
          ),
        });

        return;
      }

      const roomObj = state.saveHouse[roomIndex];

      const offerIndex = roomObj.base_select_room.findIndex(
        currentOff => currentOff.block_id === offer.block_id
      );

      if (offerIndex === -1) {
        if (room_am === 0) return;

        roomObj.base_select_room.push(baseOff);

        updateRoomSummary(roomObj);

        return;
      }

      if (room_am === 0) {
        roomObj.base_select_room.splice(offerIndex, 1);

        if (roomObj.base_select_room.length === 0) {
          state.saveHouse.splice(roomIndex, 1);
          return;
        }

        updateRoomSummary(roomObj);

        return;
      }

      roomObj.base_select_room[offerIndex].amount = room_am;

      updateRoomSummary(roomObj);
    },

    clearBookedRooms(state) {
      state.saveHouse = [];
    },
  },
});

export const { storeBookRoom, clearBookedRooms } = bookingSlice.actions;
export default bookingSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// function getTotalRoomAmount(baseSelectRoom) {
//   return baseSelectRoom.reduce(
//     (sum, room) => sum + Number(room.amount),
//     0
//   );
// }

// function makeRoomDescription(baseSelectRoom, mainRoomName) {
//   const totalRoomAmount = getTotalRoomAmount(baseSelectRoom);

//   return [
//     {
//       total_same_rooms_name: `${totalRoomAmount} X ${mainRoomName}`,
//     },
//   ];
// }

// function updateRoomSummary(roomObj) {
//   const totalRoomAmount = getTotalRoomAmount(roomObj.base_select_room);

//   roomObj.base_select_room_total_amount = totalRoomAmount;

//   roomObj.base_select_room_description = makeRoomDescription(
//     roomObj.base_select_room,
//     roomObj.base_room_name
//   );
// }

// const bookingSlice = createSlice({
//   name: 'booking',
//   initialState: { saveHouse: [] },
//   reducers: {
//     storeBookRoom(state, action) {
//       const { mainRoomInfo, offer, roomAmount } = action.payload;
//       const room_am = Number(roomAmount);

//       const roomIndex = state.saveHouse.findIndex(
//         baseObj => baseObj.base_room_id === mainRoomInfo.room_id
//       );

//       const baseOff = {
//         amount: room_am,
//         block_id: offer.block_id,
//         spec_room_data: offer,
//       };

//       if (roomIndex === -1) {
//         if (room_am === 0) return;

//         const baseSelectRoom = [baseOff];

//         state.saveHouse.push({
//           base_room_id: mainRoomInfo.room_id,
//           base_room_name: mainRoomInfo.room_name,
//           base_room_surface_m2: mainRoomInfo.room_surface_in_m2,
//           base_main_photos: mainRoomInfo.room_data.photos[0].url_square60,

//           base_select_room_total_amount: getTotalRoomAmount(baseSelectRoom),

//           base_select_room: baseSelectRoom,

//           base_select_room_description: makeRoomDescription(
//             baseSelectRoom,
//             mainRoomInfo.room_name
//           ),
//         });

//         return;
//       }

//       const roomObj = state.saveHouse[roomIndex];

//       const offerIndex = roomObj.base_select_room.findIndex(
//         currentOff => currentOff.block_id === offer.block_id
//       );

//       if (offerIndex === -1) {
//         if (room_am === 0) return;

//         roomObj.base_select_room.push(baseOff);

//         updateRoomSummary(roomObj);

//         return;
//       }

//       if (room_am === 0) {
//         roomObj.base_select_room.splice(offerIndex, 1);

//         if (roomObj.base_select_room.length === 0) {
//           state.saveHouse.splice(roomIndex, 1);
//           return;
//         }

//         updateRoomSummary(roomObj);

//         return;
//       }

//       roomObj.base_select_room[offerIndex].amount = room_am;

//       updateRoomSummary(roomObj);
//     },

//     clearBookedRooms(state) {
//       state.saveHouse = [];
//     },
//   },
// });

// export const { storeBookRoom, clearBookedRooms } = bookingSlice.actions;
// export default bookingSlice.reducer;

