import React, { useCallback } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Colors } from '../../constants/Colors';

const CustomBottomSheet = ({ sheetRef, snapPoints, children, ...rest }) => {
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  return (
    <BottomSheet
      {...rest}
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      enableOverDrag={true}
      backgroundStyle={{ backgroundColor: Colors.White_Smoke }}
      backdropComponent={renderBackdrop}>
      {children}
    </BottomSheet>
  );
};

export default CustomBottomSheet;
