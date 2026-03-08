document.getElementById("loging-Btn").addEventListener("click",function(){
   
const user=document.getElementById("input-Username");

const userName=user.value;

const userpassword=document.getElementById("input-Password");
 
const password=userpassword.value;
if(userName=="admin" && password=="admin123"){
alert("loging done");
window.location.replace("/home.html");

}
else{ alert("loging fail")

    return;
}
})