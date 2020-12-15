let restaurantApi = "b4548824a9d395ebd8be92a554c928cc"

let searchForm = document.querySelector('#areaSearch')
let userInput = document.querySelector('#areaSearchInput')
let userSubmit = document.querySelector('#areaSearchSubmit')
let searchAreaContainer = document.querySelector('.main__container__search__area')
let restaurantForm = document.querySelector('#restaurantSearchForm')
let restaurantResultsArea = document.querySelector('.restaurant__list')
let setCuisines = document.querySelector('.all__cuisines')
let getRestaurantSearchSubmit = document.querySelector('#restaurantSearchFormSubmit')

userSubmit.addEventListener('click', getResults)

let userSearches = []

if (localStorage.getItem('search') !== null) {
    userSearchesStorage = localStorage.getItem('search')
    userSearches = JSON.parse(userSearchesStorage)

    console.log(userSearches)

    let holdPrevSearches = document.createElement('div')
    holdPrevSearches.id = "prevSearchHistory"
    searchAreaContainer.appendChild(holdPrevSearches)

    for (let i = 0; i < 3; i++) {
        let createReminder = document.createElement('div')
        createReminder.id = "prevSearch"
        createReminder.textContent = userSearches[i].search
        document.querySelector('#prevSearchHistory').appendChild(createReminder)
        createReminder.addEventListener('click', getResults)
    }
}

for(let j = 0; j < 20; j++){
    let cuisineResultsDisplay = document.createElement('div')
    cuisineResultsDisplay.id = "cuisineResultsDisplay"

    let cuisineDisplayResultsText = document.createElement('p')
    cuisineDisplayResultsText.id = "cuisineDisplayResultsText"

    cuisineDisplayResultsNumber = document.createElement('p')
    cuisineDisplayResultsNumber.id = "cuisineDisplayResultsNumber"

    setCuisines.appendChild(cuisineResultsDisplay)
    cuisineResultsDisplay.appendChild(cuisineDisplayResultsText)
    cuisineResultsDisplay.appendChild(cuisineDisplayResultsNumber)
    
}

for(let i = 0; i < 19; i++){
    let restaurantResultsDisplay = document.createElement('div')
    restaurantResultsDisplay.id = "singleRestaurantCard"

    let restaurantDisplayTopRow = document.createElement('div')
    restaurantDisplayTopRow.id = "restaurantDisplayTopRow"
    let restaurantDisplayBottomRow = document.createElement('div')
    restaurantDisplayBottomRow.id = "restaurantDisplayBottomRow"

    let restaurantDisplaySections = document.createElement('div')
    restaurantDisplaySections.id = "restaurantDisplaySections"

    let restaurantDisplaySection1 = document.createElement('div')
    restaurantDisplaySection1.id = "restaurantDisplaySection1"

    restaurantDisplaySection2 = document.createElement('div')
    restaurantDisplaySection2.id = "restaurantDisplaySection2"

    let restaurantResultsName = document.createElement('h3')
    restaurantResultsName.id = "restaurantResultsName"

    let allRestaurantType = document.createElement('p')
    allRestaurantType.id = "allRestaurantType"

    let allRestaurantTimings = document.createElement('p')
    allRestaurantTimings.id = "allRestaurantTimings"

    let allRestaurantLocation = document.createElement('p')
    allRestaurantLocation.id = "allRestaurantLocation"
    
    let allRestaurantRatings = document.createElement('h3')
    allRestaurantRatings.id = "allRestaurantRatings"

    let allRestaurantRatingsAvg = document.createElement('p')
    allRestaurantRatingsAvg.id = "allRestaurantRatingsAvg"

    let allRestaurantCuisine = document.createElement('p')
    allRestaurantCuisine.id = "allRestaurantCuisine"

    let allRestaurantNumbers = document.createElement('p')
    allRestaurantNumbers.id = "allRestaurantNumbers"

    let allRestaurantDelivery = document.createElement('p')
    allRestaurantDelivery.id = "allRestaurantDelivery"

    let allRestaurantMenu = document.createElement('a')
    allRestaurantMenu.textContent = "View Menu"
    allRestaurantMenu.id = "allRestaurantMenu"

    let allRestaurantHighlights = document.createElement('div')
    allRestaurantHighlights.id = "allRestaurantHighlights"

    restaurantResultsArea.appendChild(restaurantResultsDisplay)
    restaurantResultsDisplay.appendChild(restaurantDisplayTopRow)
    restaurantResultsDisplay.appendChild(restaurantDisplayBottomRow)
    restaurantResultsDisplay.appendChild(restaurantDisplaySections)

    restaurantDisplaySections.appendChild(restaurantDisplaySection1)
    restaurantDisplaySections.appendChild(restaurantDisplaySection2)

    restaurantDisplayTopRow.appendChild(restaurantResultsName)
    restaurantDisplayTopRow.appendChild(allRestaurantRatings)
    restaurantDisplayTopRow.appendChild(allRestaurantRatingsAvg)
    restaurantDisplayBottomRow.appendChild(allRestaurantHighlights)

    restaurantDisplaySection1.appendChild(allRestaurantType)
    restaurantDisplaySection1.appendChild(allRestaurantCuisine)
    restaurantDisplaySection1.appendChild(allRestaurantDelivery)
    restaurantDisplaySection1.appendChild(allRestaurantNumbers)
    restaurantDisplaySection2.appendChild(allRestaurantTimings)
    restaurantDisplaySection2.appendChild(allRestaurantLocation)
    restaurantDisplaySection2.appendChild(allRestaurantMenu)

    //for(let j = 0; j < 5; j++){
      //  let singleHighlight = document.createElement('p')
        //singleHighlight.id = "singleHighlight"
        //restaurantDisplayBottomRow.appendChild(singleHighlight)
   // }

}


async function getResults(e) {
    e.preventDefault()

    let inputVal = "";

    if(e.target.id === "prevSearch"){
        inputVal = e.target.textContent
    }
    else if(e.target.id === "areaSearchSubmit"){
        inputVal = userInput.value
    }
    
    if (inputVal !== "") {
        const searchObj = {
            search: inputVal
        }

        //if it cant find the previous history it will not add
        if (document.querySelector('#prevSearchHistory') === null) {
            let holdPrevSearches = document.createElement('div')
            holdPrevSearches.id = "prevSearchHistory"
            searchAreaContainer.appendChild(holdPrevSearches)
        }
                
        if(e.target.id !== "prevSearch" && document.querySelectorAll('#prevSearch').length < 3){
            let createReminder = document.createElement('div')
            createReminder.id = "prevSearch"
            createReminder.textContent = inputVal
            document.querySelector('#prevSearchHistory').appendChild(createReminder)
            userSearches.push(searchObj)
        }
        else if(e.target.id !== "prevSearch" && document.querySelectorAll('#prevSearch').length === 3){
            let createReminder = document.createElement('div')
            createReminder.id = "prevSearch"
            createReminder.textContent = inputVal
            userSearches.shift()      
        userSearches.push(searchObj)
            
        let prevSearchNew = document.querySelectorAll('#prevSearch')
            for(let i = 0; i < prevSearchNew.length; i++){
                prevSearchNew[i].textContent = userSearches[i].search
            }
        }
        userSearchesJson = JSON.stringify(userSearches)
        localStorage.setItem('search', userSearchesJson)

    }

    console.log(inputVal)
    //get the lat, long from Zomato
    const getZomatoResponseLocation = await fetch(`https://developers.zomato.com/api/v2.1/locations?query=${inputVal}%2C%20England`, {
        method: 'GET',
        headers: { "user-key": "b4548824a9d395ebd8be92a554c928cc" }
    })
    const getZomatoResponseJson = await getZomatoResponseLocation.json()
    console.log(getZomatoResponseJson)

    //use the lat long from Zomato to then get the restaurants to populate on page
    const getZomatoResponseSearch = await fetch(`https://developers.zomato.com/api/v2.1/search?q=${inputVal}%2C%20England&lat=${getZomatoResponseJson.location_suggestions[0].latitude}&lon=${getZomatoResponseJson.location_suggestions[0].longitude}`, {
        method: 'GET',
        headers: { "user-key": "b4548824a9d395ebd8be92a554c928cc" }
    })
    const getZomatoResponseSearchJson = await getZomatoResponseSearch.json()
    console.log(getZomatoResponseSearchJson)

    //populate the number of restaurants found
    document.querySelector('#restaurantsNumber').textContent = `${getZomatoResponseSearchJson.results_found} Open Restaurants`


    //iterate over the getZomatoResponseSearchJson to then populate the page - create 20 elements outside of this function which will then be iterated and populated

    let singleRestaurantCard = document.querySelectorAll('#singleRestaurantCard')
    let allRestaurantNames = document.querySelectorAll('#restaurantResultsName')
    let allRestaurantType = document.querySelectorAll('#allRestaurantType')
    let allRestaurantTimings = document.querySelectorAll('#allRestaurantTimings')
    let allRestaurantLocation = document.querySelectorAll('#allRestaurantLocation')
    let allRestaurantRatings = document.querySelectorAll('#allRestaurantRatings')
    let allRestaurantRatingsAvg = document.querySelectorAll('#allRestaurantRatingsAvg')
    let allRestaurantCuisine = document.querySelectorAll('#allRestaurantCuisine')
    let allRestaurantNumbers = document.querySelectorAll('#allRestaurantNumbers')
    let allRestaurantDelivery = document.querySelectorAll('#allRestaurantDelivery')
    let allRestaurantMenu = document.querySelectorAll('#allRestaurantMenu')
    let allSingleHighlight = document.querySelectorAll('#singleHighlight')
    let allRestaurantHighlights = document.querySelectorAll('#allRestaurantHighlights')

    
    singleRestaurantCard.forEach(function(sCard){
        sCard.classList.add('loadingScreen')
    })

    document.querySelector('.body__content_restaurants').style.display = "flex";

    for(let i = 0; i < singleRestaurantCard.length; i++){
        allRestaurantNames[i].textContent = `${getZomatoResponseSearchJson.restaurants[i].restaurant.name}`
        allRestaurantType[i].textContent = `Type: ${getZomatoResponseSearchJson.restaurants[i].restaurant.establishment}`
        allRestaurantTimings[i].textContent = `Timings: ${getZomatoResponseSearchJson.restaurants[i].restaurant.timings}`
        allRestaurantLocation[i].textContent = `Address: ${getZomatoResponseSearchJson.restaurants[i].restaurant.location.address}`
        allRestaurantRatings[i].textContent = `${getZomatoResponseSearchJson.restaurants[i].restaurant.user_rating.aggregate_rating}/5 (${getZomatoResponseSearchJson.restaurants[i].restaurant.user_rating.votes} Reviews)`
        
        allRestaurantRatingsAvg[i].textContent = `${getZomatoResponseSearchJson.restaurants[i].restaurant.user_rating.rating_text}`
        if(allRestaurantRatingsAvg[i].textContent === "Average"){
            allRestaurantRatingsAvg[i].style.backgroundColor = "orange"
        } else if(allRestaurantRatingsAvg[i].textContent === "Good" || allRestaurantRatingsAvg[i].textContent === "Very Good"){
            allRestaurantRatingsAvg[i].style.backgroundColor = "green"
        }else if(allRestaurantRatingsAvg[i].textContent === "Bad" || allRestaurantRatingsAvg[i].textContent === "Very Bad"){
            allRestaurantRatingsAvg[i].style.backgroundColor = "red"
        }else if(allRestaurantRatingsAvg[i].textContent === "Not rated"){
            allRestaurantRatingsAvg[i].style.backgroundColor = "grey"
        }

        allRestaurantCuisine[i].textContent = `Cuisine: ${getZomatoResponseSearchJson.restaurants[i].restaurant.cuisines}`
        allRestaurantNumbers[i].textContent = `Phone Number: ${getZomatoResponseSearchJson.restaurants[i].restaurant.phone_numbers}`
        let setDelivery = ""
        if(getZomatoResponseSearchJson.restaurants[i].restaurant.is_delivering_now === 0){
            setDelivery = "Delivery: Yes"
        }
        allRestaurantDelivery[i].textContent = setDelivery
        allRestaurantMenu[i].href = `${getZomatoResponseSearchJson.restaurants[i].restaurant.menu_url}`
        allRestaurantMenu[i].target = "_blank"

              //let newLine = singleRestaurantCard[i].querySelectorAll('#singleHighlight')
              //console.log(newLine)
                //  for(let k = 0; k < newLine.length; k++){
                  //    newLine[k].textContent = `${getZomatoResponseSearchJson.restaurants[i].restaurant.highlights[k]}`
                    // }
                  let newLine = getZomatoResponseSearchJson.restaurants[i].restaurant.highlights
                  if(singleRestaurantCard[i].querySelectorAll('#createArrHighlight').length === 0){
                  for(let k = 0; k < newLine.length; k++){
                    let createArrHighlight = document.createElement('p')
                      createArrHighlight.id = "createArrHighlight"
                      createArrHighlight.textContent = getZomatoResponseSearchJson.restaurants[i].restaurant.highlights[k]
                      allRestaurantHighlights[i].appendChild(createArrHighlight)
                  }
                }
                else if(singleRestaurantCard[i].querySelectorAll('#createArrHighlight').length > 0){
                    singleRestaurantCard[i].querySelectorAll('#createArrHighlight').forEach(function(elem){
                        elem.remove()
                    })
                    for(let k = 0; k < newLine.length; k++){
                        let createArrHighlight = document.createElement('p')
                          createArrHighlight.id = "createArrHighlight"
                          createArrHighlight.textContent = getZomatoResponseSearchJson.restaurants[i].restaurant.highlights[k]
                          allRestaurantHighlights[i].appendChild(createArrHighlight)
                      }
                }
    }

 

    //get cuisines and number
    const getZomatoCuisine = await fetch(`https://developers.zomato.com/api/v2.1/cuisines?lat=${getZomatoResponseJson.location_suggestions[0].latitude}&lon=${getZomatoResponseJson.location_suggestions[0].longitude}`, {
        method: 'GET',
        headers: { "user-key": "b4548824a9d395ebd8be92a554c928cc" }
    })
    const getZomatoCuisineJson = await getZomatoCuisine.json()
    console.log(getZomatoCuisineJson)

    
    let allCuisinesList = document.querySelectorAll('#cuisineDisplayResultsText')

    for(let i = 0; i < allCuisinesList.length; i++){
        document.querySelector('.left__sidebar__filter').style.display = "block"
        allCuisinesList[i].textContent = getZomatoCuisineJson.cuisines[i].cuisine.cuisine_name;
    }
    //iterate over the cuisine, then iterate over all the restaurants in the area max 20, if the cusisine is the same plus 1
    allCuisinesList.forEach(function(cuisine){
        let count = 0;
        for(let i = 0; i < getZomatoResponseSearchJson.restaurants.length; i++){
            if(cuisine.textContent === getZomatoResponseSearchJson.restaurants[i].restaurant.cuisines){
                count++
            }
        }
        cuisine.parentNode.querySelector('#cuisineDisplayResultsNumber').textContent = count
    })

    document.querySelector('.body__content').scrollIntoView({ behavior: 'smooth', block: 'start' });

    //new function - if the user clicks a cuisine, take the cuisine and lat long and populate the results
document.querySelectorAll('#cuisineDisplayResultsText').forEach(function(cuisineCard){
    cuisineCard.addEventListener('click',getCuisineResults)
})

//this function is inside the getResults function!!
async function getCuisineResults(e){
    
    console.log(`${e.target.textContent}`)
    let cuisineId = ""
    //get the cuisine id - for loop over the Zomato array, if the element selected matches the cuisine name, give me the id
    for(let i = 0; i < getZomatoCuisineJson.cuisines.length; i++){
        if(e.target.textContent === getZomatoCuisineJson.cuisines[i].cuisine.cuisine_name){
            cuisineId = getZomatoCuisineJson.cuisines[i].cuisine.cuisine_id
        }
    }
    
console.log(`${getZomatoResponseJson.location_suggestions[0].entity_id}`)
    
    //run it through the cuisineApi with the entityid and cuisineid
    const cuisineApi = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${getZomatoResponseJson.location_suggestions[0].entity_id}&lat=${getZomatoResponseJson.location_suggestions[0].latitude}&lon=${getZomatoResponseJson.location_suggestions[0].longitude}&cuisines=${cuisineId}&entity_type=${getZomatoResponseJson.location_suggestions[0].entity_zone}`, {
        method: 'GET',
        headers: { "user-key": "b4548824a9d395ebd8be92a554c928cc" }
    })
    const cuisineApiJson = await cuisineApi.json()
    console.log(cuisineApiJson)

    //populate the existing boxes
    for(let i = 0; i < singleRestaurantCard.length; i++){
        allRestaurantNames[i].textContent = cuisineApiJson.restaurants[i].restaurant.name
        allRestaurantType[i].textContent = `Type: ${cuisineApiJson.restaurants[i].restaurant.establishment}`
        allRestaurantTimings[i].textContent = `Timings: ${cuisineApiJson.restaurants[i].restaurant.timings}`
        allRestaurantLocation[i].textContent = `Address: ${cuisineApiJson.restaurants[i].restaurant.location.address}`
        allRestaurantRatings[i].textContent = `${cuisineApiJson.restaurants[i].restaurant.user_rating.aggregate_rating} (${cuisineApiJson.restaurants[i].restaurant.user_rating.votes}/5 Reviews)`
        
        allRestaurantRatingsAvg[i].textContent = `${cuisineApiJson.restaurants[i].restaurant.user_rating.rating_text}`
        if(allRestaurantRatingsAvg[i].textContent === "Average"){
            allRestaurantRatingsAvg[i].style.backgroundColor = "orange"
        } else if(allRestaurantRatingsAvg[i].textContent === "Good" || allRestaurantRatingsAvg[i].textContent === "Very Good"){
            allRestaurantRatingsAvg[i].style.backgroundColor = "green"
        }else if(allRestaurantRatingsAvg[i].textContent === "Bad" || allRestaurantRatingsAvg[i].textContent === "Very Bad"){
            allRestaurantRatingsAvg[i].style.backgroundColor = "red"

        }else if(allRestaurantRatingsAvg[i].textContent === "Not rated"){
            allRestaurantRatingsAvg[i].style.backgroundColor = "grey"

        }


        allRestaurantCuisine[i].textContent = `Cuisine: ${cuisineApiJson.restaurants[i].restaurant.cuisines}`
        allRestaurantNumbers[i].textContent = `Phone Number: ${cuisineApiJson.restaurants[i].restaurant.phone_numbers}`
        let setDelivery = ""
        if(cuisineApiJson.restaurants[i].restaurant.is_delivering_now === 0){
            setDelivery = "Delivery: Yes"
        }
        allRestaurantDelivery[i].textContent = setDelivery
        allRestaurantMenu[i].href = `${cuisineApiJson.restaurants[i].restaurant.menu_url}`
        allRestaurantMenu[i].target = "_blank"
        
        let newLine = cuisineApiJson.restaurants[i].restaurant.highlights
        if(singleRestaurantCard[i].querySelectorAll('#createArrHighlight').length === 0){
        for(let k = 0; k < newLine.length; k++){
          let createArrHighlight = document.createElement('p')
            createArrHighlight.id = "createArrHighlight"
            createArrHighlight.textContent = cuisineApiJson.restaurants[i].restaurant.highlights[k]
            allRestaurantHighlights[i].appendChild(createArrHighlight)
        }
      }
      else if(singleRestaurantCard[i].querySelectorAll('#createArrHighlight').length > 0){
          singleRestaurantCard[i].querySelectorAll('#createArrHighlight').forEach(function(elem){
              elem.remove()
          })
          for(let k = 0; k < newLine.length; k++){
              let createArrHighlight = document.createElement('p')
                createArrHighlight.id = "createArrHighlight"
                createArrHighlight.textContent = cuisineApiJson.restaurants[i].restaurant.highlights[k]
                allRestaurantHighlights[i].appendChild(createArrHighlight)
            }
      }
    }
    
    document.querySelector('#restaurantsNumber').textContent = `${cuisineApiJson.results_found} Restaurants Serving ${e.target.textContent} Dishes`

    //getCuisineResults end bracket
}


getRestaurantSearchSubmit.addEventListener('click', getRestaurantSearchResults)

async function getRestaurantSearchResults(e){
e.preventDefault()

let searchValue = document.querySelector('#restaurantSearchFormInput').value

//search for restaurants based on the query in the local area / lat long
const restaurantSearchApi = await fetch(`https://developers.zomato.com/api/v2.1/search?q=${searchValue}&lat=${getZomatoResponseJson.location_suggestions[0].latitude}&lon=${getZomatoResponseJson.location_suggestions[0].longitude}`, {
    method: 'GET',
    headers: { "user-key": "b4548824a9d395ebd8be92a554c928cc" }
})
const restaurantSearchApiJson = await restaurantSearchApi.json()
console.log(restaurantSearchApiJson)


document.querySelector('#restaurantsNumber').textContent = `${restaurantSearchApiJson.results_found} Results Found For "${searchValue}"`

for(let i = 0; i < singleRestaurantCard.length; i++){
    allRestaurantNames[i].textContent = `${restaurantSearchApiJson.restaurants[i].restaurant.name}`
    allRestaurantType[i].textContent = `Type: ${restaurantSearchApiJson.restaurants[i].restaurant.establishment}`
    allRestaurantTimings[i].textContent = `Timings: ${restaurantSearchApiJson.restaurants[i].restaurant.timings}`
    allRestaurantLocation[i].textContent = `Address: ${restaurantSearchApiJson.restaurants[i].restaurant.location.address}`
    allRestaurantRatings[i].textContent = `Ratings: ${restaurantSearchApiJson.restaurants[i].restaurant.user_rating.aggregate_rating} (${restaurantSearchApiJson.restaurants[i].restaurant.user_rating.votes}/5 Reviews)`
    
    allRestaurantRatingsAvg[i].textContent = `${restaurantSearchApiJson.restaurants[i].restaurant.user_rating.rating_text}`
        if(allRestaurantRatingsAvg[i].textContent === "Average"){
            allRestaurantRatingsAvg[i].style.backgroundColor = "orange"
        } else if(allRestaurantRatingsAvg[i].textContent === "Good" || allRestaurantRatingsAvg[i].textContent === "Very Good"){
            allRestaurantRatingsAvg[i].style.backgroundColor = "green"
        }else if(allRestaurantRatingsAvg[i].textContent === "Bad" || allRestaurantRatingsAvg[i].textContent === "Very Bad"){
            allRestaurantRatingsAvg[i].style.backgroundColor = "red"

        }else if(allRestaurantRatingsAvg[i].textContent === "Not rated"){
            allRestaurantRatingsAvg[i].style.backgroundColor = "grey"

        }

    allRestaurantCuisine[i].textContent = `Cuisine: ${restaurantSearchApiJson.restaurants[i].restaurant.cuisines}`
    allRestaurantNumbers[i].textContent = `Phone Number: ${restaurantSearchApiJson.restaurants[i].restaurant.phone_numbers}`
    let setDelivery = ""
        if(restaurantSearchApiJson.restaurants[i].restaurant.is_delivering_now === 0){
            setDelivery = "Delivery: Yes"
        }
        allRestaurantDelivery[i].textContent = setDelivery
        allRestaurantMenu[i].href = `${restaurantSearchApiJson.restaurants[i].restaurant.menu_url}`
        allRestaurantMenu[i].target = "_blank"


        let newLine = restaurantSearchApiJson.restaurants[i].restaurant.highlights
        if(singleRestaurantCard[i].querySelectorAll('#createArrHighlight').length === 0){
        for(let k = 0; k < newLine.length; k++){
          let createArrHighlight = document.createElement('p')
            createArrHighlight.id = "createArrHighlight"
            createArrHighlight.textContent = restaurantSearchApiJson.restaurants[i].restaurant.highlights[k]
            allRestaurantHighlights[i].appendChild(createArrHighlight)
        }
      }
      else if(singleRestaurantCard[i].querySelectorAll('#createArrHighlight').length > 0){
          singleRestaurantCard[i].querySelectorAll('#createArrHighlight').forEach(function(elem){
              elem.remove()
          })
          for(let k = 0; k < newLine.length; k++){
              let createArrHighlight = document.createElement('p')
                createArrHighlight.id = "createArrHighlight"
                createArrHighlight.textContent = restaurantSearchApiJson.restaurants[i].restaurant.highlights[k]
                allRestaurantHighlights[i].appendChild(createArrHighlight)
            }
      }

    //add loading div
}
    //restaurant search results closing bracket
}
    //getResults closing bracket
}

