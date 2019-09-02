$(document).ready(function() {
  $("#news-slider10").owlCarousel({
    items: 4,
    itemsDesktop: [1199, 3],
    itemsDesktopSmall: [980, 2],
    itemsMobile: [600, 1],
    navigation: true,
    navigationText: ["", ""],
    pagination: true,
    autoPlay: true
  });

  // varibales

  const displayNews = document.querySelector(".owl-carousel");

  // getting the news
  class News {
    async getNews() {
      try {
        let result = await fetch("news.json");
        let data = await result.json();

        let news = data.news;

        news = news.map(item => {
          const { title, besedilo } = item.fields;

          const image = item.fields.image.fields.file.url;
          return { title, besedilo, image };
        });
        return news;
      } catch (error) {
        console.log(error);
      }
    }
  }
  // display news
  class UI {
    displayNews(news) {
      let result = "";
      news.forEach(news => {
        result += `
          <div class="post-slide10">
          <img src="${news.image}" alt="">
          <div class="post-date">
            <span class="month">Nov</span>
            <span class="date">5</span>
          </div>
          <h3 class="post-title">
            <a href="#">${news.title}</a>
          </h3>
          <p class="post-description">
           ${news.besedilo}
          </p>
          <a href="#" class="read-more">read more<i class="fa fa-chevron-right"></i></a>
        </div>
    

    `;
      });

      displayNews.innerHTML = result;
    }
  }

  //local storage
  class Storage {
    static saveNews(news) {
      localStorage.setItem("news", JSON.stringify(news));
    }
    static getNews(id) {
      let news = JSON.parse(localStorage.getItem("news"));
      return news.find(news => news.id === id);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const news = new News();

    // get all news
    news.getNews().then(news => {
      ui.displayNews(news);
      Storage.saveNews(news);
    });
  });

  /*  <div class="carousel-item col-md-3 active">
        <div class="blog-thumbnail">
        <a href="#"><img src="${news.image}" class="img-fluid mx-auto d-block" alt="slide 1"></a>
        <div class="blog-content">
          <span class="post-date">${news.title}</span>
          <p class="post-title">${news.besedilo}</p>
        </div>
        
        </div>

      </div> */
});
