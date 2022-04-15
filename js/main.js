const elList = document.querySelector(".block__list");
const elTemplate =document.querySelector(".box").content;
const elTemplatepost =document.querySelector(".box-post").content;
const elTemplatecommit =document.querySelector(".box-commit").content;
const elitem = document.querySelector(".box__item");
const elitemPost = document.querySelector(".box-post__item");
const elListPost= document.querySelector(".block__list-post");
const elListCommit= document.querySelector(".block__list-commit");
const elItemUser= document.querySelector(".box__item");




let mailto= "mailto:"

let locatsia = "https://www.google.com/maps/place/"

function render(arr,element){
    const documentfragment = document.createDocumentFragment();
    arr.forEach(item => {
        element.innerHTML= ""
        
        const templareCloned = elTemplate.cloneNode(true)
        templareCloned.querySelector(".box__item").dataset.userid = item.id;
        
        templareCloned.querySelector(".box__item__id").textContent = item.id;
        templareCloned.querySelector(".box__item__name").textContent = item.name;
        templareCloned.querySelector(".box__item__username").textContent = item.username;
        templareCloned.querySelector(".box__item__gmail").href  = `${mailto} ` + item.email;
        templareCloned.querySelector(".box__item__gmail").textContent  =  item.email;
        templareCloned.querySelector(".box__item__address__street").textContent = item.address.street;
        templareCloned.querySelector(".box__item__address__suite").textContent = item.address.suite;
        templareCloned.querySelector(".box__item__address__city").textContent = item.address.city;
        templareCloned.querySelector(".box__item__address__zipcode").textContent = item.address.zipcode;
        templareCloned.querySelector(".box__item__locatsion").href = `${locatsia}`+ item.address.geo.lat + "," + item.address.geo.lng;
        templareCloned.querySelector(".box__item__tel").href = item.phone;
        templareCloned.querySelector(".box__item__tel").textContent = item.phone;
        
        templareCloned.querySelector(".box__item__website").href = item.website;
        templareCloned.querySelector(".box__item__company__name").textContent = item.company.name;
        templareCloned.querySelector(".box__item__company__catch").textContent = item.company.catchPhrase;
        templareCloned.querySelector(".box__item__company__bs").textContent = item.company.bs;
        
        documentfragment.appendChild(templareCloned);
        //    elItemUser.dataset.userid = item.id;
        //   elItemUser.dataset.userid=item.id
        
        
    })
    element.appendChild(documentfragment);
}

async function getuser(){
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await res.json()
    
    
    render(data,elList )
}

getuser();






function renderpost(arr,element){
    const documentfragmentpost = document.createDocumentFragment();
    arr.forEach(itempost => {
        element.innerHTML=""
        
        const templareClonedpost = elTemplatepost.cloneNode(true)
        templareClonedpost.querySelector(".box-post__item").dataset.postid = itempost.id;
        templareClonedpost.querySelector(".box-post__item__herro").textContent = itempost.title;
        templareClonedpost.querySelector(".box-post__item__poragraf").textContent = itempost.body;
        
        documentfragmentpost.appendChild(templareClonedpost);
        
        
        
    });
    element.appendChild(documentfragmentpost);
    
}

function rendercommit(arr,element){
    const documentfragmentcommit = document.createDocumentFragment();
    arr.forEach(itemcommit => {
        element.innerHTML= ""
        
        const templareClonedcommit = elTemplatecommit.cloneNode(true)
        templareClonedcommit.querySelector(".box-commit__item").dataset.commintid = itemcommit.postId;
        templareClonedcommit.querySelector(".box-commit__item__herro").textContent = itemcommit.name;
        templareClonedcommit.querySelector(".box-commit__item__poragraf").textContent = itemcommit.body;
        templareClonedcommit.querySelector(".box-commit__item__gmail").textContent =  itemcommit.email;
        templareClonedcommit.querySelector(".box-commit__item__gmail").href = mailto + itemcommit.email;
        
        documentfragmentcommit.appendChild(templareClonedcommit);
        
        
        
    })
    element.appendChild(documentfragmentcommit);
    
}



elList.addEventListener("click" , evt =>{
    const itemid = evt.target.matches(".box__item");
    if(itemid){
        const itemidd = evt.target.dataset.userid; 
        async function getpost(){
            const respost = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${itemidd}`);
            const datapost = await respost.json()   
            renderpost(datapost , elListPost)   
        } 
        getpost(); 
    }
})



elListPost.addEventListener("click" , evt =>{
    const itemcommentid = evt.target.matches(".box-post__item");
    if(itemcommentid){             
        const itemidposter = evt.target.dataset.postid;
        async function getcommit(){
            const rescommit = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${itemidposter}`);
            const datacommit = await rescommit.json()
            rendercommit(datacommit , elListCommit )   
        }
        getcommit();
    }
})


