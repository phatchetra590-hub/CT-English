module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('🔌 New user connected:', socket.id);

    socket.on('join-chat', (userId) => {
      socket.join(`user-${userId}`);
      console.log(`User ${userId} joined chat room`);
    });

    socket.on('send-message', (data) => {
      console.log('Message received:', data);
      socket.emit('message-received', {
        success: true,
        timestamp: new Date()
      });
    });

    socket.on('check-pronunciation', (data) => {
      console.log('Pronunciation check initiated for:', data.text);
    });

    socket.on('disconnect', () => {
      console.log('❌ User disconnected:', socket.id);
    });
  });
};
