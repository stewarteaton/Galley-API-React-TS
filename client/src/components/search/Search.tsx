import React, {useState, useRef, useEffect, useCallback} from 'react'
import TextField from "@mui/material/TextField";
import { Button } from '@mui/material';
import Logo from '../../logo.png';
import { PicData } from '../../model';
import config from '../../.config.js';


interface Props{
    setPhotos: React.Dispatch<React.SetStateAction<PicData[]>>;
    setLoading: React.Dispatch<React.SetStateAction<Boolean>>;
    setError: React.Dispatch<React.SetStateAction<Boolean>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Search: React.FC<Props> = (
    {setPhotos, setLoading, setError, page, setPage, }:Props) => {
    const [query, setQuery] = useState<string>('')
    const [haveSearched, setHaveSearched] = useState<Boolean>(false)



    const handleSearch = async () => {
        console.log('Search triggered');
        console.log('Querying page: ' + page);
        if (page === 1 ) setPhotos([]);
        try {
            await setLoading(true)
            fetch(`${config.apiUrl.url}/${query}/${page}/`)
            .then(res => res.json())
            .then(data => {
                console.dir(data.urls);
                // if no data returned or error returned, set error
                if (data.urls === [] || data.urls === '' || data.error) {
                    setError(true)
                    setLoading(false)
                }
                // setPhotos(data.urls);
                setPhotos((prev) => [...prev, ...data.urls])
                setHaveSearched(true);
                setLoading(false)
            });
        } catch (err) {
            console.log(err)
            setError(true)
            setLoading(false)
        }
    }

    //On a new search, enable scroll fetching
    useEffect(() => {
        if (haveSearched === true) {
            handleSearch()
        }
    }, [page]);
    
    // When random button 
    useEffect(() => {
        if (query === 'random') {
            handleSearch()
        }
    }, [query]);


    return (
        <>
            <a href='/'><img src={Logo} style={{borderRadius: 10}} alt="AppStem"/></a>

            <div className='inputDiv'>
                    <TextField
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setHaveSearched(false); setPage(1) } }
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch() }
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        label="Search for Photos"
                    /> 

                    <div className='inputBtns' style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <Button variant="contained" style={{marginLeft:10}} onClick={ handleSearch }>Search</Button>
                        <Button variant="outlined" style={{marginLeft:10}} onClick={ (e) => { setPage(1); setQuery('random') } }>Random</Button>
                    </div>
                </div> 
        </>
    )
}

export default Search
