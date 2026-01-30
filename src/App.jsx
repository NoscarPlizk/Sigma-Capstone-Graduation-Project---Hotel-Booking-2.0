import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { BookedList } from "./content/hotelContent"; 
import useLocalStorage from "use-local-storage";
import AuthPages from "./pages/AuthPages";
import Layout from "./layout/Layout";
import SearchToHotelList from "./pages/SearchToHotelList";
import ViewHotel from "./pages/ViewHotel";
import UserPage from "./pages/UserPage";
import Payment from "./pages/Payment";
import AllBookedList from "./pages/AllBookedList";
import MainHome from "./pages/MainHome";

export default function App() {
  const [ token, setToken ] = useLocalStorage('token', '');
  const [ search, setSearch ] = useState('');
  const [ initialDate, setInitialDate ] = useState('');
  const [ dueDate, setDueDate ] = useState('');
  const [ adultPax, setAdultPax ] = useState(1);
  const [ childPax, setChildPax ] = useState(0);
  const [ childAge, setChildAge ] = useState([]);
  const [ roomAmount, setRoomAmount ] = useState(1);  

  const [ searchData, setSearchData ] = useState([]); // prepare bulid a railway to map
  console.log("SelectMenu:", { search, initialDate, dueDate, adultPax, childPax, childAge });

  const APIurl = "https://c05a3a4b-6ce4-4b73-bcb4-4adf00190f87-00-1cbacayl5uma6.pike.replit.dev/";

  return (
    <BookedList.Provider value={{ 
      APIurl,
      token, setToken, 
      search, setSearch, 
      initialDate, setInitialDate,
      dueDate, setDueDate,
      adultPax, setAdultPax, 
      childPax, setChildPax, 
      childAge, setChildAge,
      roomAmount, setRoomAmount,
      searchData, setSearchData
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainHome />} />
            <Route path="searchtohotellist" element={<SearchToHotelList />} />
            <Route path="userauth" element={<AuthPages />} />
            <Route path="viewhotel" element={<ViewHotel />} />
            <Route path="userpage" element={<UserPage />} />
            <Route path="allbookedlist" element={<AllBookedList />} />
            <Route path="payment" element={<Payment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BookedList.Provider>
  );
}