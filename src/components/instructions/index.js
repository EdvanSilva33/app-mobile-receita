import { View, Text, StyleSheet } from "react-native";



export function Instruction({data, index}){
    return(
        <View style={styles.container}>
            <Text style={styles.number}>{index+1} - </Text>
            <Text style={styles.text}>{data.text}</Text>
        </View>
    )
}   
const styles = StyleSheet.create({
container:{
    flexDirection: "row",
    padding:8,
},
number:{
    fontWeight:"bold",
    fontSize:18,
},
text:{
    lineHeight:20,
}

}) 