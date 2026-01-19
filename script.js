let style = "controle";
let favorites = JSON.parse(localStorage.getItem("zsensiFav")) || [];

function openTab(id, btn) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("show"));
  document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
  document.getElementById(id).classList.add("show");
  btn.classList.add("active");
  if (id === "favoritos") loadFav();
}

function setStyle(s) {
  style = s;
  document.querySelectorAll(".switches button").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
}

function gen(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }

function generate(hack){
  let base = {
    controle:[70,110],
    balanceada:[110,150],
    rapida:[150,190],
    capa:[130,180]
  };

  let mult = hack ? 15 : 0;

  let sensi = {
    geral: Math.min(gen(...base[style])+mult,200),
    red: Math.min(gen(...base[style])+mult,200),
    mira: Math.min(gen(...base[style])+mult,200),
    awm: Math.min(gen(...base[style])+mult,200),
    id: Date.now()
  };

  document.getElementById("result").innerHTML = `
    <div class="result">
      🎯 Geral: ${sensi.geral}<br>
      🔴 Red: ${sensi.red}<br>
      🔭 Mira: ${sensi.mira}<br>
      🎯 AWM: ${sensi.awm}<br><br>
      <button class="btn gold" onclick='saveFav(${JSON.stringify(sensi)})'>⭐ Salvar</button>
    </div>
  `;
}

function randomSensi(){
  generate(false);
  document.getElementById("randomResult").innerHTML = document.getElementById("result").innerHTML;
}

function famousSensi(){
  let name = document.getElementById("famousName").value.trim();
  if(!name){
    alert("❌ Famoso não escolhido");
    return;
  }
  generate(true);
}

function saveFav(s){
  favorites.push(s);
  localStorage.setItem("zsensiFav",JSON.stringify(favorites));
  alert("⭐ Salvo");
}

function loadFav(){
  let box = document.getElementById("favList");
  box.innerHTML = "";
  if(favorites.length===0){
    box.innerHTML = "<p>Nenhum favorito</p>";
    return;
  }
  favorites.forEach((f,i)=>{
    box.innerHTML += `
      <div class="result">
        ${f.geral} | ${f.red} | ${f.mira} | ${f.awm}<br>
        <button class="btn hack" onclick="delFav(${i})">🗑 Excluir</button>
      </div>
    `;
  });
}

function delFav(i){
  favorites.splice(i,1);
  localStorage.setItem("zsensiFav",JSON.stringify(favorites));
  loadFav();
}
