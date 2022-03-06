require('dotenv').config()
import * as functions from "firebase-functions";
import * as express from 'express'
import * as bodyParser from "body-parser";

//initialize express server
const app = express();
const main = express();

//add the path to receive request and set json as bodyParser to process the body 
main.use('/', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

// Only allow requests from my front end 
const cors = require('cors');
app.use(cors({
    origin: `${process.env.FRONTEND_ORIGIN}`
}));

const axios = require('axios').default;


// create an instance of an axios client
const axiosUnsplash = axios.create({
    baseURL: `${process.env.UNSPLASH_BASE_URL}`,  
    headers: {
      Authorization:
        `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
    }
});



interface Props{
    query: String;
    page: String;
}

interface UrlList {
    id: Number;
    src: String;
}[]

app.get('/', (req, res) => 

    res.status(200).send('Hey there!') 
)

app.get('/:query/:page', async(req, res) => {
    console.log(req.params.query)
    console.log(req.params.page)
    try {
        const props: Props = {
            query: req.params.query,
            page: req.params.page
        }

        const response = await axiosUnsplash.get(`search/photos`, {
            params: {
                query: props.query,
                page: props.page,
                per_page: 30,
                order_by: 'popular'
            }
        });
        // console.dir(response)

        // Check if API limit has been reached: 50 request/hr
        if (response.data == 'Rate Limit Exceeded') {
            console.log('Error: API rate limit exceeded');
            res.json({error: 'Rate limit exceeded'})
        }

        console.dir(response.data.results)

        let urlList: UrlList[] = []
        response.data.results.forEach((item: any , index:number) => {
            if (item.urls.regular) {
                urlList.push({
                    id: index,
                    src: item.urls.regular
                })
            } else {
                console.log('Error with returned api data')
                res.json({error: 'Unexpected response from third party API'})
            }
        })
        console.log(urlList)
        
      res.status(200).json({ urls: urlList})

    } catch (error) {
        console.log(error)
        res.status(400).send(`Error occured: ${error}`)
    }
    
});



// exports.app = functions.https.onRequest(main)
//define google cloud function name
export const webApi = functions.https.onRequest(main);
