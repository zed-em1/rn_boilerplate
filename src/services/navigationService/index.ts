import React from 'react';
import {
  CommonActions,
  StackActions,
  DrawerActions,
  TabActions,
} from '@react-navigation/native';

let _navigator: any;

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function navigate(routeName: string, params: any = {}) {
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    })
  );
}

//test start
function push(routeName: string, params: any) {
  _navigator.dispatch(
    StackActions.push(routeName, {
      params,
    })
  );
}

function replace(routeName: string, params: any) {

  _navigator.dispatch(StackActions.replace(routeName, params));
}
//test end

function goBack() {
  _navigator.dispatch(CommonActions.goBack());
}

function reset_0(routeName: string) {
  _navigator.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{ name: routeName }],
    })
  );
}

function toggleDrawer() {
  _navigator.dispatch(DrawerActions.toggleDrawer());
}
function openDrawer() {
  _navigator.dispatch(DrawerActions.openDrawer());
}
function closeDrawer() {
  _navigator.dispatch(DrawerActions.closeDrawer());
}

export const jumpTo = (routeName: string, params?: any) => {
  _navigator.dispatch(TabActions.jumpTo(routeName, params));
};

export default {
  setTopLevelNavigator,
  navigate,
  goBack,
  reset_0,
  push,
  toggleDrawer,
  openDrawer,
  closeDrawer,
  replace,
};
