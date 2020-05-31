import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SearchBar, Icon, Tooltip } from 'react-native-elements';


function GetData(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch('http://192.168.178.200:3000/smoke/sum?email=adam@gmail.com');
            const data = await res.json();

            setData(data)
        }
        getData();
    }, [])
    if (data != null) {
        return (
            <View>
                < Text >
                    Urzytkownik: {data[0]["email"]}
                </Text >
                < Text >
                    Wydałeś przez ostatnie 30 dni {data[0]["sum"]} zl na papierosy
                </Text >


            </View>

        )
    }
    return <Text>No data yet</Text>

}

const SmokingStats = props => {
    const navigation = props.navigation;



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
    }
})



export default SmokingStats;