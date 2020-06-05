import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, } from 'react-native';
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';


const AddMeal = props =>{
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(false);
      setDate(currentDate);
      console.log(date)
    };
  
    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
    return(
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.centeredView}>
            <Text>{JSON.stringify(props.item)}</Text>
            <Button onPress={()=>props.setVisible(!props.visible)} title={'Zamknij'}/>
            <View>
                <Button onPress={showDatepicker} title="Show date picker!" />
            </View>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
        </View>
    </View>
    )
}
const styles = StyleSheet.create({
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
export default AddMeal;