// Tasks Management Module
const tasksModule = (() => {
  function addTask() {
    const taskInput = document.getElementById('newTask');
    const taskText = taskInput.value.trim();
    
    if (taskText) {
      const taskList = document.getElementById('taskList');
      
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
      
      taskItem.innerHTML = `
        <input type="checkbox" onchange="tasksModule.toggleTask(this)">
        <span class="task-text">${taskText}</span>
        <div class="task-actions">
          <button class="delete-btn" onclick="tasksModule.deleteTask(this)">×</button>
        </div>
      `;
      
      taskList.appendChild(taskItem);
      
      // Clear input
      taskInput.value = '';
      
      // Update task progress
      updateTaskProgress();
      
      // Save to localStorage
      saveData();
    }
  }
  
  function toggleTask(checkbox) {
    const taskItem = checkbox.parentElement;
    
    if (checkbox.checked) {
      taskItem.classList.add('completed');
      
      // Create completion animation
      createConfetti();
    } else {
      taskItem.classList.remove('completed');
    }
    
    // Update task progress
    updateTaskProgress();
    
    // Save to localStorage
    saveData();
  }
  
  function deleteTask(button) {
    const taskItem = button.closest('.task-item');
    
    // Add a fade-out animation
    taskItem.style.opacity = '0';
    
    setTimeout(() => {
      taskItem.remove();
      updateTaskProgress();
      saveData();
    }, 300);
  }
  
  function updateTaskProgress() {
    const taskItems = document.querySelectorAll('#taskList .task-item');
    const completedTasks = document.querySelectorAll('#taskList .task-item.completed');
    
    const progressBar = document.getElementById('taskProgress');
    
    if (taskItems.length > 0) {
      const progressPercentage = (completedTasks.length / taskItems.length) * 100;
      progressBar.style.width = `${progressPercentage}%`;
    } else {
      progressBar.style.width = '0%';
    }
  }
  
  // Public API
  return {
    addTask,
    toggleTask,
    deleteTask,
    updateTaskProgress
  };
})();