import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SearchBar, Icon } from 'react-native-elements';

import { getHost, getEmail } from '../ServerConnection';

const DietTables = props =>{
    const navigation = props.navigation;
    const [data, setData] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(()=>{
        const getData = async () =>{
            const res = await fetch(getEmail() + '/food');
            const data = await res.json();
            setOriginalData(data)
            setData(data)
        }
        getData();
    }, [])
    console.log(originalData)
    const filterData = (text) =>{
        const newData = originalData.filter(item => item.nazwa.includes(text));
        setData(newData)
        setSearch(text)
    }
    const addProductHandler = ()=>{
        if(data != null)
            navigation.push('AddProduct')
    }
    return(
        <View>
            <View>
                <SearchBar 
                placeholder = "Wyszukaj"
                autoCorrect = {false}
                onChangeText = {text => filterData(text)}
                lightTheme
                value = {search}
                round
                platform = 'android'
                />
            </View>
            <View style = {{maxHeight:'75%'}}>
                <View style = {styles.container}>
                    <Text style ={styles.header}>Nazwa:</Text>
                    <Text style = {styles.header}>Kalorie:</Text>
                    <Text style = {styles.header}>Tłuszcz:</Text>
                    <Text style = {styles.header}>Białko:</Text>
                    <Text style = {styles.header}>Cukry:</Text>
                </View>
                <FlatList
                    keyExtractor = {(item) => item.nazwa}
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
            </View>
            <View>
                <TouchableOpacity  style = {styles.button} onPress={addProductHandler}> 
                    <Icon
                        name='ios-add'
                        type='ionicon'
                        reverse
                        color = 'grey'
                        />
                </TouchableOpacity >
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        minHeight: '5%',
        padding: 10
    },
    item: {
        fontSize: 18,
        paddingBottom:10,
        paddingLeft: 10,
        flexWrap: 'wrap',
        flexShrink: 1,
        flex: 1,
        width: '20%'
    },    
    header: {
        fontSize: 18,
        height: 44,
        paddingLeft: 10,
        flexWrap: 'wrap',
        flexShrink: 1,
        width: '20%'
    },
    button:{
        alignSelf: 'center',
    }
  })
  


export default DietTables;
