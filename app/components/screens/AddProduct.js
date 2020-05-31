import React, { useState, useEffect } from 'react';
import {StyleSheet, Text} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Input, Button} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
const AddProduct = props =>{
    const navigation = props.navigation;

    const[errorMessage, setErrorMessage] = useState(null);
    const [name, setName] = useState('');
    const [countable, setCountable] = useState(null);
    const [calories, setCalories] = useState(null);
    const [fat, setFat] = useState(null);
    const [protein, setProtein] = useState(null);
    const [sugar, setSugar] = useState(null);

    const nameLabel = 'Nazwa';
    const countableLabel = 'Policzalne';
    const caloriesLabel = 'Kalorie';
    const fatLabel = 'Tłuszcz (g)';
    const proteinLabel = 'Białko (g)';
    const sugarLabel = 'Węglowodany (g)';
    const saveLabel = 'Zapisz';

    const filterNumbers = (text, setter) =>{
        const newText = text.replace(/[^0-9]/g,'')
        setter(newText);
    }
    
    const saveHandler = async () =>{
        const data = {
            name:name,
            countable:countable,
            calories:calories,
            fat:fat,
            protein:protein,
            sugar:sugar
        }
        console.log(data)
        const res = await fetch('http://192.168.178.200:3000/food/add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }            
        })
        const json = await res.json();
        if(json.error === true){
            setErrorMessage(json.message);
        }
        else{
            navigation.push('DietTables');
        }
    }

    return (
        <ScrollView style = {styles.container}>
            <Text>{errorMessage}</Text>
            <Input
            maxLength = {40}
            onChangeText = {text => setName(text)}
            placeholder = {nameLabel}
            inputStyle = {styles.placeholder}
            label ={nameLabel}
            labelStyle= {styles.label}/>

            <Text style= {styles.textLabel}>{countableLabel}</Text>
            <RNPickerSelect 
            selectedValue = {countable}
            onValueChange = {(itemValue) => setCountable(itemValue)}
            items={[
                { key: 't', label:'Tak', value:'t'},
                { key: 'f', label:'Nie', value:'f'}
            ]}
            placeholder = {{ label:countableLabel}}
            inputStyle = {styles.placeholder}/>

            <Input
            maxLength={4}
            value={calories} 
            onChangeText = {text => filterNumbers(text, setCalories)}
            placeholder = {caloriesLabel}
            inputStyle = {styles.placeholder}
            label = {caloriesLabel}
            labelStyle= {styles.label}/>

            <Input
            maxLength={4}
            value={fat} 
            onChangeText = {text => filterNumbers(text, setFat)}
            placeholder = {fatLabel}
            inputStyle = {styles.placeholder}
            label = {fatLabel}
            labelStyle= {styles.label}/>

            <Input
            maxLength={4}
            value={protein} 
            onChangeText = {text => filterNumbers(text, setProtein)}
            placeholder = {proteinLabel}
            inputStyle = {styles.placeholder}
            label = {proteinLabel}
            labelStyle= {styles.label}/>

            <Input
            maxLength={4}
            value={sugar} 
            onChangeText = {text => filterNumbers(text, setSugar)}
            placeholder = {sugarLabel}
            inputStyle = {styles.placeholder}
            label = {sugarLabel}
            labelStyle= {styles.label}/>
            <Button 
            title = {saveLabel}
            onPress = {saveHandler}/>
        </ScrollView>
    )

}
const styles = StyleSheet.create({
    container:{
        margin:10
    },
    textLabel:{
        fontSize: 16,
        marginLeft: 8.5,
        color: 'grey',
        fontWeight: 'bold'
    },
    label: {
        fontSize:16,
        color: 'grey'
    },
    placeholder: {
        fontSize:14
    }
  })

export default AddProduct;