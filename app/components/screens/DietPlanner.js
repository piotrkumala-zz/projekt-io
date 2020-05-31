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
    endDate.setDate(startDate.getDate() + 7);

    const daysOfTheWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    const [data, setData] = useState(null);
    const [leftListData, setLeftListData] = useState(null);
    const [selectedDay, setSelectedDay] = useState('');
    useEffect(()=>{
        const getData = async () =>{
            const res = await fetch('http://192.168.178.200:3000/meal/week');
            const rawData = await res.json();
            console.log(rawData)
            const data = rawData.map(x=> {
                return {
                name: x.nazwa,
                calories: x.kalorie,
                count: x.ilość,
                day: x.dzien,
                dayTime: x.pora_dnia === 'o' ? 'Obiad' : x.pora_dnia === 's' ? 'Śniadanie' : x.pora_dnia === 'k' ? 'Kolacja' : 'Nieznana pora'

            }}).sort((a,b)=>
                a.dayTime === 'Nieznana pora' && b.dayTime != 'Nieznana pora' ? 1 
                    : a.dayTime === 'Kolacja' && (b.dayTime != 'Nieznana pora' || b.dayTime != 'Kolacja') ? 1 
                    : a.dayTime === 'Obiad' && (b.dayTime != 'Śniadanie' || b.dayTime != 'Obiad')? -1
                    : a.dayTime === 'Śniadanie' && b.datTime != 'Śniadanie' ? -1 : 0
            );

            console.log(data)
            const leftData = daysOfTheWeek.map((x,i) => {
                const date = new Date();
                date.setDate(startDate.getDate() + i);
                date.setUTCHours(0,0,0,0,0);
                console.log(date.toISOString())
                const dayItems = data.filter(item => item.day === date.toISOString());
                let cal = 0;
                console.log(dayItems)
                dayItems.forEach(item =>{
                    cal += item.calories * item.count.split('g')[0]/100;
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
        setSelectedDay(item.date.toISOString());
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.column}>
            <FlatList
                keyExtractor = {(item) => item.day}
                extraData={selectedDay}
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
                    keyExtractor = {(item) => item.name}
                    extraData = {selectedDay}
                    data={data != null && selectedDay != null ? data.filter(x=>x.day === selectedDay): []}
                    renderItem={ ({item}) =>
                    <View>    
                        <Text style={{alignSelf:'center'}}>{item.dayTime}:</Text>
                        <View style = {styles.container}>
                            <Text style = {styles.smallItem}>{item.name}</Text>
                            <Text style = {styles.smallItem}>{item.calories} kcal</Text>
                            <Text style = {styles.smallItem}>{item.count}</Text>
                        </View>
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
    },
    smallItem:{
        width: '40%'
    }
  })

export default DietPlaner;