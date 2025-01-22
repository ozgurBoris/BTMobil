const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Başlık alanı zorunludur']
  },
  community: {
    type: String,
    required: [true, 'Topluluk alanı zorunludur']
  },
  description: {
    type: String,
    required: [true, 'Açıklama alanı zorunludur']
  },
  date: {
    type: Date,
    required: [true, 'Tarih alanı zorunludur']
  },
  imageUrl: {
    type: String,
    default: 'https://picsum.photos/800/400'
  },
  createdBy: {
    type: String,
    default: 'Admin'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema); 