import React, { useEffect } from 'react';
import { View, Text, Image, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';
import { AppDispatch, RootState } from '../redux/storeInterface';
import { loadMovieDetail } from '../redux/slices/moviesSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const MovieDetailScreen = ({ route }: Props) => {
    const { imdbID } = route.params;

    const favorites = useSelector((state: RootState) => state.favorites.list);
    const { loading, movieDetail, movieDetailError } = useSelector(
        (state: RootState) => state.movies
    );
    const dispatch = useDispatch<AppDispatch>();

    const isFavorite = favorites.some((item) => item.imdbID === imdbID);

    useEffect(() => {
        dispatch(loadMovieDetail({ imdbID }))
    }, [imdbID]);

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            dispatch(removeFavorite({ imdbID }));
        } else if (movieDetail) {
            dispatch(addFavorite(movieDetail));
        }
    };

    if (loading) {
        return <ActivityIndicator style={styles.loading} />;
    }

    if (!movieDetail) {
        return (
            <View style={styles.errorContainer}>
                <Text>Movie not found.</Text>
            </View>
        );
    }
    if (movieDetailError) {
        return (
            <View style={styles.errorContainer}>
                <Text>{movieDetailError}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: movieDetail.Poster }} style={styles.poster} />
            <Text style={styles.title}>{movieDetail.Title}</Text>
            <Text style={styles.year}>{movieDetail.Year}</Text>
            <Text>IMDb ID: {movieDetail.imdbID}</Text>
            <Text style={styles.plot}>{movieDetail.Plot}</Text>
            <Button
                title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                onPress={handleFavoriteToggle}
            />
        </View>
    );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    poster: {
        width: '100%',
        height: 300,
        marginBottom: 16
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    year: {
        fontSize: 18,
        color: '#666',
        marginBottom: 8
    },
    plot: {
        fontSize: 16,
        marginVertical: 16
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
});
