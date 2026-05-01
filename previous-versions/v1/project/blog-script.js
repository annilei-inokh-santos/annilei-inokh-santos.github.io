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