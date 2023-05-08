import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const WINDOW_WIDTH = Dimensions.get('window').width;

const CheckboxForm = ({
  dataSource = [], 
  formHorizontal = false,
  labelHorizontal = true,
  itemShowKey = 'label',
  itemCheckedKey = 'checked',
  iconSize = 20,
  iconColor = '#2f86d5',
  textStyle,
  onChecked
}) => {
  const [data, setData] = useState(dataSource);

  const onPress = (item, index) => {
    const newData = [...data];
    newData[index] = item;
    setData(newData);

    if (onChecked) {
      onChecked(newData);
    }
  };

  const renderCheckItem = (item, index) => {
    const isChecked = item[itemCheckedKey] || false;

    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => { 
          item[itemCheckedKey] = !isChecked;
          onPress(item, index);
        }}
      >
        <View
          style={{
            flexDirection: labelHorizontal ? 'row' : 'column',
            padding: 10,
            paddingLeft: 0
          }}
        >
          <Icon
            name={isChecked ? 'md-checkbox' : 'ios-square-outline'}
            size={iconSize}
            color={iconColor}
          />
          <View style={{ marginLeft: 5 }}>
            <Text style={{ ...textStyle }}>{'' + item[itemShowKey]}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <ScrollView
      horizontal={formHorizontal}
      style={[{ width: WINDOW_WIDTH }, textStyle]}
    >
      {data.map((item, index) => renderCheckItem(item, index))}
    </ScrollView>
  );
};

CheckboxForm.propTypes = {
  dataSource: PropTypes.array,
  formHorizontal: PropTypes.bool,
  labelHorizontal: PropTypes.bool,
  itemShowKey: PropTypes.string,
  itemCheckedKey: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  onChecked: PropTypes.func,
};

export default CheckboxForm;
