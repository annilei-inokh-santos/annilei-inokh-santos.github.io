// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Bias Poll Form Handler
  const biasForm = document.getElementById('biasForm');
  const voteResult = document.getElementById('voteResult');
  
  if (biasForm) {
    biasForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get selected bias
      const selectedBias = document.querySelector('input[name="bias"]:checked');
      
      if (selectedBias) {
        const biasValue = selectedBias.value;
        voteResult.textContent = `Thank you for voting! ${biasValue} is a great choice! 🎉`;
        voteResult.style.color = '#228B22';
        
        // Optional: Save to localStorage
        localStorage.setItem('skzBias', biasValue);
      } else {
        voteResult.textContent = 'Please select a member before voting!';
        voteResult.style.color = '#ff0000';
      }
    });
  }
  
  // Load saved bias if exists
  const savedBias = localStorage.getItem('skzBias');
  if (savedBias && voteResult) {
    voteResult.textContent = `You previously voted for: ${savedBias}`;
    voteResult.style.color = '#507c7c';
  }

// ============================================
// MEMBER PROFILES CAROUSEL
// ============================================

// Member data array (9 members + former member Woojin)
const membersData = [
  {
    id: "bangchan",
    name: "Bang Chan",
    colorClass: "bangchan-color",
    bgClass: "bangchan-bg",
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
    bgClass: "leeknow-bg",
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
    bgClass: "changbin-bg",
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
    bgClass: "hyunjin-bg",
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
    bgClass: "han-bg",
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
    bgClass: "felix-bg",
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
    bgClass: "seungmin-bg",
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
    bgClass: "jeongin-bg",
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
    bgClass: "woojin-bg",
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

// Carousel variables
let currentIndex = 0;

// DOM elements
const slidesContainer = document.getElementById('carouselSlides');
const dotsContainer = document.getElementById('carouselDots');
const detailsName = document.getElementById('detailsName');
const detailsInfo = document.getElementById('detailsInfo');
const detailsFacts = document.getElementById('detailsFacts');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const container = document.querySelector('.member-profiles-container');

// Build carousel
function buildCarousel() {
  slidesContainer.innerHTML = '';
  dotsContainer.innerHTML = '';
  
  membersData.forEach((member, index) => {
    // Create slide
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    if (index === currentIndex) slide.classList.add('active');
    slide.innerHTML = `
      <img src="${member.image}" alt="${member.name}">
      <div class="member-carousel-name ${member.colorClass}">${member.name}</div>
    `;
    slidesContainer.appendChild(slide);
    
    // Create dot
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (index === currentIndex) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  updateDetails();
  updateContainerShine();
}

// Update right side details
function updateDetails() {
  const member = membersData[currentIndex];
  detailsName.textContent = member.name;
  detailsInfo.innerHTML = member.info;
  detailsFacts.innerHTML = `<h4>Facts about ${member.name.replace(' (Former Member)', '')}:</h4><p>${member.facts}</p>`;
}

// Update container shine effect based on member color
function updateContainerShine() {
  const member = membersData[currentIndex];
  container.setAttribute('data-member', member.id);
}

// Go to specific slide
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

// Next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % membersData.length;
  goToSlide(currentIndex);
}

// Previous slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + membersData.length) % membersData.length;
  goToSlide(currentIndex);
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

// Initialize carousel
buildCarousel();
  
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