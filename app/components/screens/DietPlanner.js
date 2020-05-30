import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const DietPlaner = props =>{
    const navigation = props.navigation;
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - currentDate.getDay());
    console.log(currentDate);
    console.log(startDate);

    return (
        <View style = {styles.container}>
            <View style = {styles.column}>
                <Text>Days</Text>
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
    }
  })

export default DietPlaner;