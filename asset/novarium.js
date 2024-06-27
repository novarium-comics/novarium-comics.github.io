document.addEventListener('DOMContentLoaded', function() {
    if (document.body.id === 'non-home') {
      // Progressive enhancement for YouTube videos
      let videos = document.querySelectorAll('[data-youtube]');
    
      for (let video of videos) {
        let id = new URL(video.href).searchParams.get('v');
        video.setAttribute('data-youtube', id);
        video.setAttribute('role', 'button');
        video.innerHTML = `<img alt="" src="https://img.youtube.com/vi/${id}/maxresdefault.jpg"><br>${video.textContent}`;
      }
    
      function clickHandler(event) {
        let link = event.target.closest('[data-youtube]');
        if (!link) return;
        event.preventDefault();
        let id = link.getAttribute('data-youtube');
        let player = document.createElement('div');
        player.innerHTML = `<iframe width="900" height="507" src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
        link.replaceWith(player);
      }
    
      document.addEventListener('click', clickHandler);
    }
  
    // Lightbox functionality
    const galleryImages = document.querySelectorAll('.gallery-thumb img');
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxSubtitle = document.getElementById('lightbox-subtitle');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const closeButton = document.querySelector('.close');
    const lightboxThumbnails = document.getElementById('lightbox-thumbnails');
    
    let currentImageIndex = 0;
    
    galleryImages.forEach((img, index) => {
      img.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(img);
      });
  
      const thumbnail = img.cloneNode();
      thumbnail.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(img);
      });
      lightboxThumbnails.appendChild(thumbnail);
    });
    
    function openLightbox(img) {
      const fullResSrc = img.getAttribute('data-fullres');
      const caption = img.closest('li').querySelector('.caption');
      const title = caption.querySelector('.cap-title').innerText;
      const subtitle = caption.querySelector('.cap-subtitle').innerText;
      
      lightboxImage.src = fullResSrc;
      lightboxTitle.innerText = title;
      lightboxSubtitle.innerText = subtitle;
      
      lightboxOverlay.style.display = 'block';
    }
  
    function closeLightbox() {
      lightboxOverlay.style.display = 'none';
    }
  
    function showNextImage() {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      openLightbox(galleryImages[currentImageIndex]);
    }
  
    function showPrevImage() {
      currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      openLightbox(galleryImages[currentImageIndex]);
    }
  
    closeButton.addEventListener('click', closeLightbox);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  
    lightboxOverlay.addEventListener('click', function(event) {
      if (event.target === lightboxOverlay) {
        closeLightbox();
      }
    });
  });
  