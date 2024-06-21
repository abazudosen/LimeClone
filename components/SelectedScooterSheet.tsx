import React, { useEffect, useRef } from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Text, Image, View, StyleSheet } from 'react-native';

import { Button } from './Button';
import scooterImage from '~/assets/scooter.png';
import { useScooter } from '~/providers/scooterProvider';

type Scooter = {
  id: string;
};

type UseScooterType = {
  selectedScooter: Scooter | null;
  duration: number;
  distance: number;
  isNearby: boolean;
};

export default function SelectedScooterSheet() {
  const { selectedScooter, duration, distance, isNearby }: UseScooterType | any = useScooter();

  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (selectedScooter) {
      bottomSheetRef.current?.expand();
    }
  }, [selectedScooter]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={[200]}
      enablePanDownToClose
      backgroundStyle={styles.bottomSheetBackground}>
      {selectedScooter && (
        <BottomSheetView style={styles.bottomSheetContent}>
          {/* TOP part */}
          <View style={styles.topPart}>
            <Image source={scooterImage} style={styles.scooterImage} />
            <View style={styles.scooterInfo}>
              <Text style={styles.scooterName}>Lime - S</Text>
              <Text style={styles.scooterDetails}>id-{selectedScooter.id} · Madison Avenue</Text>
            </View>
            <View style={styles.scooterStats}>
              <View style={styles.statItem}>
                <FontAwesome6 name="flag-checkered" size={18} color="#42E100" />
                <Text style={styles.statText}>{(distance / 1000).toFixed(1)} km</Text>
              </View>
              <View style={styles.statItem}>
                <FontAwesome6 name="clock" size={18} color="#42E100" />
                <Text style={styles.statText}>{(duration / 60).toFixed(0)} min</Text>
              </View>
            </View>
          </View>
          {/* Bottom part */}
          <View>
            <Button title="Start journey" disabled={!isNearby} />
          </View>
        </BottomSheetView>
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: '#414442',
    opacity: 0.97,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 10,
    gap: 20,
  },
  topPart: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  scooterImage: {
    width: 60,
    height: 60,
  },
  scooterInfo: {
    flex: 1,
    gap: 5,
  },
  scooterName: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  scooterDetails: {
    color: 'gray',
    fontSize: 18,
  },
  scooterStats: {
    gap: 5,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
  },
  statText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
