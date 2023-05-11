import { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Image, Modal, Share } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo, AntDesign, Feather} from "@expo/vector-icons";
import { Ingredients } from "../../components/ingredients"
import {Instruction} from "../../components/instructions"
import{ Video } from "../../components/video";
import{ isFavorite, saveFavorite, removeItem} from "../../utils/storage"



export function Detail(){
 const route = useRoute();
 const navigation = useNavigation();

 const [showVideo, setShowVideo] = useState(false) /* função para o modal video*/
  const [favorite, setFavorite] = useState(false)



 useLayoutEffect( () => {

async function getStatusFavorites(){
const receipeFavorite = await isFavorite(route.params?.data)
setFavorite(receipeFavorite)
}
getStatusFavorites();


      
    navigation.setOptions({
       title: route.params?.data ? route.params?.data.name : "Detalhes da receita",
       headerRight:() => (
        /*aqui e o coração do favorito*/
      <Pressable onPress={ () => handleFavoriteReceipe(route.params?.data)}> 
     {favorite ? (
             <Entypo
             name="heart"
             size={28}
             color= "#FF4141"
             />
     ) : (
        <Entypo
        name="heart-outlined"
        size={28}
        color= "#FF4141"
        />
     )}
      </Pressable>
       )
    })

 }, [navigation, route.params?.data, favorite]);

//aqui e pra colocar como favorito!

async function handleFavoriteReceipe(receipe){
    if(favorite){
        await removeItem(receipe.id)
        setFavorite(false);
    }else{
        await saveFavorite("@appreceitas", receipe)
        setFavorite(true);
    }
}
  



function handleOpenVideo(){
    setShowVideo(true);
}/*abre o video*/


async function shareRecipe(){
    try{
        await Share.share({
            url:"https://expo.dev",
            message:`Receita: ${route.params?.data.name}\nIngredientes: ${route.params?.data.total_ingredients}\nVi là na casa do Chapeu!!!`
        })

    }catch(error){
        console.log(error)
    }
}

    return(
        <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:14}} showsVerticalScrollIndicator={false}> 
            


        <Pressable onPress={handleOpenVideo}>
            <View style={styles.playIcon}>
                <AntDesign name="playcircleo" size={55} color="#FAFAFA"/>
            </View>
            <Image
            source={{ uri: route.params?.data.cover }}
            style={styles.image}
            
            />
        </Pressable>
        <View style={styles.headerDetails}>
            <View>
                <Text style={styles.title}>{route.params?.data.name}</Text>
                <Text style={styles.ingredText}>ingredientes ({route.params?.data.total_ingredients})</Text>
            </View>
            <Pressable onPress={shareRecipe}>
                       <Feather name="share-2" color="#121212" size={24}/>
            </Pressable>
        </View>

       {route.params?.data.ingredients.map( (item) => (
        <Ingredients key={item.id} data={item} /> /* insere os itens */
       ))}

<View style={styles.instructionArea}>
    <Text style={styles.instructionText}>
        Modo de Preparo</Text>
        <Feather
        name="arrow-down"
        size={24}
        color="#FFF"
        />
    
</View>
        {route.params?.data.instructions.map((item, index) =>(
            <Instruction key={item.id} data={item} index={index}/>
        ))}

        <Modal visible={showVideo} animationType="slide">
         <Video
         handleClose={()=> setShowVideo(false)}
         videoUrl={route.params?.data.video}
         />
        </Modal>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ECECEC',
        padding:14,
    },
    image:{

        height:200,
        borderRadius:14,
        width:"100%"
    },
    playIcon:{
        position:"absolute",
        zIndex:9,
        top:0,
        left:0,
        right:0,
        bottom:0,
        alignItems:"center",
        justifyContent:"center"
        

    },

    headerDetails:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:14,

    },
    title:{
        fontSize:20,
        fontWeight:"bold",
        marginTop:14,
        marginBottom:4,
        color:"#000"
    },
    ingredText:{
        marginBottom:14,
        fontSize:16,
    },
    instructionArea:{
        backgroundColor:"#4cbe6c",
        flexDirection:"row",
        padding: 8,
        borderRadius:4,
        marginBottom:14
        

    },
        instructionText:{
            fontSize:18,
            fontWeight:"500",
            color:"#FFF",
            marginRight:8

        }



})