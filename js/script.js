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

//    clone.querySelector("h1").textContent = bike.categories;

    const img = clone.querySelector("img");
    img.setAttribute("src", `${bike.image.guid}`);

    clone.querySelector("h2").textContent = bike.title.rendered;

    clone.querySelector("#swatches").textContent = bike.tags;

    clone.querySelector(".minpr").textContent = bike.minprice;

    var maxpr = bike.maxprice;

    if (maxpr == [] ) {
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
