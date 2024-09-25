import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

// Local Imports
import {TabRoute} from '../NavigationRoutes';
import {TabNav} from '../NavigationKeys';
import {styles} from '../../themes';
import {getHeight} from '../../common/constants';
import strings from '../../i18n/strings';
import CText from '../../components/common/CText';
import {
  InboxInActive,
  Inbox_Dark,
  Inbox_Light,
  HomeInActive,
  Home_Dark,
  Home_Light,
  OrderInActive,
  Order_Dark,
  Order_Light,
  ProfileInActive,
  Profile_Dark,
  Profile_Light,
  WalletInActive,
  Wallet_Dark,
  Wallet_Light,
} from '../../assets/svgs';

export default function TabBarNavigation() {
  const colors = useSelector(state => state.theme.theme);
  const Tab = createBottomTabNavigator();

  const TabText = memo(({IconType, label, focused}) => (
    <View style={localStyle.tabViewContainer}>
      {IconType}
      <CText
        style={styles.mt5}
        numberOfLines={1}
        color={focused ? colors.textColor : colors.grayScale5}
        type={'R14'}>
        {label}
      </CText>
    </View>
  ));

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: [
          localStyle.tabBarStyle,
          {backgroundColor: colors.backgroundColor},
        ],
        tabBarShowLabel: false,
      }}
      initialRouteName={TabNav.HomeTab}>
      <Tab.Screen
        name={TabNav.HomeTab}
        component={TabRoute.HomeTab}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              IconType={
                focused ? (
                  colors.dark ? (
                    <Home_Dark />
                  ) : (
                    <Home_Light />
                  )
                ) : (
                  <HomeInActive />
                )
              }
              focused={focused}
              label={strings.home}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.CartTab}
        component={TabRoute.CartTab}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              IconType={
                focused ? (
                  colors.dark ? (
                    <Inbox_Light />
                  ) : (
                    <Inbox_Dark />
                  )
                ) : (
                  <InboxInActive />
                )
              }
              focused={focused}
              label={strings.cart}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.OrderTab}
        component={TabRoute.OrderTab}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              IconType={
                focused ? (
                  colors.dark ? (
                    <Order_Dark />
                  ) : (
                    <Order_Light />
                  )
                ) : (
                  <OrderInActive />
                )
              }
              focused={focused}
              label={strings.orders}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.WalletTab}
        component={TabRoute.WalletTab}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              IconType={
                focused ? (
                  colors.dark ? (
                    <Wallet_Dark />
                  ) : (
                    <Wallet_Light />
                  )
                ) : (
                  <WalletInActive />
                )
              }
              focused={focused}
              label={strings.wallet}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.ProfileTab}
        component={TabRoute.ProfileTab}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              IconType={
                focused ? (
                  colors.dark ? (
                    <Profile_Dark />
                  ) : (
                    <Profile_Light />
                  )
                ) : (
                  <ProfileInActive />
                )
              }
              focused={focused}
              label={strings.profile}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const localStyle = StyleSheet.create({
  tabBarStyle: {
    height: getHeight(60),
    ...styles.ph20,
    borderTopWidth: 0,
  },
  tabViewContainer: {
    ...styles.center,
  },
});
