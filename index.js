const axios = require('axios')
const express = require('express')
const exphbs = require('express-handlebars')
const request = require('request')

const app = express()

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('home', {
        title: 'ABC store',
        message: "Hello Customer!"
    })
})


app.get('/news', async (req, res) => {
    const newsUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=5497647da2114041ad647eba8e002d6f'
    try {
        const response = await axios.get(newsUrl)
        console.log(response)
        const newsData = response.data.articles
        console.log(newsData)
        res.render('news', { newsData })
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Error Fetching Data')
    }
})
// Route - /products 
app.get('/products', async (req, res) => {
    const productsUrl = 'https://fakestoreapi.com/products'
    let productData = null
    await axios.get(productsUrl)
        .then(res => {

            const products = res.data
            console.log('products', products)
            productData = products
        })
        .catch(err => {
            res.status(500).send('Something went wrong')
        })
    // return the view 
    res.render('products', { productData })

    // convert into async axios call 
    // request('https://fakestoreapi.com/products', (error, response, body) => {
    //     if (!error && response.statusCode == 200) {
    //         const products = JSON.parse(body)
    //         res.render('products', { products })
    //     }
    //     else {
    //         res.status(500).send('Error Fetching Data')
    //     }
    // })

})


app.listen(5000, (req, res) => {
    console.log('Server Started')
})
