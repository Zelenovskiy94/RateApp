import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../vars/colors';

const ScreenWidth = Dimensions.get('window').width;

export const SearchField = ({searchText, setSearchText}) => {
    const [showInput, setShowInput] = useState(false);
    const inputAnim = useRef(new Animated.Value(0)).current;
    const searchAnim = useRef(new Animated.Value(1)).current;


    function setTextField (text) {
        setSearchText(text)
    }

    const handleSearchIconPress = () => {
        setShowInput(true);
        Animated.parallel([
        Animated.timing(inputAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }),
        Animated.timing(searchAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }),
        ]).start();
    };

    const handleBlur = () => {
        Animated.parallel([
        Animated.timing(inputAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }),
        Animated.timing(searchAnim, {
            toValue: 1,
            delay: 100,
            duration: 450,
            useNativeDriver: true,
        }),
        ]).start(() => setShowInput(false));
    };

    const inputTranslateX = inputAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [ScreenWidth - 100, 30],
    });

    const searchOpacity = searchAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const clearInput = () => {
        inputRef.current.clear();
        handleBlur();
        setSearchText('')
    };

    const inputRef = useRef(null);

    return (
        <View style={[styles.container]}>
            {showInput && (
                <Animated.View style={[styles.inputContainer, { transform: [{ translateX: inputTranslateX }] }]}>
                    <TextInput
                        ref={inputRef}
                        style={styles.input}
                        placeholder="Search"
                        placeholderTextColor="#b1b1b1"
                        autoFocus={true}
                        value={searchText}
                        onChangeText={setTextField}
                        onBlur={handleBlur}
                    />
                    <TouchableOpacity onPress={clearInput} style={styles.clearIconContainer}>
                        <Ionicons name="close" size={16} color={COLORS.black} />
                    </TouchableOpacity>
                </Animated.View>
            )}
            <Animated.View style={[styles.searchIconContainer, { opacity: searchOpacity, pointerEvents: showInput ? 'none' : 'box-none', }]}>
                <TouchableOpacity onPress={handleSearchIconPress}>
                    <Ionicons name="search" size={24} color={COLORS.black} />
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden', 
  },
  searchIconContainer: {
    backgroundColor: COLORS.white,
    padding: 5,
  },
  inputContainer: {
    // flex: 1,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden', 
  },
  input: {
    width: ScreenWidth - 210,
    paddingVertical: 5,
    borderBottomColor: COLORS.default,
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    color: COLORS.black
  },
  clearIconContainer: {
    padding: 5,
    position: 'absolute',
    right: 0
  },
});
