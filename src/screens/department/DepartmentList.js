import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import HeaderBar from '../../components/header/HeaderBar';
import { Swipeable } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { Colors } from '../../constants/Colors';
import { Card } from '@rneui/themed';
import CustomDeleteBottomSheet from '../../components/bottomsheet/CustomDeleteBottomSheet';
import { deleteDepartment } from '../../redux/actions/departmentlist';
import RightSwipe from '../../components/RightSwipe';

const DepartmentList = ({ navigation }) => {
  const departmentlist = useSelector((state) => state.department.departmentlist);
  const sheetRef = useRef(null);
  const snapPoints = ['20%', '30%'];
  const [cardRow] = useState([]);
  const [prevOpenCard, setPrevOpenCard] = useState(null);
  const [departmentId, setDepartmentId] = useState();
  const dispatch = useDispatch();

  const departments = [
    { label: 'Dry Cleaning', value: '1' },
    { label: 'Room Service', value: '2' },
    { label: 'Food Service', value: '3' },
    { label: 'Valet Parking', value: '4' },
    { label: 'Reception', value: '5' },
  ];

  const handleOpenSheet = () => {
    sheetRef.current?.snapToIndex(0);
  };

  const handleCloseSheet = () => {
    sheetRef.current?.close();
  };

  const closeCard = async (index) => {
    if (prevOpenCard && prevOpenCard !== cardRow[index]) {
      await prevOpenCard.close();
    }
    setPrevOpenCard(cardRow[index]);
  };

  const onNavEdit = (department) => {
    navigation.navigate('add_department', {
      department,
      edit: true
    });
  };

  const getDepartmentName = (value) => {
    console.log(value)
    return departments.filter((item) => item.value == value).map((item) => item.label);
  };
  //console.log(getDepartmentName());

  const deleteDepartmentId = async () => {
    await dispatch(deleteDepartment(departmentId));
    handleCloseSheet();
  };

  const addDepartment = () => {
    navigation.navigate('add_department', {
      edit: false
    });
  };

  return (
    <View style={styles.rootContainer}>
    <HeaderBar title={'Departments'} navigation={navigation} onPress={addDepartment} />
    <FlatList
      data={departmentlist}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => {
        return (
          <Swipeable
            key={item.id}
            ref={(ref) => (cardRow[index] = ref)}
            friction={2}
            rightThreshold={10}
            overshootRight={false}
            onSwipeableOpen={() => {
              setDepartmentId(item.id);
              closeCard(index);
            }}
            renderRightActions={(progress, dragX) => (
              <RightSwipe
                progress={progress}
                dragX={dragX}
                onEdit={() => onNavEdit(item)}
                onDelete={handleOpenSheet}
              />
            )}>
            <Card key={index} containerStyle={styles.cardHolder}>
              <View style={styles.holder}>
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <View>
                  <Text style={styles.role}>{getDepartmentName(item.department_name)}</Text>
                </View>
              </View>
            </Card>
          </Swipeable>
        );
      }}
    />
    <CustomDeleteBottomSheet
      innerRef={sheetRef}
      snapPoints={snapPoints}
      onClose={handleCloseSheet}
      onDelete={deleteDepartmentId}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.primary
  },
  cardHolder: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    elevation: 10,
    marginHorizontal: 20
  },
  holder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black
  },
  role: {
    fontSize: 16,
    color: Colors.grey
  }
});

export default DepartmentList;
