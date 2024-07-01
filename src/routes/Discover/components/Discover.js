import React, { useEffect, useState } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import { apiNewReleases } from '../../../services/Discover/apiNewReleases';
import { apiClientCredentials } from '../../../services/Auth/apiClientCredentials';
import { apiFeaturedPlaylists } from '../../../services/Discover/apiFeaturedPlaylists';
import { apiCategories } from '../../../services/Discover/apiCategories';

const Discover = props => {

  const [token, setToken] = useState(false);

  const [newReleases, setNewReleases] = useState([]);
  const [playlists, setPlaylists]     = useState([]);
  const [categories, setCategories]   = useState([]);

  const [fetchedNewReleases, setFetchedNewReleases] = useState('No Data');
  const [fetchedPlaylists, setFetchedPlaylists]     = useState('No Data');
  const [fetchedCategories, setFetchedCategories]   = useState('No Data');

  const fetchToken = async () => {
    apiClientCredentials()
      .then(response => {
        setToken(response.data.access_token);
        
        return response.data.access_token;
      })
      .then(async token => {
        await fetchNewReleases({ limit: 50, offset: 0, token: token});

        return token;
      })
      .then(async token => {
        await fetchPlaylists({ limit: 50, offset: 0, token: token});

        return token;
      })
      .then(token => {
        fetchCategories({ limit: 50, offset: 0, token: token});
      })
      .catch(errors => {
        console.log(errors);

        setFetchedNewReleases('No Internet Connection');
        setFetchedPlaylists('No Internet Connection');
        setFetchedCategories('No Internet Connection');
      });
  }

  const fetchNewReleases = async (params) => {
    setFetchedNewReleases('Loading...');

    await apiNewReleases(params)
      .then(response => {
        setNewReleases(response.albums.items);

        setFetchedNewReleases('');
      })
      .catch(errors => {
        console.log(errors);
        setFetchedNewReleases('Failed to Load');
      });    
  }

  // function fetchPlaylists(params) {
  const fetchPlaylists = async (params) => {
    setFetchedPlaylists('Loading...');

    await apiFeaturedPlaylists(params)
      .then(response => {
        setPlaylists(response.playlists.items);

        setFetchedPlaylists('');
      })
      .catch(errors => {
        console.log(errors);
        setFetchedPlaylists('Failed to Load');
      });
  }

  function fetchCategories(params) { // karena ini di load terakhir jadi tidak perlu async
    setFetchedCategories('Loading...');

    apiCategories(params)
      .then(response => {
        setCategories(response.categories.items);

        setFetchedCategories('');
      })
      .catch(errors => {
        console.log(errors);
        setFetchedCategories('Failed to Load');
      });
  }

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <div className="discover">
      <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} messageFetch={fetchedNewReleases} />
      <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} messageFetch={fetchedPlaylists} />
      <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" messageFetch={fetchedCategories} />
    </div>
  );
}

export default Discover;