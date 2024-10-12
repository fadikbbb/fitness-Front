import { useState } from 'react';
import axios from 'axios';

const useContentsHook = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [hero, setHero] = useState([]);
    const [socialMedia, setSocialMedia] = useState(null);
    const [about, setAbout] = useState([]);
    const [services, setServices] = useState([]);
    const [viewLoading, setViewLoading] = useState(false);
    const [viewMessage, setViewMessage] = useState(null);
    const [viewError, setViewError] = useState(null);

    const viewHero = async () => {
        setViewLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/settings/hero`);
            setHero(response.data.hero);
            setViewMessage(response.data.message);

        } catch (error) {
            setViewMessage(null);
            setViewError(error.response?.data?.message || "Failed to view hero data");
        } finally {
            setViewLoading(false);
        }
    };


    const viewSocialMedia = async () => {
        setViewLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/settings/social-media`);
            console.log('Full response:', response);

            // Ensure this line is working properly
            setSocialMedia(response.data.socialMedia);

            setViewMessage(response.data.message);

        } catch (error) {
            setViewMessage(null);
            setViewError(error.response?.data?.message);
        } finally {
            setViewLoading(false);
        }
    };

    const viewServices = async ({ changes, setChanges }) => {
        setViewLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/settings/services`);
            setServices(response.data.data);
            console.log(response.data);
            setViewMessage(response.data.message);
            if (changes) {
                setChanges(false);
            }
        } catch (error) {
            setViewMessage(null);
            setViewError(error.response?.data?.message || "Failed to view services data");
        } finally {
            setViewLoading(false);
        }
    };

    const viewAbout = async ({ changes, setChanges }) => {
        setViewLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/settings/about`);
            setAbout(response.data.about);
            setViewMessage(response.data.message);
            console.log('Full response:', response.data.about);

            if (changes) {
                setChanges(false);
            }
        } catch (error) {
            setViewMessage(null);
            setViewError(error.response?.data?.message || "Failed to view about data");
        } finally {
            setViewLoading(false);
        }
    };



    return {
        hero,
        socialMedia,
        about,
        services,
        viewLoading,
        viewError,
        viewMessage,
        viewHero,
        viewSocialMedia,
        viewAbout,
        viewServices
    };
};

export default useContentsHook;
