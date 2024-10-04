import { useState, useEffect } from 'react';
import axios from 'axios';

const useContentsHook = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [heroTitle, setHeroTitle] = useState('');

    const [heroSubtitle, setHeroSubtitle] = useState('');
    const [heroImage, setHeroImage] = useState('');
    const [heroVideo, setHeroVideo] = useState('');
    const [logo, setLogo] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/contents`);
                const data = response.data.data;
                setHeroTitle(data.heroTitle);
                setHeroSubtitle(data.heroDescription);
                setHeroImage(data.heroImage);
                setHeroVideo(data.heroVideo);
                setLogo(data.logo);
                setFacebook(data.facebook);
                setInstagram(data.instagram);
                setTwitter(data.twitter);
                setLinkedIn(data.linkedIn);

            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch hero data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [BASE_URL]);

    return {
        heroTitle,
        heroSubtitle,
        heroImage,
        heroVideo,
        logo,
        facebook,
        instagram,
        twitter,
        linkedIn,
        loading,
        error
    };
};

export default useContentsHook;
