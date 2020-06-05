import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';



function GetData(props) {
    const [data, setData] = useState(null);
    const [data7, setData7] = useState(null);
    const [data30, setData30] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const res30 = await fetch('http://192.168.178.200:3000/smoke/sum?email=adam@gmail.com&days=30');
            const data30 = await res30.json();
            const res7 = await fetch('http://192.168.178.200:3000/smoke/sum?email=adam@gmail.com&days=7');
            const data7 = await res7.json();
            const res = await fetch('http://192.168.178.200:3000/smoke/sum?email=adam@gmail.com&days=1');
            const data = await res.json();
            console.log(data30);
            
            setData(data)
            setData7(data7)
            setData30(data30)
        }
        getData();
    }, [])
    if (data != null&&data7 != null&&data30 != null) {
        return (
            <View>
                < Text >
                    Użytkownik: {data[0]["email"]}
                </Text >
                < Text >
                    Wydałeś przez ostatnio:
                </Text >
                <Text>
                    30 dni: {data30[0]["sum"]}
                </Text>
                <Text>
                    7 dni: {data7[0]["sum"]}
                </Text>
                <Text>
                    24h: {data[0]["sum"]}
                </Text>
                <Text>
                    Na papierosy
                </Text>
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