const express=require('express')
const router=express.Router();
const Article=require('../models/article')
module.exports=router


router.get('/new',(req,res)=>{
    res.render('../views/articles/new');
})
router.get('/:id',async (req,res)=>{
    //res.send(req.params.id);
    const article=await Article.findById(req.params.id);
    if(article==null)res.redirect('/');
    res.render('articles/show',{article: article});



})
router.post('/',async(req,res)=>{
    console.log(req.body)
    let art=new Article({
        title:req.body.title,
        description:req.body.description,
        markdown:req.body.markdown

    })
try{
//.save() is an asynchronous function
    art = await art.save()
    // art.save()
    // .then(art => {
    //     console.log('Data saved:', art);res.redirect('/articles/'+art.id);
    //     res.send('Data submitted successfully!');
    // })
    // .catch(err => {
    //     console.error('Error saving data:', err);
    //     res.status(400).send('Validation error: ' + err.message);
    // });
    res.redirect('/articles/'+art.id)
}
    catch(err){//to give error if something isnt specified and return theres some problem
console.log(err);
    }
})

//for delete method , method-override library is needed
router.delete('/:id',async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
})


//for edit method also method-override
router.get('/edit/:id',async (req,res)=>{
    const article=await Article.findById(req.params.id);
    res.render('articles/edit',{articles:article});

})

function saveandredirect(path){
    return async(req,res)=>{
        let art=req.article;
        art.title=req.body.title;
        art.description=req.body.description;
        art.markdown=req.body.markdown;
        try{
            
                art = await art.save()
                
                res.redirect('/articles/'+art.id)
            }
                catch(err){//to give error if something isnt specified and return theres some problem
            res.render('articles/'+path,{article:art});
                }

    }
}
router.post('/',(req,res,next)=>{
  req.article=new Article()
  next();
},saveandredirect('new'))

router.put('/:id',async (req,res,next)=>{
    req.article=await Article.findById(req.params.id);
    next();
  },saveandredirect('edit'))