import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Colors } from '../../constants/Colors';

const CustomDeleteBottomSheet = ({ innerRef, snapPoints, onClose, onDelete, loader, open }) => {
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  return (
    <BottomSheet
      ref={innerRef}
      index={-1}
      snapPoints={snapPoints}
      open={open}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      enableOverDrag={true}
      backgroundStyle={styles.container}>
      <View style={styles.sheetHeader}>
        <Text style={styles.sheetHeaderTitle}>Are you sure you want to delete?</Text>
      </View>
      <View style={styles.sheetDisplay}>
        <View style={styles.sheetDisplayButtons}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: Platform.OS === 'ios' ? Colors.white : Colors.Warning
              }
            ]}
            onPress={onClose}>
            <Text
              style={[
                styles.buttonText,
                { color: Platform.OS === 'ios' ? Colors.Warning : Colors.white }
              ]}>
              Cancel
            </Text>
          </TouchableOpacity>

          {loader ? (
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: Platform.OS === 'ios' ? Colors.white : Colors.primary
                }
              ]}>
              <ActivityIndicator
                size="small"
                color={Platform.OS === 'ios' ? Colors.primary : Colors.white}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: Platform.OS === 'ios' ? Colors.white : Colors.primary
                }
              ]}
              onPress={onDelete}>
              <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </BottomSheet>
  );
};

export default CustomDeleteBottomSheet;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    elevation: 20,
    shadowOpacity: 0.5
  },
  sheetHeader: {
    alignItems: 'center',
    marginTop: 10
  },
  sheetHeaderTitle: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.black,
    paddingBottom: 5
  },
  sheetDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10
  },
  sheetDisplayButtons: {
    width: '80%',
    flexDirection: 'row',
    //alignItems:'center',
    justifyContent: 'space-between'
  },
  button: {
    width: '30%',
    height: 45,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 5,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10
  },
  buttonText: {
    fontSize: Platform.OS === 'ios' ? 22 : 18,
    color: Platform.OS === 'ios' ? Colors.Primary : Colors.white,
    fontWeight: 'bold'
  }
});
