import React, { useState } from 'react';
import Mapbox, {
  Camera,
  CircleLayer,
  Images,
  LineLayer,
  LocationPuck,
  MapView,
  ShapeSource,
  SymbolLayer,
} from '@rnmapbox/maps';
import { featureCollection, point } from '@turf/helpers';
import { Feature, FeatureCollection, Point } from 'geojson'; // Import types from geojson

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');
import pin from '~/assets/pin.png';
import scooters from '~/data/scooters.json';
import { OnPressEvent } from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';
import { useScooter } from '~/providers/scooterProvider';

type Scooter = {
  long: number;
  lat: number;
};

const Map = () => {
  const { setSelectedScooter, directionCoordinates }: any = useScooter();

  const points: Feature<Point>[] = scooters.map((scooter: Scooter) =>
    point([scooter.long, scooter.lat], { scooter })
  );

  // Create a FeatureCollection from the points array
  const scooterCollection: FeatureCollection<Point> = featureCollection(points);

  const onPointPress = async (event: OnPressEvent) => {
    if (event.features[0].properties?.scooter) {
      setSelectedScooter(event.features[0].properties.scooter);
    }
    // console.log(event);
  };

  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera followZoomLevel={16} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />

      <Images images={{ pin }} />

      <ShapeSource id="scooters" shape={scooterCollection} onPress={onPointPress}>
        <SymbolLayer
          id="clusters-count"
          style={{
            textField: ['get', 'point_count'],
            textSize: 18,
            textColor: '#ffffff',
            textPitchAlignment: 'map',
          }}
        />

        <CircleLayer
          id="clusters"
          belowLayerID="clusters-count"
          filter={['has', 'point_count']}
          style={{
            circlePitchAlignment: 'map',
            circleColor: '#42E100',
            circleRadius: 20,
            circleOpacity: 1,
            circleStrokeWidth: 2,
            circleStrokeColor: 'white',
          }}
        />

        <SymbolLayer
          id="scooter-icons"
          filter={['!', ['has', 'point_count']]}
          style={{
            iconImage: 'pin',
            iconSize: 0.5,
            iconAllowOverlap: true,
            iconAnchor: 'bottom',
          }}
        />

        {directionCoordinates && (
          <ShapeSource
            id="routeSource"
            lineMetrics
            shape={{
              properties: {},
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: directionCoordinates,
              },
            }}>
            <LineLayer
              id="exampleLineLayer"
              style={{
                lineColor: '#42E100',
                lineCap: 'round',
                lineJoin: 'round',
                lineWidth: 7,
              }}
            />
          </ShapeSource>
        )}
      </ShapeSource>
    </MapView>
  );
};

export default Map;
