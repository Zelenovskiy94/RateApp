import { Modal, TouchableWithoutFeedback, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Popup = ({ content, visible = false, togglePopup }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={togglePopup}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.popup}>
        <View style={styles.popupTop}>
            <Text></Text>
            <TouchableOpacity onPress={togglePopup} style={styles.closeButton}>
                <Image style={styles.closeButtonImage} source={require('../../assets/icons/close-icon.png')} />
            </TouchableOpacity>
        </View>
        {content}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popup: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    paddingTop: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  popupTop: {
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
  },
  closeButtonImage: {
    width: 20,
    height: 20,
    marginLeft: 'auto'
  }
});

export default Popup;
