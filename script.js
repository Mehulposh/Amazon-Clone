const imgs = document.querySelectorAll(".header-slider ul img");
const prev_Btn = document.querySelector(".control-prev");
const next_Btn = document.querySelector(".control-next");

let n = 0;

function changeSlide(){
    for(let i =0; i < imgs.length;i++){
       imgs[i].style.display="none";
    }
    imgs[n].style.display="block";
}

changeSlide();

prev_Btn.addEventListener("click",(e)=>{
    if(n>0){
        n--;
    }
    else{
        n = imgs.length - 1;
    }
    changeSlide();
})

next_Btn.addEventListener("click",(e)=>{
    if(n < imgs.length - 1){
        n++;
    }
    else{
        n = 0;
    }
    changeSlide();
})


const searchBox = document.querySelector(".nav-search-input");
        const searchBtn = document.querySelector(".nav-search-icon");
        const apiURL = "https://dummyjson.com/products";
        
        async function fetchProduct(){
            try{
                const rawData = await fetch(apiURL);
                const prodData = await rawData.json();
                return prodData.products;
            }
            catch(error){
                console.error("Error fetching the data !");
            }

        }

        function generateCard(item) {
            return `
                <div class="col generated-image">
                    <h5 class="category">Category : ${item.category}</h5>
                    <div class="card h-100">
                        <img src="${item.thumbnail}" class="card-img-top" alt="${item.title}">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">${item.price}</p>
                        </div>
                    </div>
                </div>
  `                   ;
        }

        async function renderProduct(query){
            const data = await fetchProduct();
            const resultContainer = document.querySelector(".box-row.header-box");
            resultContainer.innerHTML = "";
            
            const fillteredData = data.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );

            if(fillteredData.length>0){
                fillteredData.forEach(item => {
                    resultContainer.innerHTML += generateCard(item);
                });
            }
            else{
                resultContainer.innerHTML = "<p> No Result Found </p>";
            }
        }

        searchBtn.addEventListener("click",()=>{
            
            const query = searchBox.value.trim();
            renderProduct(query); 
        });

        searchBox.addEventListener("keypress",(e)=>{
            if(e.key === "Enter"){
                
                const query = e.target.value.trim();
                renderProduct(query);
            }
        });