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
});