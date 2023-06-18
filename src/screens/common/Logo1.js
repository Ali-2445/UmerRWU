import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
const Logo1 = () => {
    return (
        <View style={{

            alignItems: "center",

            marginTop: '20%'
        }}>
            <Image source={require('../../images/logo.png')}
                style={{ height: 160, width: 200, }} />

        </View>
    );
};

export default Logo1;