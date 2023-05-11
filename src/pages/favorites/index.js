import { useState, useEffect } from "react"
import { View, Text, StyleSheet, SafeAreaView, FlatList} from "react-native";
import {getFavorites} from "../../utils/storage";
import { useIsFocused } from "@react-navigation/native";
import { FoodList } from "../../components/foodlist";







export function Favorites(){

    const [receipes, setReceipes] = useState([]);
    const isFocused = useIsFocused();



    useEffect( () => {

        let isActive = true;

    async function getReceipes(){
        const result = await getFavorites("@appreceitas");
        if(isActive){
            setReceipes(result);
        }
        
    }

    if(isActive){

        getReceipes();
    }
return () => {
    isActive = false;
}

    }, [isFocused])

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Seus Favoritos</Text>
        {receipes.length === 0 && (
            <Text style={styles.alertaText}>Você não Tem nenham receita salva!</Text>//mensagen de alerta!
        )}

            <FlatList
            showsVerticalScrollIndicator={false}
            style={{marginTop:14}}
            data={receipes}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => <FoodList data={item}/>}
            
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f3f9ff',
        paddingStart:16,
        paddingEnd:16,
        paddingTop:40
    },
    title:{
        color:"#000",
        fontSize:24,
        fontWeight:"bold"
    },
    alertaText:{
        marginTop:100,
        textAlign:"center",
        fontSize:36,
        fontWeight:"500",
        color:"#f50400"
    }
})