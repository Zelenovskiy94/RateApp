import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import { ArticleScreen } from '../screens/Article';
import { COLORS } from '../vars/colors';
import { HeaderHome } from './Header/HeaderHome';
import { HeaderPostRight } from './Header/HeaderPostRight';
import { useState } from 'react';

const Stack = createNativeStackNavigator();


export const Navigation = () => {
  const [sort, setSort] = useState('DESC');
  const [filters, setFilters] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState('');

  const [postData, setPostData] = useState([]);

  const screenProps = {
    sort: {
      sort,
      setSort
    },
    filters: {
      filters,
      setFilters
    },
    search: {
      s: searchText,
      setSearchText: setSearchText,
    },
    paged: {
      page,
      setPage
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={({ navigation, route }) => ({ 
          title: 'News',
          headerTitle: () => <HeaderHome sort={sort} setSort={setSort} searchText={searchText}  setSearchText={setSearchText}/>,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerTintColor: COLORS.black,
          headerTitleStyle: { 
            fontWeight: 'bold',
          },
        })}>
          {(props) => <Home {...props} screenProps={screenProps} />}
        </Stack.Screen>
        <Stack.Screen name="Article" 
          options={({ navigation, route }) => ({
            title: 'Article' ,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
            headerTintColor: COLORS.black,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
            headerRight: () => (
              <HeaderPostRight postData={postData}/>
            ),
          })}
        >
          {(props) => <ArticleScreen {...props} data={postData} setPostData={setPostData} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
