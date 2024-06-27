document.addEventListener("DOMContentLoaded", function() {
    if ("non-home" === document.body.id) {
        let e = document.querySelectorAll("[data-youtube]");
        for (let t of e) {
            let r = new URL(t.href).searchParams.get("v");
            t.setAttribute("data-youtube", r), t.setAttribute("role", "button"), t.innerHTML = `<img alt="" src="https://img.youtube.com/vi/${r}/maxresdefault.jpg"><br>
          ${t.textContent}`
        }
        document.addEventListener("click", function e(t) {
            let r = t.target.closest("[data-youtube]");
            if (!r) return;
            t.preventDefault();
            let o = r.getAttribute("data-youtube"),
                i = document.createElement("div");
            i.innerHTML = `<iframe width="900" height="507" src="https://www.youtube-nocookie.com/embed/${o}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`, r.replaceWith(i)
        })
    }
    let e = document.querySelectorAll(".gallery-thumb img"),
        t = document.getElementById("lightbox-overlay"),
        l = document.getElementById("lightbox-image"),
        n = document.getElementById("lightbox-title"),
        i = document.getElementById("lightbox-subtitle"),
        c = document.querySelector(".prev"),
        r = document.querySelector(".next"),
        o = document.querySelector(".close"),
        d = document.getElementById("lightbox-thumbnails"),
        a = 0;

    function s(e) {
        let c = e.getAttribute("data-fullres"),
            r = e.closest("li").querySelector(".caption"),
            o = r.querySelector(".cap-title").innerText,
            d = r.querySelector(".cap-subtitle").innerText;
        l.src = c;
        n.innerText = o;
        i.innerText = d;
        t.style.display = "block";
    }

    function u() {
        t.style.display = "none";
    }

    e.forEach((e, t) => {
        e.addEventListener("click", () => {
            a = t;
            s(e);
        });
        let l = e.cloneNode();
        l.addEventListener("click", () => {
            a = t;
            s(e);
        });
        d.appendChild(l);
    });

    o.addEventListener("click", u);
    r.addEventListener("click", function t() {
        s(e[a = (a + 1) % e.length]);
    });
    c.addEventListener("click", function t() {
        s(e[a = (a - 1 + e.length) % e.length]);
    });
    t.addEventListener("click", function(e) {
        e.target === t && u();
    });    
});