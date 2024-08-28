// Tab Routes
import HomeTab from '../containers/tabbar/home/HomeTab';
import CartTab from '../containers/tabbar/cart/CartTab';
import OrderTab from '../containers/tabbar/order/OrderTab';
import WalletTab from '../containers/tabbar/wallet/WalletTab';
import ProfileTab from '../containers/tabbar/profile/ProfileTab';

// // Screens Route
import Splash from '../containers/auth/Splash';
import WelcomeScreen from '../containers/WelcomeScreen';
import OnBoarding from '../containers/OnBoarding';
import Login from '../containers/auth/Login';
import Register from '../containers/auth/Register';
import TabBar from './Type/TabBarNavigation';
import Connect from '../containers/auth/Connect';
import SelectInterest from '../containers/auth/SelectInterest';
import SetPin from '../containers/auth/SetPin';
import SetUpProfile from '../containers/auth/SetUpProfile';
import SetSecure from '../containers/auth/SetSecure';
import ForgotPassword from '../containers/auth/ForgotPassword';
import ForgotPasswordOtp from '../containers/auth/ForgotPasswordOtp';
import CreateNewPassword from '../containers/auth/CreateNewPassword';
import Birthday from '../containers/auth/Birthday';
import Gender from '../containers/auth/Gender';
import AddAddress from '../containers/tabbar/profile/AddAddress';
import AddNewCard from '../containers/tabbar/profile/AddNewCard';
import Address from '../containers/tabbar/profile/Address';
import HelpCenter from '../containers/tabbar/profile/HelpCenter';
import Language from '../containers/tabbar/profile/Language';
import NotificationSetting from '../containers/tabbar/profile/NotificationSetting';
import Payment from '../containers/tabbar/profile/Payment';
import PrivacyPolicy from '../containers/tabbar/profile/PrivacyPolicy';
import Security from '../containers/tabbar/profile/Security';
import InviteFriends from '../containers/tabbar/profile/InviteFriends';
import CustomerService from '../containers/tabbar/profile/CustomerService';
import EReceipt from '../containers/tabbar/wallet/EReceipt';
import TopUpEWallet from '../containers/tabbar/wallet/TopUpEWallet';
import TransactionHistory from '../containers/tabbar/wallet/TransactionHistory';
import Completed from '../containers/tabbar/order/Completed';
import OnGoing from '../containers/tabbar/order/OnGoing';
import TrackOrder from '../containers/tabbar/order/TrackOrder';
import MostPopular from '../containers/tabbar/home/MostPopular';
import MyWishlist from '../containers/tabbar/home/MyWishlist';
import Notification from '../containers/tabbar/home/Notification';
import SpecialOffers from '../containers/tabbar/home/SpecialOffers';
import ProductDetail from '../containers/tabbar/home/ProductDetail';
import ProductCategory from '../containers/tabbar/home/ProductCategory';
import Search from '../containers/tabbar/home/Search';
import Reviews from '../containers/tabbar/home/Reviews';
import CheckOut from '../containers/tabbar/cart/CheckOut';
import AddPromo from '../containers/tabbar/cart/AddPromo';
import ChooseShipping from '../containers/tabbar/cart/ChooseShipping';
import CallingScreen from '../containers/tabbar/inbox/CallingScreen';

export const TabRoute = {
  HomeTab,
  CartTab,
  OrderTab,
  WalletTab,
  ProfileTab,
};

export const StackRoute = {
  Splash,
  WelcomeScreen,
  OnBoarding,
  Login,
  Register,
  TabBar,
  Connect,
  SelectInterest,
  SetPin,
  SetUpProfile,
  SetSecure,
  ForgotPassword,
  ForgotPasswordOtp,
  CreateNewPassword,
  Birthday,
  Gender,
  AddAddress,
  AddNewCard,
  Address,
  HelpCenter,
  Language,
  NotificationSetting,
  Payment,
  PrivacyPolicy,
  Security,
  InviteFriends,
  CustomerService,
  EReceipt,
  TopUpEWallet,
  TransactionHistory,
  Completed,
  OnGoing,
  TrackOrder,
  MostPopular,
  MyWishlist,
  Notification,
  SpecialOffers,
  ProductDetail,
  ProductCategory,
  Search,
  Reviews,
  CheckOut,
  AddPromo,
  ChooseShipping,
  CallingScreen,
};
