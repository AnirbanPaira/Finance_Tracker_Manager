import app from './index.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})

// Handle unhandled promise rejections
process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    //close Server and Exit process 
    server.close(()=>process.exit(1));
})

export default server;