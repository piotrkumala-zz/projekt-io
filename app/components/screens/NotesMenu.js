import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';



function GetData(props) {
    const [data, setData] = useState(null);
    const [listItems, setlistItems] = useState(null);

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
        setlistItems (data.map((nnote) => <Text key={nnote["nr_notatki"]}>{nnote["tekst"]}{"\n"}</Text>));
        }
        console.log(data);
        console.log(listItems);

        return (
            <View>
                {listItems}
                <Text>Koniec Notatek</Text>

            </View>

        )
    }
    return <Text>No data yet</Text>

}

const NotesMenu = props => {

    const [text, setText] = useState(null);



    return (
        <View>
            <GetData></GetData>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => setText(text)}
                value={text} />
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
    }
})



export default NotesMenu;