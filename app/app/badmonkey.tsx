import { StyleSheet, Text, View , ImageBackground, Pressable} from "react-native";
import { Link } from "expo-router";
import React from "react";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const badmonkey = () => {
  const image = {uri: 'https://wallpapers-clan.com/wp-content/uploads/2023/11/cartoon-forest-path-art-wallpaper.jpg'}


  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
      <Link href="/" asChild> 
              <Pressable style= {styles.backButton}>
                <Text>Back</Text>
              </Pressable>   
            </Link>  
  
        <Text style={styles.title}>Bad Monkey Page</Text>

      </ImageBackground>

    </View>
  )
}

export default badmonkey

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#34393f',
      flex: 1,

    },
    main: {
      flex: 1,
      justifyContent: "center",
      maxWidth: 960,
      marginHorizontal: "auto",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        color: '#ffe135',
        textAlign: 'center',
        verticalAlign: 'top',
      },
    subtitle: {
      fontSize: 36,
      color: "#38434D",
    },
    bananaText: {
      color: '#ffe135',
      borderRadius: 10,
      padding: 7,
      fontSize: 30,
      backgroundColor: '#6D6968',
      elevation: 7,
      width: '80%'
      
    },
    bananaButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 10,
      backgroundColor: 'transparent'
    },
    image: {
      flex: 1,
      resizeMode: 'stretch',
      width: "100%"
    },
    backButton: {
      verticalAlign: 'top',
      backgroundColor: '#ffe135',
      borderRadius: 10,
      padding: 5,
      fontSize: 10,
      width: '10%',
      marginTop: 10,
      marginLeft: 10,
    }

  });