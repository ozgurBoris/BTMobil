const Event = require('../models/Event');

// Tüm etkinlikleri getir
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error('Events fetch error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Kullanıcının etkinliklerini getir
const getUserEvents = async (req, res) => {
  try {
    const userId = req.params.userId;
    const events = await Event.find({ createdBy: userId }).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error('User events fetch error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Yeni etkinlik oluştur
const createEvent = async (req, res) => {
  try {
    console.log('Gelen veri:', req.body);
    
    const { title, community, description, date, imageUrl, createdBy } = req.body;
    
    // Zorunlu alanları kontrol et
    if (!title || !community || !description || !date || !createdBy) {
      return res.status(400).json({ 
        message: 'Lütfen tüm zorunlu alanları doldurun',
        requiredFields: ['title', 'community', 'description', 'date', 'createdBy']
      });
    }

    // Yeni etkinlik oluştur
    const event = new Event({
      title,
      community,
      description,
      date,
      imageUrl: imageUrl || 'https://picsum.photos/800/400',
      createdBy
    });

    // Veritabanına kaydet
    const savedEvent = await event.save();
    console.log('Kaydedilen etkinlik:', savedEvent);

    // Başarılı yanıt döndür
    res.status(201).json({
      message: 'Etkinlik başarıyla oluşturuldu',
      event: savedEvent
    });

  } catch (error) {
    console.error('Event creation error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validasyon hatası',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({ 
      message: 'Etkinlik oluşturulurken bir hata oluştu',
      error: error.message 
    });
  }
};

// Etkinlik güncelle
const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { title, community, description, date, imageUrl } = req.body;

    // Etkinliği bul ve güncelle
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        title,
        community,
        description,
        date,
        imageUrl: imageUrl || 'https://picsum.photos/800/400'
      },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Etkinlik bulunamadı' });
    }

    res.json({
      message: 'Etkinlik başarıyla güncellendi',
      event: updatedEvent
    });
  } catch (error) {
    console.error('Event update error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validasyon hatası',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({ 
      message: 'Etkinlik güncellenirken bir hata oluştu',
      error: error.message 
    });
  }
};

// Etkinlik sil
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Etkinlik bulunamadı' });
    }

    res.json({
      message: 'Etkinlik başarıyla silindi',
      event: deletedEvent
    });
  } catch (error) {
    console.error('Event deletion error:', error);
    res.status(500).json({ 
      message: 'Etkinlik silinirken bir hata oluştu',
      error: error.message 
    });
  }
};

module.exports = {
  getEvents,
  getUserEvents,
  createEvent,
  updateEvent,
  deleteEvent
}; 