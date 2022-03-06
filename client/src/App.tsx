import React, {useState, useRef, useEffect, useCallback} from 'react';
import './App.css';
import { PicData } from './model';
// Components
import Search from './components/search/Search';
import Loader from './components/loader/Loader';
import Gallery from './components/gallery/Gallery';
import ScrollFetch from './components/scroll/ScrollFetch';


const App: React.FC = () => {
  const [photos, setPhotos] = useState<PicData[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const [page, setPage] = useState<number>(1);


  return (
    <div className='App'>

      <Search  setPhotos={setPhotos} setLoading={setLoading} setError={setError} page={page} setPage={setPage} />

      <Loader loading={loading} error={error}/>

      <Gallery photos={photos}/>
      
      {/* Identify when user has scrolled to bottom to trigger fetch */}
      <ScrollFetch setPage={setPage} />
    </div>
  )
}

export default App

