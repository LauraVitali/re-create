window.addEventListener('DOMContentLoaded', getData);

const dataLink = "http://pinksuncup.com/wordpress/wp-json/wp/v2/bicycle?_embed";

//fetch data
function getData() {

    const urlParams = new URLSearchParams(window.location.search);
    console.log("URLSearchParams" + window.location);
    const the_bike_id = urlParams.get("bicycle_id"); //gets id from URL
    console.log(the_bike_id);

    //routing in the script
    //    if (the_bike_id) {
    //        fetch("http://pinksuncup.com/wordpress/wp-json/wp/v2/bicycle/" + the_bike_id + "?_embed")
    //            .then(initial => initial.json())
    //            .then(showBike); /*it skips the foreach loop because there's only one bike anyway */
    //    } else {
    //        fetch(dataLink)
    //            .then(initial => initial.json())
    //            .then(callback);
    //    }

if (the_bike_id) {
    fetchData("http://pinksuncup.com/wordpress/wp-json/wp/v2/bicycle/" + the_bike_id + "?_embed", showBike)
        } else {
            fetchData(dataLink, callback)
        }


    //fetch(dataLink)
    //    .then(initial => initial.json())
    //    .then(callback);
}

function fetchData(link, callBack) {
    fetch(link)
        .then(initial => initial.json())
        .then(callBack);
}

function callback(data) {
    console.log(data)

    //loop thorugh them
    data.forEach(showBike)

}

function showBike(bike) {

    //find the template/ clone template
    const template = document.querySelector("template#bike-template").content;
    const clone = template.cloneNode(true);

    //    clone.querySelector("h1").textContent = bike.categories;

    const a = clone.querySelector("a");
    if (a) {
        a.href += bike.id; /*Takes the existing value from he ahref attribute and adds the bike.id from the JSON to it*/
    }

    const img = clone.querySelector("img");
    img.setAttribute("src", `${bike.image.guid}`);

    clone.querySelector("h2").textContent = bike.title.rendered;

    clone.querySelector("#swatches").textContent = bike.tags;

    clone.querySelector(".minpr").textContent = bike.minprice;

    var maxpr = bike.maxprice;

    if (maxpr == []) {
        clone.querySelector("#maxpr").classList.add("hide");
    } else {
        clone.querySelector("#maxpr").classList.remove("hide");
        clone.querySelector("#maxprice").textContent = bike.maxprice;
    }

    //    clone.querySelector(".maxpr").textContent = bike.maxprice;

    if (bike.categories == 10) {
        clone.querySelector("h1").textContent = "state";
    } else if (bike.categories == 9) {
        clone.querySelector("h1").textContent = "linus";
    }

    if (bike.stock < 1) {
        clone.querySelector("#stock-value").textContent = "No";
    } else if (bike.stock > 9) {
        clone.querySelector("#stock-value").textContent = "Yes";
    } else {
        clone.querySelector("#stock-value").textContent = bike.stock;
    }

    //append
    document.querySelector("main").appendChild(clone);
}
