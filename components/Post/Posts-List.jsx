import { FlashList } from "@shopify/flash-list";
import React, { useState, useCallback } from "react";
import { ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetchPosts from "../../hooks/useFetchPosts";
import { PostCard } from "./Post-Card";
import TEXT_CONTENT from "../../vars/text";
import { COLORS } from "../../vars/colors";
import { NotFound } from "./NotFound";

const PostsList = ({navigation, screenProps}) => {

  const { data, isLoading, isError, hasNextPage, fetchNextPage, refetch, reset } =
    useFetchPosts(screenProps.sort.sort, screenProps.filters.filters, screenProps.search.s); 

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    refetch({ refetchPage: (page, index) => {
      index === 0;
    }})
    .then(() => {
      screenProps.search.setSearchText('');
      setIsRefreshing(false)
    });
    
  }, [refetch]);

  
  const flattenData = data?.pages?.flatMap((page) => page.data) || [];

  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  if(data) {
    if(data.pages[0].data.length == 0) {
      return (
        <NotFound text={'Nothin Found'}/>
      )
    }
  }


  return (
    // <SafeAreaView style={{ flex: 1, marginTop: 0}} edges={['top', 'left', 'right']}>

      <FlashList 
        keyExtractor={(item, index) => index}
        data={flattenData}
        renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Article', { 
              id: item.id, 
              title: item.title, 
              date: item.date, 
              articleImage: item.featured_image 
              })}>
                <PostCard 
                    // key={index}
                    styles={index % 2 ? {backgroundColor: COLORS.gray_light} : null}
                    title={item.title ? item.title : TEXT_CONTENT.title_not_found}
                    imageUrl={
                        item.featured_image
                        ? item.featured_image
                        : 'https://www.softswiss.com/wp-content/themes/softswiss2022/dist/img/softswiss_logo-banner.png'
                    }
                    datePost={item.date ? item.date : 'Date'}
                />
            </TouchableOpacity>
        )}
        onEndReached={loadNext}
        onEndReachedThreshold={0.3}
        estimatedItemSize={100}
        ListFooterComponent={hasNextPage && isLoading && <ActivityIndicator />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
      />
    // </SafeAreaView>
  );
};

export default PostsList;
