import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment/min/moment-with-locales'
import RNPickerSelect from 'react-native-picker-select';

const AddMeal = props =>{
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dayTime, setDayTime] = useState(null);
    const [count, setCount] = useState(null);

    const dayTimeLabel = 'Pora dnia:';
    const countLabel = 'Ilość (g):';

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(false);
      setDate(currentDate);
    };
  
    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
    const filterNumbers = (text, setter) =>{
      const newText = text.replace(/[^0-9]/g,'')
      setter(newText);
  }
    const saveHandler = async item =>{
      const data = {
        name: item.nazwa,
        count: count,
        email: 'adam@gmail.com',
        date: date,
        dayTime: dayTime
      }
      props.setVisible(!props.visible);   
      fetch('http://192.168.0.24:3000/meal/add', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }            
      })
  }
    return(
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.label}>Wybrana data:</Text>
        <Button 
        containerStyle={{minWidth:'110%'}}
        onPress={showDatepicker} 
        type='outline'
        title={Moment(date).locale('pl').format('ddd. DD MMMM YYYY')} 
        titleStyle={{color:'grey'}}
        icon={
          <Icon
              name= 'calendar'
              type='font-awesome'
              size={15}
              color="grey"
              style={{margin:10}}
            />
        }/>

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

        <Text style= {styles.label}>{dayTimeLabel}</Text>
        <RNPickerSelect 
        selectedValue = {dayTime}
        onValueChange = {(itemValue) => setDayTime(itemValue)}
        items={[
            { key: 's', label:'Śniadanie', value:'s'},
            { key: 'o', label:'Obiad', value:'o'},
            { key: 'k', label:'Kolacja', value:'k'},
            { key: 'i', label:'Inna pora', value:'i'}
        ]}
        placeholder = {{ label:dayTimeLabel}}
        inputStyle = {styles.placeholder}
        style={styles.pickerStyle}
        />

        <Input
            maxLength={4}
            value={count} 
            onChangeText = {text => filterNumbers(text, setCount)}
            placeholder = {countLabel}
            inputStyle = {styles.placeholder}
            label = {countLabel}
            labelStyle= {styles.label}
            containerStyle={{minWidth:'110%'}}
          />
        <View style={styles.footer}>
          <View style={styles.row}>
            <Button 
            containerStyle={styles.rowItem} 
            onPress={()=>props.setVisible(!props.visible)} 
            type='outline'
            icon={
            <Icon
              name= 'times'
              type='font-awesome'
              size={15}
              color="grey"
              style={{margin:10}}
            />}
            title={'Zamknij'}
            titleStyle={{
              color: 'grey',
            }}/>
            <Button containerStyle={styles.rowItem} 
            onPress={()=>saveHandler(props.item)} 
            type='outline'
            icon={
            <Icon
              name= 'check'
              type='font-awesome'
              size={15}
              color="grey"
              style={{margin:10}}
            />}
            title={'Zapisz'}
            titleStyle={{
              color: 'grey',}}/>
          </View>
        </View>
      </View>
    </View>
    )
}
const styles = StyleSheet.create({
    centeredView:{
      flex:1, 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    modalView:{
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
      height:'75%',
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    footer:{
      justifyContent:'flex-end',
      flex:1,
    },
    row:{
      flexDirection: 'row',
      alignSelf: 'center'
    },
    rowItem:{
      width: '50%',
      margin:10,
    },
    label:{
      fontSize:15,
      color: 'grey',
      margin: 10,
      fontWeight:'bold',
      alignSelf: 'center'
    },
    placeholder: {
      fontSize:14,
      width:'50%'
  },
  })
export default AddMeal;
