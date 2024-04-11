import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';


export default function App() {
  const [counter, setCounter] = useState(0);

  let textLog = '';
  if (counter > 1) {
    textLog = counter + 'x onPress';
  } else if (counter > 0) {
    textLog = 'onPress';
  }
  const image = {uri: 'https://wallpapers-clan.com/wp-content/uploads/2023/11/cartoon-forest-path-art-wallpaper.jpg'}

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>


        <Text style={styles.bananaText} testID="pressable_press_console">{textLog}</Text>

        <Pressable style= {styles.bananaButton} onPress={() => {setCounter(counter + 1)}}>
        <Text style={styles.bananaText}>Bad Monkey!</Text>
        </Pressable>      

        <Pressable style= {styles.bananaButton} onPress={() => {setCounter(counter + 1)}}>
        <Text style={styles.bananaText}>Monkey Rankings</Text>
        </Pressable>   

        <Pressable style= {styles.bananaButton} onPress={() => {setCounter(counter + 1)}}>
        <Text style={styles.bananaText}>The Jungle Laws</Text>
        </Pressable>  


      </ImageBackground>
      <StatusBar style="auto" />
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