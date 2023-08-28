import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import HeaderBar from '../../components/header/HeaderBar';
import { Swipeable } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { Colors } from '../../constants/Colors';
import { Card } from '@rneui/themed';
import CustomDeleteBottomSheet from '../../components/bottomsheet/CustomDeleteBottomSheet';
import { deleteUser, getUsers } from '../../redux/actions/usermanagement';
import RightSwipe from '../../components/RightSwipe';

const UserManagement = ({ navigation }) => {
  const userlist = useSelector((state) => state.usermanagement.userlist);
  console.log(userlist,'main');
  //const role = userlist && userlist?.Roles?.map((item) => console.log(item.name,'plk'));
  //console.log(role,'role')

  const sheetRef = useRef(null);
  const snapPoints = ['20%', '30%'];
  const [cardRow] = useState([]);
  const [prevOpenCard, setPrevOpenCard] = useState(null);
  const [userId, setUserId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  },[]);

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

  const onNavEdit = (user) => {
    navigation.navigate('adduser', {
      user,
      edit: true
    });
  };

  const deleteuserId = async () => {
    await dispatch(deleteUser(userId));
    handleCloseSheet();
  };

  const adduser = () => {
    navigation.navigate('adduser', {
      edit: false
    });
  };

  return (
    <View style={styles.rootContainer}>
      <HeaderBar title={'User Management'} navigation={navigation} onPress={adduser} />
      <FlatList
        data={userlist}
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
                setUserId(item.id);
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
              <Card containerStyle={styles.cardHolder}>
                <View style={styles.holder}>
                  <View>
                    <Text style={styles.name}>{item.userName}</Text>
                  </View>
                  <View>
                    <Text style={styles.role}>{item?.Roles[0]?.name}</Text>
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
        onDelete={deleteuserId}
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

export default UserManagement;
