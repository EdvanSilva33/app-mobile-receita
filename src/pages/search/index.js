import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import api from "../../services/api";
import {FoodList} from "../../components/foodlist"

export function Search(){

    const route = useRoute();
    const [receipes, setReceipes] = useState([])

    useEffect( () => {
        async function fetchReceipes(){
const response = await api.get(`/foods?name_like=${route.params?.name}`)
        setReceipes(response.data);
}
        fetchReceipes();

    },[route.params?.name])

    return(
        <View style={styles.container}>
              <FlatList
            showsVerticalScrollIndicator={false}
            data={receipes}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => <FoodList data={item}/>}
            ListEmptyComponent={() =>  <Text style={styles.alertaText}>Não Tem nenhuma receita salva!</Text>}//mensagen de alerta!}/
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f3f9ff',
        padding:14
    },
    alertaText:{
        marginTop:100,
        textAlign:"center",
        fontSize:36,
        fontWeight:"500",
        color:"#f50400"
    }
})