import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';


const DietTables = props =>{
    const navigation = props.navigation;
    const [data, setServer] = useState(null);
    useEffect(()=>{
        const getData = async () =>{
            const server = await fetch('http://192.168.0.24:3000/food');
            const data = await server.json();
            setServer(data)
        }
        getData();
    }, [])
    console.log(data)

    return(
        <ScrollView>
            <ScrollView horizontal = {true} contentContainerStyle = {{ flexDirection:'column'}}>
            <View style ={styles.container} >
                <Text style ={styles.header}>Nazwa:</Text>
                <Text style = {styles.header}>Kalorie:</Text>
                <Text style = {styles.header}>Tłuszcz:</Text>
                <Text style = {styles.header}>Białko:</Text>
                <Text style = {styles.header}>Cukry:</Text>
            </View>
                <FlatList
                    data={data}
                    renderItem={({item}) => 
                    <View style={styles.container}>
                        <Text style = {styles.item}>{item.nazwa}</Text>
                        <Text style = {styles.item}>{item.kalorie}</Text>
                        <Text style = {styles.item}>{item.tluszcz}</Text>
                        <Text style = {styles.item}>{item.białko}</Text>
                        <Text style = {styles.item}>{item.cukry}</Text>
                    </View> }
                />
            </ScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    item: {
        padding: 10,
        paddingLeft: 10,
        fontSize: 18,
        height: 44,
        flexWrap: 'wrap',
        flexShrink: 1,
        flex: 1,
        minWidth: 90
    },    
    header: {
        padding: 10,
        fontSize: 18,
        height: 44,
        flexWrap: 'wrap',
        flexShrink: 1,
        minWidth: 90
    },
  })
  


export default DietTables;