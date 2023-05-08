import axios from "axios";
import React from "react";
import { useWindowDimensions } from "react-native";
import { Text, View, Image, ScrollView } from "react-native";
import RenderHTML from "react-native-render-html";
import styled from "styled-components";
import { ArticleBanner } from "../components/Article/Banner";
import ShareButton from "../components/Article/Share";
import { Loading } from "../components/Loading";
import TEXT_CONTENT from "../vars/text";

const PostContent = styled.View`
    padding: 15px;
`;

const PostTitle = styled.Text`
    font-size: 24px;
    padding-top: 10px;
    padding-bottom: 15px;
    font-weight: 600;
`;
const PostDate = styled.Text`
    margin: 8px 0;
    font-size: 13px;
    color: #000;
`;

const PostImage = styled.Image`
    height: 200px;
    border-radius: 6px;
`;

export const ArticleScreen = ({ route, navigation, setPostData, data }) => {
    const [isLoading, setIsLoading] = React.useState(true);

    const [bannerData, setBannerData] = React.useState([]);
    
    const { id, title, date, articleImage } = route.params;

    const { width } = useWindowDimensions();

    function removeIFrameTagsFromString(str) {
      const regex = /<iframe[\s\S]*?<\/iframe>/gi;
      return str.replace(regex, "");
    }
  
    React.useEffect(() => {
      navigation.setOptions({
        title: TEXT_CONTENT.back
      });
      Promise.all([
        axios.get('https://ratemycasino.ca/wp-json/wp/v2/posts?include=' + id),
        axios.get('https://ratemycasino.ca/wp-json/custom/v1/popular-casino/')
      ]).then(([
        articleData,
        bannerCasinoData
      ]) => {
        articleData.data[0].title_article = title;
        setPostData(articleData.data[0])
        setBannerData(bannerCasinoData.data);
      }) 
      .catch((err) => {
        console.log(err);
        alert('Error', 'Failed to get article');
      })
      .finally(() => {
        setIsLoading(false);
      });
      // axios
      //   .get('https://ratemycasino.ca/wp-json/wp/v2/posts?include=' + id)
      //   .then((response) => {
      //     response.data[0].title_article = title;
      //     setPostData(response.data[0])
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     alert('Error', 'Failed to get article');
      //   })
      //   .finally(() => {
      //     setIsLoading(false);
      //   });
    }, []);

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

  
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Loading />
        </View>
      );
    }
    return (
      <View style={{paddingBottom: 120}}>
        <ScrollView >
            <PostContent>
                <PostImage source={{ uri: articleImage ? articleImage : 'https://www.softswiss.com/wp-content/themes/softswiss2022/dist/img/softswiss_logo-banner.png' }} />
                <PostTitle>{title}</PostTitle>
                <PostDate>{date}</PostDate>
                <RenderHTML 
                    contentWidth={width}
                    source={{html: removeIFrameTagsFromString(data.content.rendered) }}
                />
            </PostContent>
        </ScrollView>   
        <ArticleBanner bannerData={bannerData}/>     
      </View>

        
    )
}
