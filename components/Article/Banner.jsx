import styled from "styled-components"
import { COLORS } from "../../vars/colors"
import { AntDesign } from '@expo/vector-icons'; 
import { Button, Text, Linking, TouchableOpacity, StyleSheet } from "react-native";

const ArticleBannerView = styled.View`
    padding: 20px;
    padding-bottom: 30px;
    position: absolute;
    flex: 1;
    bottom: 0;
    width: 100%;
    background-color: ${COLORS.default};
    align-items: center;
    flex-direction: row;
`
const BannerImage = styled.Image`
    width:  70px;
    height: 70px;
    margin-right: 15px;
    border-radius: 6px;
`

const BannerDetails = styled.View`
    margin-right: 15px;
    max-width: 39%;
`

const BannerDetailsTitle = styled.Text`
    color: ${COLORS.white};
    font-size: 16px;
    font-weight: 700;

`
const BannerDetailsRating = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
`


export const ArticleBanner = ({bannerData}) => {

    return (
        <ArticleBannerView>
            <BannerImage source={{uri: bannerData.icon}}/>
            <BannerDetails>
                <BannerDetailsTitle numberOfLines={2}>{bannerData.name}</BannerDetailsTitle>
                <BannerDetailsRating>
                    <AntDesign name="star" size={22} color="#F09937" />
                    <Text style={{color: COLORS.white, fontSize: 16, marginLeft: 3}}>{bannerData.rating}/5</Text>
                </BannerDetailsRating>
            </BannerDetails>
            <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(bannerData.url)} >
                <Text style={styles.buttonText}>Play Now</Text>
            </TouchableOpacity>

        </ArticleBannerView>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff001e',
        marginLeft: 'auto'
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
    }
})