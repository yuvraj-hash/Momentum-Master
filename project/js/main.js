// Main App Functions

// Global variables
let appData = {};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  // Initialize modules that need initialization
  quotesModule.initQuotes();
  
  // Load saved data from localStorage if available
  loadData();
  
  // Update progress bars and stats
  tasksModule.updateTaskProgress();
  
  // Set up modal event listeners
  setupModalListeners();
});

// Tab Switching
function switchTab(tabId) {
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Show the selected tab content
  document.getElementById(tabId).classList.add('active');
  
  // Update active tab styling
  document.querySelectorAll('.app-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Find the clicked tab and make it active
  event.target.classList.add('active');
  
  // Save the active tab to localStorage
  appData.activeTab = tabId;
  saveData();
}

// Modal Functions
function showModal(type, data = {}) {
  const modal = document.getElementById('appModal');
  const modalContent = document.getElementById('modalContent');
  
  // Set content based on type
  switch(type) {
    case 'belief-reframe':
      modalContent.innerHTML = `
        <h2>Belief Transformed</h2>
        <div class="modal-section">
          <h3>Limiting Belief:</h3>
          <p>${data.limitingBelief}</p>
        </div>
        <div class="modal-section">
          <h3>Empowering Alternative:</h3>
          <p>${data.empoweringAlternative}</p>
        </div>
        <p class="modal-note">This transformation has been saved to your journal.</p>
        <button onclick="closeModal()" class="button-success full-width">Continue Growing</button>
      `;
      break;
      
    case 'schedule-connection':
      modalContent.innerHTML = `
        <h2>Schedule Connection</h2>
        <p>Plan a meeting with ${data.name}</p>
        <div class="modal-form">
          <div class="form-group">
            <label>Date:</label>
            <input type="date" id="connectionDate">
          </div>
          <div class="form-group">
            <label>Time:</label>
            <input type="time" id="connectionTime">
          </div>
          <div class="form-group">
            <label>Meeting Type:</label>
            <select id="meetingType">
              <option value="code-review">Code Review</option>
              <option value="pair-programming">Pair Programming</option>
              <option value="mentoring">Mentoring Session</option>
              <option value="knowledge-sharing">Knowledge Sharing</option>
              <option value="career-advice">Career Advice</option>
            </select>
          </div>
          <button onclick="scheduleConnectionMeeting()" class="button-success full-width">Schedule</button>
        </div>
      `;
      break;
      
    case 'about':
      modalContent.innerHTML = `
        <h2>About Momentum Master</h2>
        <p>Momentum Master is a powerful tool designed specifically for software developers to enhance productivity, maintain focus, and track growth.</p>
        
        <h3>Features:</h3>
        <ul>
          <li>Focused work sessions with the Pomodoro technique</li>
          <li>Task and project management</li>
          <li>Skill development tracking</li>
          <li>Code snippet library</li>
          <li>GitHub activity monitoring</li>
          <li>Mindfulness tools for developers</li>
        </ul>
        
        <p>Version 2.0.1</p>
        <button onclick="closeModal()" class="button-primary full-width">Close</button>
      `;
      break;
      
    case 'settings':
      modalContent.innerHTML = `
        <h2>Settings</h2>
        
        <div class="settings-group">
          <h3>Theme</h3>
          <div class="theme-options">
            <button class="theme-option active" data-theme="light">Light</button>
            <button class="theme-option" data-theme="dark">Dark</button>
            <button class="theme-option" data-theme="system">System</button>
          </div>
        </div>
        
        <div class="settings-group">
          <h3>Timer Settings</h3>
          <div class="form-group">
            <label>Focus Duration (minutes):</label>
            <input type="number" id="settingsFocusDuration" value="25" min="1" max="120">
          </div>
          <div class="form-group">
            <label>Short Break Duration (minutes):</label>
            <input type="number" id="settingsShortBreakDuration" value="5" min="1" max="30">
          </div>
        </div>
        
        <div class="settings-group">
          <h3>Notifications</h3>
          <div class="toggle-item">
            <span>Timer Notifications</span>
            <label class="toggle-switch">
              <input type="checkbox" checked>
              <span class="slider"></span>
            </label>
          </div>
          <div class="toggle-item">
            <span>Task Reminders</span>
            <label class="toggle-switch">
              <input type="checkbox" checked>
              <span class="slider"></span>
            </label>
          </div>
        </div>
        
        <div class="settings-group">
          <h3>Data Management</h3>
          <button onclick="exportData()" class="button-secondary">Export Data</button>
          <button onclick="importData()" class="button-secondary">Import Data</button>
          <button onclick="clearAllData()" class="button-danger">Clear All Data</button>
        </div>
        
        <button onclick="closeModal()" class="button-primary full-width">Save Settings</button>
      `;
      break;
      
    case 'export':
      const dataStr = JSON.stringify(appData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      modalContent.innerHTML = `
        <h2>Export Your Data</h2>
        <p>Download your Momentum Master data to back it up or transfer to another device.</p>
        
        <div class="export-options">
          <a href="${dataUri}" download="momentum-master-data.json" class="button-primary full-width">Download Data</a>
        </div>
        
        <p class="modal-note">Your data is only stored locally on your device. We recommend regular backups.</p>
        
        <button onclick="closeModal()" class="button-secondary full-width">Close</button>
      `;
      break;
      
    default:
      modalContent.innerHTML = `
        <h2>Notification</h2>
        <p>This feature is coming soon!</p>
        <button onclick="closeModal()" class="button-primary full-width">OK</button>
      `;
  }
  
  // Show the modal
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('appModal');
  modal.style.display = 'none';
}

function setupModalListeners() {
  // Close modal when clicking outside content
  const modal = document.getElementById('appModal');
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });
  
  // Close modal on escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
}

// Data Storage Functions
function saveData() {
  // Collect data from all components
  
  // Example of collecting task data
  const tasks = [];
  document.querySelectorAll('#taskList .task-item').forEach(task => {
    tasks.push({
      text: task.querySelector('.task-text').textContent,
      completed: task.classList.contains('completed')
    });
  });
  
  // Add to appData object
  appData.tasks = tasks;
  
  // Similar approach would be used for other data
  
  // Save to localStorage
  localStorage.setItem('momentumMasterData', JSON.stringify(appData));
}

function loadData() {
  const savedData = localStorage.getItem('momentumMasterData');
  
  if (savedData) {
    appData = JSON.parse(savedData);
    
    // Load tasks if available
    if (appData.tasks && appData.tasks.length > 0) {
      const taskList = document.getElementById('taskList');
      
      // Clear current tasks
      taskList.innerHTML = '';
      
      // Add saved tasks
      appData.tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        if (task.completed) {
          taskItem.classList.add('completed');
        }
        
        taskItem.innerHTML = `
          <input type="checkbox" onchange="tasksModule.toggleTask(this)" ${task.completed ? 'checked' : ''}>
          <span class="task-text">${task.text}</span>
          <div class="task-actions">
            <button class="delete-btn" onclick="tasksModule.deleteTask(this)">×</button>
          </div>
        `;
        
        taskList.appendChild(taskItem);
      });
    }
    
    // Switch to active tab if stored
    if (appData.activeTab) {
      switchTab(appData.activeTab);
    }
    
    // Similar approach would be used for other data
  }
}

function clearAllData() {
  if (confirm('Are you sure you want to clear all your data? This cannot be undone.')) {
    localStorage.removeItem('momentumMasterData');
    appData = {};
    location.reload();
  }
}

function exportData() {
  // handled in the modal
}

function importData() {
  // Create a file input element
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'application/json';
  
  fileInput.onchange = function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const importedData = JSON.parse(e.target.result);
          appData = importedData;
          localStorage.setItem('momentumMasterData', JSON.stringify(appData));
          alert('Data imported successfully! The page will now reload.');
          location.reload();
        } catch (error) {
          alert('Error importing data: ' + error.message);
        }
      };
      reader.readAsText(file);
    }
  };
  
  // Trigger the file input click
  fileInput.click();
}

function scheduleConnectionMeeting() {
  const date = document.getElementById('connectionDate').value;
  const time = document.getElementById('connectionTime').value;
  const type = document.getElementById('meetingType').value;
  
  if (date && time) {
    alert(`Meeting scheduled for ${date} at ${time}`);
    closeModal();
  } else {
    alert('Please select both date and time');
  }
}