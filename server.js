const express=require("express");
const app=express();
const mongoose=require('mongoose');

const articlerouter=require('./routes/articles');
const Article=require('./models/article');
const methodoverride=require('method-override');

mongoose.connect('mongodb://0.0.0.0:27017/blog',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
app.set('view engine','ejs')
app.set('views',__dirname+'/views') //-default one

app.use(methodoverride('_method'));//_method is the variable for deletion through a form method(ie by using a form and keeping a delete button inside)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/articles',articlerouter);//now all routes infrontof /articles will be called using articlerouter


app.get('/',async (req,res)=>{
    // let art=[{
    //     title:'Heading 1',
    //     createdAt: new Date(),
    //     description:"lorem ipsf efefum dejavum"
    // },
    // {
    //     title:'Heading 2',
    //     createdAt: new Date(),
    //     description:"lorem ipsum dejavum uwfhweu jef"
    // }]
    let art=await Article.find()
    res.render('index',{articles:art})
})

app.listen(5000,(req,res)=>{
    console.log("Port at 5000");

})


///for authentication use bcrypt module to hash passwords