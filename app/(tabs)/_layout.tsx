import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];

  return (
    <NativeTabs
      tintColor={colors.text}
      labelStyle={{
        color: colors.text,
        fontSize: 11,
        fontWeight: '700',
      }}
      backgroundColor={colors.tabBar}
      blurEffect="systemChromeMaterial"
      shadowColor={colors.depthShadow}>
      <NativeTabs.Trigger name="discover">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'sparkles', selected: 'sparkles' }}
          src={<NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="auto-awesome" />}
        />
        <NativeTabs.Trigger.Label>Discover</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="genres">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'books.vertical', selected: 'books.vertical.fill' }}
          src={<NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="menu-book" />}
        />
        <NativeTabs.Trigger.Label>Genres</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="gifts">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'gift', selected: 'gift.fill' }}
          src={<NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="card-giftcard" />}
        />
        <NativeTabs.Trigger.Label>Gifts</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'person', selected: 'person.fill' }}
          src={<NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="person" />}
        />
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
