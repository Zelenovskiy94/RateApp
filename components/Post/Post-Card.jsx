import { StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../vars/colors';

const PostView = styled.View`
  overflow: hidden;
  margin-top: 0;

  flex: 1;
  flex-direction: row;
  padding: 20px 15px;
  align-items: flex-start;
  
`;

const PostImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  overflow: hidden;
`;

const PostDate = styled.Text`
  font-size: 14px;
  margin-bottom: 5px;
`;
const PostTitle = styled.Text`
  font-size: 18px;
  flex: 1
`;
const PostDetail = styled.View`
  padding-left: 10px;
  flex: 1;

`;

export const PostCard = ({title, imageUrl, shortDescription, datePost, authorPost, styles}) => {
 return (
    <PostView style={styles ? styles : {}}>
      <PostImage source={{uri: imageUrl}} />
      <PostDetail>
        <PostDate>{datePost}</PostDate>
        <PostTitle numberOfLines={2}>{title}</PostTitle>
      </PostDetail>
    </PostView>
 )
    
}
