const form = document.querySelector("#signupForm");

form.addEventListener("submit",async (e)=> {
    e.preventDefault();
    const userName = e.target.elements.userName.value;
    const Password = e.target.elements.password.value;

    const users = await fetchData();

    const valid = users.find((user) => user.username === userName && user.password === Password);
    if(valid){
        window.location.href = "/index.html";
    }
    else{
        alert("Invalid username & password");
    }
})

async function fetchData(){
    try{
        const rawData = await fetch("https://dummyjson.com/users");
        const userData = await rawData.json();
        return userData.users;
    }
    catch(error){
        console.error(error);
    }
}