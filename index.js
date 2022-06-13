const container = document.querySelector(".container");
const SL =document.querySelectorAll(".screenLocation");
const inputBar = document.querySelector(".inputBar");
const defCountry = document.querySelector(".defCountry");
const div = document.createElement('div');


SL.forEach((element,i) => {
    element.addEventListener('click',()=>{
        let Country = element.innerHTML;
        fetchData(Country);
        console.log(Country);
    });
});

inputBar.addEventListener('keyup',(e)=>{
    let Country = inputBar.value;
    fetchData(Country)
})

function fetchData(Country){
    let promise = new Promise(function(resolve,reject){
        const path = `https://restcountries.com/v3.1/name/${Country}`;
        const p1=fetch(path);
        p1.then((res)=>{
            resolve(res.json());
        })
        p1.catch((err)=>{
            reject("Data Could Not be fetched")

        })
    });
    promise.then(function(res){
        console.log(res);
        defCountry.style.display = "none";
        inputBar.classList.remove("inputBarMove")
        var countryContent = container.appendChild(div);
        countryContent.classList.add("countryContent");
        createSearchList(res,countryContent);
        addEventListenerClick(res);
        
    })
    promise.catch(function(res){
        console.log(res);
    })

}

function createSearchList(res,countryContent){
    var optionList = '<div class="optionList">';
        for(let i = 0; i < res.length; i++) {
            optionList += "<div class='searchOptions'>" +res[i].name.common+"</div>";
        }
        optionList += '</div>';
        countryContent.innerHTML = optionList;
}

function addEventListenerClick(res){
    var options = document.querySelectorAll(".searchOptions");
    
    options.forEach(element=>{
        element.addEventListener('click',(e)=>{
            let selectedCountry = element.innerHTML;
            showdata(res,selectedCountry)
        })
        
    })
}

function showdata(res,selectedCountry)
{
    var printdata;
    res.forEach(element=>{
        if (element.name.common == selectedCountry) {
           printdata = element;
        }
    })
    document.querySelector(".countryContent").style.display = "none";
    var countryDetails = container.appendChild(div);
    countryDetails.classList.add("countryDetails");
    const map = document.querySelector(".countryDetails");
    var html = '<div class="flag"><img src="'+printdata.flags.png+'" alt=""></div> <div class="name"><h1>'+printdata.name.common+'</h1></div> <div class="lang">Language '+printdata.languages+'</div> <div class="map"><h6>Geographic Location <a href= "'+printdata.maps.googleMaps +'">Google Map</a></h6></div>';
    map.innerHTML = html;

    
    
}