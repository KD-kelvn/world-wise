import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
    const [position, setPosition] = useState(defaultPosition);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    if (!navigator.geolocation) {
        setError("Geolocation is not supported");
        return;
    }

    function getPosition() {
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(function (pos) {
            setPosition({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            })
            setIsLoading(false);
        }, function (error) {
            setError(error.message);
            setIsLoading(false);
        })


    }

    return { isLoading, position, error, getPosition };
}