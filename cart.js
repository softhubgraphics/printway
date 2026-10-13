/* PRINT-WAY - cart.js
   Cart & Wishlist are saved in the visitor's browser (localStorage).
   No server or backend needed. */
(function () {
  var PRODUCTS = [{"id": "wedding-cards", "name": "Premium Wedding Cards", "desc": "Elegant laser-cut & foil wedding cards with matching envelopes.", "price": "Rs 150 / card", "kw": "shadi card invitation marriage nikah walima barat shaadi"}, {"id": "panaflex", "name": "Panaflex Banner Printing", "desc": "High quality outdoor panaflex for shops, events and promotions.", "price": "Rs 35 / sq ft", "kw": "flex banner board signboard sign outdoor hoarding"}, {"id": "visiting-cards", "name": "Visiting Cards (100 pcs)", "desc": "Matte, glossy or spot UV business cards for your brand.", "price": "Rs 800 / 100 pcs", "kw": "business card name card"}, {"id": "brochures", "name": "Brochures & Flyers (500 pcs)", "desc": "Full colour brochures, pamphlets and flyers.", "price": "Rs 4,500 / 500 pcs", "kw": "flyer pamphlet leaflet handbill"}, {"id": "stickers", "name": "Stickers & Labels (100 pcs)", "desc": "Waterproof vinyl stickers cut to any shape.", "price": "Rs 1,200 / 100 pcs", "kw": "label vinyl sticker waterproof"}, {"id": "letterheads", "name": "Letterheads & Envelopes", "desc": "Professional office stationery sets.", "price": "Rs 3,000 / 500 pcs", "kw": "envelope stationery bill book office"}, {"id": "wall-calendars", "name": "Wall Calendars 2027", "desc": "Custom printed calendars with your brand.", "price": "Rs 250 / piece", "kw": "calendar 2027 table calendar"}, {"id": "standees", "name": "Roll-up Standee", "desc": "Portable roll-up display stand with print.", "price": "Rs 4,800 / piece", "kw": "roll up stand display exhibition banner stand"}];
  var WA = "923153366554";
  var CART_KEY = "pw_cart", WISH_KEY = "pw_wish";

  function read(k) { try { return JSON.parse(localStorage.getItem(k)) || []; } catch (e) { return []; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function find(id) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i]; return null; }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

  function updateBadges() {
    var q = 0, c = read(CART_KEY), w = read(WISH_KEY), i;
    for (i = 0; i < c.length; i++) q += c[i].qty;
    var cb = document.getElementById("cart-count"), wb = document.getElementById("wish-count");
    if (cb) cb.textContent = q ? q : "";
    if (wb) wb.textContent = w.length ? w.length : "";
  }
  function toast(msg) {
    var t = document.createElement("div");
    t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add("hide"); }, 1800);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 2300);
  }
  function addToCart(id) {
    var c = read(CART_KEY), i;
    for (i = 0; i < c.length; i++) if (c[i].id === id) { c[i].qty++; break; }
    if (i === c.length) c.push({ id: id, qty: 1 });
    save(CART_KEY, c); updateBadges(); toast("Added to cart");
  }
  function toggleWish(id, on) {
    var w = read(WISH_KEY), idx = w.indexOf(id);
    if (on && idx < 0) w.push(id);
    if (!on && idx > -1) w.splice(idx, 1);
    save(WISH_KEY, w); updateBadges();
    toast(on ? "Added to wishlist" : "Removed from wishlist");
  }

  var HEART = '<svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>';
  var CART = '<svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 7H6"/></svg>';
  function empty(icon, kind, msg) {
    return '<div class="empty"><div class="empty-icon">' + icon + '</div><h2>Your ' + kind + ' is empty</h2><p>' + msg + '</p><a class="btn btn-primary" href="products.html">Start Shopping</a></div>';
  }

  var EMAIL = "printway12345@gmail.com";
  var WA_ICON = "<svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" fill=\"currentColor\"><path d=\"M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4c6.600 0 11.900-5.300 11.900-11.900 0-3.200-1.200-6.200-3.400-8.300zM12 21.700c-1.800 0-3.600-.5-5.100-1.400l-.4-.2-3.800 1 1-3.700-.2-.4a9.800 9.800 0 0 1-1.500-5.200c0-5.400 4.400-9.800 9.900-9.800 2.600 0 5.100 1 6.900 2.900a9.700 9.700 0 0 1 2.900 6.900c0 5.400-4.500 9.900-9.900 9.900zm5.400-7.400c-.3-.1-1.800-.9-2-1-.3-.1-.5-.1-.7.1l-.9 1.100c-.2.200-.3.200-.6.100-1.700-.9-2.900-1.600-4-3.600-.3-.5.300-.5.900-1.600.1-.2 0-.4 0-.5l-.9-2.200c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400-.3.300-1 1-1 2.500s1.100 2.900 1.200 3.100c.1.200 2.100 3.200 5.100 4.500 1.900.8 2.600.9 3.600.7.600-.1 1.800-.7 2-1.400.3-.7.300-1.300.2-1.400-.1-.1-.3-.2-.6-.3z\"/></svg>";
  var MAIL_ICON = "<svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"/><path d=\"m22 7-10 6L2 7\"/></svg>";
  var firstCartRender = true;

  function customerFields() {
    return '<label>Full Name<input type="text" name="cust_name" placeholder="Your full name" required></label>' +
      '<label>WhatsApp Number<input type="tel" name="cust_phone" placeholder="03XX XXXXXXX" pattern="[0-9+ ]{10,16}" title="Enter a valid phone number (digits only)" required></label>' +
      '<label>City<input type="text" name="cust_city" placeholder="Your city" required></label>' +
      '<label>Complete Address<textarea name="cust_address" rows="3" placeholder="House no, street, area" required></textarea></label>' +
      '<div class="pay-title">Payment Method</div>' +
      '<div class="pay-group"><label class="pay"><input type="radio" name="payment" value="Cash on Delivery" checked> Cash on Delivery</label>' +
      '<label class="pay"><input type="radio" name="payment" value="Bank Transfer"> Bank Transfer</label></div>' +
      '<label>Notes (optional)<textarea name="cust_notes" rows="3" placeholder="Design details, colour, text on card, delivery time..."></textarea></label>';
  }

  function getLines(form) {
    var out = [], c, i, p;
    if (form.getAttribute("data-mode") === "cart") {
      c = read(CART_KEY);
      for (i = 0; i < c.length; i++) { p = find(c[i].id); if (p) out.push(p.name + " (" + p.price + ") x " + c[i].qty); }
    } else {
      out.push(form.elements["product"].value + " - Quantity/Size: " + form.elements["quantity"].value.trim());
    }
    return out;
  }

  /* Same message is used for WhatsApp and Email */
  function buildMessage(form, forWa) {
    var f = form.elements, lines = getLines(form), i;
    var pay = form.querySelector('input[name="payment"]:checked');
    function B(t) { return forWa ? "*" + t + "*" : t; }
    var m = B("NEW ORDER - PRINT-WAY") + "\n\n" +
      B("Customer Details") + "\n" +
      "Name: " + f["cust_name"].value.trim() + "\n" +
      "WhatsApp: " + f["cust_phone"].value.trim() + "\n" +
      "City: " + f["cust_city"].value.trim() + "\n" +
      "Address: " + f["cust_address"].value.trim() + "\n\n" +
      B("Order Items") + "\n";
    for (i = 0; i < lines.length; i++) m += (i + 1) + ". " + lines[i] + "\n";
    m += "\n" + B("Payment Method") + ": " + (pay ? pay.value : "Cash on Delivery") + "\n";
    if (f["cust_notes"].value.trim()) m += B("Notes") + ": " + f["cust_notes"].value.trim() + "\n";
    return m + "\nPlease confirm my order. Thank you!";
  }

  function openLink(url) {
    var a = document.createElement("a");
    a.href = url; a.target = "_blank"; a.rel = "noopener";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  function sendOrder(form, channel) {
    if (!form) return;
    if (!form.reportValidity()) return;
    if (!getLines(form).length) { toast("Your cart is empty"); return; }
    if (channel === "wa") {
      openLink("https://wa.me/" + WA + "?text=" + encodeURIComponent(buildMessage(form, true)));
    } else {
      var subj = "New Order - " + form.elements["cust_name"].value.trim(), body = buildMessage(form, false);
      var mailto = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(body);
      var gmail = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(EMAIL) + "&su=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(body);
      /* Phones open their email app; computers open Gmail (works even without Outlook/Mail app) */
      var mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
      openLink(mobile ? mailto : gmail);
    }
  }

  function renderCart() {
    var root = document.getElementById("cart-root"); if (!root) return;
    var c = read(CART_KEY).filter(function (x) { return find(x.id); });
    var old = document.getElementById("checkout-form"), saved = null, names = ["cust_name", "cust_phone", "cust_city", "cust_address", "cust_notes"], k, pr;
    if (old) {
      saved = {};
      for (k = 0; k < names.length; k++) saved[names[k]] = old.elements[names[k]].value;
      pr = old.querySelector('input[name="payment"]:checked'); saved.payment = pr ? pr.value : "";
    }
    if (!c.length) { root.innerHTML = empty(CART, "cart", "You have not added any product to your cart yet."); return; }
    var html = '<div class="list">', i, p;
    for (i = 0; i < c.length; i++) {
      p = find(c[i].id);
      html += '<div class="row"><a href="product-' + p.id + '.html"><img src="images/' + p.id + '-1.jpg" alt="' + esc(p.name) + '"></a>' +
        '<div><h3>' + esc(p.name) + '</h3><span class="price">' + esc(p.price) + '</span></div>' +
        '<div class="qty"><button type="button" data-qty="-1" data-id="' + p.id + '" aria-label="Decrease">&minus;</button><span>' + c[i].qty + '</span><button type="button" data-qty="1" data-id="' + p.id + '" aria-label="Increase">+</button></div>' +
        '<button type="button" class="remove" data-remove-cart="' + p.id + '">Remove</button></div>';
    }
    html += '</div><p class="center"><a class="btn btn-outline" href="products.html">Add More Products</a> <button type="button" class="btn btn-outline" id="clear-cart">Clear Cart</button></p>' +
      '<div class="checkout" id="checkout"><h2>Complete your order</h2>' +
      '<p class="muted">Fill in your details and send your order on WhatsApp or Email. Final price and delivery time will be confirmed with you.</p>' +
      '<form class="form" id="checkout-form" data-mode="cart">' + customerFields() +
      '<div class="send-btns"><button type="button" class="btn btn-whatsapp" data-send="wa">' + WA_ICON + ' Send Order on WhatsApp</button>' +
      '<button type="button" class="btn btn-outline" data-send="mail">' + MAIL_ICON + ' Send Order by Email</button></div>' +
      '</form></div>';
    root.innerHTML = html;
    if (saved) {
      var nf = document.getElementById("checkout-form"), r;
      for (k = 0; k < names.length; k++) nf.elements[names[k]].value = saved[names[k]];
      r = nf.querySelectorAll('input[name="payment"]');
      for (k = 0; k < r.length; k++) r[k].checked = (r[k].value === saved.payment);
    }
    if (firstCartRender && window.location.hash === "#checkout") {
      setTimeout(function () { var el = document.getElementById("checkout"); if (el) el.scrollIntoView(); }, 60);
    }
    firstCartRender = false;
  }

  function renderWish() {
    var root = document.getElementById("wish-root"); if (!root) return;
    var w = read(WISH_KEY).filter(find);
    if (!w.length) { root.innerHTML = empty(HEART, "wishlist", "You have not added any product to your wishlist yet."); return; }
    var html = '<div class="grid">', i, p;
    for (i = 0; i < w.length; i++) {
      p = find(w[i]);
      html += '<div class="wcard"><a class="card" href="product-' + p.id + '.html"><div class="card-img"><img src="images/' + p.id + '-1.jpg" alt="' + esc(p.name) + '"></div>' +
        '<div class="card-body"><h3>' + esc(p.name) + '</h3><p>' + esc(p.desc) + '</p><div class="price">' + esc(p.price) + '</div></div></a>' +
        '<div class="wbtns"><button type="button" class="btn btn-primary small" data-add-cart="' + p.id + '">Add to Cart</button>' +
        '<button type="button" class="btn btn-outline small" data-remove-wish="' + p.id + '">Remove</button></div></div>';
    }
    root.innerHTML = html + '</div>';
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("button") : null; if (!t) return;
    var id;
    if ((id = t.getAttribute("data-add-cart"))) { addToCart(id); renderCart(); }
    else if ((id = t.getAttribute("data-remove-cart"))) {
      save(CART_KEY, read(CART_KEY).filter(function (x) { return x.id !== id; })); updateBadges(); renderCart();
    } else if (t.getAttribute("data-qty")) {
      var d = parseInt(t.getAttribute("data-qty"), 10), c = read(CART_KEY), i;
      id = t.getAttribute("data-id");
      for (i = 0; i < c.length; i++) if (c[i].id === id) c[i].qty += d;
      save(CART_KEY, c.filter(function (x) { return x.qty > 0; })); updateBadges(); renderCart();
    } else if (t.getAttribute("data-send")) { sendOrder(t.closest("form"), t.getAttribute("data-send")); }
    else if (t.id === "clear-cart") { save(CART_KEY, []); updateBadges(); renderCart(); }
    else if ((id = t.getAttribute("data-remove-wish"))) {
      save(WISH_KEY, read(WISH_KEY).filter(function (x) { return x !== id; })); updateBadges(); renderWish();
    }
  });

  /* Order Now: add product to cart, then open checkout */
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("[data-order-now]") : null; if (!a) return;
    e.preventDefault();
    var id = a.getAttribute("data-order-now"), c = read(CART_KEY), i, found = false;
    for (i = 0; i < c.length; i++) if (c[i].id === id) found = true;
    if (!found) { c.push({ id: id, qty: 1 }); save(CART_KEY, c); }
    window.location.href = "cart.html#checkout";
  });
  document.addEventListener("submit", function (e) {
    var f = e.target;
    if (f && f.getAttribute && f.getAttribute("data-mode")) { e.preventDefault(); sendOrder(f, "wa"); }
  });

  var cb = document.getElementById("wish");
  if (cb) {
    var pid = cb.getAttribute("data-id");
    cb.checked = read(WISH_KEY).indexOf(pid) > -1;
    cb.addEventListener("change", function () { toggleWish(pid, cb.checked); });
  }
  /* ===== PRODUCT SEARCH ===== */
  function norm(x) { return String(x).toLowerCase(); }
  function score(p, q) {
    var hay = norm(p.name + " " + p.desc + " " + p.price + " " + (p.kw || ""));
    var name = norm(p.name), toks = norm(q).split(/\s+/).filter(Boolean), s = 0, i;
    for (i = 0; i < toks.length; i++) {
      if (hay.indexOf(toks[i]) < 0) return -1;
      s += name.indexOf(toks[i]) === 0 ? 3 : (name.indexOf(toks[i]) > -1 ? 2 : 1);
    }
    return s;
  }
  function search(q) {
    var r = [], i, s;
    for (i = 0; i < PRODUCTS.length; i++) { s = score(PRODUCTS[i], q); if (s >= 0) r.push({ p: PRODUCTS[i], s: s }); }
    r.sort(function (a, b) { return b.s - a.s; });
    return r.map(function (x) { return x.p; });
  }
  var sForm = document.getElementById("search-form"), sInput = document.getElementById("search-input"), sBox = document.getElementById("suggest"), sActive = -1;
  function closeSuggest() { if (sBox) { sBox.innerHTML = ""; sBox.className = "suggest"; } sActive = -1; }
  function showSuggest() {
    var q = sInput.value.trim(), res, html = "", i, p;
    if (!q) { closeSuggest(); return; }
    res = search(q).slice(0, 5);
    if (!res.length) html = '<div class="sg-empty">No products found for &ldquo;' + esc(q) + '&rdquo;</div>';
    else {
      for (i = 0; i < res.length; i++) {
        p = res[i];
        html += '<a class="sg-item" href="product-' + p.id + '.html"><img src="images/' + p.id + '-1.jpg" alt=""><span><b>' + esc(p.name) + '</b><i>' + esc(p.price) + '</i></span></a>';
      }
      html += '<a class="sg-all" href="products.html?q=' + encodeURIComponent(q) + '">See all results for &ldquo;' + esc(q) + '&rdquo;</a>';
    }
    sBox.innerHTML = html; sBox.className = "suggest open"; sActive = -1;
  }
  if (sForm && sInput && sBox) {
    sInput.addEventListener("input", showSuggest);
    sInput.addEventListener("focus", showSuggest);
    sInput.addEventListener("keydown", function (e) {
      var items = sBox.querySelectorAll("a"), i;
      if (e.key === "Escape") { closeSuggest(); return; }
      if (!items.length) return;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        sActive = e.key === "ArrowDown" ? (sActive + 1) % items.length : (sActive <= 0 ? items.length - 1 : sActive - 1);
        for (i = 0; i < items.length; i++) items[i].className = items[i].className.replace(" sg-active", "") + (i === sActive ? " sg-active" : "");
      } else if (e.key === "Enter" && sActive > -1) { e.preventDefault(); window.location.href = items[sActive].href; }
    });
    document.addEventListener("click", function (e) { if (!sForm.contains(e.target)) closeSuggest(); });
  }
  var sInfo = document.getElementById("search-info");
  if (sInfo) {
    var qs = "";
    try { qs = (new URLSearchParams(window.location.search).get("q") || "").trim(); } catch (e) {}
    if (sInput) sInput.value = qs;
    if (qs) {
      var cards = document.querySelectorAll(".filter-grid .card"), n = 0, k, cid, cp, ok;
      for (k = 0; k < cards.length; k++) {
        cid = (cards[k].getAttribute("href") || "").replace("product-", "").replace(".html", "");
        cp = find(cid); ok = cp && score(cp, qs) >= 0;
        if (ok) { n++; cards[k].className = cards[k].className.replace(" search-hide", ""); }
        else if (cards[k].className.indexOf("search-hide") < 0) cards[k].className += " search-hide";
      }
      sInfo.innerHTML = n
        ? '<div class="result-bar">Showing <b>' + n + '</b> result' + (n > 1 ? 's' : '') + ' for &ldquo;' + esc(qs) + '&rdquo; <a href="products.html">Clear search</a></div>'
        : '<div class="empty"><h2>No products found</h2><p>We could not find anything for &ldquo;' + esc(qs) + '&rdquo;. Try a different keyword such as <b>wedding</b>, <b>banner</b> or <b>sticker</b>.</p><a class="btn btn-primary" href="products.html">View All Products</a></div>';
    }
  }

  /* Email links (footer, contact page): computers open Gmail, phones open the email app */
  if (!/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)) {
    var ml = document.querySelectorAll('a[href^="mailto:"]'), mi, addr;
    for (mi = 0; mi < ml.length; mi++) {
      if (ml[mi].className.indexOf("mail-alt") > -1) continue;
      addr = ml[mi].getAttribute("href").replace("mailto:", "").split("?")[0];
      ml[mi].setAttribute("href", "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(addr));
    }
  }

  updateBadges(); renderCart(); renderWish();
})();
