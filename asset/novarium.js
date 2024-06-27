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
  
    // Lightbox functionality for .gallery.lightbox only
    const lightboxGalleries = document.querySelectorAll('.gallery.lightbox');
    
    lightboxGalleries.forEach(gallery => {
      const galleryImages = gallery.querySelectorAll('.gallery-thumb img');
      const lightboxOverlay = document.getElementById('lightbox-overlay');
      const lightboxImage = document.getElementById('lightbox-image');
      const lightboxTitle = document.getElementById('lightbox-title');
      const lightboxSubtitle = document.getElementById('lightbox-subtitle');
      const prevButton = document.querySelector('.lb-prev');
      const nextButton = document.querySelector('.lb-next');
      const closeButton = document.querySelector('.lb-close');
      const lightboxThumbnails = document.getElementById('lightbox-thumbnails');
      const loadingIndicator = document.querySelector('.lb-loading');
    
      let currentImageIndex = 0;
      
      if (galleryImages && galleryImages.length > 0) {
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
      }
      
      function openLightbox(img) {
        let fullResSrc = img.getAttribute('data-fullres');
        if (!fullResSrc) {
          fullResSrc = img.src;
        }
        
        const caption = img.closest('li').querySelector('.caption');
        const title = caption.querySelector('.cap-title').innerText;
        const subtitle = caption.querySelector('.cap-subtitle').innerText;
        
        lightboxImage.style.display = 'none';
        loadingIndicator.style.display = 'block';
        lightboxImage.alt = title;
    
        const tempImg = new Image();
        tempImg.onload = () => {
          lightboxImage.src = fullResSrc;
          lightboxTitle.innerText = title;
          lightboxSubtitle.innerText = subtitle;
          
          loadingIndicator.style.display = 'none';
          lightboxImage.style.display = 'block';
    
          updateActiveThumbnail();
        };
        tempImg.src = fullResSrc;
        
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
    
      function updateActiveThumbnail() {
        const thumbnails = lightboxThumbnails.querySelectorAll('img');
        thumbnails.forEach((thumb, index) => {
          if (index === currentImageIndex) {
            thumb.classList.add('thumb-active');
          } else {
            thumb.classList.remove('thumb-active');
          }
        });
      }
    
      if (closeButton) {
        closeButton.addEventListener('click', closeLightbox);
      }
      
      if (nextButton) {
        nextButton.addEventListener('click', showNextImage);
      }
      
      if (prevButton) {
        prevButton.addEventListener('click', showPrevImage);
      }
    
      if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', function(event) {
          if (event.target === lightboxOverlay) {
            closeLightbox();
          }
        });
      }
    });
    const parallaxContainers = document.querySelectorAll('.parallax-container');

    window.addEventListener('scroll', function() {
      parallaxContainers.forEach(container => {
        const parallaxImage = container.querySelector('.parallax-img');
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
  
        // Calculate the scroll percentage relative to the container
        if (containerTop <= window.innerHeight && containerTop + containerHeight >= 0) {
          const scrollPercent = (window.innerHeight - containerTop) / (window.innerHeight + containerHeight);
          const translateY = scrollPercent * 50; // Adjust 50 to control the speed of the parallax effect
          parallaxImage.style.transform = 'translateY(' + translateY + 'px)';
        }
      });
    });
});