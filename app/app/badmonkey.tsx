import { StyleSheet, Text, View , ImageBackground, Pressable} from "react-native";
import { Link } from "expo-router";

const badmonkey = () => {
    const image = {uri: 'https://wallpapers-clan.com/wp-content/uploads/2023/11/cartoon-forest-path-art-wallpaper.jpg'}

  return (
    <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
        <Text style={styles.title}>Bad Monkey Page</Text>
        
            <Link href="/" asChild>
              <Pressable style= {styles.bananaButton}>
                <Text style={styles.bananaText}>Back</Text>
              </Pressable>   
            </Link>  

        </ImageBackground>
    </View>
  )
}

export default badmonkey

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    main: {
      flex: 1,
      justifyContent: "center",
      maxWidth: 960,
      marginHorizontal: "auto",
    },
    title: {
        fontSize: 64,
        fontWeight: "bold",
        color: '#ffe135',
        textAlign: 'center',
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
      justifyContent: 'center',
      resizeMode: 'stretch',
      width: "100%"
    },
  });