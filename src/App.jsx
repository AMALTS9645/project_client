import "./app.scss";
import { houseInputs, landInputs } from "./formSource";
import Home from "./pages/Home/Home";
import List from "./pages/List/List";
import Land from "./pages/Land/Land";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import SingleListItem from "./pages/SingleListItem/SingleListItem";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EmailVerify from "./pages/EmailVerify/EmailVerify";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import SingleLandItem from "./pages/SingleLandItem/SingleLandItem";
import NewList from "./pages/newList/NewList";
import NewLand from "./pages/newLand/NewLand";
import MyPost from "./pages/MyPost/MyPost";
import Messenger from "./pages/Messenger/Messenger";
import Payment from "./pages/Payment/Payment";
import PaymentSuccess from "./pages/paymentSuccess/PaymentSuccess";
import Support from "./pages/Support/Support";
import SingleTicket from "./pages/SingleTicket/SingleTicket";
import About from "./pages/About/About";
// import moment from "moment";
// console.log(moment().format("L"));

const App = () => {
  const user = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {user && <Route path="/" exact element={<Home user={user} />} />}
          <Route
            path="/signup"
            exact
            element={user ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/messenger"
            element={
              user ? <Messenger user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/lists"
            element={user ? <List user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/lists/new"
            element={
              user ? (
                <NewList user={user} inputs={houseInputs} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/lists/:id"
            element={
              user ? <SingleListItem user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/MyItem"
            element={user ? <MyPost user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/lands"
            element={user ? <Land user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/lands/new"
            element={
              user ? (
                <NewLand user={user} inputs={landInputs} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/lands/:id"
            element={
              user ? <SingleLandItem user={user} /> : <Navigate to="/login" />
            }
          />
          <Route path="/" exact element={<Navigate replace to="/login" />} />
          <Route
            path="/users/:id/verify/:token"
            exact
            element={<EmailVerify />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/password-reset/:id/:token"
            element={<PasswordReset />}
          />
          <Route
            path="/payments"
            element={user ? <Payment /> : <Navigate to="/login" />}
          />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route
            path="/support"
            element={user ? <Support user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/singleticket/:id"
            element={
              user ? <SingleTicket user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/about"
            element={user ? <About user={user} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
