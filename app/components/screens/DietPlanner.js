import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

const DietPlaner = props =>{
    const navigation = props.navigation;
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - currentDate.getDay());
    const endDate = new Date();
    endDate.getDate(startDate.getDate() + 7);

    const daysOfTheWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    const [data, setData] = useState(null);
    const [leftListData, setLeftListData] = useState(null);
    useEffect(()=>{
        const getData = async () =>{
            const res = await fetch('http://192.168.0.24:3000/meal/week');
            const data = await res.json();
            const caloriesArray = data.map(x => (x.kalorie * x.ilość.split('g')[0]/100) || 0)
            console.log(caloriesArray)
            const leftData = daysOfTheWeek.map((x,i) => (
            {
                calories: data[i] != null ? data[i].kalorie * data[i].ilość.split('g')[0]/100 || 0 : 0,
                day: x
            }));
            setLeftListData(leftData)
            setData(data);
        }
        getData();
    }, [])

    return (
        <View style = {styles.container}>
            <View style = {styles.column}>
            <FlatList
                keyExtractor = {(item) => item.day}
                data={leftListData}
                renderItem={({item}) => 
                <View style={styles.container}>
                    <Text style = {styles.item}>{item.day}</Text>
                    <Text style = {styles.item}>{item.calories}</Text>
                </View> }
            />
            </View>
            <View style = {styles.column}>
                <Text>Details</Text>
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    container:{
        margin:10,
        flexDirection: 'row'
    },
    column:{
        width: '50%',
        flexDirection:'column'
    },
    item:{
        width: '50%'
    }
  })

export default DietPlaner;