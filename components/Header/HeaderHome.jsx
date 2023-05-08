import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Dimensions, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../vars/colors';
import TEXT_CONTENT from '../../vars/text';
import { CategoriesList } from '../Filters/CategoriesList';
import Popup from '../Filters/Popup';
import { SearchField } from '../Filters/Search';
import { SortButtons } from '../Filters/SortButtons';

const ScreenWidth = Dimensions.get('window').width;

const HeaderView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: ${ScreenWidth - 32}px;
 
`;

const HeaderLogo = styled.Image`
    width: 140px;
    height: 25px
`;
const HeaderRight = styled.View`
   
    flex-direction: row;
    align-items: center;
`;



export const HeaderHome = ({setSearchText, searchText}) => {
    // const [selectedCategories, setSelectedCategories] = useState([]);
    // const [categoriesList, setCategoriesList] = useState([]);

    // React.useEffect(() => {
    //     if(categoriesList && categoriesList.length == 0) {
    //         axios
    //         .get('https://ratemycasino.ca/wp-json/custom/v1/posts-categories/')
    //         .then((response) => {
    //             let checkoxData = [];
    //             response.data.map(item => checkoxData.push({label: item.name, value: item.slug}))
    //             setCategoriesList(checkoxData);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             alert('Error', 'Failed to get article');
    //         })
    //     } else {
    //     }
    // }, []);

    
    // const handleFilters = () => {
    //     let filters = {
    //         categories: selectedCategories
    //     }
    //     setFilters(filters);
    //     togglePopup()
    // };

    // const [showPopup, setShowPopup] = useState(false);

    // const togglePopup = () => {
    //   setShowPopup(!showPopup);
    // }

    return (
        <HeaderView>
            <HeaderLogo source={require('../../assets/icons/main_logo.png')} />


            
            <HeaderRight>
                <SearchField setSearchText={setSearchText} searchText={searchText}/>

                {/*<TouchableOpacity onPress={togglePopup}>
                    <Image style={styles.buttonFilter} source={require('../../assets/icons/filter_white.png')} />
                </TouchableOpacity>
                <Popup
                    visible={showPopup}
                    togglePopup={togglePopup}
                    content={<View>
                        <CategoriesList 
                            categoriesList={categoriesList} 
                            setCategoriesList={setCategoriesList} 
                            setSelectedCategories={setSelectedCategories}/>

                        <TouchableOpacity style={styles.applyButtonContainer}  onPress={() => handleFilters()}>
                            <Text style={styles.applyButton}>{TEXT_CONTENT.apply_text}</Text>
                        </TouchableOpacity>
                    </View>}
                /> */}
            </HeaderRight>

            
        </HeaderView>
    )
    
}

const styles = StyleSheet.create({
    applyButtonContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        marginTop: 10,
    },
    applyButton: {
        backgroundColor: COLORS.default,
        color: COLORS.white,
        width: '100%',
        padding: 12,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
    buttonFilter: {
        width: 20,
        height: 20,
    }
})