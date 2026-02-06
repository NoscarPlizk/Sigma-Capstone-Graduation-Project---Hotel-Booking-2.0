import { useLocation, BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { BookedList } from "./content/data transfer/bookedListContent"; 
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
  const [ search, setSearch ] = useLocalStorage('search','');
  const [ initialDate, setInitialDate ] = useLocalStorage('initialDate', '');
  const [ dueDate, setDueDate ] = useLocalStorage('dueDate','');
  const [ adultPax, setAdultPax ] = useLocalStorage('adultPax', 1);
  const [ childPax, setChildPax ] = useLocalStorage('childPax',0);
  const [ childAge, setChildAge ] = useLocalStorage('childAge', []);
  const [ roomAmount, setRoomAmount ] = useLocalStorage('roomAmount', 1);  

  const [ searchFetchData, setSearchFetchData ] = useLocalStorage('searchFetchData', {}); // prepare bulid a railway to map
  console.log("SelectMenu:", { search, initialDate, dueDate, adultPax, childPax, childAge, roomAmount });


  return (
    <BookedList.Provider value={{ 
      token, setToken, 
      search, setSearch, 
      initialDate, setInitialDate,
      dueDate, setDueDate,
      adultPax, setAdultPax, 
      childPax, setChildPax, 
      childAge, setChildAge,
      roomAmount, setRoomAmount,
      searchFetchData, setSearchFetchData
    }}>
      <BrowserRouter>
        <AppInner 
          setSearch={setSearch}
          setInitialDate={setInitialDate}
          setDueDate={setDueDate}
          setAdultPax={setAdultPax}
          setChildPax={setChildPax}
          setChildAge={setChildAge}
          setRoomAmount={setRoomAmount}
        />
      </BrowserRouter>
    </BookedList.Provider>
  );
}

function AppInner({
  setSearch, setInitialDate, setDueDate, setAdultPax, 
  setChildPax, setChildAge, setRoomAmount
}) {
  const location = useLocation();

    useEffect(() => {
    if (location.pathname === "/") {
      setSearch('');
      setInitialDate('');
      setDueDate('');
      setAdultPax(1);
      setChildPax(0);
      setChildAge([]);
      setRoomAmount(1)
    }
  }, [location.pathname])

  return (
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
  );
}