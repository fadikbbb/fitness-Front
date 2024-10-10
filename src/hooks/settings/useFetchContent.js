import { useState, useEffect } from 'react';
import axios from 'axios';

const useContentsHook = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hero, setHero] = useState({});
    const [services, setServices] = useState([]);
    const [socialMedia, setSocialMedia] = useState({});
    const [about, setAbout] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/contents`);
                setData(response.data.data);
                setHero(response.data.data.heroSection);
                setSocialMedia(response.data.data.socialMedia);
                setServices(response.data.data.servicesSection);
                setAbout(response.data.data.aboutSection);
                console.log(data)
            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch hero data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [BASE_URL]);

    return {
        data,
        hero,
        loading,
        error
    };
};

export default useContentsHook;
