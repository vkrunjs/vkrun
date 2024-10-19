import v from 'vkrun'
import path from 'path'

// Initialize the Vkrun application
const app = v.App()

// Set the base directory where static files will be served from.
// 'path.join' ensures the path is created correctly regardless of the operating system.
const basePath = path.join(__dirname, 'files')

// Define a GET route to serve static files.
// Any request that starts with '/static/*' will be handled by the 'serveStaticFile' middleware,
// which looks for the corresponding file in the 'basePath' directory.
app.get('/static/*', v.serveStaticFile(basePath))

// Start the server on port 3000.
app.server().listen(3000, () => {
  console.log('Vkrun server running on port 3000')
})

// Example of file access:
// If there is a file named 'filename.txt' in the 'files/doc' directory,
// it can be accessed via 'http://localhost:3000/static/doc/filename.txt'
