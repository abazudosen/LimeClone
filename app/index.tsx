import { Stack, Link } from 'expo-router';

import Map from '~/components/Map';
import SelectedScooterSheet from '~/components/SelectedScooterSheet';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Map />
      <SelectedScooterSheet />
    </>
  );
}
