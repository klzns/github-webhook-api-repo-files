import app from './app'

const server = app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})

export default server
