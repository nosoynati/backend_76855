function logger(req,res,next){
  const start = Date.now();
  console.log(`[start] ${req.method} ${req.originalUrl}`);
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`[END] ${req.method} ${req.originalUrl} | status: ${res.statusCode} | Time: ${ms}ms`);

  });
  next();
};

export default logger;