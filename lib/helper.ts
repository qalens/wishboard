export function getBaseURL() {
    const isServer = typeof window === 'undefined';
  
    if (isServer) {
      // Server-side (inside Docker container)
      if (process.platform === 'darwin') {
        // macOS Docker
        return 'http://docker.for.mac.localhost:3000/api';
      } else if (process.platform === 'win32') {
        // Windows Docker
        return 'http://host.docker.internal:3000/api';
      } else {
        // Linux Docker
        return 'http://host.docker.internal:3000/api'; // Default Docker bridge IP
      }
    } else {
      // Client-side (Browser)
      return 'http://localhost:3000/api'; // Use relative URLs for client-side
    }
  }