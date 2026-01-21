import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { BookedList } from "./content/hotelContent"; 
import useLocalStorage from "use-local-storage";
import AuthPages from "./pages/AuthPages";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ViewHotel from "./pages/ViewHotel";
import UserPage from "./pages/UserPage";
import Payment from "./pages/payments/Payment";
import AllBookedList from "./pages/AllBookedList";
import MainHome from "./pages/MainHome";

export default function App() {
  const [ token, setToken ] = useLocalStorage('token', '');
  const [ initialDate, setInitialDate ] = useState('');
  const [ dueDate, setDueDate ] = useState('');
  const [ adultPax, setAdultPax ] = useState(1);
  const [ childPax, setChildPax ] = useState(1);
  
  const APIurl = "https://c05a3a4b-6ce4-4b73-bcb4-4adf00190f87-00-1cbacayl5uma6.pike.replit.dev/";

  return (
    <BookedList.Provider value={{ 
      token, setToken, APIurl, initialDate, setInitialDate,
      dueDate, setDueDate, adultPax, setAdultPax,
      childPax, setChildPax
    }}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainHome />} />
              <Route path="home" element={<Home />} />
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