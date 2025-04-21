// GitHub Activity Module
const githubModule = (() => {
  function addContribution() {
    const repoInput = document.getElementById('repoName');
    const commitInput = document.getElementById('commitCount');
    
    const repo = repoInput.value.trim();
    const commits = parseInt(commitInput.value);
    
    if (repo && !isNaN(commits) && commits > 0) {
      // In a full implementation, this would update the GitHub grid
      // and stats. For now, we'll just show a success message.
      
      // Get current stats
      const statsContainer = document.querySelector('.github-stats');
      const currentContributionsEl = statsContainer.querySelector('strong:first-of-type');
      
      // Update the contributions count
      const currentContributions = parseInt(currentContributionsEl.textContent);
      currentContributionsEl.textContent = (currentContributions + commits);
      
      // Clear inputs
      repoInput.value = '';
      commitInput.value = '';
      
      // Save to localStorage
      saveData();
      
      // Show a brief message
      alert(`Added ${commits} contributions to ${repo}`);
    } else {
      alert('Please enter a valid repository name and commit count.');
    }
  }
  
  // Public API
  return {
    addContribution
  };
})();