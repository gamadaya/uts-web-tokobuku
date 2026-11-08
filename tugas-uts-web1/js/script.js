// (dipakai semua halaman).dimuat setelah data.js
var rp = n => "Rp " + Number(n).toLocaleString("id-ID");
var num = s => parseInt(String(s).replace(/\D/g, "")) || 0;
var ambil = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
var simpan = (k, v) => localStorage.setItem(k, JSON.stringify(v));
var getUser = () => { try { return JSON.parse(sessionStorage.getItem("user")); } catch (e) { return null; } };
var getKatalog = () => dataKatalogBuku.concat(ambil("stokBaru", []));
var getOrders = () => ambil("orders", []);
function logout() { sessionStorage.removeItem("user"); location.href = "index.html"; }
function pasangNav(aktif) {
  var u = getUser();
  if (!u) { location.href = "index.html"; return; }
  var ic = {
    "dashboard.html": '<path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    "stok.html": '<path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3zM4 17a3 3 0 0 1 3-3h12"/>',
    "checkout.html": '<path d="M3 4h2l2.4 11h11l2-8H6.5"/><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>',
    "tracking.html": '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>'
  };
  var m = [["dashboard.html", "Beranda"], ["stok.html", "Katalog"], ["checkout.html", "Pesanan"], ["tracking.html", "Lacak"]];
  document.getElementById("nav").innerHTML = '<b>Toko Buku UT</b><span class="avatar" title="' + u.nama + '">' + u.nama.charAt(0) +
    '</span><a href="#" class="keluar" onclick="logout();return false">Keluar</a>';
  var b = document.createElement("nav"); b.className = "bottom";
  b.innerHTML = m.map(x => `<a href="${x[0]}" class="${x[0] == aktif ? "on" : ""}"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ic[x[0]]}</svg><span>${x[1]}</span></a>`).join("");
  document.body.appendChild(b);
}

// Komponen kartu buku vertikal (dipakai di dashboard & katalog), dibuat lewat DOM
function kartuBuku(b) {
  var el = (t, c, x) => { var e = document.createElement(t); if (c) e.className = c; if (x !== undefined) e.textContent = x; return e; };
  var a = el("article", "book"), cv = el("div", "cover");
  if (b.cover) {
    var img = el("img"); img.alt = "Cover " + b.namaBarang; img.src = b.cover;
    img.onerror = function () { img.remove(); cv.textContent = b.namaBarang.charAt(0); };
    cv.appendChild(img);
  } else cv.textContent = b.namaBarang.charAt(0);
  var foot = el("div", "foot");
  foot.appendChild(el("span", "harga", b.harga));
  foot.appendChild(el("span", "badge", "Stok " + b.stok));
  var pesan = el("a", "btn", "Pesan"); pesan.href = "checkout.html?kode=" + encodeURIComponent(b.kodeBarang);
  a.append(cv, el("h3", "judul", b.namaBarang), el("p", "meta", b.kodeBarang + " · " + b.jenisBarang + " · Edisi " + b.edisi), foot, pesan);
  return a;
}
