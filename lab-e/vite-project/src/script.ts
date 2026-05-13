const msg: string = "Helloo!";
alert(msg);

const style = [
    {name: "styl1", link: "public/style-1.css"},
    {name: "styl2", link: "public/style-2.css"},
    {name: "styl3", link: "public/style-3.css"},
]
document.addEventListener("DOMContentLoaded", () => {
    const selector = document.querySelector("#switcher");
    for (const styl of style) {
        selector?.appendChild(createChangeStyle(styl.name, styl.link));
    }
})

function createChangeStyle(nazwa: string, link: string) {
    const przycisk = document.createElement("button");
    przycisk.classList.add("styl-wybor");
    przycisk.innerHTML = nazwa;

    przycisk.addEventListener("click", () => {
        console.log("haloooo");
        document.querySelector("link[rel=stylesheet]")?.remove();
        const linkElement = document.createElement("link");
        linkElement.rel = "stylesheet";
        linkElement.type = "text/css";
        linkElement.href = link;
        document.head.appendChild(linkElement);
    })
    return przycisk;
}