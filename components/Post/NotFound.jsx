import { Text, View } from "react-native"
import { COLORS } from "../../vars/colors"

export const NotFound = ({text}) => {
    return (
        <View      
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{color: COLORS.black, fontSize: 24}}>{text}</Text>
        </View>
    )
}