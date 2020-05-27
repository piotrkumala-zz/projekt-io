import React, { useState, useEffect } from 'react';
import {View, Text} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Input, Button} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
const AddProduct = props =>{
    const navigation = props.navigation;

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
    const sugarLabel = 'Cukier (g)';
    const saveLabel = 'Zapisz';

    const filterNumbers = (text, setter) =>{
        const newText = text.replace(/[^0-9]/g,'')
        setter(newText);
    }
    
    const saveHandler = () =>{
        console.log('Saving');
    }

    return (
        <ScrollView>
            <Input
            maxLength = {40}
            onChangeText = {text => setName(text)}
            placeholder = {nameLabel}
            label ={nameLabel}/>

            <Text>{countableLabel}</Text>
            <RNPickerSelect 
            selectedValue = {countable}
            onValueChange = {(itemValue) => setCountable(itemValue)}
            items={[
                { key: 't', label:'Tak', value:'t'},
                { key: 'f', label:'Nie', value:'f'}
            ]}
            placeholder = {{ label:countableLabel}}/>

            <Input
            maxLength={4}
            value={calories} 
            onChangeText = {text => filterNumbers(text, setCalories)}
            placeholder = {caloriesLabel}
            label = {caloriesLabel}
            />

            <Input
            maxLength={4}
            value={fat} 
            onChangeText = {text => filterNumbers(text, setFat)}
            placeholder = {fatLabel}
            label = {fatLabel}
            />

            <Input
            maxLength={4}
            value={protein} 
            onChangeText = {text => filterNumbers(text, setProtein)}
            placeholder = {proteinLabel}
            label = {proteinLabel}
            />

            <Input
            maxLength={4}
            value={sugar} 
            onChangeText = {text => filterNumbers(text, setSugar)}
            placeholder = {sugarLabel}
            label = {sugarLabel}
            />
            <Button 
            title = {saveLabel}
            onPress = {saveHandler}/>
        </ScrollView>
    )
}

export default AddProduct;