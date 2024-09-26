import { StyleSheet, Text, View , ImageBackground, Pressable} from "react-native";
import { Link } from "expo-router";
import { useHealthServiceGetHealth, useUserServiceAuthenticateUser } from "./openapi/queries";

export default function Page() {

  const image = {uri: 'https://wallpapers-clan.com/wp-content/uploads/2023/11/cartoon-forest-path-art-wallpaper.jpg'}

  const test = useUserServiceAuthenticateUser()
  test.mutate({request:{email:"",password:""}})



  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
      <Text style={styles.title}>Menu</Text>

        <Link href="/badmonkey" asChild>
        <Pressable style= {styles.bananaButton}>
        <Text style={styles.bananaText}>Bad Monkey!</Text>
        </Pressable>   
        </Link>   

        <Link href="/ranking" asChild>
        <Pressable style= {styles.bananaButton}>
        <Text style={styles.bananaText}>Monkey Rankings!</Text>
        </Pressable>   
        </Link>  

        <Link href="/laws" asChild>
        <Pressable style= {styles.bananaButton}>
        <Text style={styles.bananaText}>The Jungle Laws</Text>
        </Pressable>   
        </Link>  

      </ImageBackground>
    </View>
  );
}

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
