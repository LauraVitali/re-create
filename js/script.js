//fetch data
fetch("http://pinksuncup.com/wordpress/wp-json/wp/v2/bicycle")
    .then(initial => initial.json())
    .then(callback);

function callback(data) {
    console.log(data)

    //loop thorugh them
    data.forEach(showBike)
}

function showBike(bike) {

    //find the template/ clone template
    const template = document.querySelector("template#bike-template").content;
    const clone = template.cloneNode(true);

    clone.querySelector("h1").textContent = bike.categories;

    clone.querySelector("h2").textContent = bike.title.rendered;

    clone.querySelector(".minpr").textContent = bike.minprice;

    clone.querySelector(".maxpr").textContent = bike.maxprice;

    clone.querySelector("#stock-value").textContent = bike.stock;

//    clone.querySelector(".content").innerHTML = bike.content.rendered;

    //append
    document.querySelector("main").appendChild(clone);
}
