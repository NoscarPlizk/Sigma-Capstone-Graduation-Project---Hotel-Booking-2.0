import { useLocation, BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { BookedList } from "./content/data transfer/bookedListContent"; 

import { AuthProvider } from "./content/Firebase/AuthContext"; 
import { Provider } from "react-redux";
const ReduxProvider = Provider;
import { MasterReduxStore } from './content/data transfer/MasterReduxStore'

import useLocalStorage from "use-local-storage";
import AuthPages from "./pages/AuthPages";
import Layout from "./layout/Layout";
import SearchToHotelList from "./pages/SearchToHotelList";
import ViewHotel from "./pages/ViewHotel/ViewHotel";
import UserPage from "./pages/UserSettingPage/UserSettingPage";
import Payment from "./pages/Payment";
import AllBookedList from "./pages/AllBookedList";
import MainHome from "./pages/MainHome";
import PurchasePortal from "./pages/PurchasePortal/PurchasePortal";

export default function App() {
  const [ token, setToken ] = useLocalStorage('token', null);
  const [ currency, setCurrency ] = useLocalStorage('currency', );
  const [ search, setSearch ] = useLocalStorage('search','');
  const [ initialDate, setInitialDate ] = useLocalStorage('initialDate', '');
  const [ dueDate, setDueDate ] = useLocalStorage('dueDate','');
  const [ adultPax, setAdultPax ] = useLocalStorage('adultPax', 1);
  const [ childPax, setChildPax ] = useLocalStorage('childPax',0);
  const [ childAge, setChildAge ] = useLocalStorage('childAge', []);
  const [ childAgeString, setChildAgeString ] = useLocalStorage('childAgeString', null);
  const [ roomAmount, setRoomAmount ] = useLocalStorage('roomAmount', 1);  
  const [ searchFetchData, setSearchFetchData ] = useLocalStorage('searchFetchData', {}); // prepare bulid a railway to map

  useEffect(() => {
    console.log("SelectMenu:", {
      search,
      initialDate,
      dueDate,
      adultPax,
      childPax,
      childAgeString,
      roomAmount,
      currency
    });
  }, [search, initialDate, dueDate, adultPax, childPax, childAgeString, roomAmount, currency])

  return (
    <AuthProvider>
      <BookedList.Provider value={{ 
        token, setToken,
        currency, setCurrency,
        search, setSearch, 
        initialDate, setInitialDate,
        dueDate, setDueDate,
        adultPax, setAdultPax, 
        childPax, setChildPax, 
        childAge, setChildAge,
        childAgeString, setChildAgeString,
        roomAmount, setRoomAmount,
        searchFetchData, setSearchFetchData
      }}>
        <ReduxProvider store={MasterReduxStore}>
          <BrowserRouter>
            <AppInner 
              setSearch={setSearch}
              setInitialDate={setInitialDate}
              setDueDate={setDueDate}
              setAdultPax={setAdultPax}
              setChildPax={setChildPax}
              setChildAge={setChildAge}
              setRoomAmount={setRoomAmount}
              setCurrency={setCurrency}
            />
          </BrowserRouter>
        </ReduxProvider>
      </BookedList.Provider>
    </AuthProvider>
  );
}

function AppInner({
  setSearch, setInitialDate, setDueDate, setAdultPax, 
  setChildPax, setChildAge, setRoomAmount, setCurrency
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
      setRoomAmount(1);
      setCurrency('MYR');
    }
  }, [location.pathname]);

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
        {/* <Route path="purchaseportal" element={<PurchasePortal />} /> */}
      </Route>
    </Routes>
  );
}