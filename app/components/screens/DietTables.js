import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SearchBar, Icon, Button } from 'react-native-elements';
import AddMeal from '../screen_components/DietTables/AddMeal';

const DietTables = props =>{
    const navigation = props.navigation;
    const [data, setData] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(()=>{
        const getData = async () =>{
            const res = await fetch('http://192.168.0.24:3000/food');
            const data = await res.json();
            setOriginalData(data)
            setData(data)
        }
        getData();
    }, [])
    const filterData = (text) =>{
        const newData = originalData.filter(item => item.nazwa.includes(text));
        setData(newData)
        setSearch(text)
    }
    const addProductHandler = ()=>{
        if(data!=null)
            navigation.push('AddProduct')
    }

    const addMeal = (item) =>{
        setSelectedItem(item)
        setModalVisible(!modalVisible)
}
    return(
        <View>
            <Modal
            animationType = 'slide'
            transparent={true}
            visible={modalVisible}>
                <AddMeal
                item={selectedItem}
                visible={modalVisible}
                setVisible={setModalVisible}
                />
            </Modal>
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
                <View style = {styles.headersContainer}>
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
                    <TouchableOpacity style={styles.container} onPress={()=>addMeal(item)}>
                        <Text style = {styles.item}>{item.nazwa}</Text>
                        <Text style = {styles.item}>{item.kalorie}</Text>
                        <Text style = {styles.item}>{item.tluszcz}</Text>
                        <Text style = {styles.item}>{item.białko}</Text>
                        <Text style = {styles.item}>{item.cukry}</Text>
                    </TouchableOpacity> }
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
        width: '20%',
    },
    button:{
        alignSelf: 'center',
    },
    headersContainer:{
        position:'relative',
        flexDirection: 'row',
    },
    centeredView:{
        alignItems: "center",
        marginTop: 22,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height:'50%'
    }
  })
  


export default DietTables;