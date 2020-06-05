import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';



function GetData(props) {
    //definty could be done with just one server request. Most likle bould be better co calculate all stats client side
    const [pop, setPop] = useState(null);
    const [data, setData] = useState(null);
    const [data1, setData1] = useState(null);
    const [data7, setData7] = useState(null);
    const [data30, setData30] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const res30 = await fetch('http://192.168.178.200:3000/smoke/sum?email=adam@gmail.com&days=30');
            const data30 = await res30.json();
            const res7 = await fetch('http://192.168.178.200:3000/smoke/sum?email=adam@gmail.com&days=7');
            const data7 = await res7.json();
            const res1 = await fetch('http://192.168.178.200:3000/smoke/sum?email=adam@gmail.com&days=1');
            const data1 = await res1.json();

            const res = await fetch('http://192.168.178.200:3000/smoke/rodzaj?email=adam@gmail.com');
            const data = await res.json();

            setData(data)
            setData1(data1)
            setData7(data7)
            setData30(data30)
        }
        getData();

    }, [])
    if (data != null && data1 != null && data7 != null && data30 != null) {

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
                    24h: {data1[0]["sum"]}
                </Text>
                <Text>
                    Najczęściej używany szlug to {data[0]["rodzaj"]}. Używałeś go {data[0]["count"]} razy.
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