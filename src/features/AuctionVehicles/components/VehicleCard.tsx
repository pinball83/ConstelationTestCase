import React, {useState} from 'react';
import {Calendar, DollarSign, Fuel} from 'lucide-react-native';
import {Vehicle} from '../../../types/Vehicle';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FavoriteButton} from './FavoriteButton';
import CountDownBadge from './CountDownBadge';

interface VehicleCardProps {
    vehicle: Vehicle;
    onToggleFavorite: (vehicleId: number) => void;
    onPress: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
                                                            vehicle,
                                                            onToggleFavorite,
                                                        }) => {
    const [isFavorite] = useState(vehicle.favorite);
    const locale = 'en-GB';

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const formatMileage = (mileage: number) => {
        return new Intl.NumberFormat(locale).format(mileage);
    };

    return (
        <View style={styles.card}>
            {/* Image Container */}
            <View style={{position: 'relative'}}>
                <Image
                    source={{uri: vehicle.image}}
                    style={{width: '100%', height: 192, objectFit: 'cover'}}
                />

                <FavoriteButton
                    isFavorite={isFavorite}
                    onToggleFavorite={() => onToggleFavorite(vehicle.id)}
                />

                <CountDownBadge auctionStartDate={vehicle.auctionDateTime}/>
            </View>

            {/* Content */}
            <View style={{padding: 16}}>
                {/* Title */}
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#111827',
                        marginBottom: 8,
                    }}
                >
                    {vehicle.year} {vehicle.make} {vehicle.model}
                </Text>

                {/* Details Grid */}
                <View
                    style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16}}
                >
                    <View
                        style={{
                            width: '50%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 12,
                        }}
                    >
                        <Fuel
                            style={{width: 16, height: 16, marginRight: 4}}
                            color="#4B5563"
                        />
                        <Text style={{color: '#4B5563', fontSize: 14}}>
                            {vehicle.fuelType}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: '50%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 12,
                        }}
                    >
                        <Text
                            style={{
                                width: 16,
                                height: 16,
                                marginRight: 4,
                                textAlign: 'center',
                            }}
                        >
                            🛣️
                        </Text>
                        <Text style={{color: '#4B5563', fontSize: 14}}>
                            {formatMileage(vehicle.mileage)} mi
                        </Text>
                    </View>
                    <View
                        style={{width: '50%', flexDirection: 'row', alignItems: 'center'}}
                    >
                        <Text
                            style={{
                                width: 16,
                                height: 16,
                                marginRight: 4,
                                textAlign: 'center',
                            }}
                        >
                            ⚙️
                        </Text>
                        <Text style={{color: '#4B5563', fontSize: 14}}>
                            {vehicle.engineSize}
                        </Text>
                    </View>
                    <View
                        style={{width: '50%', flexDirection: 'row', alignItems: 'center'}}
                    >
                        <Calendar
                            style={{width: 16, height: 16, marginRight: 4}}
                            color="#4B5563"
                        />
                        <Text style={{color: '#4B5563', fontSize: 14}}>
                            {vehicle.year}
                        </Text>
                    </View>
                </View>

                {/* Starting Bid */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 16,
                    }}
                >
                    <Text style={{color: '#4B5563', fontSize: 14}}>Starting Bid:</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <DollarSign style={{width: 20, height: 20}} color="#059669"/>
                        <Text
                            style={{fontSize: 24, fontWeight: 'bold', color: '#059669'}}
                        >
                            {formatPrice(vehicle.startingBid).slice(1)}
                        </Text>
                    </View>
                </View>

                {/* View Details Button */}
                <TouchableOpacity
                    onPress={() => {
                        console.log('Press');
                    }}
                    style={{
                        backgroundColor: '#2563EB',
                        paddingVertical: 12,
                        borderRadius: 6,
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 14,
                            fontWeight: '500',
                        }}
                    >
                        View Details
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
});
