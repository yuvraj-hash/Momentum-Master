// Developer Network Module
const networkModule = (() => {
  function addConnection() {
    const nameInput = document.getElementById('connectionName');
    const roleInput = document.getElementById('connectionRole');
    
    const name = nameInput.value.trim();
    const role = roleInput.value.trim();
    
    if (name && role) {
      const connectionList = document.querySelector('.connection-list');
      
      // Get initials for the avatar
      const initials = name.split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2);
      
      const connectionItem = document.createElement('div');
      connectionItem.className = 'connection-item';
      
      connectionItem.innerHTML = `
        <div class="connection-avatar">${initials}</div>
        <div class="connection-info">
          <div class="connection-name">${name}</div>
          <div class="connection-role">${role}</div>
        </div>
        <button class="connection-action" onclick="networkModule.scheduleConnection(this)">📆</button>
      `;
      
      connectionList.appendChild(connectionItem);
      
      // Clear inputs
      nameInput.value = '';
      roleInput.value = '';
      
      // Save to localStorage
      saveData();
    }
  }
  
  function scheduleConnection(connectionId) {
    let connectionItem;
    let name;
    
    if (typeof connectionId === 'number') {
      const connectionItems = document.querySelectorAll('.connection-list .connection-item');
      if (connectionItems[connectionId]) {
        connectionItem = connectionItems[connectionId];
        name = connectionItem.querySelector('.connection-name').textContent;
      }
    } else {
      connectionItem = connectionId.closest('.connection-item');
      name = connectionItem.querySelector('.connection-name').textContent;
    }
    
    if (name) {
      // In a full implementation, this would open a calendar or scheduling interface
      showModal('schedule-connection', { name: name });
    }
  }
  
  // Public API
  return {
    addConnection,
    scheduleConnection
  };
})();