import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,ScrollView ,TextInput, TouchableOpacity } from 'react-native';
import MenuButton from '../screen_components/common/MenuButton'


function GetData(props) {
    const [data, setData] = useState(null);
    const [listItems, setlistItems] = useState(null);
  //  const [nr, setNr] = useState(null);
    const [text, setText] = useState(null);
    const NotePressed = async () => {
        console.log("UWAGA! Zapalono papieroska");
        const data1 = {
            email: 'adam@gmail.com',
            type: 'd',
            nr: parseInt(Math.random()*10000000+1000000),
            text: text
        };
        console.log(data1);
        const res = await fetch('http://192.168.178.200:3000/note/add', {
            method: 'POST',
            body: JSON.stringify(data1),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const getData = async () => {
            const res = await fetch('http://192.168.178.200:3000/note?email=adam@gmail.com');
            const data = await res.json();

            setData(data)
        }
        getData();
        setlistItems(data.map((nnote) => <Text style={styles.note} key={nnote["nr_notatki"] + "" + nnote["rodzaj"]}>{nnote["tekst"]}{"\n"}</Text>));

    }
    useEffect(() => {
        const getData = async () => {
            const res = await fetch('http://192.168.178.200:3000/note?email=adam@gmail.com');
            const data = await res.json();

            setData(data)
        }
        getData();
    }, [])

    if (data != null) {
        if (listItems == null) {
            setlistItems(data.map((nnote) => <Text style={styles.note} key={nnote["nr_notatki"] + "" + nnote["rodzaj"]}>{nnote["tekst"]}{"\n"}</Text>));
   //         setNr(data.slice(-1)[0]["nr"] + 100);
        }
        //  console.log(data);
        // console.log(listItems);

        return (
            <ScrollView style={{display:"flex"}}>
                {listItems}
                
                <Text style={styles.note}>test</Text>
                <TouchableOpacity
                    onPress={NotePressed}>
                    <Text style={ {width: '15%',flex:1, right:'-83%',paddingRight:2,borderRadius:10,textAlign:'center', borderColor:'#000',borderWidth: 2}}>save</Text>

		        </TouchableOpacity>

                <TextInput 
                    style={styles.in}
                    multiline
                    onChangeText={(text) => setText(text)}
                    value={text} />

            </ScrollView>

        )
    }
    return <Text>No data yet</Text>

}

const NotesMenu = props => {


  

    return (
        <View>
            <GetData></GetData>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',

    },
    item: {
        padding: 10,
        paddingLeft: 10,
        fontSize: 18,
        height: 44,
        flexWrap: 'wrap',
        flexShrink: 1,
        flex: 1,
        minWidth: 90
    },
    header: {
        padding: 10,
        fontSize: 18,
        height: 44,
        flexWrap: 'wrap',
        flexShrink: 1,
        minWidth: 90
    },
    button: {
        alignSelf: 'center',
    },
    note:{
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        margin: 10,
        padding : 4,
        fontSize: 20,
    },
    in:{
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        margin: 10,
        padding : 4,
        fontSize: 20,
        width: "95%",
       // width: '80%',
        alignSelf: 'flex-start',
        // flexDirection: 'row',
        // flex: 2,

    },


})



export default NotesMenu;