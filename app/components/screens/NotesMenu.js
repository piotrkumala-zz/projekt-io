import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';

function GetData(props) {
    const [data, setData] = useState(null);
    const [listItems, setlistItems] = useState(null);
    const [text, setText] = useState("");
    const [del, setDel] = useState(null);
        
    const deleteNote = async (nr, type) => {
        if (del == 1) {
            console.log(nr, type)
        }
        console.log(data, nr, type)

    }
    const NotePressed = async () => {
        if(text!=""){
        const data1 = {
            email: 'adam@gmail.com',
            type: 'd',
            nr: parseInt(Math.random() * 10000000 + 1000000),
            text: text
        };
        setText("");

        console.log(data1);
        await fetch('http://192.168.0.24:3000/note/add', {
            method: 'POST',
            body: JSON.stringify(data1),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        fetch('http://192.168.0.24:3000/note?email=adam@gmail.com')
            .then((response) => response.json())
            .then((data) =>
                setlistItems(data.map((nnote) => <Text onPress={() => deleteNote(nnote["nr_notatki"], nnote["rodzaj"])} style={styles.note} key={nnote["nr_notatki"] + "," + nnote["rodzaj"]}>{nnote["tekst"]}{"\n"}</Text>))
            )
    }
    }
    useEffect(() => {
        const getData = async () => {
            const res = await fetch('http://192.168.0.24:3000/note?email=adam@gmail.com');
            const data = await res.json();

            setData(data)
        }
        getData();
    }, [])

    if (data != null) {
        if (listItems == null) {
            setlistItems(data.map((nnote) => <Text onPress={() => deleteNote(nnote["nr_notatki"], nnote["rodzaj"])} style={styles.note} key={nnote["nr_notatki"] + "" + nnote["rodzaj"]}>{nnote["tekst"]}{"\n"}</Text>));
        }

        return (
            <ScrollView style={{ display: "flex" }}
            keyboardShouldPersistTaps='always'
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight)=>{        
                this.scrollView.scrollToEnd({animated: true});
            }}>
     {/* scrollToEnd({duration: 500})}> */}
                {listItems}
                <TouchableOpacity>
                    <Text onPress={NotePressed} style={styles.in_button}>save</Text>

                </TouchableOpacity>

                <TextInput
                    style={styles.in}
                    multiline
                    onChangeText={(text) => setText(text)}
                    value={text} />
                {/* <Text onPress={()=>setDel(1)}>DELETE MODE</Text> */}
            </ScrollView>

        )
    }
    return <ActivityIndicator size="large" color="#0000ff" />
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
    note: {
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        margin: 10,
        padding: 4,
        fontSize: 20,
    },
    in: {
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        margin: 10,
        padding: 4,
        fontSize: 20,
        width: "95%",
        alignSelf: 'flex-start',
    },
    in_button: {
        width: '15%',
        flex: 1,
        right: '-83%',
        paddingRight: 2,
        borderRadius: 10,
        textAlign: 'center',
        borderColor: '#000',
        borderWidth: 2.
    }
})



export default NotesMenu;