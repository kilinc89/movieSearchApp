import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';

import { MovieDetail } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fetchMovieDetails } from '../factory/services';
import { RootStackParamList } from '../navigation/Navigation';
import { AppDispatch, RootState } from '../redux/storeInterface';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const MovieDetailScreen = ({ route }: Props) => {
    const { imdbID } = route.params;
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [loading, setLoading] = useState(true);

    const favorites = useSelector((state: RootState) => state.favorites.list);
    const dispatch = useDispatch<AppDispatch>();

    const isFavorite = favorites.some((item) => item.imdbID === imdbID);

    useEffect(() => {
        const loadMovieDetails = async () => {
            try {
                const response = await fetchMovieDetails(imdbID);
                if (response.data.Response === 'True') {
                    setMovie(response.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadMovieDetails();
    }, [imdbID]);

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            dispatch(removeFavorite({ imdbID }));
        } else if (movie) {
            dispatch(addFavorite(movie));
        }
    };

    if (loading) {
        return <ActivityIndicator style={styles.loading} />;
    }

    if (!movie) {
        return (
            <View style={styles.errorContainer}>
                <Text>Movie not found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: movie.Poster }} style={styles.poster} />
            <Text style={styles.title}>{movie.Title}</Text>
            <Text style={styles.year}>{movie.Year}</Text>
            <Text>IMDb ID: {movie.imdbID}</Text>
            <Text style={styles.plot}>{movie.Plot}</Text>
            <Button
                title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                onPress={handleFavoriteToggle}
            />
        </View>
    );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    poster: { width: '100%', height: 300, marginBottom: 16 },
    title: { fontSize: 24, fontWeight: 'bold' },
    year: { fontSize: 18, color: '#666', marginBottom: 8 },
    plot: { fontSize: 16, marginVertical: 16 },
    loading: { flex: 1, justifyContent: 'center' },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
