import { useRoute } from "@react-navigation/native";
import PostsList from "../components/Post/Posts-List";


const Home = ({ navigation, screenProps }) => {
  return (
    <PostsList navigation={navigation} screenProps={screenProps} />
  );
};

export default Home;