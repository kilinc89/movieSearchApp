import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    setSearchTerm,
    incrementPage,
    setYearFilter,
    setTypeFilter,
} from '../redux/slices/moviesSlice';
import { Movie } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';
import { AppDispatch, RootState } from '../redux/storeInterface';
import BadgeSelector from './components/BadgeSelector';

type Props = NativeStackScreenProps<RootStackParamList, 'Movies'>;

const MovieListScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { list, loading, error, page, totalResults, searchTerm, filters } = useSelector(
        (state: RootState) => state.movies
    );


    const loadMore = () => {
        if (list.length < totalResults) {
            dispatch(incrementPage());
        }
    };

    const renderItem = ({ item }: { item: Movie }) => (
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

    if (loading && page === 1) {
        return <ActivityIndicator style={styles.loading} />;
    }



    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search Movies..."
                onChangeText={(text) => dispatch(setSearchTerm(text))}
                style={styles.searchInput}
            />
            <View style={styles.filterContainer}>
                <TextInput
                    placeholder="Year"
                    onChangeText={(text) => dispatch(setYearFilter(text))}
                    style={styles.filterInput}
                />
                <BadgeSelector
                    selectedValue={filters.type}
                    onValueChange={(itemValue) => dispatch(setTypeFilter(itemValue))}
                />

            </View>

            {
                error && searchTerm.length > 0 ?
                    <View style={styles.errorContainer}>
                        <Text>{error}</Text>
                    </View>
                    :
                    <FlatList
                        data={list}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.imdbID}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={loading ? <ActivityIndicator /> : null}
                    />

            }

        </View>
    );
};

export default MovieListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchInput: {
        padding: 10,
        backgroundColor: '#fff'
    },
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
    loading: {
        flex: 1,
        justifyContent: 'center'
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#f9f9f9'
    },
    filterInput: {
        padding: 10,
        backgroundColor: '#fff',
        marginRight: 10,
        width: "33%"
    },
    picker: {
        height: 50,
        width: 150
    }
});
