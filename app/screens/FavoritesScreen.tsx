import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { MovieDetail } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';
import { RootState } from '../redux/storeInterface';

type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

const FavoritesScreen = ({ navigation }: Props) => {
    const favorites = useSelector((state: RootState) => state.favorites.list);

    const renderItem = ({ item }: { item: MovieDetail }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Details', { imdbID: item.imdbID })}
        >
            <View style={styles.itemContainer}>
                <Image
                    source={{ uri: item.Poster }}
                    style={styles.poster}
                    resizeMode="contain"
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.Title}</Text>
                    <Text style={styles.year}>{item.Year}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (favorites.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text>No favorites added.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={(item) => item.imdbID}
        />
    );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        padding: 10
    },
    poster: {
        width: 50,
        height: 75
    },
    textContainer: {
        marginLeft: 10,
        justifyContent: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    year: {
        fontSize: 14,
        color: '#666'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
