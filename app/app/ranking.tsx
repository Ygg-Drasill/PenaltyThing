import { StyleSheet, Text, View , ImageBackground, Pressable} from "react-native";
import { Link } from "expo-router";

const ranking = () => {
    const image = {uri: 'https://wallpapers-clan.com/wp-content/uploads/2023/11/cartoon-forest-path-art-wallpaper.jpg'}

  return (
    <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
        <Link href="/" asChild>
              <Pressable style= {styles.backButton}>
                <Text>Back</Text>
              </Pressable>   
            </Link>  
        <Text style={styles.title}>Ranking!</Text>

            

        </ImageBackground>
    </View>
  )
}

export default ranking

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',

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