const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Professional Wrestler Schema
const WrestlerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ringName: {
    type: String,
    required: true
  },
  hometown: {
    type: String,
    required: true
  },
  finishingMove: {
    type: String,
    required: true
  },
  signatureMoves: [{
    moveName: String,
    description: String
  }],
  alignment: {
    type: String,
    enum: ['Face', 'Heel', 'Tween']
  },
  allies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Wrestler'
    }
  ],
  enemies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Wrestler'
    }
  ],
  statistics: {
    popularity: {
      type: Number,
      default: 0
    },
    technicalAbility: {
      type: Number,
      default: 0
    },
    psychology: {
      type: Number,
      default: 0
    }
  },
  imageUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update the `updatedAt` field on document update
WrestlerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Export the model
module.exports = mongoose.model('Wrestler', WrestlerSchema);