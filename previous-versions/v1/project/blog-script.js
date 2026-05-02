// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
// ============================================
// BIAS POLL SECTION - SIMPLE FADE TRANSITION (NO RESET BUTTON)
// ============================================
(function() {
  const formContainer = document.getElementById('biasFormContainer');
  const resultContainer = document.getElementById('biasResultContainer');
  const voteBtn = document.getElementById('voteSubmitBtn');
  const voteResultSpan = document.getElementById('voteResult');
  const canvas = document.getElementById('biasPieChart');

  let pieChart = null;

  // Member data
  const memberColors = [
    '#779ecb', '#98ff98', '#3399ff', '#c0c0c0',
    '#ff4d4d', '#b8860b', '#b300b3', '#FF69B4'
  ];
  const memberLabels = [
    'Bang Chan', 'Lee Know', 'Changbin', 'Hyunjin',
    'Han', 'Felix', 'Seungmin', 'I.N'
  ];
  const equalData = [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5];

  // Initialize chart
  function initChart() {
    if (pieChart) pieChart.destroy();
    if (!canvas) return;
    
    pieChart = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: memberLabels,
        datasets: [{
          data: equalData,
          backgroundColor: memberColors,
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: { duration: 500, easing: 'easeOutQuart' },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { size: 12, family: "'Courier New', monospace", weight: 'bold' },
              boxWidth: 14, boxHeight: 14, padding: 12,
              usePointStyle: true, pointStyle: 'circle'
            }
          },
          tooltip: { bodyFont: { size: 12 }, callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw}%` } }
        }
      }
    });
  }

  // Show result with fade
  function showResult(selectedName) {
    // Fade out form
    if (formContainer) {
      formContainer.style.transition = 'opacity 0.2s ease';
      formContainer.style.opacity = '0';
    }
    
    setTimeout(() => {
      // Hide form
      if (formContainer) {
        formContainer.style.display = 'none';
        formContainer.style.opacity = '1';
      }
      
      // Show and fade in result
      if (resultContainer) {
        resultContainer.style.display = 'flex';
        resultContainer.style.opacity = '0';
        setTimeout(() => {
          resultContainer.style.transition = 'opacity 0.3s ease';
          resultContainer.style.opacity = '1';
        }, 20);
      }
      
      // Version 10 message
      if (voteResultSpan) {
        voteResultSpan.innerHTML = `⭐ <strong>${selectedName}</strong> appreciates your support, Stay!`;
      }
    }, 200);
  }

  // Vote button
  if (voteBtn) {
    voteBtn.addEventListener('click', () => {
      const selected = document.querySelector('input[name="bias"]:checked');
      if (!selected) {
        const errorMsg = document.createElement('p');
        errorMsg.textContent = '⚠️ Please select a member first!';
        errorMsg.style.color = '#ff0000';
        errorMsg.style.fontSize = '0.8rem';
        errorMsg.style.marginTop = '0.5rem';
        
        const existingError = formContainer.querySelector('.error-message');
        if (existingError) existingError.remove();
        errorMsg.className = 'error-message';
        formContainer.appendChild(errorMsg);
        
        setTimeout(() => errorMsg.remove(), 1500);
        return;
      }
      const selectedLabel = selected.parentElement.querySelector('.bias-name')?.textContent || selected.value;
      showResult(selectedLabel);
    });
  }

  // Always show form on page load
  if (formContainer) formContainer.style.display = '';
  if (resultContainer) resultContainer.style.display = 'none';

  // Initialize chart
  initChart();
})();

  // ============================================
  // MEMBER PROFILES CAROUSEL
  // ============================================

  // Member data array
  const membersData = [
    {
      id: "bangchan",
      name: "Bang Chan",
      colorClass: "bangchan-color",
      image: "/previous-versions/v1/project/blog-assets/bang-chan.jpg",
      info: `<p><span class="info-label bangchan-color">Stage Name:</span> Bang Chan (방찬)<br>
      <span class="info-label bangchan-color">Birth Name:</span> Christopher Bang<br>
      <span class="info-label bangchan-color">Korean Name:</span> Bang Chan (방찬)<br>
      <span class="info-label bangchan-color">Position:</span> Leader, Main Producer, Lead Vocalist, Lead Dancer, Sub Rapper<br>
      <span class="info-label bangchan-color">Birthday:</span> October 3, 1997<br>
      <span class="info-label bangchan-color">Zodiac Sign:</span> Libra<br>
      <span class="info-label bangchan-color">Height:</span> 171 cm (5’7’’)<br>
      <span class="info-label bangchan-color">Blood Type:</span> O<br>
      <span class="info-label bangchan-color">MBTI Type:</span> ENFJ-T<br>
      <span class="info-label bangchan-color">Unit:</span> 3RACHA</p>`,
      facts: `– Chan said he moved to Sydney, Australia when he was very young.<br>
      – He has two siblings: Hannah (sister) and Lucas (brother).<br>
      – Seungmin and Chan went to the same high school.<br>
      – Chan used to take ballet and modern dance classes.<br>
      – His nicknames are Kangaroo and Koala.<br>
      – He joined JYP Entertainment in 2010.<br>
      – He trained for seven (7) years.<br>
      – He is in pre-debut group 3RACHA with Changbin and Jisung.<br>
      – His motto: "Just enjoy~."<br>
      <a href="https://kprofiles.com/bang-chan-profile-facts/" target="_blank">More Bang Chan Facts...</a>`
    },
    {
      id: "leeknow",
      name: "Lee Know",
      colorClass: "leeknow-color",
      image: "/previous-versions/v1/project/blog-assets/lee-know.jpg",
      info: `<p><span class="info-label leeknow-color">Stage Name:</span> Lee Know (리노)<br>
      <span class="info-label leeknow-color">Birth Name:</span> Lee Min Ho (이민호)<br>
      <span class="info-label leeknow-color">Position:</span> Main Dancer, Sub Vocalist, Sub Rapper<br>
      <span class="info-label leeknow-color">Birthday:</span> October 25, 1998<br>
      <span class="info-label leeknow-color">Zodiac Sign:</span> Scorpio<br>
      <span class="info-label leeknow-color">Height:</span> 172 cm (5’8″)<br>
      <span class="info-label leeknow-color">Blood Type:</span> O<br>
      <span class="info-label leeknow-color">MBTI Type:</span> ESFJ-T<br>
      <span class="info-label leeknow-color">Unit:</span> Dance Racha</p>`,
      facts: `– He was born in Gimpo, South Korea.<br>
      – He is an only child.<br>
      – He started dancing in middle school.<br>
      – He was a backup dancer for BTS during their Japan tour.<br>
      – He was a trainee for one (1) year.<br>
      – He has three cats: Soon-ie, Doong-ie, Dori.<br>
      – His motto: "Let's eat well, and live well."<br>
      – Minho made the choreography for "Hellevator".<br>
      <a href="https://kprofiles.com/lee-know-profile-facts/" target="_blank">More Lee Know Facts...</a>`
    },
    {
      id: "changbin",
      name: "Changbin",
      colorClass: "changbin-color",
      image: "/previous-versions/v1/project/blog-assets/chang-bin.jpg",
      info: `<p><span class="info-label changbin-color">Stage Name:</span> Changbin (창빈)<br>
      <span class="info-label changbin-color">Birth Name:</span> Seo Chang Bin (서창빈)<br>
      <span class="info-label changbin-color">Position:</span> Main Rapper, Sub Vocalist, Producer<br>
      <span class="info-label changbin-color">Birthday:</span> August 11, 1999<br>
      <span class="info-label changbin-color">Zodiac Sign:</span> Leo<br>
      <span class="info-label changbin-color">Height:</span> 167 cm (5’6″)<br>
      <span class="info-label changbin-color">Blood Type:</span> O<br>
      <span class="info-label changbin-color">MBTI Type:</span> ENFP-T<br>
      <span class="info-label changbin-color">Unit:</span> 3RACHA</p>`,
      facts: `– He was born in Yongin, South Korea.<br>
      – He has an older sister.<br>
      – His nicknames: Mogi, Jingjingie, Teokjaengie, Binnie.<br>
      – He trained for two (2) years.<br>
      – His stage name in 3RACHA is SPEARB.<br>
      – He got featured on Show Me The Money 5.<br>
      – His motto: "Let's live with a positive mind, enjoy the life."<br>
      <a href="https://kprofiles.com/changbin-profile-facts/" target="_blank">More Changbin Facts...</a>`
    },
    {
      id: "hyunjin",
      name: "Hyunjin",
      colorClass: "hyunjin-color",
      image: "/previous-versions/v1/project/blog-assets/hyun-jin.jpg",
      info: `<p><span class="info-label hyunjin-color">Stage Name:</span> Hyunjin (현진)<br>
      <span class="info-label hyunjin-color">Birth Name:</span> Hwang Hyun Jin (황현진)<br>
      <span class="info-label hyunjin-color">Position:</span> Main Dancer, Lead Rapper, Sub Vocalist, Visual<br>
      <span class="info-label hyunjin-color">Birthday:</span> March 20, 2000<br>
      <span class="info-label hyunjin-color">Zodiac Sign:</span> Pisces<br>
      <span class="info-label hyunjin-color">Height:</span> 179 cm (5’10.5″)<br>
      <span class="info-label hyunjin-color">Blood Type:</span> B<br>
      <span class="info-label hyunjin-color">MBTI Type:</span> INFP-T<br>
      <span class="info-label hyunjin-color">Unit:</span> Dance Racha</p>`,
      facts: `– He was born in Seoul, South Korea.<br>
      – He is an only child.<br>
      – He lived in Las Vegas as a kid.<br>
      – He trained for two (2) years.<br>
      – He has a dog named Kkami.<br>
      – His motto: "Let's try even when you regret it later."<br>
      <a href="https://kprofiles.com/hyunjin-profile-facts/" target="_blank">More Hyunjin Facts...</a>`
    },
    {
      id: "han",
      name: "Han",
      colorClass: "han-color",
      image: "/previous-versions/v1/project/blog-assets/han.jpg",
      info: `<p><span class="info-label han-color">Stage Name:</span> Han (한)<br>
      <span class="info-label han-color">Birth Name:</span> Han Ji Sung (한지성)<br>
      <span class="info-label han-color">English Name:</span> Peter Han<br>
      <span class="info-label han-color">Position:</span> Main Rapper, Lead Vocalist, Producer<br>
      <span class="info-label han-color">Birthday:</span> September 14, 2000<br>
      <span class="info-label han-color">Zodiac Sign:</span> Virgo<br>
      <span class="info-label han-color">Height:</span> 169 cm (5’7″)<br>
      <span class="info-label han-color">Blood Type:</span> B<br>
      <span class="info-label han-color">MBTI Type:</span> ISTP-T<br>
      <span class="info-label han-color">Unit:</span> 3RACHA</p>`,
      facts: `– He was born in Incheon, South Korea.<br>
      – He used to live in Malaysia.<br>
      – He has one older brother.<br>
      – His nickname is Squirrel.<br>
      – His stage name in 3RACHA is J.ONE.<br>
      – He trained for three (3) years.<br>
      – His motto: "This too, shall pass."<br>
      <a href="https://kprofiles.com/han-profile-facts/" target="_blank">More Han Facts...</a>`
    },
    {
      id: "felix",
      name: "Felix",
      colorClass: "felix-color",
      image: "/previous-versions/v1/project/blog-assets/felix.jpg",
      info: `<p><span class="info-label felix-color">Stage Name:</span> Felix (필릭스)<br>
      <span class="info-label felix-color">Birth Name:</span> Felix Lee<br>
      <span class="info-label felix-color">Korean Name:</span> Lee Yong Bok<br>
      <span class="info-label felix-color">Position:</span> Lead Dancer, Lead Rapper, Sub Vocalist<br>
      <span class="info-label felix-color">Birthday:</span> September 15, 2000<br>
      <span class="info-label felix-color">Zodiac Sign:</span> Virgo<br>
      <span class="info-label felix-color">Height:</span> 171 cm (5’7″)<br>
      <span class="info-label felix-color">Blood Type:</span> AB<br>
      <span class="info-label felix-color">MBTI Type:</span> ENFP-T<br>
      <span class="info-label felix-color">Unit:</span> Dance Racha</p>`,
      facts: `– He was born in Sydney, Australia.<br>
      – He has two sisters: Rachel and Olivia.<br>
      – He trained for one (1) year.<br>
      – His charming point is his freckles.<br>
      – Felix is a 3rd-degree black belt at taekwondo.<br>
      – His motto: "Just a little braver~."<br>
      <a href="https://kprofiles.com/felix-profile-facts/" target="_blank">More Felix Facts...</a>`
    },
    {
      id: "seungmin",
      name: "Seungmin",
      colorClass: "seungmin-color",
      image: "/previous-versions/v1/project/blog-assets/seung-min.jpg",
      info: `<p><span class="info-label seungmin-color">Stage Name:</span> Seungmin (승민)<br>
      <span class="info-label seungmin-color">Birth Name:</span> Kim Seung Min<br>
      <span class="info-label seungmin-color">Position:</span> Main Vocalist<br>
      <span class="info-label seungmin-color">Birthday:</span> September 22, 2000<br>
      <span class="info-label seungmin-color">Zodiac Sign:</span> Virgo<br>
      <span class="info-label seungmin-color">Height:</span> 178 cm (5’10″)<br>
      <span class="info-label seungmin-color">Blood Type:</span> A<br>
      <span class="info-label seungmin-color">MBTI Type:</span> ESFJ-A<br>
      <span class="info-label seungmin-color">Unit:</span> Vocal Racha</p>`,
      facts: `– He was born in Seoul, South Korea.<br>
      – He has an older sister.<br>
      – His nickname is Sunshine.<br>
      – He joined JYP in 2017.<br>
      – His hobbies are writing in his diary and listening to music.<br>
      – His motto: "Today you spent in vain is the day as tomorrow someone who passed away wants to live through."<br>
      <a href="https://kprofiles.com/seungmin-profile-facts/" target="_blank">More Seungmin Facts...</a>`
    },
    {
      id: "jeongin",
      name: "I.N",
      colorClass: "jeongin-color",
      image: "/previous-versions/v1/project/blog-assets/yang-jeong-in.jpg",
      info: `<p><span class="info-label jeongin-color">Stage Name:</span> I.N (아이엔)<br>
      <span class="info-label jeongin-color">Birth Name:</span> Yang Jeong In<br>
      <span class="info-label jeongin-color">Position:</span> Sub Vocalist, Maknae<br>
      <span class="info-label jeongin-color">Birthday:</span> February 8, 2001<br>
      <span class="info-label jeongin-color">Zodiac Sign:</span> Aquarius<br>
      <span class="info-label jeongin-color">Height:</span> 172 cm (5’8″)<br>
      <span class="info-label jeongin-color">Blood Type:</span> A<br>
      <span class="info-label jeongin-color">MBTI Type:</span> ESFJ-T<br>
      <span class="info-label jeongin-color">Unit:</span> Vocal Racha</p>`,
      facts: `– He was born in Busan, South Korea.<br>
      – He has an older brother and a younger brother.<br>
      – I.N used to be a child model.<br>
      – He trained for two (2) years.<br>
      – His nickname is Desert Fox.<br>
      – His motto: "Let's have a good time!"<br>
      <a href="https://kprofiles.com/in-stray-kids-profile-facts/" target="_blank">More I.N Facts...</a>`
    },
    {
      id: "woojin",
      name: "Woojin (Former Member)",
      colorClass: "woojin-color",
      image: "/previous-versions/v1/project/blog-assets/kim-woo-jin.jpg",
      info: `<p><span class="info-label woojin-color">Stage Name:</span> Woojin (우진)<br>
      <span class="info-label woojin-color">Birth Name:</span> Kim Woo Jin (김우진)<br>
      <span class="info-label woojin-color">Birthday:</span> April 8, 1997<br>
      <span class="info-label woojin-color">Zodiac Sign:</span> Aries<br>
      <span class="info-label woojin-color">Height:</span> 176 cm (5’9″)<br>
      <span class="info-label woojin-color">Blood Type:</span> B</p>`,
      facts: `– He was born in Daejeon, South Korea.<br>
      – He has one older brother.<br>
      – His nickname: Bear.<br>
      – His specialty is kendo (modern Japanese martial arts).<br>
      – He is a former Fantagio trainee.<br>
      – He is a former SM trainee and used to train with NCT members.<br>
      – He trained for two (2) years.<br>
      – He can speak basic English.<br>
      – He can play the guitar well.<br>
      – His motto: "Let's not make things that we regret."<br>
      – He <strong>left STRAY KIDS</strong> on <u>October 27th, 2019</u> due to personal reasons.<br>
      <a href="https://kprofiles.com/kim-woojin-profile-facts/" target="_blank">More Woojin Facts...</a>`
    }
  ];

  // Get DOM elements
  const slidesContainer = document.getElementById('carouselSlides');
  const dotsContainer = document.getElementById('carouselDots');
  const detailsName = document.getElementById('detailsName');
  const detailsInfo = document.getElementById('detailsInfo');
  const detailsFacts = document.getElementById('detailsFacts');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const container = document.querySelector('.member-profiles-container');

  // Only initialize carousel if all elements exist
  if (slidesContainer && dotsContainer && detailsName && detailsInfo && detailsFacts && prevBtn && nextBtn && container) {
    
    let currentIndex = 0;

    // Build carousel
    function buildCarousel() {
      slidesContainer.innerHTML = '';
      dotsContainer.innerHTML = '';
      
      membersData.forEach((member, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        if (index === currentIndex) slide.classList.add('active');
        slide.innerHTML = `
          <img src="${member.image}" alt="${member.name}">
          <div class="member-carousel-name ${member.colorClass}">${member.name}</div>
        `;
        slidesContainer.appendChild(slide);
        
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
      
      updateDetails();
      updateContainerShine();
    }

    function updateDetails() {
      const member = membersData[currentIndex];
      detailsName.textContent = member.name;
      detailsInfo.innerHTML = member.info;
      detailsFacts.innerHTML = `<h4>Facts about ${member.name.replace(' (Former Member)', '')}:</h4><p>${member.facts}</p>`;
    }

    function updateContainerShine() {
      const member = membersData[currentIndex];
      container.setAttribute('data-member', member.id);
    }

    function goToSlide(index) {
      currentIndex = index;
      const slides = document.querySelectorAll('.carousel-slide');
      const dots = document.querySelectorAll('.dot');
      
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
      
      updateDetails();
      updateContainerShine();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % membersData.length;
      goToSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + membersData.length) % membersData.length;
      goToSlide(currentIndex);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });

    buildCarousel();
  }

  // ============================================
  // CRACKHEAD ENERGY MODAL
  // ============================================

  const crackheadMembers = [
    {
      name: "Bang Chan",
      subtitle: "GENIUS BANG",
      desc: "Leader Energy 🐺",
      image: "/previous-versions/v1/project/blog-assets/bang-chan-01.jpg",
      links: [
        { text: "His BODY", url: "https://www.youtube.com/watch?v=m_TZbk9ReqY" },
        { text: '"Oi FeLiX"', url: "https://www.youtube.com/watch?v=0obLZ5rr7-8" },
        { text: '"I\'m YoUr... Daddy?"', url: "https://www.youtube.com/watch?v=nnc4pY8fGBc" },
        { text: "Christiano Bangnaldo", url: "https://www.youtube.com/watch?v=r9JJG7EL0uE" },
        { text: "Australian Beef", url: "https://www.youtube.com/watch?v=MgexWKMI5g8" }
      ]
    },
    {
      name: "Lee Know",
      subtitle: "LEEKNOW IS CUTE",
      desc: "Cat Dad Energy 🐱",
      image: "/previous-versions/v1/project/blog-assets/lee-know-01.jpg",
      links: [
        { text: '"You know? I know? LEE KNOW! YEAHHHHH!!"', url: "https://www.youtube.com/watch?v=bNfaSn288kE" },
        { text: "Dancing Gem", url: "https://www.youtube.com/watch?v=OuyAyqSEcXg" },
        { text: "F A L S E T T O", url: "https://www.youtube.com/watch?v=_5HfiX5xD7E" },
        { text: "AnYoNE of ThEsE hOpeFuLS", url: "https://www.youtube.com/watch?v=oenqlXWYiok" },
        { text: "adorable laugh uwu #1", url: "https://www.youtube.com/watch?v=H-uTNfLlmuI&t=66s" }
      ]
    },
    {
      name: "Changbin",
      subtitle: "DWAEKKI",
      desc: "Dark Rapper Energy 🔥",
      image: "/previous-versions/v1/project/blog-assets/chang-bin-01.jpg",
      links: [
        { text: "Changbin v.s. Binnie", url: "https://www.youtube.com/watch?v=bJ5wylcxT-s" },
        { text: "Binsual", url: "https://www.youtube.com/watch?v=zTM2NK8AO2I" },
        { text: "Fastest Rapper", url: "https://www.youtube.com/watch?v=ZilXHbxNR_M" },
        { text: "Baby Changbin Aegyo", url: "https://www.youtube.com/watch?v=KHcil6VPI5Y" },
        { text: "MAAAAAAAATRYOSHKA", url: "https://www.youtube.com/watch?v=EOzZHHtPCJA" }
      ]
    },
    {
      name: "Hyunjin",
      subtitle: "HYUN.E",
      desc: "Drama Queen Energy 💃",
      image: "/previous-versions/v1/project/blog-assets/hyun-jin-01.jpg",
      links: [
        { text: "Got7 Jinyoung's BIGGEST Fanboy", url: "https://www.youtube.com/watch?v=mzXFvKph4j4" },
        { text: "YoUr BeHaViOur Is sO-", url: "https://www.youtube.com/watch?v=oi9PiBPzbCc" },
        { text: "Tchh, HairBand", url: "https://www.youtube.com/watch?v=GcLNXQqigo0" },
        { text: "Drama Llama", url: "https://www.youtube.com/watch?v=DeN_ju52Fr0" },
        { text: "Aussie", url: "https://www.youtube.com/watch?v=LdrHan1Gbcw" }
      ]
    },
    {
      name: "Han",
      subtitle: "QUOKKA",
      desc: "Ace Energy ⚡",
      image: "/previous-versions/v1/project/blog-assets/han-01.jpg",
      links: [
        { text: "Squirrel", url: "https://www.youtube.com/watch?v=hW4jxR5e_xM" },
        { text: "JiKiLgE *heavy breathing*", url: "https://www.youtube.com/watch?v=_w0Rcj8biA0" },
        { text: '"Gae."', url: "https://www.youtube.com/watch?v=6nZhJTdYpck" },
        { text: "forgetting his lyrics", url: "https://www.youtube.com/watch?v=tMu6JNCroOU" },
        { text: '"eXcUsE Me NoONa, DO YoU hAvE A BoYFriEnD?"', url: "https://www.youtube.com/watch?v=DytLxOcT4Hk" }
      ]
    },
    {
      name: "Felix",
      subtitle: "HAENGBOK",
      desc: "Sunshine Energy ☀️",
      image: "/previous-versions/v1/project/blog-assets/felix-01.jpg",
      links: [
        { text: "Sunshine", url: "https://www.youtube.com/watch?v=9_wJHksWjno" },
        { text: "a mosquito", url: "https://www.youtube.com/watch?v=9_MMMERPvtQ" },
        { text: "beatboxer", url: "https://www.youtube.com/watch?v=jDajMMGIxSk" },
        { text: "voice duality", url: "https://www.youtube.com/watch?v=sd0qbaKLcrw" },
        { text: "u w u", url: "https://www.youtube.com/watch?v=EHwo_K6M-jk" }
      ]
    },
    {
      name: "Seungmin",
      subtitle: "SEUNGMO",
      desc: "Puppy Energy 🐶",
      image: "/previous-versions/v1/project/blog-assets/seung-min-01.jpg",
      links: [
        { text: "SEUNGMIN IN THE BUILDING", url: "https://www.youtube.com/watch?v=Np_azGXMNaU" },
        { text: "Day6 Fan President", url: "https://www.youtube.com/watch?v=O80unzjHcq8" },
        { text: 'puppy "mong mong"', url: "https://www.youtube.com/watch?v=Ru6F7pFtIlQ" },
        { text: "Whipped for I.N", url: "https://www.youtube.com/watch?v=MQDnJA7BQeI" },
        { text: "noises", url: "https://www.youtube.com/watch?v=Yrw3IqCX-pg" }
      ]
    },
    {
      name: "I.N",
      subtitle: "AGIBBANG",
      desc: "Baby Bread Energy 🍞",
      image: "/previous-versions/v1/project/blog-assets/yang-jeong-in-01.jpg",
      links: [
        { text: "cute smile", url: "https://www.youtube.com/watch?v=0jFk8JUAQoE" },
        { text: "baby shark uwu", url: "https://www.youtube.com/watch?v=JWhZlDuFyVI" },
        { text: "Trot Singing", url: "https://www.youtube.com/watch?v=VVK0sLLbSYQ" },
        { text: "effortlessly cute", url: "https://www.youtube.com/watch?v=xKX4X0_6Rac" },
        { text: "suddenly snapped in God's Menu era", url: "https://www.youtube.com/watch?v=ma4Oocz-oH8" }
      ]
    }
  ];

  const grid = document.getElementById('memberGrid');
  
  if (grid) {
    function populateMemberGrid() {
      grid.innerHTML = '';
      
      crackheadMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.setAttribute('data-member', member.name);
        card.innerHTML = `
          <img src="${member.image}" alt="${member.name}" class="member-card-avatar">
          <div class="member-card-name">${member.name}</div>
          <div class="member-card-subtitle">${member.subtitle}</div>
        `;
        card.addEventListener('click', () => openModal(member.name));
        grid.appendChild(card);
      });
    }

    const modal = document.getElementById('memberModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalLinks = document.getElementById('modalLinks');
    const closeBtn = document.querySelector('.modal-close');

    function openModal(memberName) {
      if (!modal) return;
      const member = crackheadMembers.find(m => m.name === memberName);
      if (!member) return;
      
      if (modalTitle) modalTitle.textContent = member.name;
      if (modalImage) modalImage.src = member.image;
      if (modalSubtitle) modalSubtitle.textContent = member.subtitle;
      if (modalDesc) modalDesc.textContent = member.desc;
      
      if (modalLinks) {
        modalLinks.innerHTML = '';
        member.links.forEach(link => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.text}</a>`;
          modalLinks.appendChild(li);
        });
      }
      
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        closeModal();
      }
    });

    populateMemberGrid();
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  console.log('Stray Kids Blog Loaded! 🎉');
});

// ============================================
// ARCHIVE POPUP - ONE TIME ONLY (NO OUTSIDE CLICK)
// ============================================
(function() {
  const popupKey = 'archivePopupShown';
  const popupModal = document.getElementById('archivePopup');
  const closeBtn = document.getElementById('closeArchiveBtn');
  
  // Check if popup has been shown before
  const hasBeenShown = localStorage.getItem(popupKey);
  
  // Function to show popup
  function showPopup() {
    if (popupModal) {
      popupModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }
  
  // Function to close and remember
  function closeAndRemember() {
    if (popupModal) {
      popupModal.style.display = 'none';
      document.body.style.overflow = 'auto';
      // Store in localStorage - this prevents showing again
      localStorage.setItem(popupKey, 'true');
    }
  }
  
  // Show popup only if it hasn't been shown before
  if (!hasBeenShown) {
    // Small delay to ensure page loads first
    setTimeout(showPopup, 500);
  }
  
  // Close button only - NO outside click
  if (closeBtn) {
    closeBtn.addEventListener('click', closeAndRemember);
  }
  
  // REMOVED: Click outside to close (no longer closes)
  // REMOVED: Escape key to close (optional - can keep or remove)
  
  // Optional: Keep Escape key to close (comment out if you want to remove)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popupModal && popupModal.style.display === 'flex') {
      closeAndRemember();
    }
  });
})();