import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

const ChessBoard = () => {
  const squares = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) =>
        Array.from({ length: 8 }, (_, j) => ({
          key: `${i}-${j}`,
          color: (i + j) % 2 === 0 ? 'white' : 'black',
        }))
      ).flat(),
    []
  );

  return (
    <View style={styles.container}>
      {squares.map(({ key, color }) => (
        <View key={key} style={[styles.square, { backgroundColor: color }]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 320,
    height: 320,
  },
  square: {
    width: '12.5%',
    aspectRatio: 1,
  },
});

export default ChessBoard;
