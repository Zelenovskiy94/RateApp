import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity , StyleSheet} from "react-native"
import styled from 'styled-components/native';

import sortImageASC from '../../assets/icons/sort_ASC.svg';

const SortButtonsView = styled.View`
    margin-right: 15px;
    overflow: hidden;
`;

const SortImage = styled.Image`
    width: 28px;
    height: 28px;
`

export const SortButtons = ({sort, setSort}) => {
    const toggleSort = () => {
        let currentSort = sort == 'DESC' ? 'ASC' : 'DESC';
        setSort(currentSort)
    }

    return (
        <SortButtonsView style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <TouchableOpacity style={styles.sortButtonContainer}  onPress={() => toggleSort()}>
                <SortImage source={sort === 'DESC' ? require('../../assets/icons/sort_DESC_white.png') : require('../../assets/icons/sort_ASC_white.png')} />
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.sortButtonContainer}  onPress={() => handleSort('DESC')}>
            <Text style={[styles.sortButton , { backgroundColor: sort === 'DESC' ? '#fbba00' : 'transparent' }]}>Latest First</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sortButtonContainer}  onPress={() => handleSort('ASC')}>
            <Text style={[styles.sortButton , { backgroundColor: sort === 'ASC' ? '#fbba00' : 'transparent' }]}>Oldest First</Text>
            </TouchableOpacity> */}
        </SortButtonsView>
    )
}

const styles = StyleSheet.create({
    sortButton: {
      padding: 10,
      textAlign: 'center',
    },
  })