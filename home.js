let currentTab="all";

const tabActive=["text-white","bg-blue-700","btn-sm"]
const tabInactive=["bg-transparent","border-2xl", "border-blue-750"]

function switchTab(tab){
console.log(tab);
const tabs = ["all","open","close"];

for(t of tabs){

const tabName=document.getElementById(t);

if (t === tab){

    tabName.classList.remove(...tabInactive);
    tabName.classList.add(...tabActive);

}else{

    tabName.classList.remove(...tabActive);
    tabName.classList.add(...tabInactive);

}

}
}