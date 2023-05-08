import React from 'react';
import { TouchableOpacity, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../vars/colors';

const ShareButton = ({ title, url }) => {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        title: title,
        message: url,
        url: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity onPress={handleShare}>
      <Ionicons name="share-social-outline" size={24} color={COLORS.black} />
    </TouchableOpacity>
  );
};

export default ShareButton;
