document.addEventListener("DOMContentLoaded", function() {
    if ("non-home" === document.body.id) {
        let e = document.querySelectorAll("[data-youtube]");
        for (let t of e) {
            let l = new URL(t.href).searchParams.get("v");
            t.setAttribute("data-youtube", l), t.setAttribute("role", "button"), t.innerHTML = `<img alt="" src="https://img.youtube.com/vi/${l}/maxresdefault.jpg"><br>${t.textContent}`
        }
        document.addEventListener("click", function e(t) {
            let l = t.target.closest("[data-youtube]");
            if (!l) return;
            t.preventDefault();
            let r = l.getAttribute("data-youtube"),
                i = document.createElement("div");
            i.innerHTML = `<iframe width="900" height="507" src="https://www.youtube-nocookie.com/embed/${r}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`, l.replaceWith(i)
        })
    }
    let r = document.querySelectorAll(".gallery.lightbox");
    r.forEach(e => {
        let t = e.querySelectorAll(".gallery-thumb img"),
            l = document.getElementById("lightbox-overlay"),
            r = document.getElementById("lightbox-image"),
            i = document.getElementById("lightbox-title"),
            n = document.getElementById("lightbox-subtitle"),
            o = document.querySelector(".lb-prev"),
            c = document.querySelector(".lb-next"),
            a = document.querySelector(".lb-close"),
            s = document.getElementById("lightbox-thumbnails"),
            u = document.querySelector(".lb-loading"),
            d = 0;

        function y(e) {
            let t = e.getAttribute("data-fullres");
            t || (t = e.src);
            let o = e.closest("li").querySelector(".caption"),
                c = o.querySelector(".cap-title").innerText,
                a = o.querySelector(".cap-subtitle").innerText;
            r.style.display = "none", u.style.display = "block", r.alt = c;
            let y = new Image;
            y.onload = () => {
                r.src = t, i.innerText = c, n.innerText = a, u.style.display = "none", r.style.display = "block",
                    function e() {
                        let t = s.querySelectorAll("img");
                        t.forEach((e, t) => {
                            t === d ? e.classList.add("thumb-active") : e.classList.remove("thumb-active")
                        })
                    }()
            }, y.src = t, l.style.display = "block"
        }

        function b() {
            l.style.display = "none"
        }
        t && t.length > 0 && t.forEach((e, t) => {
            e.addEventListener("click", () => {
                d = t, y(e)
            });
            let l = e.cloneNode();
            l.addEventListener("click", () => {
                d = t, y(e)
            }), s.appendChild(l)
        }), a && a.addEventListener("click", b), c && c.addEventListener("click", function e() {
            y(t[d = (d + 1) % t.length])
        }), o && o.addEventListener("click", function e() {
            y(t[d = (d - 1 + t.length) % t.length])
        }), l && l.addEventListener("click", function(e) {
            e.target === l && b()
        })
    })
});