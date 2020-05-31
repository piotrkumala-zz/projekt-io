import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DietPlaner = props =>{
    const navigation = props.navigation;
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 2)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - currentDate.getDay());
    startDate.setHours(startDate.getHours() + 2)
    const endDate = new Date();
    endDate.getDate(startDate.getDate() + 7);

    const daysOfTheWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    const [data, setData] = useState(null);
    const [leftListData, setLeftListData] = useState(null);
    const [selectedDay, setSelectedDay] = useState('');
    useEffect(()=>{
        const getData = async () =>{
            const res = await fetch('http://192.168.0.24:3000/meal/week');
            const data = await res.json();
            const leftData = daysOfTheWeek.map((x,i) => {
                const date = new Date();
                date.setDate(startDate.getDate() + i);
                date.setHours(0,0,0,0);
                const dayItems = data.filter(item => item.dzien === date.toISOString());
                let cal = 0;
                dayItems.forEach(item =>{
                    cal += item.kalorie * item.ilość.split('g')[0]/100;
                })
                return {
                    calories: cal || 0,
                    day: x,
                    date: date
                }
            });
            setLeftListData(leftData);
            setData(data);
            setSelectedDay(startDate.toISOString());
        }
        getData();
    }, [])

    const leftListHandler = item =>{
        console.log(selectedDay)
        setSelectedDay(item.date.toISOString());
        console.log(selectedDay);  
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.column}>
            <FlatList
                keyExtractor = {(item) => item.day}
                data={leftListData}
                renderItem={({item}) => 
                <TouchableOpacity style={styles.container} onPress = {()=>leftListHandler(item)} >
                <Text style = {styles.item}>{item.day}</Text>
                <Text style = {styles.item}>{item.calories}</Text>
                </TouchableOpacity> }
            />
            </View>
            <View style = {styles.column}>
                <FlatList
                    keyExtractor = {(item) => item.nazwa}
                    extraData = {selectedDay}
                    data={data != null && selectedDay != null ? data.filter(x=>x.dzien === selectedDay): [{day: ''}]}
                    renderItem={ ({item}) =>
                    <View>
                        <Text style = {styles.item}>{item.nazwa}</Text>
                    </View>}
                />
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